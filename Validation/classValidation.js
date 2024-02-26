const { body, param, validationResult } = require('express-validator');

exports.insertValidClass = [
    body("name").isAlpha().withMessage("Class Name Should be String").isLength({min: 3}).withMessage("Class Name Length shoulb be more than two characters."),
    body("supervisor").isNumeric().withMessage("Supervisor must be a number"),
    body("children").optional().isArray().withMessage("Children must contains all ids of children as array")
]

exports.updateValidClass = [
    body("name").isAlpha().withMessage("Class Name Should be String").isLength({min: 3}).withMessage("Class Name Length shoulb be more than two characters."),
    body("supervisor").isNumeric().withMessage("Supervisor must be a number"),
    body("children").optional().isArray().withMessage("Children must contains all ids of children as array")
]

exports.deleteValidClass = [
    body("id").notEmpty().isNumeric().withMessage("ID must be a number")
]

exports.getClassByIdValid = [
    param("id").notEmpty().isNumeric().withMessage("ID must be a number")
]

exports.validMSG = (request, response, next) => {
    const errors = validationResult(request);
    if (errors.isEmpty()) return next();
    response.status(400).json(
        { erros: errors.array().reduce((acc, error) => { acc[error.param] = error.msg; return acc }, {}) }
    );
}

        