import { StyleSheet, useColorScheme } from "react-native";


const colorScheme = useColorScheme();
const isDarkMode = colorScheme === "dark";

export const listItemsStyles = StyleSheet.create({
  itemSecondary: {
    // padding: 10,
    paddingLeft: 10,
    fontSize: 16,
    // height: 60,
    color: isDarkMode ?  "#8a8a8aff": "#666666"
  },
  itemPrimary: {
    // padding: 10,
    fontSize: 18,
    // height: 60,
  },
  itemContainer: {
    padding: 10,
    paddingLeft: 20,
  }
});