/**
 * Created by admin on 10/12/2016.
 */
var express=require('express');
var router=express.Router();
var path=require('path');

router.use(function(req,res,next){

    console.log('default');
    next();
});
router.get('/',function(req,res,next){
    console.log('index');
    res.sendFile(path.resolve('./public/views/index.html'));
});
router.get('/setup',function(req,res,next){
    console.log('setup');
});
module.exports = router;