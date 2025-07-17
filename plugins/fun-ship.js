const { cmd } = require("../command");

cmd({
  pattern: "ship",
  alias: ["match", "love"],
  desc: "Randomly pairs the command user with another group member.",
  react: "❤️",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { from, isGroup, groupMetadata, sender }) => {
  try {
    if (!isGroup) return m.reply("❌ This command can only be used in groups.");

    const participants = groupMetadata.participants
      .map(user => user.id)
      .filter(id => id !== sender); // Exclude sender

    if (participants.length === 0) {
      return m.reply("❌ Not enough members to match with.");
    }

    const randomPair = participants[Math.floor(Math.random() * participants.length)];

    const message = `💘 *Match Found!* 💘\n❤️ @${sender.split("@")[0]} + @${randomPair.split("@")[0]}\n💖 Congratulations! 🎉`;

    await conn.sendMessage(from, {
      text: message,
      mentions: [sender, randomPair]
    }, {
      quoted: m
    });

  } catch (error) {
    console.error("❌ Error in ship command:", error);
    m.reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});
