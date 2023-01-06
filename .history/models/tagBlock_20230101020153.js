const mongoose = require("mongoose");

const tagBloackSchema = new mongoose.Schema({
    uuid:{type: String,required:true,unique:true},
    tagName:{type:String, requied:true},
    parentId:{type:String},
    html:{type:String},
    defaultPlaceHolder:{type:String},
    placeholder:{type:String}
})