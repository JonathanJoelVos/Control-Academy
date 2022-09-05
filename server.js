import dotenv from 'dotenv';
import app from "./src/app.js";

dotenv.config();
const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Servidor escutando na porta: http://localhost:${port}`)
})