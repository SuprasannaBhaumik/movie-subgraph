# Movies Subgraph (GraphQL)

This subgraph exposes movie data and provides a reference to pricing.

---

## 📦 Setup

```bash
npm init -y
npm install apollo-server @apollo/subgraph graphql node-fetch
```

---

## 📁 Structure

```
movies-subgraph/
├── package.json
└── index.js
```

---

## ⚙️ package.json

```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js"
  }
}
```

---

## ▶️ Run

```bash
npm install
npm start
```

---

## 🌐 Runs On

```
http://localhost:3000
```

---

## 🧠 Key Concept

* Fetches movies from REST service
* Returns **Price reference (NOT actual price)**

---

## 🔗 Federation Logic

```js
Movie: {
  priceDetails(movie) {
    return {
      __typename: "Price",
      referenceEntityId: Number(movie.id)
    };
  }
}
```

---

## ✅ Purpose

Acts as:

* Owner of Movie data
* Connector to Pricing subgraph via federation
