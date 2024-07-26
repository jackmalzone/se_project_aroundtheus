export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    console.log("Rendering items:", items); // Add this line
    items.forEach((item) => {
      console.log("Rendering item:", item); // Add this line
      this._renderer(item);
    });
  }

  addItem(element, prepend = false) {
    if (prepend) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
