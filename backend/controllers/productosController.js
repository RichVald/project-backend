const asyncHandler = require('express-async-handler')
const Producto = require('../model/tareasModel')

const getProductos = asyncHandler(async (req, res) => {
    const productos = await Producto.find({user: req.user.id})
    res.status(200).json({ productos })
})

const setProductos = asyncHandler(async (req, res) => {
    if(!req.body.texto) {
        res.status(400)
        throw new Error("Por favor teclea una descripción")
    }

    const producto = await Producto.create({
        texto: req.body.texto,
        user: req.user.id
    })

    res.status(201).json({ producto })
})

const updateProductos = asyncHandler(async (req, res) => {
    //Verificar que la producto exista
    const producto = await Producto.findById(req.params.id)
    if(!producto) {
        res.status(400)
        throw new Error('El producto  no fué encontrada')
    }

    //Verificar que la producto perteneza al usurio
    if(producto.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Accesso no autorizado')
    } else {
        const productoUpdated = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json(productoUpdated)
    }

    
})

const deleteProductos =asyncHandler(async (req, res) => {
    //Verificar que el producto exista
    const producto = await Producto.findById(req.params.id)
    if(!producto) {
        res.status(400)
        throw new Error('El producto no fué encontrada')
    }

    //Verificar que el producto perteneza al usurio
    if(producto.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('Accesso no autorizado')
    } else {
        await Producto.deleteOne(producto)
        res.status(200).json({ id: req.params.id })
    }

    
})

module.exports = {
    getProductos,
    setProductos,
    updateProductos,
    deleteProductos
}