const express = require('express')


const app = express();

app.use('/api/parse', require('./routes/parse.routes'))

const PORT = 4000;


app.listen(PORT, ()=>console.log(`Сервер запущен. Ипользуется порт: ${PORT}`))
