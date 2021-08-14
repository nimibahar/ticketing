import request from "supertest";
import { app } from "../../app";

it("Should respond with the details of the current user", async () => {
  const cookie = await signinAndGetAuthCookie();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.user.email).toEqual("test@test.com");
});

it("Should respond with null if the user is not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.user).toEqual(null);
});
