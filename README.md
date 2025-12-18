# 🧩 JSON Table Viewer

**JSON Table Viewer** is a simple and modern **Web Component (Custom Element)** that automatically renders JSON data as an interactive HTML table.

The project was created as part of the **Modern Software Development Techniques** course.

---

## 🚀 Functionality

- 🔹 Converts JSON data into an HTML table  
- 🔹 Sorting, filtering and searching built-in  
- 🔹 Works as a standalone component — no framework required  
- 🔹 Supports dynamic data loading from files or attributes  
- 🔹 Easy integration with web applications  

---

## 🧠 Technologies

- **JavaScript (ES Modules)**
- **Web Components API**
- **Node.js**
- **Jest** – unit testing & coverage
- **Docker** – environment virtualization
- **Jenkins** – CI/CD pipeline

---

## 📦 Installation (npm)

```bash
npm install @doros39/json-table-viewer
```

---

## ▶ Usage

```html
<script type="module" src="./node_modules/@doros39/json-table-viewer/dist/json-table-viewer.js"></script>

<json-table-viewer src="data.json"></json-table-viewer>
```

Example `data.json`:

```json
[
  { "name": "Jan", "age": 25 },
  { "name": "Anna", "age": 30 }
]
```

---

## 🧪 Testing

```bash
npm run test
npm run test:coverage
```

Coverage report is generated in `/coverage`.

---

## 🔄 CI/CD

The project uses **Jenkins** to automate:

- dependency installation
- unit testing
- coverage reporting
- build process

Pipeline definition is stored in `Jenkinsfile`.

---

## 📄 License

MIT © Doros39
