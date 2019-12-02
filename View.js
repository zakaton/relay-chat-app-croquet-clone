class ChatView extends Croquet.View {

    constructor(model) {
      super(model);
      this.model = model;
      croquetsendButton.onclick = () => this.send();
      this.subscribe("history", "refresh", this.refreshHistory);
      this.subscribe("viewInfo", "refresh", this.refreshViewInfo);
      this.refreshHistory();
    }
  
    send() {
        const post = {viewId: this.viewId, text: croquettextIn.value};
        this.publish("input", "newPost", post);
        croquettextIn.value = "";
    }
    
    refreshViewInfo() {
        croquetnickname.innerHTML = "<b>Nickname:</b> " + this.model.views.get(this.viewId);
        croquetviewCount.innerHTML = "<b>Current Participants:</b> " + this.model.participants;
    }
  
    refreshHistory() {
        croquettextOut.innerHTML = `<b>Welcome to Croquet Chat! [${location.hostname}]</b><br><br>` + this.model.history.join("<br>");
        croquettextOut.scrollTop = Math.max(10000, croquettextOut.scrollHeight);
    }
  }