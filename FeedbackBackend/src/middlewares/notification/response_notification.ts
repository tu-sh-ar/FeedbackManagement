import { Server as SocketIOServer, Socket } from 'socket.io';

const pushNotificationMiddleware = (io: SocketIOServer) => {
    return (socket: Socket, next: (err?: Error) => void) => {
      socket.on('response-generated', (data: { userId: string, message: string }) => {
        const { userId, message } = data;
        
        // Emit the notification message to the specific user identified by userId
        io.to(userId).emit('notification', { message });
      });
  
      next();
    };
  };
  