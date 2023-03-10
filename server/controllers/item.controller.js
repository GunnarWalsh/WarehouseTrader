const { response } = require('express')
const Item = require('../models/item')

module.exports = {
//Create
    createItem: (req,res) => {
        Item.create(req.body)
            .then((newItem) => {
                res.json(newItem)
            })
            .catch((err) => {
                res.status(500).json({message: 'Something went wrong', error: err})
            })
    },
    
//Read
    allItems: (req,res) => {
        Item.find()
            .then((allItems) => {
                res.json(allItems)
                
            })
            .catch((err) => {
                res.status(500).json({message: 'Something went wrong', error: err})
            })
    },
    oneItem: (req,res) => {
        Item.findOne({_id: req.params.id})
            .then((oneItem) => {
                res.json(oneItem)
            })
            .catch((err) => {
                res.status(500).json({message: 'Something went wrong', error: err})
            })
    },
//Update
    updateItem:(req,res) => {
        Item.findOneAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators: true})
        .then(updatedItem => {
            res.json(updatedItem)
        })
        .catch((err) => {
            res.status(500).json({message: 'Something went wrong', error: err})
        })
    },
//Delete
    deleteItem:(req,res) => {
        Item.deleteOne({_id: req.params.id})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => {
                res.status(500).json({message: 'Something went wrong', error: err})
            })
    }
}