const express = require('express');
const TaskQueue = require('./taskQueue');

const app = express();
const PORT = process.env.PORT || 4000; // change to 4000 or any other available port
app.use(express.json());

app.post('/api/v1/task', (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).send('User ID is required');
    }

    TaskQueue.enqueue(user_id);
    res.status(200).send('Task is being processed');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/api/v1/task', (req, res) => {
    console.log('Received a request:', req.body);
    // Your existing code...
});
