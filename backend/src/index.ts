import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("api/v1/signup", (c) => {
  return c.text("signup post request");
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
