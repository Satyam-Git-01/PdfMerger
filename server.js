const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const { mergeMethod } = require("./merger");
const upload = multer({ dest: "uploads/" });
const port = 5400;
app.use("/static", express.static("public"));
app.get("/", (req, res) => {
  //res.sendFile(path.join(__dirname, "index.html"))
  res.send({
    value: [
      {
        name: "Satyam",
        rank: 100,
      },
      {
        name: "Shiv",
        rank: 200,
      },
    ],
  });
  console.log("Hello");
});

app.post("/merge", upload.array("pdfs", 2), async (req, res) => {
  await mergeMethod(
    path.join(__dirname, req.files[0].path),
    path.join(__dirname, req.files[1].path)
  );
  console.log("PDF Generated");
  res.redirect("http://localhost:5400/static/merged.pdf");
  console.log({ data: req.files });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
