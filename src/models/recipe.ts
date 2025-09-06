import mongoose from 'mongoose';

// Define the interface for a Recipe document
interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  createdAt: Date;
  userId?:{ // Reference to the user who created the recipe
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: false
  }
}

// Define the Mongoose schema for recipes
const recipeSchema = new mongoose.Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false 
    
  }
});

// Export the Recipe model based on the schema
export const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);
