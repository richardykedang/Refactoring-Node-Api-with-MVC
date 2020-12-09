const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path:'./config.env'});

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT||3000;
app.listen(3000, ()=>{
    console.log(`App running on port : ${PORT}`)
})
