import "dotenv/config";
import "express-async-errors";
import connectDB from "./db/connect.js";
import express from "express";
import notFound from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// middleware
app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use("/api/v1/products", productRoutes);

// products route
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
