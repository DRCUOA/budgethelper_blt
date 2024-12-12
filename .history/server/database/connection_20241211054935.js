import sqlite3 from 'sqlite3'
import { promisify } from 'util'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import config from '../config/index.js'

// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url))

// Ensure database directory exists
const dbDir = dirname(config.databasePath)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// Create database connection
const db = new sqlite3.Database(config.databasePath, (err) => {
  if (err) {
    console.error('Error connecting to database:', err)
    process.exit(1)
  }
  console.log('Connected to SQLite database')
})

// Promisify database methods
db.runAsync = promisify(db.run.bind(db))
db.getAsync = promisify(db.get.bind(db))
db.allAsync = promisify(db.all.bind(db))

export default db