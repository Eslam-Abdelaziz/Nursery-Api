const express = require("express");
const {body,query,param} = require("express-validator");
const router = express.Router();
const controller = require("./../Controller/teacherController");
const valid = require("./../Validation/teacherValidation");
const isAuthorized = require("./../authorization");

router.route("/teachers")
    .get(isAuthorized, controller.getAllTeachers)
    .post(isAuthorized, valid.createTeacherValid,controller.insertTeacher)
    .put(isAuthorized, valid.updateTeacherValid,controller.updateTeacher)
    .delete(isAuthorized, valid.deleteTeacherValid,controller.deleteTeacher);
    
router.get('/teachers/id',isAuthorized, valid.getTeacherByIdValid,controller.getTeacherById)
router.get('/teachers/supervisors',isAuthorized, controller.getAllSupervisors);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Teacher:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the teacher.
 *         fullName:
 *           type: string
 *           description: The full name of the teacher.
 *         email:
 *           type: string
 *           description: The email address of the teacher.
 *         image:
 *           type: string
 *           description: The image URL of the teacher.
 *         class:
 *           type: string
 *           description: The ID of the class the teacher belongs to.
 */

/**
 * @swagger
 * tags:
 *   name: Teachers
 *   description: API endpoints for managing teachers.
 */

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Retrieve all teachers.
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: A list of teachers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Add a new teacher.
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       201:
 *         description: The newly created teacher.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */

/**
 * @swagger
 * /teachers:
 *   put:
 *     summary: Update a teacher.
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Teacher'
 *     responses:
 *       200:
 *         description: The updated teacher.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */

/**
 * @swagger
 * /teachers:
 *   delete:
 *     summary: Delete a teacher.
 *     tags: [Teachers]
 *     responses:
 *       204:
 *         description: Teacher deleted successfully.
 */

/**
 * @swagger
 * /teachers/id:
 *   get:
 *     summary: Get a teacher by ID.
 *     tags: [Teachers]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         description: ID of the teacher to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The teacher with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Teacher'
 */

/**
 * @swagger
 * /teachers/supervisors:
 *   get:
 *     summary: Get all supervisors.
 *     tags: [Teachers]
 *     responses:
 *       200:
 *         description: A list of supervisors.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Teacher'
 */
