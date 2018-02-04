const express = require('express')
const app = express()

// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('Code'))

app.listen(3000, () => console.log('Listening on port 3000')) 