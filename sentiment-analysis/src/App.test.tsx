import { sortResults } from "./App";
import { SentimentResponse } from "./types";

describe("sortResults", () => {
  it("should sort results by the highest sentiment score", () => {
    const data: SentimentResponse[] = [
      { queryText: "A", sentiment: "POSITIVE", sentimentScore: { Positive: 0.3, Neutral: 0.2 } },
      { queryText: "B", sentiment: "NEUTRAL", sentimentScore: { Positive: 0.5, Neutral: 0.3 } },
      { queryText: "C", sentiment: "NEGATIVE", sentimentScore: { Positive: 0.2, Neutral: 0.6 } },
    ];
    const sorted = sortResults(data);
    expect(sorted[0].queryText).toBe("B");
    expect(sorted[1].queryText).toBe("A");
    expect(sorted[2].queryText).toBe("C");
  });

  it("should handle missing sentiment scores", () => {
    const data: SentimentResponse[] = [
      { queryText: "A", sentiment: "POSITIVE", sentimentScore: { Positive: 0.3 } },
      { queryText: "B", sentiment: "NEUTRAL", sentimentScore: undefined },
    ];
    const sorted = sortResults(data);
    expect(sorted[0].queryText).toBe("A");
  });

  it("should handle equal scores", () => {
    const data: SentimentResponse[] = [
      { queryText: "A", sentiment: "POSITIVE", sentimentScore: { Positive: 0.3 } },
      { queryText: "B", sentiment: "NEUTRAL", sentimentScore: { Positive: 0.3 } },
      { queryText: "C", sentiment: "NEGATIVE", sentimentScore: { Positive: 0.8 } },
    ];
    const sorted = sortResults(data);
    expect(sorted[0].queryText).toBe("C");
    expect(sorted[1].queryText).toBe("A");
    expect(sorted[2].queryText).toBe("B");
  });

  it("should sort by sentiment if all scores are equal", () => {
    const data: SentimentResponse[] = [
      { queryText: "A", sentiment: "NEUTRAL", sentimentScore: { Positive: 0.3, Neutral: 0.2 } },
      { queryText: "B", sentiment: "POSITIVE", sentimentScore: { Positive: 0.3, Neutral: 0.2 } },
    ];
    const sorted = sortResults(data);
    expect(sorted[0].queryText).toBe("B");
    expect(sorted[1].queryText).toBe("A");
  });

  it("should sort by MIXED if POSITIVE are equal", () => {
    const data: SentimentResponse[] = [
      { queryText: "A", sentiment: "POSITIVE", sentimentScore: { Positive: 0.3, Mixed: 0.8, Neutral: 0.9, Negative: 0.2 } },
      { queryText: "B", sentiment: "NEUTRAL", sentimentScore: { Positive: 0.3, Mixed: 0.2, Neutral: 0.2, Negative: 0.7 } },
    ];
    const sorted = sortResults(data);
    expect(sorted[0].queryText).toBe("A");
    expect(sorted[1].queryText).toBe("B");
  });
});
