const express = require("express");
const path = require("path");
const app = express();
const multer = require("multer");
const { mergeMethod } = require("./merger");
const upload = multer({ dest: "uploads/" });
//all the neccessary imports done.
const port = 5400; //changing port to 5400
app.use("/static", express.static("public")); //static is being used to access public folder

//sending index.html as respsonse on app start or / route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
});

//form submit will send data to this post method 
//post method can accepts multiple callbacks 
app.post("/merge", upload.array("pdfs", 2), async (req, res) => {

if(req.files.length!=2){
  res.redirect('/')
  return ;
}
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
