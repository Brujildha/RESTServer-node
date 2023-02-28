const myForm = document.querySelector('form');


const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8082/api/auth/'
    : 'https://node-crud-rest.onrender.com/api/auth/'

myForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = {};
    for (let element of myForm.elements) {
        if (element.name.length > 0) {
            formData[element.name] = element.value;
        }
    }
    fetch(url + 'login', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(({ message, token }) => {
            if (message) {
                return console.error(message);
            }
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch(err => {
            console.log(err);
        });

});

function handleCredentialResponse(response) {
    const body = { id_token: response.credential }
    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(resp => resp.json())
        .then(({ token, ...resp }) => {
            console.log(token);
            localStorage.setItem('email', resp.user.email);
            localStorage.setItem('token', token);
            window.location = 'chat.html';
        })
        .catch(console.warn);
}
const button = document.getElementById('google_singout');

button.onclick = () => {
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}