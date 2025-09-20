import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useDeck } from "../context/deckContext";
import { ThemedText } from "@/components/ThemedText";
import { listItemsStyles } from "../themedComponents/listItemStyles";

export default function CardsList() {
  const { cardsInDeck } = useDeck();

  useEffect(() => {
    console.log("cardsInDeck changed in cardslist: ", cardsInDeck);
  }, [cardsInDeck]);

  return (
    <View>
      <FlatList
        data={cardsInDeck}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View style={listItemsStyles.itemContainer}>
              <ThemedText style={listItemsStyles.itemPrimary}>{item.translated_word}</ThemedText>
              <ThemedText style={listItemsStyles.itemSecondary}>{item.original_word}</ThemedText>
            </View>
          </TouchableOpacity>
        )}
      ></FlatList>
    </View>
  );
}
