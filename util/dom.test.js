import fs from "fs"; //the file system module from nodejs
import path from "path"; // to open the path's content

import { it, vi } from "vitest";
import { Window } from "happy-dom";
import { showError } from "./dom";

const htmlDocPath = path.join(process.cwd(), "index.html");
const htmlDocContent = fs.readFileSync(htmlDocPath).toString();

const window = new Window(); //creates an emulated browser
const document = window.document;
document.write(htmlDocContent);
vi.stubGlobal("document", document);

it("first test", () => {
  showError("test");
});
