import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGOURI);
    console.log("DB Connected successfully");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
