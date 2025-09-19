const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Datos en memoria (demo)
let productos = [
  { id: 1, nombre: "Laptop", precio: 15000 },
  { id: 2, nombre: "Mouse", precio: 300 }
];
let nextId = 3;

// Rutas REST

// GET /productos
app.get('/productos', (req, res) => {
  res.json(productos);
});

// GET /productos/:id
app.get('/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const prod = productos.find(p => p.id === id);
  if (!prod) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(prod);
});

// POST /productos
app.post('/productos', (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Faltan campos: nombre y precio' });
  }
  const nuevo = { id: nextId++, nombre, precio };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

// PUT /productos/:id
app.put('/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });

  const { nombre, precio } = req.body;
  if (!nombre || precio === undefined) {
    return res.status(400).json({ error: 'Faltan campos: nombre y precio' });
  }
  productos[index] = { id, nombre, precio };
  res.json(productos[index]);
});

// DELETE /productos/:id
app.delete('/productos/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = productos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  productos.splice(index, 1);
  res.status(204).send();
});

// Arranque del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
