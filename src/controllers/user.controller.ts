import { Request, Response } from "express";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { Iuser } from "../../types";

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const exstingUser = await User.findOne({ email });
    if (exstingUser) {
      res.status(409).send("user already exist");
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      console.log("hashed pas", hashedPassword);
      return res.status(201).send({
        message: "User created Succesfully",
      });
    }
  } catch (error) {
    console.log("error in creating user", error);
    throw error;
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password }: Iuser = req.body;

    const exstingUser = await User.findOne({ email });

    if (!exstingUser) {
      res.status(409).send({ message: "The user doesn't exist!" });
    }

    const isPasswordIdentical = bcrypt.compare(
      password,
      (await exstingUser).password
    );

    if (isPasswordIdentical) {
      const token = getUserToken((await exstingUser)._id);
      return res.send({
        token,
        user: {
          email: exstingUser.email,
          name: exstingUser.name,
          password: exstingUser.password,
        },
      });
    } else {
      res.status(400).send({ message: "Wrong Credentials" });
    }
  } catch (error) {
    console.log("error on login user", error);
    throw error;
  }
};
