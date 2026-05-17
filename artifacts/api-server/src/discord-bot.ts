import { Client, GatewayIntentBits, type Message } from "discord.js";
import { db } from "@workspace/db";
import { reviewsTable } from "@workspace/db/schema";
import { logger } from "./lib/logger";

const CHANNEL_ID = process.env["DISCORD_REVIEW_CHANNEL_ID"];
const TOKEN = process.env["DISCORD_BOT_TOKEN"];

function countStars(text: string): number {
  const stars = (text.match(/⭐/g) || []).length;
  return stars > 0 && stars <= 5 ? stars : 5;
}

function extractField(text: string, field: string): string | undefined {
  const regex = new RegExp(`\\*?\\*?${field}:?\\*?\\*?\\s*([^\\n*]+)`, "i");
  const match = text.match(regex);
  return match?.[1]?.trim().replace(/^[@]/, "").split(/\s+/)[0];
}

async function handleMessage(message: Message) {
  if (!CHANNEL_ID || message.channelId !== CHANNEL_ID) return;
  if (message.author.bot) return;

  const content = message.content.trim();
  if (!content) return;

  const avatarUrl = message.author.displayAvatarURL({ size: 128 });
  const imageUrl =
    message.attachments.first()?.url ??
    message.embeds.find((e) => e.image)?.image?.url ??
    undefined;

  const rating = countStars(content);
  const product = extractField(content, "Producto");
  const support = extractField(content, "Soporte");

  try {
    await db.insert(reviewsTable).values({
      discordUserId: message.author.id,
      discordUsername: message.author.username,
      discordDisplayName: message.member?.displayName ?? message.author.globalName ?? message.author.username,
      discordAvatarUrl: avatarUrl,
      content,
      product: product ?? null,
      support: support ?? null,
      rating,
      imageUrl: imageUrl ?? null,
      approved: true,
    });
    logger.info({ user: message.author.username }, "Review saved from Discord");
  } catch (err) {
    logger.error({ err }, "Failed to save review from Discord");
  }
}

export function startDiscordBot() {
  if (!TOKEN) {
    logger.warn("DISCORD_BOT_TOKEN not set — Discord bot disabled");
    return;
  }
  if (!CHANNEL_ID) {
    logger.warn("DISCORD_REVIEW_CHANNEL_ID not set — Discord bot disabled");
    return;
  }

  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once("ready", () => {
    logger.info({ tag: client.user?.tag }, "Discord bot ready");
  });

  client.on("messageCreate", (message) => {
    handleMessage(message).catch((err) =>
      logger.error({ err }, "Error handling Discord message"),
    );
  });

  client.login(TOKEN).catch((err) =>
    logger.error({ err }, "Failed to login to Discord"),
  );
}
