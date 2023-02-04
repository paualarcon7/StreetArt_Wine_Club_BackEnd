const { Router } = require('express');
const { newProduct } = require('../controllers/newProduct')
const { productById } = require('../controllers/getProductById')
const { getProducts } = require('../controllers/getProducts')
const { deleteProduct } = require('../controllers/deleteProduct')
const { updateProduct } = require('../controllers/upDateProduct')
const { getProductsByValue } = require('../controllers/getProductsByValue')
const { getOrderProducts } = require('../controllers/getOrderProducts')


const router= Router();

router.post('/', async (req, res)=>{
    const { name, price, image, volume, quantity, stock, details, winery, grapesName, stateName, regionName, typeName} = req.body;
    try {
    let result = await newProduct( name, price, image, volume, quantity, stock, details, winery, grapesName, stateName, regionName, typeName )
    res.status(200).send({result})
} catch (error) {
    res.status(400).send(error.message)
}
})

router.get('/', async (req, res) => {
    try {
        let { name } = req.query;
        const result = await getProducts(name);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.get('/filters', async (req, res) => {
    try {
        let { filter, value } = req.body;
        // Table debe estar correctamente escrita y value siempre es la columna name
        const result = await getProductsByValue(filter, value);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.get('/orders', async (req, res) => {
    try {
        let { order, value } = req.body;
   
        const result = await getOrderProducts(order, value);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.get('/:idWine', async (req, res) => {
    const productId = req.params.idWine
    try {
        let result = await productById(productId);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put('/:id', async (req, res)=>{
    try {
        const id = req.params.id
        const { name, price, image, volume, quantity, stock, details, winery, grapes, state, regions, types} = req.body;
    let result = await updateProduct(id, name, price, image, volume, quantity, stock, details, winery, grapes, state, regions, types)
    res.status(200).send(result)
} catch (error) {
    res.status(400).send(error.message)
}
})

router.delete('/:id', async (req, res)=>{
    try {
        const id = req.params.id
    let result = await deleteProduct(id)
    res.status(200).send(result)
} catch (error) {
    res.status(400).send(error.message)
}
})  

module.exports = router;