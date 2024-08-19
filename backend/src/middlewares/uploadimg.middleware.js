// const multer = require("multer")
import multer from "multer";
// const path = require("path");
import path from "path"

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        cb(null,'../public'); // Ensure this path is correct yeh tu root mai bana raha hai
        console.log("upload")
    },
    filename: function (req, file, cb) {
    
      console.log("upload")
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
  


  });

  const upload = multer({ storage: storage })

  // module.exports = upload;
  export default upload