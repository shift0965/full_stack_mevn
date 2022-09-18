const express = require('express');
const bodyParser = require('body-parser')

//const cors = require('cors');

const app = express();


//middle ware
app.use(bodyParser.json()); //return middleware that only parsers JSON.

const posts = require('./routes/api/posts')
app.use('/api/posts', posts)

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));