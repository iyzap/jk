const { cmd } = require("../command");

// ==================== KICK COMMAND ====================
cmd({
  pattern: "kick",
  alias: ["k", "remove", "nital"],
  desc: "Remove a user from the group",
  category: "group",
  react: "💀",
  filename: __filename
}, async (conn, mek, m, {
  from, isCreator, isBotAdmins, isAdmins, isGroup, quoted, reply, botNumber
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in *groups*.");
    if (!isBotAdmins) return reply("❌ I must be *admin* to remove someone.");
    if (!isAdmins && !isCreator) return reply("🔐 Only *group admins* or *owner* can use this command.");

    if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0))
      return reply("❓ You did not give me a user to remove!");

    let users = m.mentionedJid?.[0] || m.quoted?.sender;
    if (!users) return reply("⚠️ Couldn't determine target user.");

    const ownerJid = conn.user.id.includes(":")
      ? conn.user.id.split(":")[0] + "@s.whatsapp.net"
      : conn.user.id;

    if (users === botNumber || users === ownerJid)
      return reply("👑 I can't remove myself or the bot owner.");

    await conn.groupParticipantsUpdate(from, [users], "remove");
    reply(`*✅ Successfully removed from group.*`, { mentions: [users] });

  } catch (err) {
    console.error(err);
    reply("❌ Failed to remove user. Something went wrong.");
  }
});

// ==================== PROMOTE COMMAND ====================
cmd({
  pattern: "promote",
  alias: ["p", "giveadmin", "makeadmin"],
  desc: "Promote a user to admin",
  category: "group",
  react: "💀",
  filename: __filename
}, async (conn, mek, m, {
  from, isCreator, isBotAdmins, isAdmins, isGroup, quoted, reply, botNumber
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in *groups*.");
    if (!isBotAdmins) return reply("❌ I must be *admin* to promote someone.");
    if (!isAdmins && !isCreator) return reply("🔐 Only *group admins* or *owner* can use this command.");

    if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0))
      return reply("❓ You did not give me a user to promote!");

    let users = m.mentionedJid?.[0] || m.quoted?.sender;
    if (!users) return reply("⚠️ Couldn't determine target user.");

    const ownerJid = conn.user.id.includes(":")
      ? conn.user.id.split(":")[0] + "@s.whatsapp.net"
      : conn.user.id;

    if (users === botNumber || users === ownerJid)
      return reply("👑 I can't promote myself or the bot owner.");

    await conn.groupParticipantsUpdate(from, [users], "promote");
    reply(`*✅ Successfully promoted to Admin.*`, { mentions: [users] });

  } catch (err) {
    console.error(err);
    reply("❌ Failed to promote. Something went wrong.");
  }
});

// ==================== DEMOTE COMMAND ====================
cmd({
  pattern: "demote",
  alias: ["d", "dismiss", "removeadmin"],
  desc: "Demote a group admin",
  category: "group",
  react: "💀",
  filename: __filename
}, async (conn, mek, m, {
  from, isCreator, isBotAdmins, isAdmins, isGroup, quoted, reply, botNumber
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in *groups*.");
    if (!isBotAdmins) return reply("❌ I must be *admin* to demote someone.");
    if (!isAdmins && !isCreator) return reply("🔐 Only *group admins* or *owner* can use this command.");

    if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0))
      return reply("❓ You did not give me a user to demote!");

    let users = m.mentionedJid?.[0] || m.quoted?.sender;
    if (!users) return reply("⚠️ Couldn't determine target user.");

    const ownerJid = conn.user.id.includes(":")
      ? conn.user.id.split(":")[0] + "@s.whatsapp.net"
      : conn.user.id;

    if (users === botNumber || users === ownerJid)
      return reply("👑 I can't demote myself or the bot owner.");

    await conn.groupParticipantsUpdate(from, [users], "demote");
    reply(`*✅ Admin successfully demoted to a normal member.*`, { mentions: [users] });

  } catch (err) {
    console.error(err);
    reply("❌ Failed to demote. Something went wrong.");
  }
});
