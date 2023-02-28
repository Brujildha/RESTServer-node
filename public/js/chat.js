const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8082/api/auth/'
    : 'https://node-crud-rest.onrender.com/api/auth/'


let user = null;
let socket = null;

//reference html
const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUser = document.querySelector('#ulUser');
const ulMessage = document.querySelector('#ulMessage');
const btnExit = document.querySelector('#btnExit');
const ulMessagePrivate = document.querySelector('#ulMessagePrivate');

const checkJWT = async () => {

    const token = localStorage.getItem('token');

    if (token.length <= 10) {
        window.location = 'index.html';
        throw new Error('Token is missing');
    }

    const result = await fetch(url, {
        headers: { 'x-token': token }
    });

    const { user: userDB, token: tokenDB } = await result.json();

    localStorage.setItem('token', tokenDB);
    user = userDB;
    document.title = user.username;
    await connectSocket();

}

const connectSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Connect');
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
    });

    socket.on('get-messages', messagesList);

    socket.on('get-user-active', usersList);

    socket.on('get-direct-message', ({ username, message }) => {
        messagePrivate(username, message);
    });

}

const usersList = async (users = []) => {
    let list = '';
    users.forEach(({ username, uid }) => {
        list += `
    <li>
    <p>
    <h5 class="text-success">${username}</h5>
    <span class="fs-6 text-muted">${uid}</span>
    </p>
    </li>
    `;
    });

    ulUser.innerHTML = list;
}
const messagesList = async (messages = []) => {
    let list = '';
    messages.forEach(({ username, message }) => {
        list += `
    <li>
    <p>
    <span class="text-primary">${username}</span>
    <span>${message}</span>
    </p>
    </li>
    `;
    });

    ulMessage.innerHTML = list;
}

const messagePrivate = async (username, message) => {
    let msg = '';
    msg += `
    <p>
    <span class="text-primary">From: ${username}</span>
    <span>${message}</span>
    </p>
    `;

    ulMessagePrivate.innerHTML = msg;
}

txtMessage.addEventListener('keyup', ({ keyCode }) => {
    const enterKey = 13;
    const message = txtMessage.value;
    const uid = txtUid.value;

    if (keyCode !== enterKey) { return; }
    if (message.length === 0) { return; }

    socket.emit('send-message', { message, uid });
    txtMessage.value = '';
});

btnExit.onclick = () => {
    localStorage.clear();
    window.location = 'index.html';
}

const main = async () => {

    await checkJWT();
}

main();