import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../utils/supabase";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "../context/userContext";
import { listItemsStyles } from "../themedComponents/listItemStyles";
import NewDeckModal from "./newDeckModal";
import { useDeck } from "../context/deckContext";
import { useRouter } from "expo-router";

interface DeckRows {
  deck_name: string;
  deck_id: number;
  deck_type: string;
}

export default function Decks() {
  const { userId, setUserId } = useUser();
  const [decks, setDecks] = useState<DeckRows[] | null>([]);
  const [showNewDeckModal, setShowNewDeckModal] = useState(false);
  const { setDeckName, setDeckId, setDeckType } = useDeck();
  const router = useRouter();

  useEffect(() => {
    getDecks();
  }, [userId]);

  async function getDecks() {
    console.log("getting decks");
    const res = await supabase
      .from("deck")
      .select()
      .eq("user_id", userId);

    let arr: any = [];
    res.data?.forEach((ele: DeckRows) => {
      console.log(ele);
      arr.push(ele);
    });
    setDecks(arr);
  }

  const selectDeck = async (item: DeckRows) => {
    setDeckName(item.deck_name);
    setDeckId(item.deck_id);
    setDeckType(item.deck_type)

    // // fetch card list from given db
    const res = await supabase
    .from(item.deck_type + "_card")
    .select()
    .eq("deck_id", item.deck_id);

    console.log(res)

    // navigate to card list
    router.navigate("/cardlistroute");
  };

  return (
    <View>
      {/* <ThemedText>Decks</ThemedText> */}
      <View>
        <FlatList
          data={decks}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => selectDeck(item)}>
              <View style={listItemsStyles.itemContainer}>
                <ThemedText style={listItemsStyles.itemPrimary}>
                  {item.deck_name}
                </ThemedText>
                <ThemedText style={listItemsStyles.itemSecondary}>
                  Translation deck
                  {/* show what the forgien language is and how many cards are ready to be studied */}
                  {/* Show how many cards are ready to be studied i.e. 8/10 cards ready to be studied */}
                </ThemedText>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
        <Button
          title="create new Deck"
          onPress={() => setShowNewDeckModal(true)}
        />
      </View>
      <NewDeckModal
        setShowNewDeckModal={setShowNewDeckModal}
        showNewDeckModal={showNewDeckModal}
      />
    </View>
  );
}
