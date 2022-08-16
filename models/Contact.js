import mongoose from 'mongoose'

const Contact = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    adress: String,
    photo: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
})

export default mongoose.model('Contact', Contact)