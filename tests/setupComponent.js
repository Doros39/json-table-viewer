// tests/setupComponent.js
export async function loadComponent() {
  if (!customElements.get('json-table-viewer')) {
    await import('../src/JsonTableViewer.js');
  }
}
