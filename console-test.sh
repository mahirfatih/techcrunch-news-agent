#!/bin/bash

# kill old lightpandas
pkill -f "lightpanda"
sleep 3

# ============ FİLTRELER ============
HEADLINE_FILTER="Latest News|Save up to|REGISTER|SPONSORED|In Brief|Loading ad|REGISTER NOW|Most Popular"

CONTENT_FILTER="Scale faster|Save up to|REGISTER NOW|Most Popular|Instagram introduces|advertisement|Sponsored|Load More|Headlines Only|Latest News|Loading ad|seconds of|secondsVolume"
# ===================================

echo "🚀 TechCrunch - Get Article Content (get text)"

# 1. Open the page
agent-browser --session techcrunch --engine lightpanda open https://techcrunch.com/latest
sleep 3

# 2. Find the first article headline and click it
HEADLINE=$(agent-browser --session techcrunch --engine lightpanda snapshot -i | \
    grep "heading" | \
    grep -vE "$HEADLINE_FILTER" | \
    head -1 | \
    sed 's/.*"\(.*\)" \[ref.*/\1/')

echo "📰 Headline: $HEADLINE"
agent-browser --session techcrunch --engine lightpanda find text "$HEADLINE" click
sleep 3

# 3. Get the content (using get text) + APPLY FILTER
echo "📄 ARTICLE CONTENT (CLEAN):"
echo "========================================"
agent-browser --session techcrunch --engine lightpanda get text "main" | \
    grep -vE "$CONTENT_FILTER" | \
    awk 'NF'
echo "========================================"
