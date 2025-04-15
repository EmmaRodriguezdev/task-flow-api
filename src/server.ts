import app from "./index";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
});