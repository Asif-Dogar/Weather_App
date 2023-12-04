import { TextInput, View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const SearchBar = (props) => {
  const [cName, setCName] = useState("");

  const TextHandler = (text) => {
    setCName(text);
  };

  const selectName = () => {
    props.newName(cName);
    //console.log(cName);
  };

  return (
    <View style={styles.InputTextStyle}>
      <TextInput placeholder="Enter City Name" onChangeText={TextHandler} />
      <Ionicons
        name="ios-search-outline"
        size={28}
        color="black"
        onPress={selectName}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  InputTextStyle: {
    borderWidth: 1.5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 80,
    padding: 10,
    borderRadius: 8,
    marginTop: "50%",
    backgroundColor: "#EEEEEE",
    borderColor: "white",
    fontSize: 12,
  },
});
