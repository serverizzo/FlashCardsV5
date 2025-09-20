
export interface ForeignLanguageCard{
  original_word: string,
  translated_word: string,
  example_usage: any
  current_level: number, 
  last_studied: Date,
  next_review: Date,
  numberOfTimeCorrectThisSession: number
}