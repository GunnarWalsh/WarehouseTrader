const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, 'Must complete field'],
        minLength:[2, 'Item name must be at least 2 characters'],
        maxLength:[45, 'Item name cannot exceed 45 characters '],
    },
    price:{
        type: Number,
        required:[true, 'Must complete field'],
        min:[0, 'Item cannot be nagative!']
        
    },
    description:{
        type: String,
        required:[true, 'Must complete field'],
        minLength:[3, 'Description must be at least 3 characters']
        
    }
},  {timestamps: true})

const Item = mongoose.model('Item' , ItemSchema);

module.exports = Item;