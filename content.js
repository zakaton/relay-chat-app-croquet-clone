const html = `
    <style>
        html, body, #chat { height: 100%; margin: 0; }
        body,input { font: 20px sans-serif; }
        #chat { display: flex; flex-flow: row wrap; }
        #chat > * { margin: 5px 10px; padding: 10px; border: 1px solid #999; }
        #infobar { width: 100%; }
        #nickname { float: left; }
        #viewCount { float: right; }
        #textIn,#sendButton { flex: 1 0 0; }
        #textOut { height: calc(100% - 160px); flex: 1 100%;  overflow: auto }
        #textIn { flex-grow: 100 }
        #sendButton { background-color: #fff; border: 2px solid #000 }
        #widgets { top: 70px; right: 14px; }
        #widgets #stats { display: none; }
    </style>

    <style>
        #croquetChatContainer {
            background-color : white;

            position : fixed;

            width : 50%;
            height : 50%;

            bottom : 20px;
            right : 20px;
    
            z-index : 5;
        }
    </style>

    <div id="croquetChatContainer">
        <div id="chat">
            <div id="infobar">
                <div id="nickname">name</div>
                <div id="viewCount"><b>users</b> 0</div>
            </div>
            <div id="textOut"></div>
            <input id="textIn" type="text" onkeydown="event.keyCode == 13 && sendButton.onclick()"/>
            <input id="sendButton" type="button" value = "Send" />
        </div>
    </div>
`;

document.body.innerHTML += html;

const chatContainer = document.getElementById("croquetChatContainer");
chatContainer.style.display = "none";

chrome.runtime.onMessage.addListener(function(message, sender) {
    if(sender.id == chrome.runtime.id) {
        switch(message.type) {
            case "toggle":
                chatContainer.style.display = (chatContainer.style.display == "none")?
                    "block" :
                    "none";
                break;
            default:
                break;
        }
    }
});

Croquet.startSession(`croquet-chat-${window.location.hostname}`, ChatModel, ChatView);