const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

//midlewars
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nbna82s.mongodb.net/?retryWrites=true&w=majority`;
  // console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
  try{
    const productCollection = client.db('emaJohn').collection('products');
    //find multiple doc
    app.get('/products', async(req, res)=> {
      const query = {};
      const cursor = productCollection.find(query);
      const products = await cursor.toArray();
      res.send(products);
    });
  }
  finally{

  }
}
run().catch(err=> console.log(err))



app.get('/', (req, res)=>{
    res.send('Ema John Shopping Server is running');
});
app.listen(port, ()=>{
    console.log(`Ema John server running on port ${port}`);
})