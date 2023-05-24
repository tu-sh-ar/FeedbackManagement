import { Server as SocketIOServer, Socket } from 'socket.io';
import io from './socketIOInstance';

const pushNotificationMiddleware = (io: SocketIOServer) => {
  const users: { [key: string]: Socket } = {};

  io.on('connection', (socket: Socket) => {
    console.log('A client connected.');

    // set user_id event 
    socket.on('setUserId', (userId: string) => {
      users[userId] = socket;
      console.log(`User socket stored for user ID: ${userId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A client disconnected.');

      // Find the user ID associated with the socket and remove it from the users object
      const userId = Object.keys(users).find((key) => users[key] === socket);
      if (userId) {
        delete users[userId];
      }
    });
  });

  // Send notification to a specific user
  const sendNotificationToUser = (userId: string, message: string) => {

    let userSocket = users[userId];
    if (!userSocket) {
      // User socket doesn't exist, create a new one
      const connectedSockets = io.sockets.sockets;
      userSocket = connectedSockets.get(userId)!;

      if (userSocket) {
        users[userId] = userSocket;
      } else {
        console.log(`User socket not found for user ID: ${userId}`);
        return; // Exit if user socket not found
      }
    }
    userSocket.emit('notification', { message });
  };
  return {
    sendNotificationToUser,
  };
};

export default pushNotificationMiddleware;
