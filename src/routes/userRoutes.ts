import express from "express";
import { registerUser, loginUser, getAllUsers, deleteUser, updateUser } from "../controllers/usercontroller";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authenticateUser as any, authorizeAdmin as any, getAllUsers);
router.put("/:id", authenticateUser as any, updateUser);
router.delete("/:id", authenticateUser as any, authorizeAdmin as any, deleteUser);

export default router;
