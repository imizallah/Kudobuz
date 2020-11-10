

module.exports = {

  allImages: (req, res) => {
    res.send("Working")
  },

  fileUplaod: async (req, res) => {
    res.send(req.file);

  }
}