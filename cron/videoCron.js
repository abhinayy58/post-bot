import cron from "node-cron";
import Video from "../models/Video.js";
// import { downloadFromCloudinary, getFileSizeMB } from "../utils/fileUtils.js";
import { sendVideoEmail } from "../services/email.service.js";

cron.schedule("*/1  * * * *", async () => {
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
 

      await sendVideoEmail({
  caption: video.caption,
  hashtags: video.hashtag,
  videoLink: video.videourl
});



    video.isUsed = true;
    video.usedAt = new Date();
    await video.save();

    console.log("✅ Email sent");
  } catch (err) {
    console.error("❌ Cron error:", err.message);
  }
});
