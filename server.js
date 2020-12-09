const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path:'./config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("DB connection successful!"));

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'A tour must have a name'],
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        require: [true, 'A tour must have a price']
    }
});

const Tour = mongoose.model('Tour',tourSchema);

const Testtour = new Tour({
    name: "The Forest Hiker",
    rating: 4.7,
    price: 497
});

Testtour
    .save()
    .then(doc => console.log(doc))
    .catch(err => console.log("ERROR : ", err))

const PORT = process.env.PORT||3000;
app.listen(3000, ()=>{
    console.log(`App running on port : ${PORT}`)
})
