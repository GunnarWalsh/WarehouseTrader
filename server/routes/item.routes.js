const itemController = require('../controllers/item.controller');
const {authenticate} =require('../config/jwt.config')

module.exports = app => {
    //Create
    app.post('/api/item/new', authenticate, itemController.createItem)
    //Read
    app.get('/api/items', itemController.allItems)
    app.get('/api/item/:id', itemController.oneItem)
    //Update
    app.put('/api/item/:id/edit', authenticate, itemController.updateItem)
    //Delete
    app.delete('/api/item/:id', authenticate, itemController.deleteItem)

}