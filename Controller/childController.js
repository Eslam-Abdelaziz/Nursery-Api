const Child = require('../Model/childSchema');
const Class = require('../Model/classSchema');


exports.getAllChildren = (req, res, next) => {
    if(req.role == "admin") 
    {
        Child.find()
        .populate('class')
        .then(children => {
            res.status(200).json(children);
        })
        .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
    
};

exports.insertChild = (req, res, next) => {
    if(req.role == "admin") 
    {
        const { fullName, age, level, address, class: classId } = req.body;
        const newChild = new Child({ fullName, age, level, address, class: classId });
        newChild.save()
            .then(savedChild => {
                Class.findByIdAndUpdate(classId, { $push: { children: savedChild._id } }, { new: true })
                    .then(() => {
                        res.status(201).json(savedChild);
                    })
                    .catch(error => next(error));
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};

exports.updateChild = (req, res, next) => {
    if(req.role == "admin") 
    {
        const { fullName, age, level, address, class: classId } = req.body;
        Child.findByIdAndUpdate(req.params.id, { fullName, age, level, address, class: classId }, { new: true })
            .then(updatedChild => {
                res.status(200).json(updatedChild);
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};

exports.deleteChild = (req, res, next) => {
    if(req.role == "admin") 
    {
        Child.findByIdAndDelete(req.params.id)
        .then(deletedChild => {
            Class.findByIdAndUpdate(deletedChild.class, { $pull: { children: deletedChild._id } })
                .then(() => {
                    res.status(200).json({ message: 'Child deleted successfully' });
                })
                .catch(error => next(error));
        })
        .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};

exports.getChildById = (req, res, next) => {
    if(req.role == "admin") 
    {
        const childId = req.params.id;
        Child.findById(childId)
            .populate('class')
            .then(child => {
                if (!child) 
                    throw new Error('Child not found');

                res.status(200).json(child);
            })
            .catch(error => next(error));
    }else{
        throw new Error("Not Authorized.");
    }
};

