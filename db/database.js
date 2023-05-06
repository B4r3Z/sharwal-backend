import mongoose from "mongoose";
export const connectDB = async () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => console.log(`MongoDB connected to ${data.connection.host}`))
    .catch((err) => console.log(err));
};
