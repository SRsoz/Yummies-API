"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const reciperoutes_1 = __importDefault(require("./routes/reciperoutes")); // <-- ✅ Importera
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.use("/api/users", userRoutes_1.default);
app.use("/api/recipes", reciperoutes_1.default); // <-- ✅ Lägg till
// Starta servern
const PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("🟢 MongoDB ansluten");
    app.listen(PORT, () => console.log(`🚀 Server körs på port ${PORT}`));
})
    .catch((error) => console.error("🔴 MongoDB anslutningsfel:", error));
