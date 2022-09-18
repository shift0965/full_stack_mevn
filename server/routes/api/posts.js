const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();


require('dotenv').config();
const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD



let uri = `mongodb+srv://${username}:${password}@cluster0.sip9xj4.mongodb.net/?retryWrites=true&w=majority`
const client = new mongodb.MongoClient(uri);

async function loadPostsCollection() {
    try{
        await client.connect();
        const database = client.db('Cluster0');
        return database.collection('posts');
    }catch(err){
        console.log(err);
    }
}


//get post
router.get('/', async (req,res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find().toArray());
})

//Add post
router.post('/', async (req,res) => {
    const posts = await loadPostsCollection();

    //when using req.body, the content type (app/json) must be given in header in postman
    await posts.insertOne({
        text: req.body.text,
        createAt: new Date()
    });
    res.status(201).send();
})

//Delete post
//:id path variable
router.delete('/:id', async (req,res) => {
    const posts = await loadPostsCollection();
    //_id is a specail type of field, a object id, so it has to be specailly wrapped.
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send(); 
})



module.exports = router;