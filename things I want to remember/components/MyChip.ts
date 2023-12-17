/*
enum MyPriority {
  P0 = "0",
  P1 = "1",
  P2 = "2",
}

function parseMyPriority(text: string): MyPriority {
  switch (text) {
    case "0":
      return MyPriority.P0;
    case "1":
      return MyPriority.P1;
    case "2":
      return MyPriority.P2;
  }
  throw new Error(`Invalid MyPriority '${text}'`);
}

class MyChipElement extends HTMLElement {
  private priority: MyPriority;

  constructor() {
    super();
    this.priority = MyPriority.P2;
  }

  static get observedAttributes() {
    return ["p"];
  }

  attributeChangedCallback(
    property: string,
    oldValue: string,
    newValue: string,
  ) {
    if (oldValue === newValue) return;
    if (property === "p") {
      this.priority = parseMyPriority(newValue);
    }
  }

  connectedCallback() {
    // appended to dom
    const text = this.textContent;
    
    this.innerHTML = "<span></span>";
    const span = this.querySelector("span")!;
    const contrastClass = this.priority === MyPriority.P0
      ? "hc"
      : this.priority === MyPriority.P1
      ? "lc"
      : "nc";
    span.className = "my-chip " + contrastClass;
    span.textContent = text;
  }

  disconnectedCallback() {
    // removed from dom
  }

  adoptedCallback() {
    // reparenting within the dom
  }
}

customElements.define("my-chip", MyChipElement);
*/