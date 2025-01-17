export type SentimentResponse = {
  queryText: string;
  sentiment: string | undefined;
  sentimentScore: AWS.Comprehend.Types.SentimentScore | undefined;
};
