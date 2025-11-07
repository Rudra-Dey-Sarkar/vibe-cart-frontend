# Vibe Cart

> This readme containing the entire project structure (frontend + backend)

---

#### Vibe cart project structure

![1762518375912](image/README/1762518375912.png)

#### Vibe Cart — Mock E‑Com Cart

A small full‑stack shopping cart app (React frontend + Node/Express backend + MongoDB). This repo contains two folders: `/backend` and `/frontend`.

#### What’s included

* `backend/` — Express API, Mongoose models, seed script.
* `frontend/` — React app (simple setup) with product list, cart view, checkout modal.

# **Quick start**

## Frontend

**Frontend folder structure**

![1762520747342](image/README/1762520747342.png)

**Commands to setup and start the frontend**

```
cd frontend
npm install
npm start
```

**Environment** (`.env` — create from `.env.example`)

```
BACKEND_API_URL=http://localhost:5000/api
```

**Responsive & behaviour details**

* Products show `Add to cart` button.

  ![1762521025736](image/README/1762521025736.png)
* Cart lists items with quantity controls and `Remove` and `Checkout` button.

  ![1762521090649](image/README/1762521090649.png)
* Checkout form collects `name` and `email` and shows a receipt modal after successful checkout.

  ![1762521176646](image/README/1762521176646.png)

  ![1762521228200](image/README/1762521228200.png)
