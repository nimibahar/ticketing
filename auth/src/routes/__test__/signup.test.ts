import request from "supertest";
import { app } from "../../app";

it("returns 201 on a successful signup", async () => {
  const testResult = await request(app).post("/api/users/signup").send({
    email: "test@test.com",
    password: "password",
  });
  expect(testResult.status).toEqual(201);
}, 60000);

it("returns 400 with an invalid email", async () => {
  const testResult = await request(app).post("/api/users/signup").send({
    email: "invalidemail",
    password: "password",
  });
  expect(testResult.status).toEqual(400);
}, 60000);

it("returns 400 with an invalid password", async () => {
  const testResult = await request(app).post("/api/users/signup").send({
    email: "invalidemail",
    password: "p",
  });
  expect(testResult.status).toEqual(400);
}, 60000);

it("returns 400 with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ password: "password" })
    .expect(400);
}, 60000);

it("it disallows duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "2o3hr298hj" })
    .expect(201);
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "2o3hr298hj" })
    .expect(400);
});

it("sets a cookie after a syccessfull signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "2o3hr298hj" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();
});
