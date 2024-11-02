import mongoose from "mongoose";
import env from "../configs";

const connectToDatabase = async (callback: () => void) => {
  try {
    console.log("Connecting to MongoDB");
    await mongoose.connect(env.DATABASE_URI, {
      // useUnifiedTopology: true,
      // useNewUrlParser: true,
    });
    console.log("Connected to MongoDB");
    callback();
  } catch (err) {
    console.error(err);
  }
};

export default connectToDatabase;