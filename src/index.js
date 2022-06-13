import express from "express";
import morgan from "morgan";
import pkg from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
const { json, urlencoded } = pkg;
import loadCSVXML from "./xml/loadCSVXML.js";
import loadCSVJSON from "./json/loadCSVJSON.js";
import loadProducerXML from "./xml/XMLProducer.js";
import loadCategoryXML from "./xml/XMLCategory.js";
import loadProducerJSON from "./json/JSONProducer.js";
import loadCategoryJSON from "./json/JSONCategory.js";
import cors from "cors";

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "..", "views")));
app.set("view engine", "ejs");
app.use(cors());

app.get("/xml", (req, res) => {
  res.render("xml");
});

app.get("/", (req, res) => {
  res.redirect("/xml");
});

app.get("/json", (req, res) => {
  res.render("json");
});

app.get("/loadAll", async (req, res) => {
  res.set("content-type", "text/xml");
  res.send(await loadCSVXML());
});

app.get("/loadProducer/:producer", async (req, res) => {
  res.set("content-type", "text/xml");
  res.send(await loadProducerXML(req.params.producer));
});

app.get("/loadCategory/:category", async (req, res) => {
  res.set("content-type", "text/xml");
  res.send(await loadCategoryXML(req.params.category));
});

app.get("/loadProducerJSON/:producer", async (req, res) => {
  res.set("content-type", "text/json");
  res.send(await loadProducerJSON(req.params.producer));
});

app.get("/loadCategoryJSON/:category", async (req, res) => {
  res.set("content-type", "text/json");
  res.send(await loadCategoryJSON(req.params.category));
});

app.get("/loadAllJson", async (req, res) => {
  res.set("content-type", "text/json");
  res.send(await loadCSVJSON());
});

app.listen(8080, () => {
  console.log("serwer działa");
});
