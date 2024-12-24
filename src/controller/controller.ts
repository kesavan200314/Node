import  Express  from "express";
import pool from "../repository/Database";export const getAllusers = async (req: Express.Request, res: Express.Response): Promise<void> => {
    try{
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        res.json(result.rows);    }catch(err) {
        console.log('error found');
    }
}


// create Cars
export const creatCars =  async (req: any, res: any): Promise<void> => {
    const { name, brand, model, year } = req.body;   
    
    if (!name || !brand || !model || !year) {
         res.status(400).json({ error: 'All fields (name, brand, model, year) are required.' })
         return;
    }  
    
    const query = `
        INSERT INTO cars (name, brand, model, year)
        VALUES ($1, $2, $3, $4)
        RETURNING *;`;

    const values: [string, string, string, number] = [name, brand, model, year];   
     try {
        console.log('Query:', query);
        console.log('Values:', values);  const result = await pool.query(query, values);
        res.status(201).json({ message: 'Car added successfully', car: result.rows[0] });
    } 

    catch (err) {
        console.error('Database Insert Error:', (err as Error).message);
        res.status(500).json({ error: 'Failed to add the car. Please try again later.' });
    }
}

// // delete user
// export const deleteCars = async (req: Express.Request, res: Express.Response): Promise<void> => {
//     const carId = parseInt(req.params.id, 10); // Get the car ID from the URL
//     const query = 'DELETE FROM cars WHERE id = $1 RETURNING *';

//     try {
//         const result = await pool.query(query, [carId]);

//         if (result.rowCount === 0) {
//             res.status(404).json({ error: 'Car not found' });
//         } else {
//             res.status(200).json({ message: 'Car deleted successfully', deletedCar: result.rows[0] });
//         }
//     } catch (err) {
//         console.error('Database Delete Error:', (err as Error).message);
//         res.status(500).json({ error: 'Failed to delete the car. Please try again later.' });
//     }
// }

const cars = [
    { id: 1, name: "Toyota", brand: "Corolla", model: "2020", year: 2019 },
    { id: 2, name: "Honda", brand: "Civic", model: "2019", year: 2018 },
  ];

// DELETE route
app.delete("/api/cars/:id", (req, res) => {
    console.log("Request received:", req.params);
  
    const carId = parseInt(req.params.id, 10);
    if (isNaN(carId)) {
      return res.status(400).send({ error: "Invalid car ID" });
    }
  
    const index = cars.findIndex(car => car.id === carId);
    if (index === -1) {
      return res.status(404).send({ error: "Car not found" });
    }
  
    const deletedCar = cars.splice(index, 1);
    res.status(200).send({ message: "Car deleted successfully", deletedCar });
  });
  
  // Catch-all 404 middleware
  app.use((req, res) => {
    res.status(404).send("Route not found");
  });


