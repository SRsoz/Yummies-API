"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controllers/usercontroller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/register', usercontroller_1.registerUser);
6;
router.post('/login', usercontroller_1.loginUser);
router.get('/', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, usercontroller_1.getAllUsers);
router.delete('/:id', authMiddleware_1.authenticate, authMiddleware_1.authorizeAdmin, usercontroller_1.deleteUser);
exports.default = router;
