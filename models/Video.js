import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    msg_id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },

    caption: {
      type: String,
      trim: true,
    },

    hashtag: {
      type: [String],
      default: [],
    },

    videourl: {
      type: String,
      required: true,
    },

    isUsed: {
      type: Boolean,
      default: false,
      index: true,
    },

    channel: {
      type: String,
    },

    source: {
      type: String,
      default: "telegram",
    },

    usedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Video", videoSchema);
