import mongoose from 'mongoose';

interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  createdAt: Date;
  author: mongoose.Types.ObjectId;
}

const recipeSchema = new mongoose.Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);
