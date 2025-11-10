/**
 * @jest-environment jsdom
 */
import { loadComponent } from './setupComponent.js';

describe('JsonTableViewer component', () => {
  let viewer;

  beforeAll(async () => {
    await loadComponent();
  });

  beforeEach(() => {
    document.body.innerHTML = '';
    viewer = document.createElement('json-table-viewer');
    document.body.appendChild(viewer);
  });

  test('renders table from provided data', () => {
    const data = [
      { name: 'Jan', surname: 'Kowalski', age: 25 },
      { name: 'Anna', surname: 'Nowak', age: 30 },
    ];
    viewer.setAttribute('data', JSON.stringify(data));

    const table = viewer.shadowRoot.querySelector('table');
    expect(table).not.toBeNull();

    const rows = table.querySelectorAll('tr');
    expect(rows.length).toBe(3); // 1 nagłówek + 2 dane
  });

  test('filters data by search term', () => {
    const data = [
      { name: 'Jan', surname: 'Kowalski', age: 25 },
      { name: 'Anna', surname: 'Nowak', age: 30 },
    ];
    viewer.setAttribute('data', JSON.stringify(data));

    const input = viewer.shadowRoot.querySelector('input');
    input.value = 'Anna';
    input.dispatchEvent(new Event('input'));

    const visibleRows = viewer.shadowRoot.querySelectorAll('tbody tr');
    expect(visibleRows.length).toBe(1);
    expect(visibleRows[0].textContent).toContain('Anna');
  });

  test('sorts data when header is clicked', () => {
    const data = [
      { name: 'Piotr', age: 40 },
      { name: 'Anna', age: 30 },
      { name: 'Jan', age: 25 },
    ];
    viewer.setAttribute('data', JSON.stringify(data));

    const headers = viewer.shadowRoot.querySelectorAll('th');
    headers[1].click();

    const firstRow = viewer.shadowRoot.querySelector('tbody tr');
    expect(firstRow.textContent).toContain('Jan');
  });
});
