import { Request, Response } from "express";
import User from "../models/user-model";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const exstingUser = await User.find({ email });
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
