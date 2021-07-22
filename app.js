const express = require("express")
const http = require("http")
const app = express();
const path = require("path")
//express가 http를 통해서 실행될 수 있도록 하는 역할
const server = http.createServer(app);
const socketIO = require("socket.io");
const moment = require("moment")


//socketIO에서 서버를 담아간 변수
const io = socketIO(server);

//서버가 보여줄 파일들을 지정할 수 있음
app.use(express.static(path.join(__dirname, "src")))

//port설정 : 지정된 포트가 있으면 그것을 사용, 아니면 5000번 포트를 사용
const PORT = process.env.PORT || 5000;

//connection이 이루어졌을 때, 연결에 대한 정보를 socket에 담을 것!
// socket.on("채팅아이디",()=>{}:실행할 함수)
io.on("connection",(socket)=>{
   socket.on("chatting",(data)=>{
       const { name, msg } = data
       io.emit("chatting", {
           name,
           msg,
           time: moment(new Date()).format("h:ss A")
       })
   })
})

//app.listen(포트, 명령)
server.listen(PORT, ()=>console.log(`server is running ${PORT}`))
