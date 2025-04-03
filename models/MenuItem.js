const mongoose = require("mongoose");

const menuitemSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    description:{
        type:String,
    },

    price:{
        type:Number,
        required:true,
    },
});

module.exports = mongoose.model("menuItems", menuitemSchema);