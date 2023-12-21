import fs from "fs";

export default function writeToFile(data) {
  return fs.writeFileSync("./lib/database/todos.json", JSON.stringify(data));
}
