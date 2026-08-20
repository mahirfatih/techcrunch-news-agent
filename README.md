# TechCrunch News Agent — Turkish Summarizer with Lightpanda + Ollama

An autonomous, local LLM-driven browser automation agent that fetches the latest TechCrunch article and generates a Turkish summary using Ollama + Lightpanda.

---

## 🛠️ Tech Stack & Dependencies

- **Runtime & Language:** [Node.js](https://nodejs.org/) (ES Modules)
- **Local LLM Engine:** [Ollama](https://ollama.com/) with **[Ornith-1.0-9B](https://huggingface.co/ornith-ai)** model from DeepReinforce
- **Browser Automation:** [agent-browser](https://github.com/vercel/agent-browser) (using Lightpanda as the engine via `--engine lightpanda`)
- **Headless Browser Engine:** [Lightpanda](https://lightpanda.io/) (9x faster, 16x less memory)

---

## ✨ Features

- **Automatic Article Extraction:** Opens TechCrunch Latest and extracts the main article content.
- **Content Cleaning:** Extracts clean article text from the page.
- **Turkish Summarization:** Sends cleaned content to Ollama and returns a 3-4 sentence Turkish summary.
- **Execution Metrics:** Displays start time, finish time, and total duration (minutes + seconds).
- **Deterministic & Lightweight:** Runs with `temperature: 0.0` and uses Lightpanda for 9x faster performance with 16x less memory.

---

## 🚀 Installation & Quick Start

### 1. Prerequisites

Make sure Ollama is running on your machine:

```bash
ollama serve
```

Pull the model (if not already downloaded):

```bash
ollama pull Ornith-1.0-9B
```

### 2. Install Dependencies

Clone the repository, then install packages:

```bash
npm install
```

### 3. Run the Project

Start the agent:

```bash
npm start
# or
node default.js
```

---

## 📝 Example Output

```
🚀 TechCrunch - Get News + Turkish Summary
⏱️  Started at: 8/18/2026, 3:45:12 PM
🧠 Model: Ornith-1.0-9B

📂 Opening page...
🔍 Finding headline...
📰 Headline: OpenAI institutes new safeguards after Hugging Face breach
🔗 URL: https://techcrunch.com/2026/08/18/openai-safeguards-hugging-face-breach/
📄 Getting article content...
📄 ARTICLE CONTENT (CLEAN):
========================================
On Tuesday, OpenAI announced a new batch of security policies...
========================================
🤖 Sending to Ollama for Turkish summary...
========================================
📝 TURKISH SUMMARY:
OpenAI, Hugging Face ihlalinin ardından yeni güvenlik politikaları duyurdu...
========================================
⏱️  Finished at: 8/18/2026, 3:45:28 PM
⏱️  Total duration: 16 seconds (16.42 seconds)
```

---

## 🔧 Configuration

Edit `config.js` to customize filters and model settings:

```javascript
export const CONFIG = {
  NEWS_URL: "https://techcrunch.com/latest/",

  HEADLINE_FILTER:
    "Latest News|Save up to|REGISTER|SPONSORED|In Brief|Loading ad|REGISTER NOW|Most Popular",
  CONTENT_FILTER:
    "Scale faster|Save up to|REGISTER NOW|Most Popular|advertisement|Sponsored|...",

  MODEL: {
    NAME: "Ornith-1.0-9B",
    TEMPERATURE: 0.0, // Controls randomness: 0.0 makes the output completely deterministic and focused.
    TOP_P: 0.1, // Nucleus sampling: limits token selection to the top 10% cumulative probability mass.
    TOP_K: 20, // Limits the vocabulary pool to the top 20 most likely next tokens at each step.
    MIN_P: 0.0, // Minimum probability threshold relative to the most likely token (0.0 means disabled).
    NUM_CTX: 4096, // Sets the size of the context window in tokens (maximum memory length for prompt + response).
    NUM_PREDICT: 200, // Limits the maximum number of tokens the model can generate in a single response.
    REPETITION_PENALTY: 1.1, // Slightly penalizes repeated tokens to avoid loops.
    PRESENCE_PENALTY: 0.0, // Disabled; no penalty for token presence.
  },

  OLLAMA: {
    API_URL: "http://localhost:11434/api/chat",
    STREAM: false, // Disable streaming
    THINK: false, // Disable thinking mode
  },

  PROMPT:
    "You are a Turkish summarizer. Summarize the given news article in 3-4 sentences in Turkish. Only output the summary, nothing else.",
};
```

---

## 📄 License

This project is licensed under the MIT License.
