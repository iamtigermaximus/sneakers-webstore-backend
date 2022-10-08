const router = require('express').Router()
const cloudinary = require('../utils/cloudinary')
const upload = require('../utils/multer')
const Product = require('../models/productModel')

router.get('/', (req, res) => {
  Product.find({}, (err, items) => {
    if (err) {
      console.log(err)
    } else {
      res.json({ items: items })
    }
  })
})

//Post Method
// localhost:8000/api/post
router.post('/post', upload.single('shoeImage'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    const product = new Product({
      name: req.body.name,
      category: req.body.category,
      model: req.body.model,
      description: req.body.description,
      price: req.body.price,
      shoeImage: result.secure_url,
    })

    await product.save()
    res.json(product)
  } catch (error) {}
})

//Get all Method
// localhost:8000/api/getAll

router.get('/getAll', async (req, res) => {
  try {
    const product = await Product.find()
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Get by ID Method
// localhost:8000/api/getOne/:id

router.get('/getOne/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Update by ID Method
// localhost:8000/api/update/:id

router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id
    const updatedProduct = req.body
    const options = { new: true }

    const result = await Product.findByIdAndUpdate(id, updatedProduct, options)

    res.send(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

//Delete by ID Method
// localhost:8000/api/delete/:id

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id
    const product = await Product.findByIdAndDelete(id)
    res.send(`Document with ${product.name} has been deleted..`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
