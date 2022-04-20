import express from "express";
import morgan from "morgan";
import pkg from "body-parser";
const { json, urlencoded } = pkg;
import loadCSVXML from "./loadCSVXML.js";
import path from "path";
import { fileURLToPath } from "url";
const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "views")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/loadAll", async (req, res) => {
  res.set("content-type", "text/xml");
  res.send(await loadCSVXML());
});

app.listen(8080, () => {
  console.log("serwer działa");
});
