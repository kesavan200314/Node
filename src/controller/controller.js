"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatCars = exports.getAllusers = void 0;
const Database_1 = __importDefault(require("../repository/Database"));
const getAllusers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield Database_1.default.connect();
        const result = yield client.query('SELECT * FROM users');
        res.json(result.rows);
    }
    catch (err) {
        console.log('error found');
    }
});
exports.getAllusers = getAllusers;
// create Cars
const creatCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, brand, model, year } = req.body;
    if (!name || !brand || !model || !year) {
        res.status(400).json({ error: 'All fields (name, brand, model, year) are required.' });
        return;
    }
    const query = `
        INSERT INTO cars (name, brand, model, year)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;
    const values = [name, brand, model, year];
    try {
        console.log('Query:', query);
        console.log('Values:', values);
        const result = yield Database_1.default.query(query, values);
        res.status(201).json({ message: 'Car added successfully', car: result.rows[0] });
    }
    catch (err) {
        console.error('Database Insert Error:', err.message);
        res.status(500).json({ error: 'Failed to add the car. Please try again later.' });
    }
});
exports.creatCars = creatCars;
