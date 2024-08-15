const express = require('express')
const { Sequelize, Model, DataTypes } = require('sequelize')
const router = express.Router()

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

class User extends Model { }
User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
}, { sequelize, modelName: 'user' })

sequelize.sync().then(() => {
    User.findOne({
        where: { username: "username" }
    }).then((defaultUser) => {
        if (!defaultUser) {
            User.create({
                username: "username",
                password: "password"
            })
        }
    })
})

router.post('/login', async (req, res) => {
    const username = req.body.username.toLowerCase()
    const password = req.body.password

    const existingUser = await User.findOne({
        where: { username: username, password: password }
    })
    if (existingUser) {
        res.json({
            username: username,
            jwt: "TODO"
        })
    } else {
        res.sendStatus(400)
    }
})

router.get('/', async (_, res) => {
    const user = await User.findAll({
        attributes: ['id', 'username']
    })
    res.json(user)
})

router.post('/', async (req, res) => {
    const username = req.body.username.toLowerCase()
    const password = req.body.password

    const existingUser = await User.findOne({
        where: { username: username }
    })
    if (!existingUser) {
        await User.create({
            username: username,
            password: password
        })
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
})

router.put('/', async (req, res) => {
    const username = req.body.username.toLowerCase()
    const password = req.body.password

    const existingUser = await User.findOne({
        where: { username: username }
    })
    if (existingUser) {
        existingUser.password = password
        await User.update({ password: password }, {
            where: { username: username }
        })
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
})

router.delete('/', async (req, res) => {
    const username = req.body.username.toLowerCase()

    const existingUser = await User.findOne({
        where: { username: username }
    })
    if (existingUser) {
        await existingUser.destroy()
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
})

module.exports = router
