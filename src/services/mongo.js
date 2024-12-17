import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.on("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

export default async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to the database successfully");
}

export async function mongoDisconnect() {
  await mongoose.disconnect();
  console.log("Disconnected from the database successfully");
}
