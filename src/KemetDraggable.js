import { html, css, LitElement } from 'lit-element';

export class KemetDraggable extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      #draggable {
        position: absolute;
      }
    `;
  }

  static get properties() {
    return {
      memory: {
        type: String
      },
      mouseMove: {
        type: Function
      },
      mouseUp: {
        type: Function
      },
      position1: {
        type: Number
      },
      position2: {
        type: Number
      },
      position3: {
        type: Number
      },
      position4: {
        type: Number
      },
      top: {
        type: Number
      },
      left: {
        type: Number
      },
      measure: {
        type: Boolean,
      }
    };
  }

  constructor() {
    super();

    this.mouseMove = (event) => this.drag(event);
    this.mouseUp = () => this.stopDrag();
    this.position1 = 0;
    this.position2 = 0;
    this.position3 = 0;
    this.position4 = 0;
    this.top = 'auto';
    this.left = 'auto';
    this.measure = false;
  }

  firstUpdated() {
    this.draggableElement = this.shadowRoot.getElementById('draggable');

    const savedPosition = JSON.parse(localStorage.getItem(this.memory));

    if (savedPosition) {
      this.top = savedPosition.top;
      this.left = savedPosition.left;
    }

    if (this.measure) {
      this.measureContent();
    }
  }

  render() {
    return html`
      <div id="draggable" @mousedown=${(event) => this.startDrag(event)} style="top:${this.top}; left:${this.left}">
        <slot></slot>
      </div>
    `;
  }

  startDrag(event) {
    event.preventDefault();

    this.position3 = event.clientX;
    this.position4 = event.clientY;

    document.addEventListener('mouseup', this.mouseUp);
    document.addEventListener('mousemove', this.mouseMove);
  }

  drag(event) {
    event.preventDefault();

    this.position1 = this.position3 - event.clientX;
    this.position2 = this.position4 - event.clientY;
    this.position3 = event.clientX;
    this.position4 = event.clientY;

    this.top = `${this.draggableElement.offsetTop - this.position2}px`;
    this.left = `${this.draggableElement.offsetLeft - this.position1}px`;
  }

  stopDrag() {
    document.removeEventListener('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.mouseMove);

    if (this.memory) {
      const savedPosition = {
        top: this.top,
        left: this.left
      };

      localStorage.setItem(this.memory, JSON.stringify(savedPosition));
    }
  }

  measureContent() {
    this.style.width = `${this.draggableElement.clientWidth}px`;
    this.style.height = `${this.draggableElement.clientHeight}px`;
  }
}
