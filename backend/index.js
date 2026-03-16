import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

const DATA_FILE = process.env.DATA_FILE_PATH
  ? path.resolve(process.env.DATA_FILE_PATH)
  : path.join(__dirname, "content.json");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN?.split(",") || "*"
  })
);

app.use(express.json({ limit: "10mb" }));

async function readData() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return { projects: [], blogs: [] };
  }
}

async function writeData(data) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/projects", async (req, res) => {
  const data = await readData();
  res.json(data.projects || []);
});

app.post("/api/projects", async (req, res) => {
  const incoming = req.body || {};
  const id = incoming.id || `work-${Date.now()}`;
  const project = { ...incoming, id };

  const data = await readData();
  const without = (data.projects || []).filter((p) => p.id !== id);
  const projects = [project, ...without];

  await writeData({ ...data, projects });
  res.json(project);
});

app.get("/api/blogs", async (req, res) => {
  const data = await readData();
  res.json(data.blogs || []);
});

app.post("/api/blogs", async (req, res) => {
  const incoming = req.body || {};
  const id = incoming.id || `blog-${Date.now()}`;
  const blog = { ...incoming, id };

  const data = await readData();
  const without = (data.blogs || []).filter((b) => b.id !== id);
  const blogs = [blog, ...without];

  await writeData({ ...data, blogs });
  res.json(blog);
});

app.get("/api/blogs/:id", async (req, res) => {
  const data = await readData();
  const blog = (data.blogs || []).find((b) => b.id === req.params.id);
  if (!blog) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(blog);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${port}`);
});

