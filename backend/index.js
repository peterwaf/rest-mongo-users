const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middleware

app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api/users',userRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to mongodb");
    app.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)})
}).catch(error => console.log(`mongodb connection error ${error}`));



// app.get('/',(req,res) => { res.send(`Sever is running`)});

