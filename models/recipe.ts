import { Schema, model, Document } from 'mongoose';

interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  author: string;
  createdAt: Date;
}

const recipeSchema = new Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  image: { type: String },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Recipe = model<IRecipe>('Recipe', recipeSchema);
