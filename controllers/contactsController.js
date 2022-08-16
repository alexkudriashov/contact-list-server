import Contact from '../models/Contact.js'
import mongoose from "mongoose";

class ContactsController {
    async getContacts(req, res) {
        const {page} = req.query
        try {
            const limit = 8
            const startIndex = (Number(page) - 1) * limit
            const total = await Contact.countDocuments({})
            const contacts = await Contact.find().sort({_id: -1}).limit(limit).skip(startIndex)
            res.status(200).json({data: contacts, currentPage: Number(page), totalPagesCount: Math.ceil(total / limit)})
        } catch (e) {
            res.status(404).json({message: e.message})
        }
    }

    async getContact(req, res) {
        const {id} = req.params
        try {
            const contact = await Contact.findById({_id: id})
            res.status(200).json(contact)
        } catch (e) {
            res.status(404).json({message: e.message})
        }
    }

    async getContactsBySearch(req, res) {
        const {searchQuery} = req.query
        try {
            const search = new RegExp(searchQuery, 'i')
            const contacts = await Contact.find({$or: [{firstName: search},{lastName: search},{email: search},{phone: search},{adress: search}]})
            res.status(200).json(contacts)
        } catch (e) {
            res.status(404).json({message: e.message})
        }
    }

    async createContact(req, res) {
        const contact = req.body
        const newContact = new Contact({...contact, createdAt: new Date().toISOString()})
        try {
            await newContact.save()
            res.status(201).json(newContact)
        } catch (e) {
            res.status(409).json({message: e.message})
        }
    }

    async updateContact(req, res) {
        const contact = req.body
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No contact with that id')
        try {
            const updatedContact = await Contact.findByIdAndUpdate(id, contact, {new: true})
            res.status(200).json(updatedContact)
        } catch (e) {
            res.status(409).json({message: e.message})
        }
    }

    async deleteContact(req, res) {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No contact with that id')
        try {
            await Contact.findByIdAndDelete(id)
            res.status(200).json('Contact deleted')
        } catch (e) {
            res.status(409).json({message: e.message})
        }
    }
}

export default new ContactsController()