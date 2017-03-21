var express = require('express');
var router = express.Router();
var Department = require('../models/departments');
var moment = require('moment-timezone');

router.use(function(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login')
  }
  next();
});

router.get('/', function(req, res) {
  Department.find( function(err, data, count) {
    res.render('departments', {departments: data});
  })
});
router.post('/', function(req, res){
  res.redirect('/departments')
});

router.post('/addnew', function(req, res) {
    new Department({
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
        res.redirect('/departments')
      }
    })
});

router.get('/addnew', function(req, res) {
  res.render('addnew', {data: {}});
});
	
router.route('/:departmentId')
  .all(function(req, res, next) {
    departmentId = req.params.departmentId;
    department = {};
    Department.findById(departmentId, function(err, data) {
      department = data;
      next();
    });
  })

  .get(function(req, res) {
    res.render('departmentdata', {departmentdata: department, moment:moment});
  })


router.route('/:departmentId/update')
  .all(function(req, res, next) {
    departmentId = req.params.departmentId;
    department = {};
    Department.findById(departmentId, function(err, data) {
      department = data;
      next();
    });
  })
  .get(function(req, res) {
    res.render('update', {update: department});
  })
  .post(function(req, res) {
    department.comp_name = req.body.comp_name,
    department.description = req.body.description,
    department.value = req.body.value,
    department.contact = req.body.contact,
    department.updatedate = moment().tz("Asia/Manila").format('LLL'),	
    department.picture=req.body.picture,
    department.save(function(err, data, count) {
      if(err) {
        // res.status(400).send('Error saving data: ' + err);
        console.log(err)
        res.render('update', {update: department, error:err})
      } else {
        res.redirect('/departments/'+departmentId);
      }
    });
  })

router.route('/:departmentId/delete')
  .all(function(req, res, next) {
    departmentId = req.params.departmentId;
    department = {};
    Department.findById(departmentId, function(err, c) {
      department = c;
      next();
    });
  })
  .get(function(req, res) {
    department.remove(function(err, data) {
      if(err) {
        res.status(400).send("Error removing data: " + err);
      } else {
        // res.send('Data removed');
        res.redirect('/departments');
      }
    });
  });

module.exports = router;
