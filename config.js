export const CONFIG = {
  NEWS_URL: "https://techcrunch.com/latest/",

  HEADLINE_FILTER:
    "Latest News|Save up to|REGISTER|SPONSORED|In Brief|Loading ad|REGISTER NOW|Most Popular",
  CONTENT_FILTER:
    "Scale faster|Save up to|REGISTER NOW|Most Popular|Instagram introduces|advertisement|Sponsored|Load More|Headlines Only|Latest News|Loading ad|seconds of|secondsVolume",
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
  PROMPT: `You are a Turkish summarizer. Summarize the given news article in 3-4 sentences in Turkish. Only output the summary, nothing else.`,
};
