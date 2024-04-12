import express, { Request, Response } from "express";
import connectToDB from "./db";
import userRoutes from "./routes/user.routes";
import categoryRoutes from "./routes/category.routes";
const app = express();
app.use(express.json());

const PORT = 1337;
connectToDB();

app.get("/ping", (req: Request, res: Response) => {
  res.send("Ping");
});

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);

app.listen(PORT, () => {
  console.log("Server app and running ");
});
