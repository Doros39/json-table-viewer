export default class JsonTableViewer extends HTMLElement {
  static get observedAttributes() {
    return ['data'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    const dataSrc = this.getAttribute('data-src');
    if (dataSrc) {
      try {
        const response = await fetch(dataSrc);
        const json = await response.json();
        this.render(json);
      } catch (error) {
        console.error("Błąd wczytywania danych JSON:", error);
        this.shadowRoot.innerHTML = `<p style="color:red;">Nie udało się wczytać danych z ${dataSrc}</p>`;
      }
    } else {
      this.update();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data' && oldValue !== newValue) {
      this.update();
    }
  }

  update() {
    const dataAttr = this.getAttribute('data');
    if (!dataAttr) return;
    try {
      const data = JSON.parse(dataAttr);
      this.render(data);
    } catch (error) {
      console.error("Niepoprawny JSON:", error);
    }
  }

  render(data) {
    if (!Array.isArray(data) || data.length === 0) {
      this.shadowRoot.innerHTML = "<p>Brak danych do wyświetlenia.</p>";
      return;
    }

    const columns = Object.keys(data[0]);
    const table = `
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
          font-family: Arial, sans-serif;
        }
        th, td {
          border: 1px solid #ccc;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #007bff;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      </style>
      <table>
        <thead>
          <tr>${columns.map(col => `<th>${col}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>${columns.map(col => `<td>${row[col] ?? ''}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    `;
    this.shadowRoot.innerHTML = table;
  }
}

customElements.define('json-table-viewer', JsonTableViewer);
