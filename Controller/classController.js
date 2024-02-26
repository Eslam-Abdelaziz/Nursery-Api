const Class = require('../Model/classSchema');
const {validationResult} = require("express-validator");

exports.getAllClasses = (req, res, next) => {
    if(req.role == "admin") 
    {
        Class.find()
            .then(classes => {
                res.status(200).json(classes);
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};

exports.insertClass = (req, res, next) => {
    if(req.role == "admin") 
    {
        let errors = validationResult(req)
        if (!errors.isEmpty()) {
            let error = new Error();
            error.status = 422;
            error.message = errors.array().reduce((current, object) => current + object.msg + ", ", "");
            throw error;
        }
        
        const { name, teacherId, childIds } = req.body;
        Class.findOne({ name: name })
            .then(existingClass => {
                if (existingClass) {
                    const error = new Error('Class already exists');
                    error.status = 409;
                    throw error;
                } else {
                    const newClass = new Class({
                        name: name,
                        supervisor: teacherId,
                        children: childIds 
                    });
                    return newClass.save();
                }
            })
            .then(savedClass => {
                res.status(201).json(savedClass);
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};



exports.updateClass = (req, res, next) => {
    if(req.role == "admin") 
    {
        Class.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(updatedClass => {
                if (!updatedClass) {
                    throw new Error('Class not found');
                }
                res.status(200).json(updatedClass);
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};

exports.deleteClass = (req, res, next) => {
    if(req.role == "admin") 
    {
        Class.findByIdAndDelete(req.params.id)
            .then(deletedClass => {
                if (!deletedClass) {
                    throw new Error('Class not found');
                }
                res.status(204).end();
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};

exports.getClassById = (req, res, next) => {
    const classId = req.params.id;
    Class.findById(classId)
        .then(classData => {
            if (!classData) {
                throw new Error('Class not found');
            }
            res.status(200).json(classData);
        })
        .catch(error => next(error));
};

exports.getChildrenByClassId = (req, res, next) => {
    const classId = req.params.id;
    Class.findById(classId).populate('children')
        .then(classData => {
            if (!classData) {
                throw new Error('Class not found');
            }
            res.status(200).json(classData);
        })
        .catch(error => next(error));
};

exports.getTeacherByClassId = (req, res, next) => {
    const classId = req.params.id;
    Class.findById(classId).populate('supervisor')
        .then(classData => {
            if (!classData) {
                throw new Error('Class not found');
            }
            res.status(200).json(classData);
        })
        .catch(error => next(error));
};
