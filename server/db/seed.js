require('dotenv').config();
const bcrypt = require('bcryptjs'); // or bcryptjs depending on what's installed
const pool = require('./pool');

async function seed() {
  try {
    const hash1 = await bcrypt.hash("admin123", 10);
    const hash2 = await bcrypt.hash("user123", 10);

    // Insert admin
    await pool.query(
      `INSERT INTO users (email, password_hash, name, role) 
       VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING`,
      ["esti@example.com", hash1, "Esti Mor", "admin"]
    );

    // Insert user
    await pool.query(
      `INSERT INTO users (email, password_hash, name, role) 
       VALUES ($1, $2, $3, $4) ON CONFLICT (email) DO NOTHING`,
      ["johnd@example.com", hash2, "John Doe", "user"]
    );

    // Insert blocked user
    await pool.query(
      `INSERT INTO users (email, password_hash, name, role, is_blocked) 
       VALUES ($1, $2, $3, $4, $5) ON CONFLICT (email) DO NOTHING`,
      ["blocked_user@example.com", hash2, "Blocked User", "user", true]
    );

    console.log('✅ Demo users seeded successfully!');
  } catch (err) {
    console.error('❌ Failed to seed users:', err);
  } finally {
    await pool.end();
  }
}

seed();
