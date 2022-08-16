import express from 'express'
import contactsController from '../controllers/contactsController.js'
import auth from "../middleware/authMiddleware.js";

const router = express.Router()

router.get('/', auth, contactsController.getContacts)
router.get('/search', auth, contactsController.getContactsBySearch)
router.get('/:id', auth, contactsController.getContact)
router.post('/', auth, contactsController.createContact)
router.patch('/:id', auth, contactsController.updateContact)
router.delete('/:id', auth, contactsController.deleteContact)

export default router