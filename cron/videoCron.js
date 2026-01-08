import cron from "node-cron";
import Video from "../models/Video.js";
// import { downloadFromCloudinary, getFileSizeMB } from "../utils/fileUtils.js";
import { sendVideoEmail } from "../services/email.service.js";

const getRandomHashtags = (hashtags, count = 5) => {
  if (!Array.isArray(hashtags)) return [];
  return [...hashtags].sort(() => Math.random() - 0.5).slice(0, count);
};

cron.schedule("0 19 * * *", async () => {
  console.log("⏰ Cron running");

  const video = await Video.findOne({ isUsed: false }).sort({ createdAt: -1 });
  if (!video) return;

  //   const filename = `${video.channel}_${video.msg_id}.mp4`;

  try {
    // const localPath = await downloadFromCloudinary(
    //   video.videourl,
    //   filename
    // );

    // const sizeMB = getFileSizeMB(localPath);

    const selectedHashtags =
      video.hashtag.length > 5
        ? getRandomHashtags(video.hashtag, 5)
        : video.hashtag;

    await sendVideoEmail({
      caption: video.caption,
      hashtags: selectedHashtags,
      videoLink: video.videourl,
    });

    video.isUsed = true;
    video.usedAt = new Date();
    await video.save();

    console.log("✅ Email sent");
  } catch (err) {
    console.error("❌ Cron error:", err.message);
  }
});
