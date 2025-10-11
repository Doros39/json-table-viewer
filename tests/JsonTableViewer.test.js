import JsonTableViewer from '../src/JsonTableViewer.js';

function createUniqueComponent() {
  const name = `json-table-viewer-test-${Math.floor(Math.random()*100000)}`;
  customElements.define(name, JsonTableViewer);
  return name;
}

test('renders', () => {
  const tag = createUniqueComponent();
  const el = document.createElement(tag);
  document.body.appendChild(el);
  el.data = [{ name: 'Jan', age: 25 }];
  el.render();
  expect(el.shadowRoot.querySelectorAll('th').length).toBeGreaterThan(0);
  document.body.removeChild(el);
});
