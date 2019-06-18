import * as SocketIO from 'socket.io';
import { Logger } from './logger';

export class IO {
    private readonly socketIO: SocketIO.Server;

    constructor() {
        this.socketIO = SocketIO();
    }

    get server() {
        return this.socketIO;
    }

    async init() {
        this.server.use((socket, next) => {
            Logger.log('id', socket.id);
            next();
        });

        this.server.on('connect', (socket) => {
            Logger.log('connect');
            Logger.log('clients', this.server.clients);
            Logger.log('headers', socket.request.headers);

            socket.on('disconnectcting', (reason) => {
                Logger.warn('disconnectcting', socket.id, reason);
            });
            socket.on('disconnect', (reason) => {
                Logger.warn('disconnect', socket.id, reason);
            });
            socket.on('error', (error) => {
                Logger.error('error', socket.id, error);
            });
        });
    }
}

const io = new IO();

export { io };
export default io;
