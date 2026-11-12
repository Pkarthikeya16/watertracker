const fs = require('fs/promises');
const path = require('path');

const DEFAULT_DATA = {
  users: [],
  waterIntakes: [],
};

let writeQueue = Promise.resolve();

const getDataFilePath = () => {
  const configured = process.env.DATA_FILE || './data/db.json';
  return path.isAbsolute(configured)
    ? configured
    : path.resolve(__dirname, '..', configured);
};

const ensureDataFile = async () => {
  const filePath = getDataFilePath();
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify(DEFAULT_DATA, null, 2), 'utf8');
  }
  return filePath;
};

const readDB = async () => {
  const filePath = await ensureDataFile();
  const raw = await fs.readFile(filePath, 'utf8');
  if (!raw.trim()) {
    return { users: [], waterIntakes: [] };
  }
  const parsed = JSON.parse(raw);
  return {
    users: Array.isArray(parsed.users) ? parsed.users : [],
    waterIntakes: Array.isArray(parsed.waterIntakes) ? parsed.waterIntakes : [],
  };
};

const updateDB = (mutatorFn) => {
  const task = writeQueue.then(async () => {
    const db = await readDB();
    const result = await mutatorFn(db);
    const filePath = getDataFilePath();
    await fs.writeFile(filePath, JSON.stringify(db, null, 2), 'utf8');
    return result;
  });

  writeQueue = task.catch(() => {});
  return task;
};

const connectDB = async () => {
  try {
    const filePath = await ensureDataFile();
    console.log(`Local JSON Database Ready: ${filePath}`);
  } catch (error) {
    console.error(`Database Initialization Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectDB,
  readDB,
  updateDB,
};
