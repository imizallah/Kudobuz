const express = require("express");
const router = express.Router();
const path = require("path")
const multer  = require('multer')
const storage = multer.diskStorage({ 
  destination: 'public/uploads/',
  filename: (req, file, cb) => {
    cb(null, 'original-image-' + Date.now() + '-' + file.originalname);
  },

  limits: {
    fileSize: 1000000
  },
})

const fileFilter = (req, file, cb) => {
  // Validating image type
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
      cb(null, true);
  } else {
    // cb(null, false);
    cb(new Error('We only accept image files!! '));
  }
}

let upload = multer({storage: storage, fileFilter: fileFilter})

const {allImages, fileUplaod} = require("../controllers/defautControllers");

router.get("/images", allImages);

router.post("/upload", upload.single('image'), fileUplaod, (error, req, res, next) => {
  res.status(400).send({error: error.message})
})


module.exports = router;