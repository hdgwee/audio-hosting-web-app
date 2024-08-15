const express = require('express')
const { Sequelize, Model, DataTypes } = require('sequelize')
const router = express.Router()

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

class File extends Model { }
File.init({
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    owner: DataTypes.STRING,
    fileName: DataTypes.STRING,
    data: DataTypes.STRING
}, { sequelize, modelName: 'file' })

sequelize.sync()

router.post('/', async (req, res) => {
    console.log(req.body)
    await File.create({
        description: req.body.description,
        category: req.body.category,
        owner: req.body.owner,
        fileName: req.body.fileName,
        data: req.body.data,
    })

    res.sendStatus(200)
})

router.post('/listing', async (req, res) => {
    const user = await File.findAll({
        attributes: ['id', 'fileName', 'description', 'category'],
        where: { owner: req.body.owner }
    })
    res.json(user)
})

router.get('/:id', async (req, res) => {
    const existingFile = await File.findOne({
        where: { id: req.params.id }
    })
    if (existingFile) {
        res.send(existingFile)
    } else {
        res.sendStatus(400)
    }
})

module.exports = router
