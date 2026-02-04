import Task from "../../models/Task";
import { connectDB } from "../../utils/db";
import auth from "../middleware/auth";

export default async function handler(req, res) {
  await connectDB();
  await new Promise((resolve) => auth(req, res, resolve));

  if (req.method === "GET") {
    const tasks = await Task.find({ user: req.user.id });
    return res.json(tasks);
  }

  if (req.method === "POST") {
    const task = await Task.create({
      ...req.body,
      user: req.user.id
    });
    return res.json(task);
  }

  res.status(405).end();
}
