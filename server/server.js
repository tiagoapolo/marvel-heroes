const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();

console.log(__dirname)
app.use(express.static(__dirname));
app.use(express.static(__dirname.replace('server','build')));


app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname.replace('server','build'), 'index.html'));
});

app.listen(port, () => console.log('server running on port: '+port));