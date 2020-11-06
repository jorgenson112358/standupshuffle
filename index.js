const express = require('express');
const app = express();
const path = require('path');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
app.use(jsonParser);
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use(express.static(path.join(__dirname, "client/dist")));

const port = process.env.PORT || 5080;
app.listen(port, function() {
    console.log('server ready and listening on port ' + port);
});
