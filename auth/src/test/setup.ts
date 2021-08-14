import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
  var signinAndGetAuthCookie: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "qiwoe8hfc9e8iu";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signinAndGetAuthCookie = async () => {
  const validSigninCredentials = {
    email: "test@test.com",
    password: "test",
  };

  const signupRes = await request(app)
    .post("/api/users/signup")
    .send(validSigninCredentials)
    .expect(201);

  const cookie = signupRes.get("Set-Cookie");

  return cookie;
};
