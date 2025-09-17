import React, { createContext, useContext, useState } from "react";
// import { CardType } from "../context/interfaces";
import { CardType } from "../interfaces/CardType";

interface DeckContextType {
  deckName: string | null;
  setDeckName: (deckName: string | null) => void;
  cardsInDeck: CardType[] | null;
  setCardsInDeck: (cardsInDeck: string[] | null) => void;

  deckId: number | null;
  setDeckId: (deckId: number) => void;

  originalDeckLanguage: string | null;
  setOriginalDeckLanguage: (originalDeckLanguage: string | null) => void;
  translatedDeckLanguage: string | null;
  setTranslatedDeckLanguage: (translatedDeckLanguage: string | null) => void;

  originalDeckLanguageCode: string | null;
  setOriginalDeckLanguageCode: (originalDeckLanguage: string | null) => void;
  translatedDeckLanguageCode: string | null;
  setTranslatedDeckLanguageCode: (
    translatedDeckLanguage: string | null
  ) => void;
}

const DeckContext = createContext<DeckContextType>({
  deckName: null,
  setDeckName: () => {},
  cardsInDeck: null,
  setCardsInDeck: () => {},

  deckId: null,
  setDeckId: () => {},

  originalDeckLanguage: null,
  setOriginalDeckLanguage: () => {},
  translatedDeckLanguage: null,
  setTranslatedDeckLanguage: () => {},

  originalDeckLanguageCode: null,
  setOriginalDeckLanguageCode: () => {},
  translatedDeckLanguageCode: null,
  setTranslatedDeckLanguageCode: () => {},
});

export const DeckProvider = ({ children }) => {
  const [deckName, setDeckName] = useState("");
  const [cardsInDeck, setCardsInDeck] = useState([]);
  const [originalDeckLanguage, setOriginalDeckLanguage] = useState("");
  const [translatedDeckLanguage, setTranslatedDeckLanguage] = useState("");
  const [originalDeckLanguageCode, setOriginalDeckLanguageCode] = useState("");
  const [translatedDeckLanguageCode, setTranslatedDeckLanguageCode] =
    useState("");
  const [deckId, setDeckId] = useState(-1);

  return (
    <DeckContext.Provider
      value={{
        deckName,
        setDeckName,
        cardsInDeck,
        setCardsInDeck,

        deckId,
        setDeckId,

        originalDeckLanguage,
        setOriginalDeckLanguage,
        translatedDeckLanguage,
        setTranslatedDeckLanguage,

        originalDeckLanguageCode,
        setOriginalDeckLanguageCode,
        translatedDeckLanguageCode,
        setTranslatedDeckLanguageCode,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export const useDeck = () => {
  return useContext(DeckContext);
};
