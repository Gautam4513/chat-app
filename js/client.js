const socket = io('https://chat-app-node-1ae6.onrender.com');


const form = document.getElementById('send-container');
const msginp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
const audio = new Audio('recmsg.mp3');
const joined = new Audio('arraived.mp3');
const pressed = new Audio('button.mp3');
const left = new Audio('left.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit' ,(e)=> {
    e.preventDefault();
    const message = msginp.value;
    append(`You\n${message}`,'right');
    socket.emit('send',message);
    pressed.play();
    msginp.value = '';
})


const uname = prompt("Enter name to join");
socket.emit('new-user-joined',uname)


socket.on('user-joined', uname => {
    append(`${uname} joined the chat`,'right');
    joined.play();
})

socket.on('receive', data => {
    append(`${data.name}\n${data.message}`,'left');
})

socket.on('leave', name => {
    append(`${name} left the chat`,'left');
    left.play();
})