import sqlite3 from 'sqlite3'
import { promisify } from 'util'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'
import config from '../config/index.js'


// Get the directory name
const __dirname = dirname(fileURLToPath(import.meta.url))

// Ensure config.databasePath is defined
if (!config.databasePath) {
  throw new Error('Database path is not defined in the configuration.')
}

// Ensure database directory exists
const dbDir = dirname(config.databasePath)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

// Create database connection
const db = new sqlite3.Database(config.databasePath, (err) => {
  if (err) {
    console.error('Could not connect to the database:', err)
  } else {
    console.log('Connected to the database.')
  }
})

// Promisify database methods
db.runAsync = promisify(db.run.bind(db))
db.getAsync = promisify(db.get.bind(db))
db.allAsync = promisify(db.all.bind(db))

export default db