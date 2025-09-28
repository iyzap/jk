const axios = require("axios");
const yts = require("yt-search");
const config = require("../config");
const { cmd } = require("../command");

cmd({
  pattern: "play2",
  alias: ["song", "music"],   
  desc: "Download YouTube audio by title",
  category: "download",
  react: "🎶",
  filename: __filename
}, async (conn, mek, m, { from, args, q, reply }) => {
  try {
    if (!q) return reply("❌ Please give me a song name.");

    // 1. Search video on YouTube
    let search = await yts(q);
    let video = search.videos[0];
    if (!video) return reply("❌ No results found.");

    // 2. Call your API with video URL
    let apiUrl = `https://jawad-tech.vercel.app/download/yt?url=${encodeURIComponent(video.url)}`;
    let res = await axios.get(apiUrl);

    if (!res.data.status) {
      return reply("❌ Failed to fetch audio. Try again later.");
    }

    // 3. Build caption
    let caption = `
*YT AUDIO DOWNLOADER*
╭━━❐━⪼
┇๏ *Title*    –  ${video.title}
┇๏ *Duration* –  ${video.timestamp}
┇๏ *Views*    –  ${video.views}
┇๏ *Author*   –  ${video.author.name}
╰━━❑━⪼
> *Downloading Audio File ♡*
    `;

    // 4. Send audio file
    await conn.sendMessage(from, {
      audio: { url: res.data.result },
      mimetype: "audio/mpeg",
      ptt: false,
      contextInfo: { forwardingScore: 999, isForwarded: true }
    }, { quoted: mek });

    await conn.sendMessage(from, { text: caption }, { quoted: mek });

  } catch (e) {
    console.error("play2 error:", e);
    reply("❌ Error while downloading audio.");
  }
});
