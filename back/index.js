const express = require('express');
const mongoose = require('mongoose');
const Item = require('./back/Models/Item'); // Adjust path as needed
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Define your routes

// Endpoint to add a new item
app.post('/ajouter', async (req, res) => {
    const newItem = {
        id: req.body.id,
        name: req.body.name,
        src: req.body.src,
        loved: true
    };

    try {
        const existingItem = await Item.findOne({ id: newItem.id });

        if (existingItem) {
            return res.status(400).json({ message: "Item with this ID already exists" });
        }

        const item = new Item(newItem);
        const savedItem = await item.save();
        res.json(savedItem);
        console.log("Document saved successfully");
    } catch (error) {
        console.error('Error saving item:', error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
});

// Endpoint to delete an item by ID
app.get('/supprimer/:id', async (req, res) => {
    const idToRemove = req.params.id;

    try {
        const result = await Item.deleteOne({ id: idToRemove });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Item not found" });
        }

        res.status(200).json({ message: `Item with ID ${idToRemove} deleted` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Endpoint to get status of an item by ID
app.get('/status/:id', async (req, res) => {
    const idToEdit = req.params.id;

    try {
        const item = await Item.findOne({ id: idToEdit });

        if (!item) {
            res.json({ loved: false });
        } else {
            res.json({ loved: item.loved });
        }
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Default endpoint
app.get('/', (req, res) => {
    res.send("Hello");
});

// Endpoint to list all items
app.get('/lister', async (req, res) => {
    try {
        const itemList = await Item.find({});
        if (itemList.length > 0) {
            return res.status(200).json({ itemList });
        } else {
            return res.status(404).json({ message: "No items found" });
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connection successfully established");
}).catch((error) => {
    console.error('Database connection error:', error);
});

// Export the Express app
module.exports = app;
