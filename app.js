const express = require('express');
const app = express();
const productRoute = require('./api/routes/product');
const userRoute = require('./api/routes/user');
const categorypath = require('./api/routes/category')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { urlencoded, json } = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const Product = require("./api/model/product");


mongoose.connect('mongodb+srv://swagatkumarmishra:d8CtAhCtxfSWSgO1@netflix-gpt-db.p7jqe6z.mongodb.net/ecommerce',{useNewUrlParser:true, useUnifiedTopology: true});


mongoose.connection.on('error',err=>{
  console.log('connection failed');
});

mongoose.connection.on('connected',()=>{
  console.log('connected successfully with database');
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(fileUpload({
  useTempFiles:true
}))

app.use(cors());

app.use('/product',productRoute);
app.use('/user',userRoute);
app.use('/category',categorypath);

app.get('*',(req,res,next)=>{
  res.status(200).json({
    message:'bad request'
  })
})

app.get('/product',(req,res,next)=>{
  Product.find()
      .select('_id title productCode description price ctgry photo')
      .then(result=>{
        res.status(200).json({
          product:result
        })
      })
      .catch(err=>{
        console.log(err);
        res.status(500).json({
          error:err
        })
      })
});

module.exports = app;
