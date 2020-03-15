require('dotenv').config()
const app = require('express')()
const bot = require('./bot')
const {
    PORT
} = require('./config/base')

app.listen(PORT, () => {
    bot.launch()
    console.clear()
    console.log(`Server start on port ${PORT}\nBot started!`)
})
