const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')

//const cors = require('cors');

const app = express();


//Handle production
if(process.env.NODE_ENV === 'production') {
    //Static folder
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(___dirname + '/public/index.html'));
}

//middle ware

app.use(bodyParser.json()); //return middleware that only parsers JSON.
app.use(cors());

const posts = require('./routes/api/posts')
app.use('/api/posts', posts)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));