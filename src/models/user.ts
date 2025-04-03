import { Schema, model, Document } from 'mongoose';

// Define the interface for a User document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin"; // User role (default is "user")
  createdAt: Date;
}


// Define the Mongoose schema for users
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" }, // <-- Added role field
  createdAt: { type: Date, default: Date.now }
});

// Export the User model based on the schema
export const User = model<IUser>('User', userSchema);
