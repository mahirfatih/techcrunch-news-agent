export const CONFIG = {
  NEWS_URL: "https://techcrunch.com/latest/",

  HEADLINE_FILTER:
    "Latest News|Save up to|REGISTER|SPONSORED|In Brief|Loading ad|REGISTER NOW|Most Popular",
  CONTENT_FILTER:
    "Scale faster|Save up to|REGISTER NOW|Most Popular|Instagram introduces|advertisement|Sponsored|Load More|Headlines Only|Latest News|Loading ad|seconds of|secondsVolume",
  MODEL: {
    NAME: "Ornith-1.0-9B",
    TEMPERATURE: 0.0, // Deterministic output
    TOP_P: 0.1, // Nucleus sampling
    TOP_K: 20, // Top K sampling
    MIN_P: 0.0, // Minimum probability threshold
    NUM_CTX: 4096, // Context window size
    NUM_PREDICT: 200, // Max tokens to generate
  },
  OLLAMA: {
    API_URL: "http://localhost:11434/api/chat",
    STREAM: false, // Disable streaming
    THINK: false, // Disable thinking mode
  },
  PROMPT: `You are a Turkish summarizer. Summarize the given news article in 3-4 sentences in Turkish. Only output the summary, nothing else.`,
};
