import pg from 'pg';
import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Conectare la PostgreSQL
const sequelize = new Sequelize('postgres://postgres:xxxx@localhost:5432/comenzi_db', {
    dialect: 'postgres',
    dialectModule: pg
  });

// Definire model pentru comenzi
const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    orderData: {
        type: DataTypes.JSON,
        allowNull: false
    }
});

// Creare tabel dacă nu există
sequelize.sync();

// Endpoint pentru a primi și salva comenzile
app.post('/save-order', async (req, res) => {
    try {
        const { orderData } = req.body;
        const order = await Order.create({ orderData });
        res.status(201).json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Pornire server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
