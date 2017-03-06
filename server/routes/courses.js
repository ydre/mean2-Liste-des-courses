const express = require('express'),
	  router = express.Router(),
	  mongojs = require('mongojs'),
	  db = mongojs('mongodb://ydre:admin@ds119210.mlab.com:19210/courses-db', ['courses']);


// READ toutes les courses
router.get('/courses', function(req, res, next){
	db.courses.find(function(err, courses){
		if(err){
			res.send(err);
		}else{
			res.json(courses);
		}
	});
});

// READ une seule course
router.get('/course/:id', function(req, res, next){
	db.courses.findOne({
		_id: mongojs.ObjectId(req.params.id)
	},function(err, course){
		if(err){
			res.send(err);
		}else{
			res.json(course);
		}
	});
});

// CREATE

router.post('/course', function(req, res , next){
	var course = req.body;
	if(!course.contenu || !(course.finito + '')){
		res.status(400);
		res.json({
			'error':'Invalid Data'
		});
	}else{
		db.courses.save(course, function(err, result){
			if(err){
				res.send(err);
			}else{
				res.json(result);
			}
		});
	}
});

// UPDATE 
router.put('/course/:id', function(req, res , next){
	var course = req.body;
	var updObj = {};

	if(course.finito){
		updObj.finito = course.finito;
	}

	if(course.contenu){
		updObj.contenu = course.contenu;
	}

	if(!updObj){
		res.status(400);
		res.json({
			'error':'Invalid Data'
		});
	}

	else{
		db.courses.update({
			_id: mongojs.ObjectId(req.params.id)
		}, updObj, {}, function(err, result){
			if(err){
				res.send(err);
			}else{
				res.json(result);
			}
		});
	}
});

// DELETE
router.delete('/course/:id', function(req, res , next){
		db.courses.remove({
			_id: mongojs.ObjectId(req.params.id)
		},'', function(err, result){
			if(err){
				res.send(err);
			}else{
				res.json(result);
			}
		});
});

module.exports = router;