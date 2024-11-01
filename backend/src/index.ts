import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.create({
      data: {
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signing up" });
  } finally {
    await prisma.$disconnect();
  }
});

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found" });
    }

    if (body.password !== user.password) {
      c.status(403);
      return c.json({ error: "Incorrect password" });
    }
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt: jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signing in" });
  } finally {
    await prisma.$disconnect();
  }
});

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("get blog request for particular id");
});

app.post("/api/v1/blog", (c) => {
  return c.text("blog post request");
});

app.put("/api/v1/blog", (c) => {
  return c.text("blog put request");
});

export default app;
