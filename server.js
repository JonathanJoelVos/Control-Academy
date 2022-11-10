import dotenv from 'dotenv';
import app from "./src/app.js";
import redis from './redis/blacklist.js';
import allowlist from './redis/allowlist.js';

dotenv.config();
const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Servidor escutando na porta: http://localhost:${port}`)
})