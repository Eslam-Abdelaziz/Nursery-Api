const { body, param, validationResult} = require('express-validator');

exports.createValidChild = [
    body('fullname').optional().isString().withMessage("name should be a string").isAlpha("en-US", { ignore: ' ' }).withMessage("Name Should Be Written In English With No Numbers or Special Characters").isLength({min:3}).withMessage("name should be 3 letter long at least"),
    body("age").isInt().withMessage("Age must be a number"),
    body("level").matches(/^(PreKG)|(KG1)|(KG2)^/).withMessage("Level must be PreKG, KG1 or KG2"),
    body("address.city").isString().withMessage("City must be a string"),
    body("address.street").isString().withMessage("Street must be a string"),
    body("address.building").isString().withMessage("Building must be a string")
]
exports.updateValidChild = [
    body('fullname').optional().isString().withMessage("name should be a string").isAlpha("en-US", { ignore: ' ' }).withMessage("Name Should Be Written In English With No Numbers or Special Characters").isLength({min:3}).withMessage("name should be 3 letter long at least"),
    body("age").isInt().withMessage("Age must be a number"),
    body("level").matches(/^(PreKG)|(KG1)|(KG2)^/).withMessage("Level must be PreKG, KG1 or KG2"),
    body("address.city").isString().withMessage("City must be a string"),
    body("address.street").isString().withMessage("Street must be a string"),
    body("address.building").isString().withMessage("Building must be a string")
]
exports.deleteValidChild = [
    body("id").notEmpty().isNumeric().withMessage("ID must be a number")
]
exports.getValidChildById = [
    param("id").notEmpty().isNumeric().withMessage("ID must be a number")
]

exports.validMSG = (request, response, next) => {
    const errors = validationResult(request);
    if (errors.isEmpty()) return next();
    response.status(400).json(
        { erros: errors.array().reduce((acc, error) => { acc[error.param] = error.msg; return acc }, {}) }
    );
}