class MyChipElement extends HTMLElement {
  private main: string = "";
  private alt: string = "";

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["main", "alt"];
  }

  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string,
  ) {
    if (oldValue === newValue) return;
    if (property === "main") {
      this.main = newValue;
    } else if (property === "alt") {
      this.alt = newValue;
    }
  }

  connectedCallback() {
    // appended to dom
    this.innerHTML = `
      <div class='col center'>
        <span class='txt'>${this.main !== this.alt ? this.alt : ''}</span>
        <span class='large txt'>${this.main}</span>
      </div>`;
  }

  disconnectedCallback() {
    // removed from dom
  }

  adoptedCallback() {
    // reparenting within the dom
  }
}

customElements.define("my-chip", MyChipElement);
