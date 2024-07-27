export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    console.log("Rendering items:", items);
    items.forEach((item) => {
      console.log("Rendering item:", item);
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
