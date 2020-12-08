const express = require('express');
const router = express.Router()
const fs = require('fs');
//READ FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));
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
router
    .route('/')
    .get(getAlltours)
    .post(createTour);
router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

module.exports = router;