// to use express router..
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');


// Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public 
// to get directed to this file, client must use 'api/items/'
router.get('/', (req,res) => {
    Item.find()
        .sort({date: -1}) // -1 refers to descending order
        .then(items => res.json(items))
}); // fetch all of the items frm the database

// @route   POST api/items
// @desc    Create A item
// @access  Private 

router.post('/', auth, (req,res) => {
    const newItem = new Item({
        name:req.body.name
    });

    newItem.save().then(item => res.json(item));

});


// @route   DELETE api/items/:id
// @desc    Delete A Item
// @access  Private 

router.delete('/:id',auth,(req,res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success:false}));

    })


module.exports = router;

// to test APIs , we need to use a HTTP client for eg Postman

