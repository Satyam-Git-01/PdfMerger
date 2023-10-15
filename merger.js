const PDFMerger = require("pdf-merger-js");
//imports done

let merger = new PDFMerger(); //crearted object of PDFMerger class

const mergeMethod = async (p1, p2) => {
  await merger.add(p1);
  await merger.add(p2);
  await merger.save("public/merged.pdf");
};

//exporting mergeMethoda as a module to use in server.js
module.exports = { mergeMethod };
