class ChatView extends Croquet.View {

    constructor(model) {
      super(model);
      this.model = model;
      sendButton.onclick = () => this.send();
      this.subscribe("history", "refresh", this.refreshHistory);
      this.subscribe("viewInfo", "refresh", this.refreshViewInfo);
      this.refreshHistory();
    }
  
    send() {
      const post = {viewId: this.viewId, text: textIn.value};
      this.publish("input", "newPost", post);
      textIn.value = "";
    }
    
    refreshViewInfo() {
      nickname.innerHTML = "<b>Nickname:</b> " + this.model.views.get(this.viewId);
      viewCount.innerHTML = "<b>Current Participants:</b> " + this.model.participants;
    }
  
    refreshHistory() {
      textOut.innerHTML = `<b>Welcome to Croquet Chat! [${location.hostname}]</b><br><br>` + this.model.history.join("<br>");
      textOut.scrollTop = Math.max(10000, textOut.scrollHeight);
    }
  }