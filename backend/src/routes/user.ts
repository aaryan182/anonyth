import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import {
  userSignupSchema,
  userSigninSchema,
  UserSignup,
  UserSignin,
} from "@aaryanbajaj/anonyth-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = userSignupSchema.parse(await c.req.json()) as UserSignup;

  try {
    const user = await prisma.user.create({
      data: {
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signing up" });
  } finally {
    await prisma.$disconnect();
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = userSigninSchema.parse(await c.req.json()) as UserSignin;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!user || body.password !== user.password) {
      c.status(403);
      return c.json({ error: "Invalid credentials" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    c.status(403);
    return c.json({ error: "Error while signing in" });
  } finally {
    await prisma.$disconnect();
  }
});
