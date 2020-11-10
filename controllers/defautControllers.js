const sharp = require('sharp');
const express = require("express");
const fs = require('fs')
const path = require('path');


module.exports = {
  allImages: (req, res) => {
    // res.send("Working")
    //get the list of Image files in the image 'public/uploads' dir
    let files = [];
    fs.readdir('public/uploads', function (err, list) {
        list.forEach(list => {
          if(path.extname(list) === '.jpg' || '.png' || '.jpeg') {
            files.push(`public/uploads/${list}`); //store the file name into the array files
            // console.log("Kai:::::::::::::::::", files)
          } 
      })  
        res.send(files)
    });
  },

  fileUplaod: async (req, res) => {
    res.send(req.file);
    // let imagePath = req.file.path.replace(/^upload\//, '');
    // res.send({"Image uploaded to:: ": imagePath});

    try {
      sharp(req.file.path).resize(200, 200).toFile('public/uploads/' + 'thumbnail-' + Date.now() + '-' + req.file.originalname, (err, resizeImage) => {
          if (err) {
            console.log(err);
          }else {
            // console.log("New image Thumbnail", resizeImage);
            return res.status(200).json({
              message: 'File uploded successfully',
              resizeImage
            });
          }
      }) 

    } catch (error) {
        console.error(error);
    }

  }
}