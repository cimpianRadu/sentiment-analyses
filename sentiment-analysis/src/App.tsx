import React from "react";

import "./App.css";
import { comprehend } from "./awsConfig.ts";
import { SentimentResponse } from "./types.ts";

/**
 * Probably I would move this outiside App.tsx
 */

const emojis: Record<AWS.Comprehend.Types.SentimentType, string> = {
  POSITIVE: "😊",
  NEGATIVE: "😢",
  NEUTRAL: "😐",
  MIXED: "🤔",
};

const sentimentOrder: Record<AWS.Comprehend.Types.SentimentType, number> = {
  POSITIVE: 4,
  NEUTRAL: 3,
  MIXED: 2,
  NEGATIVE: 1,
};

const sortResults = (data: SentimentResponse[]): SentimentResponse[] => {
  return data.sort((a, b) => {
    const aSentiment = a.sentiment || "NEGATIVE";
    const bSentiment = b.sentiment || "NEGATIVE";

    return sentimentOrder[bSentiment] - sentimentOrder[aSentiment];
  });
};

const renderEmojiBasedOnSentiment = (sentiment: AWS.Comprehend.Types.SentimentType | undefined) => {
  if (!sentiment) {
    return "❓"; // Return question mark if sentiment is undefined
  }

  return emojis[sentiment] || "❓";
};

function App() {
  const [input, setInput] = React.useState("");
  const [analyses, setAnalyses] = React.useState<SentimentResponse[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onAnalyse = async () => {
    console.log("onAnalyse", process.env.AWS_REGION);
    if (!input) {
      /**
       * Do some input validation, maybe display feedback to user
       */
      return;
    }
    setIsLoading(true);
    const params = {
      Text: input,
      LanguageCode: "en",
    };
    try {
      const response = await comprehend.detectSentiment(params).promise();

      const result: SentimentResponse = {
        queryText: input,
        sentiment: response.Sentiment,
        sentimentScore: response.SentimentScore,
      };
      const sortedResults = sortResults([...analyses, result]);
      setAnalyses(sortedResults);
      setInput("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while analyzing the sentiment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sentiment Analysis</h1>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <input
            type="text"
            value={input}
            /**
             * Debounce this when scale
             */
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a sentence"
            className="app-input"
          />

          <button onClick={onAnalyse} className="app-button">
            Check
          </button>
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          <ul className="app-list">
            {analyses.map((analyse: SentimentResponse, index: number) => (
              <li key={index} className="app-list-item">
                <strong>{analyse.queryText}</strong> - {renderEmojiBasedOnSentiment(analyse.sentiment)} ({analyse.sentiment})
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
