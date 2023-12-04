import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import SearchBar from "./components/searchBar";
import WeatherData from "./components/weatherData";
import { useState } from "react";

export default function App() {
  const [savedName, setSavedName] = useState("");
  const [backgroundimage, setBackgroundImage] = useState("");

  const cityNameHandler = (name) => {
    setSavedName(name);
    // console.log(name);
  };

  const setbackgroundHandler = (background) => {
    setBackgroundImage(background);
    console.log(background);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundimage}
        resizeMode="cover"
        style={styles.container}
      >
        <SearchBar newName={cityNameHandler} />

        <WeatherData cityName={savedName} background={setbackgroundHandler} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width,
    height: "100%",
  },
});
