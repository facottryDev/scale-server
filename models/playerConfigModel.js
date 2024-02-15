import mongoose from "mongoose";

const playerConfigSchema = new mongoose.Schema(
  {
    configID: {
      type: String,
      required: true,
    },

    params: {
      autoplay: {
        type: Boolean,
        default: false,
      },
      controls: {
        type: Boolean,
        default: true,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model.playerconfig ||
  mongoose.model("playerconfig", playerConfigSchema);
