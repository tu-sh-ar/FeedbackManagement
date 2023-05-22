import { Server as SocketIOServer, Socket } from 'socket.io';

const pushNotificationMiddleware = (io: SocketIOServer) => {
  const users: { [key: string]: Socket } = {};

  io.on('connection', (socket: Socket) => {
    console.log('A client connected.');

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
    const userSocket = users[userId];
    if (userSocket) {
      userSocket.emit('notification', { message });
    }
  };

  return {
    sendNotificationToUser,
  };
};

export default pushNotificationMiddleware;
