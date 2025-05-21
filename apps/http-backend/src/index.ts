import express from "express";
import jwt from "jsonwebtoken";
const { JWT_SECRET } = require("@repo/backend-common/config");

//import { JWT_SECRET } from "@repo/backend-common/config";
import { Middleware } from "./middleware";
import { CreateUserSchema, SigninSchema, CreateRoom } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parseddata = CreateUserSchema.safeParse(req.body);
  if (!parseddata.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }
  try {
    await prismaClient.user.create({
      data: {
        email: parseddata.data?.username,
        password: parseddata.data.password,
        name: parseddata.data.name,
      },
    });
    res.json({
      userId: "123",
    });
  } catch (e) {
    res.status(411).json({
      message: "User Already Exists With This User Name",
    });
  }
});

app.post("/signin", (req, res) => {
  const data = SigninSchema.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }
  const userId = 1;
  const token = jwt.sign(
    {
      userId,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
});

app.post("/room", Middleware, (req, res) => {
  const data = CreateRoom.safeParse(req.body);
  if (!data.success) {
    res.json({
      message: "incorrect inputs",
    });
    return;
  }
  res.json({
    roomId: 123,
  });
});

app.listen(5000);
