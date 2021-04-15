import { html, css, LitElement } from 'lit-element';

/**
 * Simple styled tabs component
 * @element tabs-component
 *
 */

export class Tabs extends LitElement {
  static get properties() {
    return {
      selected: { type: Number },
    };
  }

  static get styles() {
    return css`
    :host {
      font-family: 'DM Sans', Helvetica, Arial, sans-serif;
    }
    .tab-list {
      text-align: center;
      list-style: none;
      margin: 0px 0 0px;
      padding-left: 20px;
      padding-right: 20px;
      line-height: 24px;
      overflow: hidden;
      font-size: 12px;
      position: relative;
      display: flex;
    }
    .tab-list:before {
      position: absolute;
      content: ' ';
      width: 100%;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid rgb(45, 60, 255);
      z-index: 1;
    }
    .tab {
      border: 1px solid rgb(160, 160, 255);
      display: inline-block;
      background: #fff;
      position: relative;
      z-index: 0;
      border-top-left-radius: 12px;
      border-top-right-radius: 12px;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.4), inset 0 1px 0 #fff;
      text-shadow: 0 1px #fff;
      margin: 0 -5px;
      padding: 10px 30px 10px 30px;
      font-size: 18px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .tab:hover {
      cursor: pointer;
    }
    .tab:before,
    .tab:after {
      border: 1px solid #aaa;
      position: absolute;
      bottom: -1px;
      width: 5px;
      height: 5px;
      content: ' ';
    }
    .tab:before {
      left: -6px;
      border-bottom-right-radius: 6px;
      border-width: 0 1px 1px 0;
      box-shadow: 2px 2px 0 #d1d1d1;
    }
    .tab:after {
      right: -6px;
      border-bottom-left-radius: 6px;
      border-width: 0 0 1px 1px;
      box-shadow: -2px 2px 0 #d1d1d1;
    }
    .selected {
      border: 1px solid rgb(45, 60, 255);
      background: #fff;
      color: #333;
      z-index: 2;
      font-weight: bold;
      border-bottom-color: #fff;
      box-shadow: 0px 2px 4px #333;
      flex-shrink: 0;
    }
    .selected:before {
      box-shadow: 2px 2px 0 #fff;
    }
    .selected:after {
      box-shadow: -2px 2px 0 #fff;
    }
    .content {
      border: none;
      background-color: white;
    }
    ::slotted(.hidden) {
      display: none;
    }
  `;
  }

  static get tag() {
    return 'tabs-component';
  }

  constructor() {
    super();
    this.selected = 0;
  }

  get tabbedContent() {
    const slot = this.shadowRoot.querySelector('slot');
    return slot ? slot.assignedElements() : [];
  }

  handleTabClick(event, tabIndex) {
    if (this.selected !== tabIndex) {
      this.tabbedContent[this.selected].classList.add('hidden');
    }

    this.tabbedContent[tabIndex].classList.remove('hidden');
    this.selected = tabIndex;

    this.requestUpdate();
  }

  firstUpdated() {
    super.firstUpdated();

    this.tabbedContent.forEach(element => element.classList.add('hidden'));
    this.handleTabClick(null, this.selected);
  }

  _tabClass(tabIndex) {
    return `tab${tabIndex === this.selected ? ' selected' : ''}`;
  }

  render() {
    return html`
      <nav>
        <ul class="tab-list">
          ${this.tabbedContent.map(
            (element, index) => html`
              <li
                class=${this._tabClass(index)}
                @click=${event => this.handleTabClick(event, index)}
              >
                ${element.title || `Tab ${index + 1}`}
              </li>
            `
          )}
        </ul>
      </nav>
      <slot class="content" @slotchange=${ev => this.requestUpdate(ev)}></slot>
    `;
  }
}

window.customElements.define(Tabs.tag, Tabs);