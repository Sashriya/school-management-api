import pool from '../config/database.js';

const SchoolModel = {
    create: async (schoolData) => {
        const { name, address, latitude, longitude } = schoolData;
        
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const values = [name, address, latitude, longitude];
        
        console.log('Executing query:', query);
        console.log('With values:', values);
        
        const [result] = await pool.execute(query, values);
        
        return { 
            id: result.insertId, 
            name, 
            address, 
            latitude, 
            longitude 
        };
    },

    getAll: async () => {
        const [rows] = await pool.execute('SELECT * FROM schools ORDER BY id');
        return rows;
    }
};

export default SchoolModel;