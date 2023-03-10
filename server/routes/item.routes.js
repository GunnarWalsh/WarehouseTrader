const itemController = require('../controllers/item.controller');
const {authenticate} =require('../config/jwt.config')

module.exports = app => {
    //Create
    app.post('/api/item/new', itemController.createItem)
    //Read
    app.get('/api/items', itemController.allItems)
    app.get('/api/item/:id', itemController.oneItem)
    //Update
    app.put('/api/item/:id/edit', itemController.updateItem)
    //Delete
    app.delete('/api/item/:id', itemController.deleteItem)

}