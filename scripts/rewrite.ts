#!/usr/bin/env NODE_NO_WARNINGS=1 npx ts-node --esm --preferTsExts
import * as fs from "node:fs";

const files = fs.readdirSync("/tmp/posts");
console.log(files);

for (var f in files) {
  const file = `/tmp/posts/${files[f]}`;
  console.log(`reading ${file}`);
  const blob = fs.readFileSync(file).toString();
  const matter: any = {};
  const head = blob.split("---", 3).map((h: any) => h.trim());
  console.log(head[1]);
  blob
    .split("---")[1]
    .trim()
    .split("\n")
    .map((l: any) => {
      const kv = l.split(":", 2);
      matter[kv[0].trim()] = kv[1] ? kv[1].trim() : false;
    });
  const section = matter.categories.split(" ").join("/");
  console.log(`section: ${section}`);
  const aliases = `aliases:\n- /${section}/${files[f]
    .substring(0, 10)
    .replaceAll("-", "/")}/${files[f].substring(11).split(".markdown")[0]}\n`;
  fs.writeFileSync(`posts/${files[f]}`, `---\n${head[1]}\n${ aliases }---\n\n${head[2]}`);
}
