
# Node.js Task Queue with Rate Limiting


This project is a Node.js API that processes tasks with rate limiting and queuing for each user ID. The API handles a POST request where users can submit tasks, and ensures that tasks are processed at a rate of 1 task per second and a maximum of 20 tasks per minute per user. If the rate limit is exceeded, the tasks are queued and processed accordingly.




## Features



Rate Limiting: 1 task per second and 20 tasks per minute per user.

Task Queueing: Exceeding tasks are queued for later processing based on user ID.

Task Logging: Logs each task completion with a timestamp in a file.

Resilient API: Handles multiple requests without dropping any tasks.
## Requirements

Before running this project, ensure you have the following installed:

- Node.js (>=14.x)

- Redis (optional, for future use)

## Technologies Used

- Node.js

- Express.js for API routing

- fs (File System) for logging task completion

- Redis  for queuing between clusters 

- PM2 for clustering the application

## Installation

1. Clone this repository:


```bash
git clone https://github.com/your-username/node-task-queue.git
```
2. Navigate to the project directory:
```bash
cd node-task-queue
```
3. Install the necessary dependencies:

```bash
npm install
```
## Running the API

To run the API, follow these steps:

1. Start the Node.js server:

```bash
node index.js
```

2. The API will be running on http://localhost:3000.


## API Endpoints
1.Create a Task

- Endpoint: /api/v1/task

- Method: POST

- Body: JSON

```bash
{
  "user_id": "123"
}
```

Example:

Request:

```bash
POST /api/v1/task
{
  "user_id": "123"
}
```

Response:
```bash
Task queued for user: 123
```

2. Task Logging

After processing a task, the system logs the completion to a file named task_logs.txt in the root of the project. Example log entry:

```bash
123 - task completed at - 1645436768450
```

Testing the API

You can test the API using tools like Postman or curl. Here's an example using curl:

```bash
curl -X POST http://localhost:3000/api/v1/task -H "Content-Type: application/json" -d '{"user_id":"123"}'
```
## Rate Limiting Examples

- If the user submits more than 1 task per second, the tasks will be queued and processed at a maximum rate of 1 task per second.

- If more than 20 tasks are submitted per minute for a user, the tasks will be queued beyond the limit.

This README.md file provides all necessary details about the Node.js project, how to set it up, and how to use the API.






