export default class JsonTableViewer extends HTMLElement {
  static get observedAttributes() {
    return ['data'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.data = [];
    this.filteredData = [];
    this.columns = [];
    this.sortColumn = null;
    this.sortDirection = 1;
  }

  async connectedCallback() {
    const dataSrc = this.getAttribute('data-src');
    if (dataSrc) {
      try {
        const response = await fetch(dataSrc);
        const json = await response.json();
        this.data = json;
        this.filteredData = json;
        this.columns = Object.keys(json[0] || {});
        this.render();
      } catch (error) {
        console.error('Błąd wczytywania danych JSON:', error);
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
      this.data = JSON.parse(dataAttr);
      this.filteredData = this.data;
      this.columns = Object.keys(this.data[0] || {});
      this.render();
    } catch (error) {
      console.error('Niepoprawny JSON:', error);
    }
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase();
    this.filteredData = this.data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(query)
      )
    );
    this.renderTable();
  }

  handleFilter(event) {
    const column = event.target.value;
    const uniqueValues = [...new Set(this.data.map(item => item[column]))];

    const filterMenu = this.shadowRoot.querySelector('#filterValues');
    filterMenu.innerHTML = '<option value="">Wszystko</option>' +
      uniqueValues.map(v => `<option value="${v}">${v}</option>`).join('');

    filterMenu.onchange = e => {
      const value = e.target.value;
      if (!value) {
        this.filteredData = this.data;
      } else {
        this.filteredData = this.data.filter(item => String(item[column]) === value);
      }
      this.renderTable();
    };
  }

  sortByColumn(column) {
    if (this.sortColumn === column) {
      this.sortDirection *= -1;
    } else {
      this.sortColumn = column;
      this.sortDirection = 1;
    }

    this.filteredData.sort((a, b) => {
      const valA = a[column];
      const valB = b[column];
      if (valA < valB) return -1 * this.sortDirection;
      if (valA > valB) return 1 * this.sortDirection;
      return 0;
    });

    this.renderTable();
  }

  renderControls() {
    return `
      <div class="controls">
        <input type="text" id="searchInput" placeholder="🔍 Szukaj..." />
        <select id="filterColumn">
          <option value="">Wybierz kolumnę do filtrowania</option>
          ${this.columns.map(col => `<option value="${col}">${col}</option>`).join('')}
        </select>
        <select id="filterValues"><option value="">Wybierz wartość</option></select>
      </div>
    `;
  }

  renderTable() {
    if (!this.filteredData || this.filteredData.length === 0) {
      this.shadowRoot.querySelector('#tableContainer').innerHTML = "<p>Brak danych do wyświetlenia.</p>";
      return;
    }

    const table = `
      <table>
        <thead>
          <tr>
            ${this.columns.map(col => `
              <th style="cursor:pointer" data-col="${col}">
                ${col}
                ${this.sortColumn === col ? (this.sortDirection === 1 ? " 🔼" : " 🔽") : ""}
              </th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${this.filteredData.map(row => `
            <tr>${this.columns.map(col => `<td>${row[col] ?? ''}</td>`).join('')}</tr>
          `).join('')}
        </tbody>
      </table>
    `;
    this.shadowRoot.querySelector('#tableContainer').innerHTML = table;

    this.shadowRoot.querySelectorAll('th').forEach(th => {
      th.addEventListener('click', () => this.sortByColumn(th.dataset.col));
    });
  }

  render() {
    const style = `
      <style>
        .controls {
          display: flex;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }
        input, select {
          padding: 8px;
          font-size: 14px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
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
          user-select: none;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      </style>
    `;

    this.shadowRoot.innerHTML = style + `
      ${this.renderControls()}
      <div id="tableContainer"></div>
    `;

    this.renderTable();

    this.shadowRoot.querySelector('#searchInput').addEventListener('input', this.handleSearch.bind(this));
    this.shadowRoot.querySelector('#filterColumn').addEventListener('change', this.handleFilter.bind(this));
  }
}

if (!customElements.get('json-table-viewer')) {
  customElements.define('json-table-viewer', JsonTableViewer);
}

