const express = require('express')
const router = express.Router()
const { getProductos, setProductos, updateProductos, deleteProductos } = require('../controllers/productosController')
const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getProductos)

router.post('/', protect, setProductos)

router.put('/:id', protect, updateProductos)

router.delete('/:id', protect, deleteProductos)

module.exports = router