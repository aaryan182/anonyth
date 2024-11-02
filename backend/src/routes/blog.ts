import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";
import {
  postCreateSchema,
  postUpdateSchema,
  paginationSchema,
  PostCreate,
  PostUpdate,
} from "@aaryanbajaj/anonyth-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Authorization middleware
blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  const user = await verify(authHeader, c.env.JWT_SECRET);

  if (typeof user.id === "string") {
    c.set("userId", user.id);
    await next();
  } else {
    c.status(403);
    return c.json({ error: "Unauthorized" });
  }
});

blogRouter.post("/", async (c) => {
  const body = postCreateSchema.parse(await c.req.json()) as PostCreate;
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({ id: post.id });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Error creating post" });
  }
});

blogRouter.put("/", async (c) => {
  const body = postUpdateSchema.parse(await c.req.json()) as PostUpdate;
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const post = await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ id: post.id });
  } catch (error) {
    c.status(500);
    return c.json({ error: "Error updating post" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const pagination = paginationSchema.parse({
    page: c.req.query("page"),
  });
  const page = parseInt(pagination.page, 10);

  const limit = 6;
  const skip = (page - 1) * limit;

  const [allBlogs, totalCount] = await Promise.all([
    prisma.post.findMany({
      skip,
      take: limit,
    }),
    prisma.post.count(),
  ]);

  return c.json({
    page,
    limit,
    totalCount,
    totalPages: Math.ceil(totalCount / limit),
    allBlogs,
  });
});
