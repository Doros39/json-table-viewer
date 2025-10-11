// Simple Web Component rendering table from JSON
const template = document.createElement('template');
template.innerHTML = `<style>
  :host { display:block; font-family:sans-serif; }
  table { width:100%; border-collapse:collapse; }
  th,td { padding:8px; border:1px solid #ddd; }
  th { cursor:pointer; }
</style>
<div>
  <input id='search' placeholder='Search...' />
  <div id='tableWrap'></div>
</div>`;

export default class JsonTableViewer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode:'open'}).appendChild(template.content.cloneNode(true));
    this.data = [];
  }
  static get observedAttributes() { return ['data']; }
  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'data') {
      try { this.data = JSON.parse(newVal); this.render(); } catch(e){}
    }
  }
  connectedCallback() {
    this.search = this.shadowRoot.querySelector('#search');
    this.wrap = this.shadowRoot.querySelector('#tableWrap');
    this.search.addEventListener('input', () => this.render());
    if (this.hasAttribute('data')) this.attributeChangedCallback('data', '', this.getAttribute('data'));
  }
  render() {
    if (!Array.isArray(this.data) || this.data.length===0) { this.wrap.innerHTML = '<p>No data</p>'; return; }
    const query = this.search.value.toLowerCase();
    const keys = Object.keys(this.data[0]);
    const filtered = this.data.filter(r => Object.values(r).some(v => String(v).toLowerCase().includes(query)));
    const rows = filtered.map(r => `<tr>${keys.map(k => `<td>${r[k]}</td>`).join('')}</tr>`).join('');
    this.wrap.innerHTML = `<table><thead><tr>${keys.map(k=>`<th>${k}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>`;
  }
}
customElements.define('json-table-viewer', JsonTableViewer);