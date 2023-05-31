"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pushNotificationMiddleware = (io) => {
    const users = {};
    io.on('connection', (socket) => {
        console.log('A client connected.');
        // Handle 'setUserId' event
        socket.on('setUserId', (userId) => {
            setUserId(socket, userId);
        });
        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('A client disconnected.');
            // Find and remove the user ID associated with the socket from the users object
            const userId = Object.keys(users).find((key) => users[key] === socket);
            if (userId) {
                delete users[userId];
            }
        });
    });
    // Store the socket instance with the user ID
    const setUserId = (socket, userId) => {
        users[userId] = socket;
        console.log(`User socket stored for user ID: ${userId}`);
    };
    // Send notification to a specific user
    const sendNotificationToUser = (userId, message) => {
        const userSocket = users[userId];
        if (!userSocket) {
            console.log(`User socket not found for user ID: ${userId}`);
            return; // Exit if user socket not found
        }
        userSocket.emit('notification', { message });
    };
    return {
        setUserId,
        sendNotificationToUser,
    };
};
exports.default = pushNotificationMiddleware;
