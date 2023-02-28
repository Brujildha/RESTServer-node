const { verifyJWT } = require('../helpers');
const { ChatInfo } = require('../models');

const chatInfo = new ChatInfo();

const socketController = async (socket, io) => {
    const user = await verifyJWT(socket.handshake.headers['x-token']);

    if (!user) {
        return socket.disconnect();
    }

    //show when user is authenticated or connected
    chatInfo.connectUser(user);
    io.emit('get-user-active', chatInfo.usersArr);
    io.emit('get-messages', chatInfo.lastTen);

    // Join in a private chat
    socket.join(user.id);

    //show messages
    socket.on('send-message', ({ message, uid }) => {
        if (uid) {
            username = user.username;
            socket.to(uid).emit('get-direct-message', { username, message });
        } else {
            chatInfo.sendMessage(user.id, user.username, message);
            io.emit('get-messages', chatInfo.lastTen);
        }
    });

    // clear when user is disconnected
    socket.on('disconnect', () => {
        chatInfo.disconnectUser(user.id);
        io.emit('get-user-active', chatInfo.usersArr);
    });

}

module.exports = {
    socketController
}