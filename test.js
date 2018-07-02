//Step#1 - Install and Resolve
var express = require('express');
const { from } = require('rxjs');
const { pipe, filter } = require('rxjs/operators');
var morgan = require('morgan');
const { check, validationResult } = require('express-validator/check');
var cors = require('cors');

var router = express.Router();


//Using Middleware - For logging requests to console
router.use(morgan('dev'));

//Tested this functionality with a Client (Ajax request from another domain!)
router.use(cors());

var gradesArr = [];

//Actual Routes!
router.get('/', (req, res, next) => {
    res.json({
        'status': "OK",
        'statusCode': 200,
        'grades': gradesArr
    });
});

router.post('/', [
    check('course').exists().withMessage("Must provide course name"),
    check('id').exists().withMessage("Must provide id"),
    check('name').exists().withMessage("Must provide student name"),
    check('grade').exists().withMessage("Must provide student grade"), 
], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    gradesArr.push(req.body);
    //Post - Redirect Pattern
    res.redirect(303, '/api/grades')
});

router.put("/", [
    check('course').exists().withMessage("Must provide course name"),
    check('id').exists().withMessage("Must provide id"),
    check('name').exists().withMessage("Must provide student name"),
    check('grade').exists().withMessage("Must provide student grade")
], (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() });
    }

    var isUpdated = false;
    from(gradesArr)
        .pipe(
            filter(gradeObj => gradeObj.id == req.body.id)
        )
        .subscribe(
            gradeObj => {
                var index = gradesArr.indexOf(gradeObj);
                if (index !== -1) {
                    gradesArr[index] = req.body
                    isUpdated = true;
                    res.json({
                        'status': "Updated",
                        'statusCode': 200
                    });
                }
            }
        );
    if (!isUpdated) {
        res.json({
            'status': "Nothing to Update",
            'statusCode': 204
        });
    }
});

router.delete('/:id', (req, res, next) => {
    var isDeleted = false;
    from(gradesArr)
        .pipe(
            filter(gradeObj => gradeObj.id == req.params.id)
        )
        .subscribe(
            gradeObj => {
                var index = gradesArr.indexOf(gradeObj);
                if (index !== -1) {
                    gradesArr.splice(index, 1);
                    isDeleted = true;
                    res.json({
                        'status': "Deleted",
                        'statusCode': 200
                    });
                }
            }
        );
    if (!isDeleted) {
        res.json({
            'status': "Nothing to Delete",
            'statusCode': 204
        });
    }
});


module.exports = router;