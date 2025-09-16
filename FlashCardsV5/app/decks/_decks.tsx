import NewDeckSheet2 from "@/src/deckDependencies/newDeckSheet2";
import { listItemsStyles } from "@/src/styles/listItemsStyles";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../context/userContext";
import { useDeck } from "../../deckDependencies/deckContext";
import { db } from "../../firestoreConfigurations/FirebaseConfig.jsx";

// export const CustomText = ({ children }: PropsWithChildren) => (
//   <Text>{children}</Text>
// );

export default function Decks() {
  const { user, setUser } = useUser();
  const { deckName, setDeckName, cardsInDeck, setCardsInDeck } = useDeck();
  // const [ decks, setDecks ] = useState(["deck1", "deck2", "deck3"]);
  const [decks, setDecks] = useState<string[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [showNewDeckSheet2, setShowNewDeckSheet2] = useState(false);

  const fetchDecks = async () => {
    console.log("Fetching decks...");
    setLoading(true);
    console.log(user);
    console.log("User: ", user?.uid);
    const temp: string[] = [];
    try {
      if (!user) {
        throw new Error("User must be logged in to fetch decks");
      }
      const querySnapshot = await getDocs(
        collection(db, "users", user.uid, "decks")
      );
      // const querySnapshot = await getDocs(collection(db, "users/" + user.uid));
      querySnapshot.forEach((doc) => {
        console.log(doc);
        console.log(doc.id);
        temp.push(doc.id);
        console.log(doc.data());
      });
      setDecks(temp);
    } catch (error) {
      console.error("Error fetching decks: ", error);
    }
    setLoading(false);
  };

  // TODO: Create a modal that allows the user to create a new deck
  const createNewDeck = async () => {
    console.log("Creating new deck...");
    try {
      if (!user || !user.uid) {
        throw new Error("User not logged in or user ID not available.");
      }
      const docRef = await addDoc(collection(db, "users", user.uid, "decks"), {
        name: "Tokyo",
        country: "Japan",
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const selectDeck = async (deckNameParam: string) => {
    // Bug: deckNameParam is undefined when called from the button onPress -- pressing it multiple times eventually sets the deckname correctly
    console.log("Selecting deck...");
    setDeckName(deckNameParam);
    // setCardsInDeck(["setCard1", "setCard2", "setCard3"]);
    console.log("Deck name set to: ", deckName);

    router.push("/cardlist");
  };

  useEffect(() => {
    console.log("in decks, deckname has updated to ", deckName);
    fetchDecks();
  }, [deckName]);

  useEffect(() => {
    fetchDecks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      {!loading && (
        <View style={styles.container}>
          <Text>Decks</Text>
          <Button title="Fetch Deck" onPress={fetchDecks}></Button>

          <View>
            <FlatList
              data={decks}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectDeck(item)}>
                  <View style={listItemsStyles.itemContainer}>
                    <Text style={listItemsStyles.itemPrimary}>
                      {item}
                    </Text>
                    <Text style={listItemsStyles.itemSecondary}>
                      Translation deck {/* show what the forgien language is and how many cards are ready to be studied */}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <AntDesign
            style={styles.addButton}
            onPress={() => {
              console.log("pressed");
              setShowNewDeckSheet2(true);
              // SheetManager.show("NewCardSheet", {
              //   payload: { user: user, deckName: deckName } as any,
              // });
            }}
            name="pluscircle"
            size={60}
            color="black"
          />

          <NewDeckSheet2
            showNewDeckSheet2={showNewDeckSheet2}
            setShowNewDeckSheet2={setShowNewDeckSheet2}
            setDeckName={setDeckName}
          />

          {/* <Button
            title="Create New Deck"
            onPress={() => {
              SheetManager.show("NewDeckSheet", {
                payload: { user: user, setDeckName: setDeckName },
              });
            }}
          ></Button> */}
        </View>
      )}
    </SafeAreaView>
  );
}

const { width, height } = Dimensions.get("window");
const buttonWidth = 0.8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  addButton: {
    position: "absolute",
    top: height * 0.8,
    left: width * buttonWidth,
    // border: "1px solid black",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 60,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
