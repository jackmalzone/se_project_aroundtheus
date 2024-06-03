export class Card {
  constructor() {
    this.card = document.createElement("div");
    this.card.classList.add("card");
  }

  render() {
    return this.card;
  }
}
