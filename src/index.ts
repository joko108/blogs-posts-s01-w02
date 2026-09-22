import express from "express";
import { setupApp } from "./setup-app";
import { SETTINGS } from "./settings/config";

const app = express();
setupApp(app);

const PORT = SETTINGS.PORT;

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
