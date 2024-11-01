import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  if (!body.password) {
    return c.json(
      {
        error: "Password is incorrect",
      },
      400
    );
  }

  const user = await prisma.user.create({
    data: {
      password: body.password,
    },
  });
  await prisma.$disconnect();

  return c.json({ message: "User created successfully", userId: user.id }, 201);
});

app.post("/api/v1/signin", (c) => {
  return c.text("signin post request");
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
