import request from "supertest";
import { app } from "../../app";

it("Should fails when a email that does not exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(400);
});

it("Should fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "test",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "wp9e8fhjpmw9e8fhj",
    })
    .expect(400);
});

it("Should respond with a cookie when given valid credentials", async () => {
  const validCredentials = {
    email: "test@test.com",
    password: "test",
  };

  await request(app)
    .post("/api/users/signup")
    .send(validCredentials)
    .expect(201);

  const response = await request(app)
    .post("/api/users/signin")
    .send(validCredentials)
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
