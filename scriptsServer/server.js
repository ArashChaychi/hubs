const express = require("express");
const cors = require("cors");

//load the config files which contains our hub_ids and their urls
const config = require("./config");

const app = express();
app.use(cors());
app.get(
    "/injectScripts",
    async (req, res) => {
        const id = req.query.hubid;
        const urls = config.hubsarray.find(x => x.hub_id === id)?.urls || [];
        res.json(urls);
    });


app.use('/scripts', express.static('scripts'));
app.use('/audio', express.static('audio'));


app.listen(3000, () =>
    console.log("HTTP Server running on port 3000")
);