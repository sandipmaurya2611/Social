const Content = require("../models/Content");

const getContent = async (req, res) => {
    try {
        const content = await Content.find();
        res.json(content);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

module.exports = { getContent };
