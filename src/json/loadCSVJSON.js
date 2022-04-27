import path from "path";
import { fileURLToPath } from "url";
import csv from "fast-csv";

export default async function exportCSV() {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  var queryParameter = () =>
    new Promise((resolve) => {
      let returnLit = [];
      csv
        .parseFile(path.resolve(__dirname, '..',"data", "cars_data.csv"), {
          headers: true,
        })
        .on("data", (data) => {
          returnLit.push(data);
        })
        .on("end", () => {
          resolve(returnLit);
        });
    });
  let mainList = [];
  await queryParameter().then((res) => (mainList = res));
  mainList = mainList.sort((a, b) => (a.cena < b.cena ? 1 : -1));
  return mainList;
}
