import express from "express";
import cors from "cors";

import { pool } from "./db.js";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/hola-mundo", (req, res) => {
    res.send("Hello World")
})

app.get('/usuarios', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM usuarios');
      res.json(result.rows);
    } catch (error) {
      console.error('Error al realizar la consulta', error);
      res.status(500).send('Error en el servidor');
    }
});

app.get("/agregar-usuario", async (req, res) => {
    // Datos ficticios
    const nombre = 'Maria Gómez';
    const email = 'maria.gomez@example.com';
    const edad = 28;
  
    try {
      const query = 'INSERT INTO usuarios (nombre, email, edad) VALUES ($1, $2, $3) RETURNING *';
      const values = [nombre, email, edad];
  
      const result = await pool.query(query, values);
      res.status(201).json(result.rows[0]); // Devuelve el usuario agregado
    } catch (error) {
      console.error('Error al agregar el usuario', error);
      res.status(500).send('Error en el servidor');
    }
  });






app.listen(3000, () => {
    console.log("App listening on port 3000")
})