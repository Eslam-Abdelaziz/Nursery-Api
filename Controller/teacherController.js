const Teacher = require('../Model/teacherSchema');

exports.getAllTeachers = (req, res, next) => {
    if(req.role == "admin") 
    {
        Teacher.find()
            .populate('class')
            .then(teachers => {
                res.status(200).json(teachers);
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};

exports.insertTeacher = (req, res, next) => {
    if(req.role == "admin") 
    {
        const { fullName, password, email, class: classId } = req.body;
        const {image} = req.file.path;
        const newTeacher = new Teacher({ fullName, password, email, image, class: classId });
        newTeacher.save()
        .then(savedTeacher => {
            res.status(201).json(savedTeacher);
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};
    
exports.updateTeacher = (req, res, next) => {
    const { id, fullName, password, email, class: classId } = req.body;
    const {image} = req.file.path;
    Teacher.findByIdAndUpdate(id, { fullName, password, email, image, class: classId })
        .then(updatedTeacher => {
            if (!updatedTeacher) {
                throw new Error('Teacher not found');
            }
            res.status(200).json(updatedTeacher);
        })
        .catch(error => next(error));
};

exports.deleteTeacher = (req, res, next) => {
    if(req.role == "admin") 
    {
        const { id } = req.body;
        Teacher.findByIdAndDelete(id)
            .then(deletedTeacher => {
                if (!deletedTeacher) {
                    throw new Error('Teacher not found');
                }
                res.status(204).json({ message: 'Teacher deleted successfully' });
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};

exports.getTeacherById = (req, res, next) => {
    const teacherId = req.params.id;
    Teacher.findById(teacherId)
        .populate('class')
        .then(teacher => {
            if (!teacher) {
                throw new Error('Teacher not found');
            }
            res.status(200).json(teacher);
        })
        .catch(error => next(error));
};

exports.getAllSupervisors = (req, res, next) => {
    Teacher.find({ class: { $exists: true } })
        .populate('class')
        .then(supervisors => {
            if (!supervisors) {
                throw new Error('No supervisors found');
            }
            res.status(200).json(supervisors);
        })
        .catch(error => next(error));
};
