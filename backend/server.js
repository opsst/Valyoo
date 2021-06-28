const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const postRouter = require('./routes/post');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart')
const addressRouter = require('./routes/address')
const transactionRouter = require('./routes/transaction')


app.use('/users', usersRouter);
app.use('/post', postRouter);
app.use('/product', productRouter);
app.use('/cart',cartRouter);
app.use('/address',addressRouter);
app.use('/transaction',transactionRouter);



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});