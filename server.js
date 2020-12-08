const { json } = require('express');
const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

//1.MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json());

//READ FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
//console.log(tours)

//2. ROUTE HANDLERS
const getAlltours = (req, res) => {
    res.status(200).json({
        message : 'success',
        result : tours.length,
        data : {
            tours
        }
    }) 
};

const getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    //console.log(tour)
    if(!tour){
        return res.status(404).json({
            status : 'fail',
            data : 'INVALID ID'
        })
    }
    res.status(200).json({
        status : 'success',
        data : {
            tour
        }
    }) 
};

const createTour = (req,res) => {
    //console.log(req.body);
    newId = tours[tours.length - 1].id + 1;
    //console.log(newId);
    newTour = Object.assign({id : newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), (err) => {
        res.status(200).json({
            message : 'success',
            data : {
                tours : newTour
            }
        })
    })
    //res.send("Done");
};

const updateTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if(!tour) {
        return res.status(404).json({
            status : 'fail',
            data : 'INVALID ID'
        })
    }
    
    res.status(200).json({
        status : 'success',
        data : {
            tours : '<updated here>'
        }
    })
};

const deleteTour = (req, res) => {
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);

    if(!tours) {
        return res.status(404).json({
            status : 'fail',
            data : 'INVALID ID'
        })
    }

    res.status(204).json({
        status : 'succes',
        data : null
    })
};
// //GET ALL DATA
// app.get('/api/v1/tours', getAlltours);
// //GET SINGLE ONE
// app.get('/api/v1/tours/:id', getTour)
// //CREATE NEW ONE
// app.post('/api/v1/tours', createTour)
// //UPDATE
// app.patch('/api/v1/tours/:id', updateTour)
// //DELETE
// app.delete('/api/v1/tours/:id', deleteTour)

//3.ROUTES
app
    .route('/api/v1/tours')
    .get(getAlltours)
    .post(createTour);
app
    .route('/api/v1/tours/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);
   
//4. SERVER
const PORT = 3000
app.listen(3000, ()=>{
    console.log(`App running on port : ${PORT}`)
})