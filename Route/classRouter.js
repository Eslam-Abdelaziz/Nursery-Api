const express = require("express");
const router = express.Router();
const controller = require("./../Controller/classController");
const valid = require("./../Validation/classValidation");
const isAuthorized = require("./../authorization");

router.route("/classes")
    .get(isAuthorized, controller.getAllClasses)
    .post(isAuthorized, valid.insertValidClass, controller.insertClass)
    .put(isAuthorized, valid.updateValidClass, controller.updateClass)
    .delete(isAuthorized, valid.deleteValidClass, controller.deleteClass);
    
router.get("/classes/id",isAuthorized, valid.getClassByIdValid, controller.getClassById);
router.get("/classes/children/id",isAuthorized, valid.getClassByIdValid, controller.getChildrenByClassId);
router.get("/classes/teacher/id",isAuthorized, valid.getClassByIdValid, controller.getTeacherByClassId);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Class:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: The auto-generated ID of the class.
 *         name:
 *           type: string
 *           description: The name of the class.
 *         supervisor:
 *           type: number
 *           description: The ID of the supervisor (teacher) for the class.
 *         children:
 *           type: array
 *           items:
 *             type: number
 *           description: An array of child IDs belonging to the class.
 */

/**
 * @swagger
 * tags:
 *   name: Classes
 *   description: API endpoints for managing classes.
 */

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Retrieve all classes.
 *     tags: [Classes]
 *     responses:
 *       200:
 *         description: A list of classes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Class'
 */

/**
 * @swagger
 * /classes:
 *   post:
 *     summary: Add a new class.
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       201:
 *         description: The newly created class.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */

/**
 * @swagger
 * /classes:
 *   put:
 *     summary: Update a class.
 *     tags: [Classes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: The updated class.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */

/**
 * @swagger
 * /classes:
 *   delete:
 *     summary: Delete a class.
 *     tags: [Classes]
 *     responses:
 *       204:
 *         description: Class deleted successfully.
 */

/**
 * @swagger
 * /classes/id:
 *   get:
 *     summary: Get a class by ID.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to retrieve.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The class with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Class'
 */

/**
 * @swagger
 * /classes/children/id:
 *   get:
 *     summary: Get children by class ID.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to retrieve children from.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Children belonging to the specified class.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: number
 */

/**
 * @swagger
 * /classes/teacher/id:
 *   get:
 *     summary: Get teacher by class ID.
 *     tags: [Classes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the class to retrieve teacher from.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Teacher supervising the specified class.
 *         content:
 *           application/json:
 *             schema:
 *               type: number
 */

