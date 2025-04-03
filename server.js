const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const MenuItem = require("./models/MenuItem");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Successfully connected"))
.catch((err)=>console.error("Connecton failed", err));

app.listen(PORT, () =>{
    console.log(`Servevr is running successfully at http://localhost:${PORT}`);
});

app.get("/menu", async(req,res) => {
    try{
        const menuItems = await MenuItem.find();
        res.json(menuItems);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

app.post("/menu", async(req,res)=>{
    const {name, description, price} = req.body;

        if(!name || !price){
            return res.status(400).json({message: "Name and price are required"});
        };

    try{
        const newItem = new MenuItem({name, description, price});
        await newItem.save();
        res.status(201).json({message: "New item added", item: newItem}); 
    }

    catch(error){
        res.status(500).json({message: error.message});
    }
});

