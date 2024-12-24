import mongoose from "mongoose";

const Link = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists

export default mongoose.models.Link
  ? mongoose.model("Link")
  : mongoose.model("Link", Link);
// Export the model
