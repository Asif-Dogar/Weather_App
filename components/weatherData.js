import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Switch,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  clear_day,
  clear_night,
  cloud_day,
  cloud_night,
  haze_day,
  haze_night,
  rain_day,
  rain_night,
  snow_day,
  snow_night,
} from "../assets/backgrounds/index";

const API_KEY = "5c13089dcb9507e721679dd8de318ba9";

const WeatherData = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState();
  const [backgroundImg, setBackgroundImg] = useState("");

  const convertFahrenheitToCelsius = (fahrenheit) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  async function getWeatherData(cityName) {
    setLoading(true);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;

    let res = await fetch(API);
    if (res.status == 200) {
      res = await res.json();
      const modifiedtempdata = {
        ...res,
        main: { ...res.main, temp: convertFahrenheitToCelsius(res.main.temp) },
      };
      setWeatherData(modifiedtempdata);
    } else {
      setWeatherData(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    const iconobj = {
      snow: <FontAwesome name="snowflake-o" size={48} color="white" />,
      clear: <Feather name="sun" size={48} color="white" />,
      rain: <Ionicons name="rainy" size={48} color="white" />,
      haze: <Fontisto name="day-haze" size={48} color="white" />,
      cloud: <Entypo name="cloud" size={48} color="white" />,
    };

    if (weatherData != null) {
      const now = new Date();
      const sunrise = new Date(weatherData.sys.sunrise * 1000);
      const sunset = new Date(weatherData.sys.sunset * 1000);
      const isDayTime = now > sunrise && now < sunset;

      switch (weatherData.weather[0].main) {
        case "Snow":
          setIcon(iconobj.snow);
          isDayTime ? setBackgroundImg(snow_day) : setBackgroundImg(snow_night);
          break;
        case "Clear":
          setIcon(iconobj.clear);
          isDayTime
            ? setBackgroundImg(clear_day)
            : setBackgroundImg(clear_night);
          break;
        case "Rain":
          setIcon(iconobj.rain);
          isDayTime ? setBackgroundImg(rain_day) : setBackgroundImg(rain_night);
          break;
        case "Haze":
          setIcon(iconobj.haze);
          isDayTime ? setBackgroundImg(haze_day) : setBackgroundImg(haze_night);
          break;
        case "Cloud":
          setIcon(iconobj.cloud);
          isDayTime
            ? setBackgroundImg(cloud_day)
            : setBackgroundImg(cloud_night);
          break;
        default:
          setIcon(iconobj.haze);
          isDayTime ? setBackgroundImg(haze_day) : setBackgroundImg(haze_night);
      }
      props.background(backgroundImg);
    }
  }, [weatherData]);

  // useEffect(() => {
  //   getWeatherData(props.cityName);
  // }, []);

  useEffect(() => {
    if (props.cityName !== "") {
      getWeatherData(props.cityName);
    }
  }, [props.cityName]);

  if (loading) {
    return <ActivityIndicator size={"large"} />;
  } else if (weatherData == null) {
    return (
      <Text style={{ textAlign: "center", fontSize: 48 }}>Enter City Name</Text>
    );
  } else {
    return (
      <View>
        <View style={styles.backgroundstyle}></View>
        <Text style={styles.degree}> {weatherData.wind.deg}° </Text>
        <Text style={styles.cityStyle}> {weatherData.name} </Text>

        <View style={styles.iconsStyl}>
          <View style={styles.hTStyle}>
            <Text style={{ color: "white", fontSize: 18 }}>
              Humidity: {weatherData.main.humidity}
            </Text>
            <Text style={{ color: "white", fontSize: 18 }}>
              Temperature: {weatherData.main.temp.toFixed(2)}°C
            </Text>
          </View>

          <View>
            <Text>{icon}</Text>
          </View>
        </View>
      </View>
    );
  }
};

export default WeatherData;

const styles = StyleSheet.create({
  degree: {
    fontSize: 60,
    marginTop: "30%",
    textAlign: "center",
    color: "white",
  },
  cityStyle: {
    fontSize: 35,
    textAlign: "center",
    color: "white",
  },
  iconsStyl: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 50,
    height: "50%",
    alignItems: "center",
  },
  hTStyle: {
    backgroundColor: "black",
    padding: 20,
    borderRadius: 6,
    // opacity: 200,
  },
  backgroundstyle: {
    backgroundColor: "black",
    position: "absolute",
    top: 105,
    height: 145,
    width: "80%",
    borderRadius: 8,
    opacity: 0.5,
  },
});
