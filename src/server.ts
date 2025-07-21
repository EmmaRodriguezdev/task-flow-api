import app from "./index";

const PORT = process.env['PORT'] || 3001;

app.listen(PORT, async () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});