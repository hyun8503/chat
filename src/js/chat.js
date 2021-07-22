//오류를 최대한 줄이기 위함
"use strict"

const socket = io(); 

//document.querySelector()는 css선택자를 그대로 사용할 수 있음
//id가 nickname  class가 chatting-list
const nickname = document.querySelector("#nickname")
const chatList = document.querySelector(".chatting-list")
const chatInput = document.querySelector(".chatting-input")
const sendButton = document.querySelector(".send-button")
const displayContainer = document.querySelector(".display-container")

chatInput.addEventListener("keypress", (event)=>{
   if(event.keyCode === 13){
    send()
   }
})

function send(){
    const param = {
        name : nickname.value, 
        msg : chatInput.value
    }
    socket.emit("chatting", param);
}

sendButton.addEventListener("click", () => {
    send()
})

//"채팅아이디" 보내기 --> app.js에서 받아줘야해!
//socket.emit("chatting", "from front");
socket.on("chatting",(data)=>{
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time);
    // 만든 메소드를 호출 
    item.makeLi()
    displayContainer.scrollTo(0,displayContainer.scrollHeight)
})

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = () => {
        const li = document.createElement("li");
        li.classList.add(nickname.value === this.name ? "sent" : "received")
        const dom = `<span class="profile">
        <span class="user">${this.name}</span>
        <img class="image" src="http://placeimg.com/50/50/any" alt="any"></span>
        <span class="message">${this.msg}</span>
        <span class="time">${this.time}</span>`;

        li.innerHTML= dom;
        chatList.appendChild(li);
    }

}

console.log(socket)