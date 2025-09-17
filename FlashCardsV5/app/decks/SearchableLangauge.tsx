import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme
} from "react-native";
// import { ScrollView } from "react-native-actions-sheet";
// import { useDeck } from "../deckDependencies/deckContext";
import { useDeck } from "../context/deckContext";
import { modalStyles } from "../themedComponents/modalStyles";
import { languages } from "./NLLBLanguages";

export default function SearchableLangauge() {
  const [searchValue, setSearchValue] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === "dark";
  const {
    deckName,
    setDeckName,
    cardsInDeck,
    setCardsInDeck,

    originalDeckLanguage,
    translatedDeckLanguage,
    setOriginalDeckLanguage,
    setTranslatedDeckLanguage,

    originalDeckLanguageCode,
    translatedDeckLanguageCode,
    setOriginalDeckLanguageCode,
    setTranslatedDeckLanguageCode,
  } = useDeck();

  const handlePress = (displayname:string, code:string) => {
    setSearchValue(displayname);
    setIsSelected(true);
    setTranslatedDeckLanguage(displayname);
    setTranslatedDeckLanguageCode(code);
  };

  const handleChange = (currentWord :string) => {
    setSearchValue(currentWord);
    setIsSelected(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={modalStyles.textboxContainer}>
      <TextInput
        style={modalStyles.textbox}
        value={searchValue}
        placeholder="Original language"
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {!isSelected && (
        <ScrollView style={{ minHeight: 40, maxHeight: 220 }}>
          {searchValue === "" &&
            Object.entries(languages).map(
              ([languageDisplayName, languageCode], index) => {
                // return <Button key={index} title={item.language} />;
                return (
                  <TouchableOpacity
                    onPress={() =>
                      handlePress(languageDisplayName, languageCode)
                    }
                    key={index}
                  >
                    <Text style={{ color: isDarkMode ? "white" : "black" }}> {languageDisplayName} </Text>
                  </TouchableOpacity>
                );
              }
            )}
          {searchValue !== "" &&
            Object.entries(languages)
              .filter(([languageDisplayName, languageCode]) => languageDisplayName.startsWith(searchValue))
              .map(([languageDisplayName, languageCode], index) => {
                // return <Button key={index} title={item.language} />;
                return (
                  <TouchableOpacity
                    onPress={() => handlePress(languageDisplayName, languageCode)}
                    key={index}
                  >
                    <Text style={{ color: isDarkMode ? "white" : "black" }}> {languageDisplayName} </Text>
                  </TouchableOpacity>
                );
              })}
        </ScrollView>
      )}
    </View>
  );
}
