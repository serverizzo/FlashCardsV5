import { View, Text, Button, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../utils/supabase";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "../context/userContext";
import { listItemsStyles } from "../themedComponents/listItemStyles";
import NewDeckModal from "./newDeckModal";

export default function Decks() {
  const { userId, setUserId } = useUser();
  const [decks, setDecks] = useState([]);
  const [showNewDeckModal, setShowNewDeckModal] = useState(false);

  useEffect(() => {
    getDecks();
  }, [userId]);

  async function getDecks() {
    console.log("getting decks");
    const res = await supabase
      .from("deck")
      .select("deck_name")
      .eq("user_id", userId);

    let arr: any = [];
    res.data?.forEach((ele) => {
      //   console.log(ele.deck_name);
      arr.push(ele.deck_name);
    });
    setDecks(arr);
  }

  return (
    <SafeAreaView>
      <ThemedText>Decks</ThemedText>

      <View>
        <FlatList
          data={decks}
          renderItem={({ item }) => (
            <TouchableOpacity
            // onPress={() => selectDeck(item)}
            >
              <View style={listItemsStyles.itemContainer}>
                <ThemedText style={listItemsStyles.itemPrimary}>
                  {item}
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
        <Button title="create new Deck" onPress={() => setShowNewDeckModal(true)}/>
      </View>
      <NewDeckModal setShowNewDeckModal={setShowNewDeckModal} showNewDeckModal={showNewDeckModal}/>
    </SafeAreaView>
  );
}
