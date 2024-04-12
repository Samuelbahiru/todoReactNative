import { Request, Response } from "express";
import Category from "../models/category-model";
import { ICategory } from "../../types";
import { AuthRequest } from "../middleware";

export const getAllCategories = async (req: AuthRequest, res: Response) => {
  try {
    const { user } = req;
    const categories = await Category.find({ user: user });
    res.status(200).send(categories);
  } catch (error) {
    console.log("Error on fetching all categories", error);
    throw error;
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, color, isEditable, icon }: ICategory = req.body;
    const { user } = req;
    const category = await Category.create({
      name,
      color,
      isEditable,
      icon,
      user,
    });
    return res.send(category);
  } catch (error) {
    console.log("Error on fetching all categories", error);
    res.send("something went wrong!");
    throw error;
  }
};
