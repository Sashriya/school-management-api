import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

console.log('📡 Connecting to MySQL...');

// Create connection pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Get promise wrapper
const promisePool = pool.promise();

// Database initialization
const initDatabase = async () => {
    try {
        // Test connection
        const connection = await promisePool.getConnection();
        console.log('✅ MySQL connected successfully!');
        connection.release();
        
        // Create table if not exists
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS schools (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                address VARCHAR(500) NOT NULL,
                latitude FLOAT NOT NULL,
                longitude FLOAT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_coordinates (latitude, longitude)
            )
        `;
        await promisePool.execute(createTableQuery);
        console.log('✅ Database table initialized successfully');
    } catch (error) {
        console.error('❌ Database error:', error.message);
        throw error;
    }
};

// Export the pool and init function
export default promisePool;
export { initDatabase };