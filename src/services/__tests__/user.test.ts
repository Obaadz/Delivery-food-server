import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { MongooseError } from "mongoose";
import { ERROR_MESSAGES, RESPONSE_MESSAGES } from "../../types/enums";
import { IUserDocument } from "../../types/user";
import { findUser, insertUser } from "../user";

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create(),
    mongoUri = mongoServer.getUri();

  mongoose.set("strictQuery", false);
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

const TESTING_USER = {
  email: "test@gmail.com",
  username: "test",
  password: "12345678",
};

describe("user service", () => {
  describe("insertUser", () => {
    describe("when inserting correctly user in the database", () => {
      it(`should return the user object after creation`, async () => {
        const dbUser = await insertUser(TESTING_USER);

        expect(dbUser).toHaveProperty("_id");
        expect(dbUser).toHaveProperty("email");
        expect(dbUser).toHaveProperty("username");
        expect(dbUser).toHaveProperty("password");

        expect(dbUser.email).toEqual("test@gmail.com");
      });
    });
  });

  describe("findUser", () => {
    describe("when user does not exists in the database", () => {
      it(`should return error: ${ERROR_MESSAGES.USER_NOT_FOUND}`, async () => {
        const dbUserOrError = await findUser({ email: "not_a_email@gmail.com" }).catch(
          (err: MongooseError) => err
        );

        expect(dbUserOrError).toHaveProperty("message");
        expect((dbUserOrError as MongooseError).message).toEqual(
          ERROR_MESSAGES.USER_NOT_FOUND
        );
      });
    });

    describe("when user exists in the database", () => {
      it(`should return the user object`, async () => {
        const dbUser = await findUser(TESTING_USER);

        expect(dbUser).toHaveProperty("_id");
        expect(dbUser).toHaveProperty("email");
        expect(dbUser).toHaveProperty("username");
        expect(dbUser).toHaveProperty("password");

        expect(dbUser.email).toEqual("test@gmail.com");
      });
    });
  });
});
