import { app } from "./app.js";
import { connectDB } from "./db/database.js";

const port = process.env.PORT || 5000;
console.log(port);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.name} ${err.message}`);
  process.exit(`Shutting down the server due to uncaught exception`);
});

connectDB();

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.name} ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
