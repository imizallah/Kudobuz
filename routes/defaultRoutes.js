const express = require("express");
const router = express.Router();
const path = require("path")
var multer  = require('multer')
var storage = multer.diskStorage({ 
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },

  limits: {
    fileSize: 1000000
  },

  fileFilter(req, file, cb) {
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      cb(new Error('Please upload an image!! '))
    }

    cb(undefined, true)
  }
})

let upload = multer({storage: storage})

const {allImages, fileUplaod} = require("../controllers/defautControllers");

router.get("/", allImages)
router.post("/upload", upload.single('image'), fileUplaod, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})


module.exports = router;