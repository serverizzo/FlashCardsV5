import {
  View,
  Text,
  Modal,
  TextInput,
  Button,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import React, { useEffect, useState } from "react";
import { modalStyles } from "../themedComponents/modalStyles";
import { ThemedInput, ThemedModal } from "../themedComponents/ThemedComponents";
import { ThemedText } from "@/components/ThemedText";
import { MyDarkTheme } from "../themedComponents/MyDarkTheme";
import { useDeck } from "../context/deckContext";
import { supabase } from "../utils/supabase";
import { useUser } from "../context/userContext";
import SearchableLangauge from "./SearchableLangauge";

interface Props {
  showNewDeckModal: boolean;
  setShowNewDeckModal: (showNewDeckModal: boolean) => void;
}

export default function NewDeckModal({
  showNewDeckModal,
  setShowNewDeckModal,
}: Props) {
  useEffect(() => {
    console.log("showNewDeckModal is", showNewDeckModal);
  }, [showNewDeckModal]);

  const { setDeckName } = useDeck();
  const { userId } = useUser();
  const [newDeckName, setNewDeckName] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [deckType, setDecktype] = useState([
    "Foreign language",
    "Picture",
    "Standard",
  ]);
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  

  const createNewDeck = async () => {
    console.log("create new deck");
    const { error } = await supabase
      .from("deck")
      .insert({ deck_name: newDeckName, user_id: userId });

    console.log(error);
  };

  const handleChange = (currentWord: string) => {
    setSearchValue(currentWord);
    setIsSelected(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handlePress = (deckType: string) => {
    setSearchValue(deckType);
    setIsSelected(true);
    // setTranslatedDeckLanguage(displayname);
    // setTranslatedDeckLanguageCode(code);
  };

  return (
    <ThemedModal
      animationType="slide"
      visible={showNewDeckModal}
      onRequestClose={() => setShowNewDeckModal(false)}
      //   backdropColor={'rgba(46, 46, 46, 1)'}
    >
      <ThemedText> Create a new deck </ThemedText>
      <View style={modalStyles.container}>
        <View style={modalStyles.textboxContainer}>
          <ThemedInput
            placeholder="Name of new deck"
            value={newDeckName}
            onChangeText={setNewDeckName}
          />
        </View>
      </View>

      <View style={modalStyles.container}>
        <View style={modalStyles.textboxContainer}>
          <ThemedInput
            value={searchValue}
            onChangeText={setSearchValue}
            placeholder="Deck Type"
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          {!isSelected && (
            <ScrollView
              style={{ minHeight: 40, maxHeight: 220, paddingBottom: 15 }}
            >
              {searchValue === "" &&
                deckType.map((deckType, index) => {
                  // return <Button key={index} title={item.language} />;
                  return (
                    <TouchableOpacity
                      onPress={() => handlePress(deckType)}
                      key={index}
                    >
                      <Text style={{ color: isDarkMode ? "white" : "black" }}>
                        {" "}
                        {deckType}{" "}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              {searchValue !== "" &&
                deckType
                  .filter((deckType) => deckType.startsWith(searchValue))
                  .map((deckType, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => handlePress(deckType)}
                        key={index}
                      >
                        <Text style={{ color: isDarkMode ? "white" : "black" }}>
                          {" "}
                          {deckType}{" "}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
            </ScrollView>
          )}
        </View>
        {searchValue == "Foreign language" && (
          <View>
            <SearchableLangauge />
          </View>
        )}
      </View>

      <Button title="add deck" onPress={() => createNewDeck()} />
    </ThemedModal>
  );
}
