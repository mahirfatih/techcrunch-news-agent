import { execSync } from "child_process";
import { CONFIG } from "./config.js";

function runCmd(cmd) {
  try {
    const result = execSync(cmd, { encoding: "utf8", timeout: 30000 });
    return result.trim();
  } catch (e) {
    return "Error: " + e.message;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} and ${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`;
  }
  return `${seconds} second${seconds > 1 ? "s" : ""}`;
}

async function askOllama(content) {
  try {
    const res = await fetch(CONFIG.OLLAMA.API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: CONFIG.MODEL.NAME,
        messages: [
          { role: "system", content: CONFIG.PROMPT },
          { role: "user", content: content },
        ],
        think: CONFIG.OLLAMA.THINK,
        options: {
          temperature: CONFIG.MODEL.TEMPERATURE,
          top_p: CONFIG.MODEL.TOP_P,
          top_k: CONFIG.MODEL.TOP_K,
          min_p: CONFIG.MODEL.MIN_P,
          num_ctx: CONFIG.MODEL.NUM_CTX,
          num_predict: CONFIG.MODEL.NUM_PREDICT,
          repeat_penalty: CONFIG.MODEL.REPETITION_PENALTY,
          presence_penalty: CONFIG.MODEL.PRESENCE_PENALTY,
        },
        stream: CONFIG.OLLAMA.STREAM,
      }),
    });
    const data = await res.json();
    return data?.message?.content?.trim() || "Summary not available.";
  } catch (err) {
    return "Error: " + err.message;
  }
}

async function getNews() {
  const startTime = Date.now();
  const startTimeStr = new Date(startTime).toLocaleString();

  console.log("🚀 TechCrunch - Get News + Turkish Summary");
  console.log(`⏱️  Started at: ${startTimeStr}`);

  runCmd("pkill -f lightpanda");
  await sleep(3000);

  const prefix = "agent-browser --session techcrunch --engine lightpanda";

  console.log("📂 Opening page...");
  runCmd(`${prefix} open ${CONFIG.NEWS_URL}`);
  await sleep(3000);

  console.log("🔍 Finding headline...");
  const snapshot = runCmd(`${prefix} snapshot -i`);

  const headline = snapshot
    .split("\n")
    .filter((line) => line.includes("heading"))
    .filter((line) => !line.match(new RegExp(CONFIG.HEADLINE_FILTER, "i")))
    .slice(0, 1)
    .map((line) => line.match(/heading "([^"]+)"/)?.[1])
    .filter(Boolean)[0];

  if (!headline) {
    console.log("❌ Headline not found!");
    return;
  }

  console.log(`📰 Headline: ${headline}`);
  runCmd(`${prefix} find text "${headline}" click`);
  await sleep(3000);

  const currentUrl = runCmd(`${prefix} get url`);
  console.log(`🔗 URL: ${currentUrl}`);

  console.log("📄 Getting article content...");
  const content = runCmd(`${prefix} get text "main"`);

  const cleanContent = content
    .split("\n")
    .filter((line) => !line.match(new RegExp(CONFIG.CONTENT_FILTER, "i")))
    .filter((line) => line.trim().length > 0)
    .join("\n");

  console.log("📄 ARTICLE CONTENT (CLEAN):");
  console.log("========================================");
  console.log(cleanContent);
  console.log("========================================");

  console.log("🤖 Sending to Ollama for Turkish summary...");
  const summary = await askOllama(cleanContent);
  console.log("========================================");
  console.log("📝 TURKISH SUMMARY:");
  console.log(summary);
  console.log("========================================");

  const endTime = Date.now();
  const endTimeStr = new Date(endTime).toLocaleString();
  const durationMs = endTime - startTime;
  const durationFormatted = formatDuration(durationMs);
  const durationSeconds = (durationMs / 1000).toFixed(2);

  console.log(`⏱️  Finished at: ${endTimeStr}`);
  console.log(
    `⏱️  Total duration: ${durationFormatted} (${durationSeconds} seconds)`,
  );
}

getNews().catch(console.error);
