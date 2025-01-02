const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoURI = process.env.mongo_uri;

mongoose.connect(mongoURI);

const messageSchema = new mongoose.Schema({
    message: { type: String },
    created_date: {type: Date} 
});

const Message = mongoose.model('Message', messageSchema);

app.get('/messages', async (req, res) => {
    const messages = await Message.find();
    res.json(messages);
});

app.post('/messages', async (req, res) => {
    const message = new Message(req.body);
    await message.save();
    res.json(message);
});

app.delete('/messages/:id', async (req, res) => {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

app.listen(5000, '0.0.0.0', () => console.log('💻 🌎 Server running on port 5000 🌎 💻'));
