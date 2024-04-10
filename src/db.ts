import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://samuelbahiru:ppamdd93@todoreactn.eb0rdhq.mongodb.net/?retryWrites=true&w=majority&appName=todoReactN"
    );
    if (connection) {
      console.log("connection stablished");
    }
  } catch (error) {
    console.log("connection error to db", error);
  }
};

export default connectToDB;
