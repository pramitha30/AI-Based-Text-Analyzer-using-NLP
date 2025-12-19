
export enum SentimentLabel {
  POSITIVE = 'Positive',
  NEGATIVE = 'Negative',
  NEUTRAL = 'Neutral'
}

export interface Entity {
  name: string;
  type: string;
  relevance: number;
}

export interface AnalysisResult {
  summary: string;
  sentiment: {
    label: SentimentLabel;
    score: number; // 0 to 1
    explanation: string;
  };
  entities: Entity[];
  keyphrases: string[];
  readability: {
    score: number;
    level: string;
    suggestions: string[];
  };
  tone: {
    primary: string;
    secondary: string;
    formalityScore: number; // 0 to 100
  };
  intent: string;
  language: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  text: string;
  result: AnalysisResult;
}
