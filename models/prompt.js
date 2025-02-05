import mongoose, { Schema, models, model } from 'mongoose';

const PromptSchema = new Schema({ 
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  prompt: {
    type: String,
    require: [true, "Prompt is required!"],
  },
  tag: {
    type: String,
    require: [true, "Tag is requried!"]
  }
})

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
