const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 3000

const route = require('./routes');
const database = require('./config/database')  // Connect to database
database.connect()

const app = express();

// Public images from sever
app.use(express.static('public'))
app.use('/images', express.static('images'))

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

// Route init
route(app);

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});