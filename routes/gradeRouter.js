let express = require('express');
let router = express.Router();
const gradeObj = require('../model/gradeDB');

const gradeArr=new gradeObj();
router.get('/', function(req, res, next) {
    res.send(gradeArr.findAllGrades());
  });
  
 
  router.get('/:id', function(req, res, next) {
    res.send(gradeArr.findGradeById(req.params.id));
  });
  
  

  router.post('/', function(req, res, next) {
    res.send(gradeArr.insertNewGrade(req.body));
  });
  

  router.delete('/:id', function(req, res, next) {
    res.send(gradeArr.deleteGrade(req.params.id));
  });
  
  

  router.put('/', function(req, res, next) {
    res.send(gradeArr.updateGrade(req.body));
  });
  
  module.exports = router;