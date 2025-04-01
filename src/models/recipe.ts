import mongoose from 'mongoose';

interface IRecipe extends Document {
  title: string;
  ingredients: string[];
  instructions: string;
  createdAt: Date;
  author?: mongoose.Types.ObjectId;
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true
  }
}

const recipeSchema = new mongoose.Schema<IRecipe>({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true } // Endast userId behövs
});

export const Recipe = mongoose.model<IRecipe>('Recipe', recipeSchema);
