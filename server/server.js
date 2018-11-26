require('dotenv').config()
const express = require ('express')
const cloudinary = require ('cloudinary')
const formData = require ('express-form-data')
const cors = require ('cors')
const { CLIENT_ORIGIN } = require('./config')


const app = express();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET       
})

app.use(cors({
    origin: CLIENT_ORIGIN
}))

app.use(formData.parse())

app.get('/', (req, res) => res.send('Welcome'))

app.post('/image-upload', (req, res) => {

    console.log('Called')
    const values = Object.values(req.files)
    const promises = values.map(image => cloudinary.uploader.upload(image.path));

    Promise.all(promises)
    .then(results => res.json(results))
    .catch(err => console.log('Error: ', err));
})

app.listen(process.env.PORT, () => console.log('Running'));
