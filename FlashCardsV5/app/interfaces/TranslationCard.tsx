
export interface ForeignLanguageCard{
  originalWord: string,
  translatedWord: string,
  exampleUsage: any
  currentLevel: number, 
  lastStudied: Date,
  nextReview: Date,
  numberOfTimeCorrectThisSession: number
}