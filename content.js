const html = `
    <style>
        #croquetchat { height: 100%; margin: 0; }
        #croquetchat { display: flex; flex-flow: row wrap; }
        #croquetchat > * { margin: 5px 10px; padding: 10px; border: 1px solid #999; }
        #croquetinfobar { width: 100%; }
        #croquetnickname { float: left; }
        #croquetviewCount { float: right; }
        #croquettextIn,#croquetsendButton { flex: 1 0 0; }
        #croquettextOut { height: calc(100% - 160px); flex: 1 100%;  overflow: auto }
        #croquettextIn { flex-grow: 100 }
        #croquetsendButton { background-color: #fff; border: 2px solid #000 }
        
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
        #croquetChatContainer > * {
            font: 20px sans-serif;
        }
    </style>

    <div id="croquetChatContainer">
        <div id="croquetchat">
            <div id="croquetinfobar">
                <div id="croquetnickname">name</div>
                <div id="croquetviewCount"><b>users</b> 0</div>
            </div>
            <div id="croquettextOut"></div>
            <input id="croquettextIn" type="text" onkeydown="event.keyCode == 13 && croquetsendButton.onclick()"/>
            <input id="croquetsendButton" type="button" value = "Send" />
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