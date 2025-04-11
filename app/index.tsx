import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Maps } from '../components/Maps/Maps';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Weather, NullableWeather, FetchWeatherProps } from '../components/IWeather';
import { WeatherBackgroundImages } from '../components/WeatherBackgroundImages';

const Home = () => {

  // Starting the map controller
  let mapController = new Maps();
  let allLocations = mapController.getAll();
  let [currentLocation, setCurrentLocation] = useState(mapController.getDefaultLocation());

  const [weather, setWeather] = useState<NullableWeather>(null);
  const [loading, setLoading] = useState(true);

  // Loading the styles of this page
  const styles = StyleSheet.create({
    scrollView: {
      display: 'flex',
      marginTop: 10,
      alignItems: 'center',
      justifyContent: 'flex-start',
      alignContent: 'center',
    },
    background: {
      backgroundColor: 'red',
    },
    imageTitle: {
      position: 'absolute',
      objectFit: 'cover',
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      width: '100%',
      height: '100%',
      // flex: 1,
      margin: 0,
      padding: 0,
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      marginBottom: 10,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#f9f9f9',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },

    title: {
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
    },
    list: {
      // width: '100%',
      // paddingHorizontal: 10,
      backgroundColor: "pink",
    },
    listItem: {
      // flexDirection: 'row',
      // alignItems: 'flex-start',
      // marginBottom: 8,
      backgroundColor: "blue",
    },

    pickerWrapper: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: '#f9f9f9',
    },
    picker: {
      height: 50,
      width: '100%',
      paddingHorizontal: 10,
      color: '#333',
    },
    pickeritem: {
      height: 50,
      width: '100%',
    }
  });

  /**
   * This function will be doing the fetch of the weather using the API from Open Meteo.
   * @param params.setWeather
   * @param params.setLoading
   * @description This function fetches the weather data from the Open Meteo API and updates the state with the current weather.
   * @returns {Promise<void>}
   * @throws {Error} If there is an issue with the network or the response is not ok.
   */
  const fetchWeather = async ({ setWeather, setLoading }: FetchWeatherProps): Promise<void> => {
    try {

      let latitude = currentLocation.lat;
      let longitude = currentLocation.lng;

      // Fetching the weather data from Open Meteo API
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
      );

      // First validation, is the response ok?
      if (!response.ok) {
        throw new Error('Issues with the network');
      }

      const data = await response.json();
      setWeather(data.current_weather as Weather);

    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };



  /**
   * 
   * @param placeName 
   */
  const handleSelectChange = (placeName: string) => {

    // we need to find the location by name
    let currentLocation = mapController.getAll().find(location => location.name === placeName);

    // we are only load something if exist the location
    if (currentLocation) {
      setCurrentLocation(currentLocation); // we update the current location
      fetchWeather({ setWeather, setLoading }); // we update the weather
    }

  };

  // Fetching the weather data when the component mounts
  useEffect(() => {
    console.log("Staring page");
    fetchWeather({ setWeather, setLoading });
    
  }, []);


  return (

    <ScrollView contentContainerStyle={[styles.scrollView, styles.background]}>


      <Image
        source={WeatherBackgroundImages[mapController.getWeatherIcons(weather?.weathercode ?? 0) as keyof typeof WeatherBackgroundImages]}
        style={styles.imageTitle}
        resizeMode="cover"
      />

      <View style={styles.section}>

        <Text>Here 2 : {mapController.getWeatherIcons(weather?.weathercode ?? 0)} </Text>
        
      </View>
      <View style={styles.section}>
        <View style={styles.list}>
          <MaterialCommunityIcons style={styles.listItem} name={mapController.getWeatherIcons(weather?.weathercode ?? 0)} size={50} color="black" />
        </View>
        <Text style={styles.title}>{currentLocation.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>In {currentLocation.name}, it’s not just the landmarks that stay with you — it’s the quiet corners,
          the scent in the air, the way people move like they’ve always known the rhythm of the place. A simple walk there isn’t just
          a stroll; it’s a slow unraveling of stories the city keeps tucked in between cracks and corners. Look up, take your time, and
          let {currentLocation.name} show you how even an ordinary day can feel like a little piece of magic!</Text>
        <Text style={styles.title}>Lat: {currentLocation.lat}</Text>
        <Text style={styles.title}>Lng: {currentLocation.lng}</Text>
      </View>

      <View style={styles.section}>
        <Text>Temperature: {weather?.temperature}°C</Text>
        <Text>Windspeed: {weather?.windspeed} km/h</Text>
        <Text>Time: {weather?.time}</Text>
        <Text>Code: {weather?.weathercode}</Text>
        <Text>{mapController.getWeatherCodeDescription(weather?.weathercode ?? 0)}</Text>
        <Text>{mapController.getWeatherIcons(weather?.weathercode ?? 0)}</Text>
      </View>

      <View style={styles.section}>
        <Picker
          selectedValue={currentLocation.name}
          onValueChange={handleSelectChange}
          style={styles.picker}
        >
          {allLocations.map((location, index) => (
            <Picker.Item style={styles.pickeritem} key={index} label={location.name} value={location.name} />
          ))}
        </Picker>
      </View>

    </ScrollView>
  );
}

export default Home