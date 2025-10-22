import JsonTableViewer from '../src/JsonTableViewer.js';

if (!customElements.get('json-table-viewer-test')) {
  customElements.define('json-table-viewer-test', JsonTableViewer);
}
