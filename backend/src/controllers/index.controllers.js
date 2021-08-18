const controller = {};
const path = require("path");

controller.index =  (req, res) => {
    return res.sendFile(path.join(__dirname, "../build", "index.html"));
}

module.exports = controller;
