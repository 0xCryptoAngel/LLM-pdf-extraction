import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import extractRouter from "./routes/extract";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", extractRouter);

app.listen(port, () => {
  console.log(`🧠 PDF Extractor running on port ${port}`);
});
