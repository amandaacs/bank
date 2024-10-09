const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Adjust the path as necessary

// POST route to update user balance
router.post('/update-balance', async (req, res) => {
    const { userId, balance } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send('User not found');

        user.balance = balance;
        await user.save();

        res.status(200).send('Balance updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});


router.get('/users/aluno', async (req, res) => {
    const { role } = req.params;
    try {
        const users = await User.find({ role: 'aluno' }); 
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find(); 
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

router.get('/users/:id/balance', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ balance: user.balance });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch balance' });
    }
});

router.post('/users/:id/transaction', async (req, res) => {
    const { amount, type } = req.body;

    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Ensure amount is a valid number
        if (typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Update balance based on transaction type
        if (type === 'add') {
            user.balance += amount;
        } else if (type === 'remove') {
            if (user.balance < amount) {
                return res.status(400).json({ error: 'Insufficient balance' });
            }
            user.balance -= amount;
        } else {
            return res.status(400).json({ error: 'Invalid transaction type' });
        }

        await user.save(); // Save updated user data
        res.json({ balance: user.balance }); // Return updated balance
    } catch (error) {
        res.status(500).json({ error: 'Transaction failed' });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(204).send(); 
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});

module.exports = router;