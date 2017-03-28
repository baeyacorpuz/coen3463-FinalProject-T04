var express = require('express');
var router = express.Router();
var Component = require('../models/components');
var moment = require('moment-timezone');

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Component.find( function(err, data, count) {
    res.render('components', {components: data});
  })
});
router.post('/', function(req, res){
  res.redirect('/components')
});

router.post('/addnew', function(req, res) {
    new Component({
      comp_name: req.body.comp_name,
	    description: req.body.description,
	    value: req.body.value,
	    contact: req.body.contact,
	    createdate: moment().tz("Asia/Manila").format('LLL'),
	    picture:req.body.picture,
    }).save(function(err, data, count) {
      if(err) {
        console.log(err)
        // res.status(400).send('Error saving new data: ' + err);
        // console.log(err)
        // var eArr = [];
        // for(var e of Object.keys(err.errors)){ 
        //     eArr.push(e);
        // }
        // res.render('addnew', {error:err.errors[eArr[0]]});
        // var e = err;
        // var a = e.splice(1,10);
        res.render('addnew', {error:err})
      } else {
        // res.send("New Data created");
        res.redirect('/components')
      }
    })
});

router.get('/addnew', function(req, res) {
  res.render('addnew', {data: {}});
});
	
router.route('/:componentId')
  .all(function(req, res, next) {
    componenentId = req.params.componentId;
    component = {};
    Component.findById(componentId, function(err, data) {
      component = data;
      next();
    });
  })

  .get(function(req, res) {
    res.render('componentdata', {componentdata: component, moment:moment});
  })


router.route('/:componentId/update')
  .all(function(req, res, next) {
    componentId = req.params.componentId;
    component = {};
    Component.findById(componentId, function(err, data) {
      component = data;
      next();
    });
  })
  .get(function(req, res) {
    res.render('update', {update: component});
  })
  .post(function(req, res) {
    component.comp_name = req.body.comp_name,
    component.description = req.body.description,
    component.value = req.body.value,
    component.contact = req.body.contact,
    component.updatedate = moment().tz("Asia/Manila").format('LLL'),	
    component.picture=req.body.picture,
    component.save(function(err, data, count) {
      if(err) {
        // res.status(400).send('Error saving data: ' + err);
        console.log(err)
        res.render('update', {update: component, error:err})
      } else {
        res.redirect('/components/'+componentId);
      }
    });
  })

router.route('/:componentId/delete')
  .all(function(req, res, next) {
    componentId = req.params.componentId;
    component = {};
    Component.findById(componentId, function(err, c) {
      component = c;
      next();
    });
  })
  .get(function(req, res) {
    component.remove(function(err, data) {
      if(err) {
        res.status(400).send("Error removing data: " + err);
      } else {
        // res.send('Data removed');
        res.redirect('/components');
      }
    });
  });

module.exports = router;
