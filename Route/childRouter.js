const express = require("express");
const router = express.Router();
const controller = require("./../Controller/childController");
const valid = require("./../Validation/childValidation");
const isAuthorized = require("./../authorization");
router.route("/children")
    .get(isAuthorized, controller.getAllChildren)
    .post(isAuthorized, valid.createValidChild ,controller.insertChild)
    .put(isAuthorized, valid.updateValidChild,controller.updateChild)
    .delete(isAuthorized, valid.deleteValidChild,controller.deleteChild);
    
router.get('/children/:id',isAuthorized, valid.getValidChildById,controller.getChildById);

module.exports = router;
/**
 * @swagger
 * components:
 *   schemas:
 *     Child:
 *       type: object
 *       properties:
 *         _id:
 *           type: number
 *           description: The auto-generated ID of the child.
 *         fullName:
 *           type: string
 *           description: The full name of the child.
 *         age:
 *           type: number
 *           description: The age of the child.
 *         level:
 *           type: string
 *           description: The level of the child (PreKG, KG1, KG2).
 *         address:
 *           type: object
 *           properties:
 *             city:
 *               type: string
 *               description: The city of the child's address.
 *             street:
 *               type: string
 *               description: The street of the child's address.
 *             building:
 *               type: string
 *               description: The building of the child's address.
 */

/**
 * @swagger
 * tags:
 *   name: Children
 *   description: API endpoints for managing children.
 */

/**
 * @swagger
 * /children:
 *   get:
 *     summary: Retrieve all children.
 *     tags: [Children]
 *     responses:
 *       200:
 *         description: A list of children.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Child'
 */

/**
 * @swagger
 * /children:
 *   post:
 *     summary: Add a new child.
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       201:
 *         description: The newly created child.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 */

/**
 * @swagger
 * /children/{id}:
 *   get:
 *     summary: Get a child by ID.
 *     tags: [Children]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the child to retrieve.
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: The child with the specified ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 */

/**
 * @swagger
 * /children:
 *   put:
 *     summary: Update a child.
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Child'
 *     responses:
 *       200:
 *         description: The updated child.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Child'
 */

/**
 * @swagger
 * /children:
 *   delete:
 *     summary: Delete a child.
 *     tags: [Children]
 *     responses:
 *       204:
 *         description: Child deleted successfully.
 */

