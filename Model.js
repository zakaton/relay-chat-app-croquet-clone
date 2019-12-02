class ChatModel extends Croquet.Model {
  
    init() {
      this.views = new Map();
      this.participants = 0;
      this.history = [];
      this.subscribe(this.sessionId, "view-join", this.viewJoin);
      this.subscribe(this.sessionId, "view-exit", this.viewExit);
      this.subscribe("input", "newPost", this.newPost);
    }
  
    viewJoin(viewId) {
      const existing = this.views.get(viewId);
      if (!existing) {
        const nickname = this.randomName();
        this.views.set(viewId, nickname);
      }
      this.participants++;
      this.publish("viewInfo", "refresh");  
    }
    
    viewExit(viewId) {
      this.participants--;
      this.publish("viewInfo", "refresh");
    }
  
    newPost(post) {
      const nickname = this.views.get(post.viewId);
      this.addToHistory(`<b>${nickname}:</b> ${this.escape(post.text)}`);
    }
  
    addToHistory(item){
      this.history.push(item);
      if (this.history.length > 100) this.history.shift();
      this.publish("history", "refresh");   
    }
  
    escape(text) { // Clean up text to remove html formatting characters
      return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;");
    }
  
    randomName() {
      const names =["Acorn", "Allspice", "Almond", "Ancho", "Anise", "Aoli", "Apple", "Apricot", "Arrowroot", "Asparagus", "Avocado", "Baklava", "Balsamic", "Banana", "Barbecue", "Bacon", "Basil", "Bay Leaf", "Bergamot", "Blackberry", "Blueberry", "Broccoli", "Buttermilk", "Cabbage", "Camphor", "Canaloupe", "Cappuccino", "Caramel", "Caraway", "Cardamom", "Catnip", "Cauliflower", "Cayenne", "Celery", "Cherry", "Chervil", "Chives", "Chipotle", "Chocolate", "Coconut", "Cookie Dough", "Chamomile", "Chicory", "Chutney", "Cilantro", "Cinnamon", "Clove", "Coriander", "Cranberry", "Croissant", "Cucumber", "Cupcake", "Cumin", "Curry", "Dandelion", "Dill", "Durian", "Earl Grey", "Eclair", "Eggplant", "Espresso", "Felafel", "Fennel", "Fig", "Garlic", "Gelato", "Gumbo", "Halvah", "Honeydew", "Hummus", "Hyssop", "Ghost Pepper", "Ginger", "Ginseng", "Grapefruit", "Habanero", "Harissa", "Hazelnut", "Horseradish", "Jalepeno", "Juniper", "Ketchup", "Key Lime", "Kiwi", "Kohlrabi", "Kumquat", "Latte", "Lavender", "Lemon Grass", "Lemon Zest", "Licorice", "Macaron", "Mango", "Maple Syrup", "Marjoram", "Marshmallow", "Matcha", "Mayonnaise", "Mint", "Mulberry", "Mustard", "Natto", "Nectarine", "Nutmeg", "Oatmeal", "Olive Oil", "Orange Peel", "Oregano", "Papaya", "Paprika", "Parsley", "Parsnip", "Peach", "Peanut Butter", "Pecan", "Pennyroyal", "Peppercorn", "Persimmon", "Pineapple", "Pistachio", "Plum", "Pomegranate", "Poppy Seed", "Pumpkin", "Quince", "Raspberry", "Ratatouille", "Rosemary", "Rosewater", "Saffron", "Sage", "Sassafras", "Sea Salt", "Sesame Seed", "Shiitake", "Sorrel", "Soy Sauce", "Spearmint", "Strawberry", "Strudel", "Sunflower Seed", "Sriracha", "Tabasco", "Tahini", "Tamarind", "Tandoori", "Tangerine", "Tarragon", "Thyme", "Tofu", "Truffle", "Tumeric", "Valerian", "Vanilla", "Vinegar", "Wasabi", "Walnut", "Watercress", "Watermelon", "Wheatgrass", "Yarrow", "Yuzu", "Zucchini"];
      return names[Math.floor(Math.random() * names.length)];
    }
  
  }
  
  ChatModel.register();