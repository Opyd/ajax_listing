import path from "path";
import { fileURLToPath } from "url";
import csv from "fast-csv";

export default async function exportCSV(category) {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const queryParameter = () =>
      new Promise((resolve) => {
        let returnLit = [];
        csv
            .parseFile(path.resolve(__dirname,'..' ,"data", "cars_data.csv"), {
              headers: true,
            })
            .on("data", (data) => {
              if (data.kategoria === category) {
                returnLit.push(data);
              }
            })
            .on("end", () => {
              resolve(returnLit);
            });
      });
  let mainList = [];
  await queryParameter().then((res) => (mainList = res));

  mainList = mainList.sort((a, b) => (a.cena < b.cena ? 1 : -1));

  let xmled = '<?xml version="1.0" encoding="UTF-8"?>\n<CATALOG>\n';
  mainList.forEach((val, key) => {
    xmled += "<car>\n";
    Object.keys(val).forEach((key) => {
      xmled += `\t<${key}>${val[key]}</${key}>\n`;
    });
    xmled += "</car>\n";
  });
  xmled += "</CATALOG>";
  return xmled;
}
