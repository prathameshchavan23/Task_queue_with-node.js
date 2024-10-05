const fs = require('fs');
const path = require('path');

class TaskQueue {
    constructor() {
        this.queue = {};
    }

    async task(user_id) {
        const logMessage = `${user_id}-task completed at-${Date.now()}\n`;
        fs.appendFileSync(path.join(__dirname, 'logs.txt'), logMessage);
        console.log(logMessage);
    }

    enqueue(user_id) {
        const now = Date.now();
        const userQueue = this.queue[user_id] || {
            lastTaskTime: 0,
            tasks: []
        };

        userQueue.tasks.push(now);
        this.queue[user_id] = userQueue;

        this.processQueue(user_id);
    }

    async processQueue(user_id) {
        const userQueue = this.queue[user_id];
        const currentTime = Date.now();
        
        if (userQueue.tasks.length === 0) return;

        const tasksToProcess = userQueue.tasks.filter(taskTime => currentTime - taskTime < 60000);

        if (tasksToProcess.length > 20) {
            userQueue.tasks = tasksToProcess.slice(-20); // Keep the last 20 tasks
        } else {
            userQueue.tasks = [];

            // Rate limiting logic
            if (currentTime - userQueue.lastTaskTime < 1000) {
                const delay = 1000 - (currentTime - userQueue.lastTaskTime);
                setTimeout(() => this.executeTask(user_id), delay);
            } else {
                this.executeTask(user_id);
            }
        }
    }

    async executeTask(user_id) {
        const userQueue = this.queue[user_id];
        userQueue.lastTaskTime = Date.now();
        await this.task(user_id);
    }
}

module.exports = new TaskQueue();
