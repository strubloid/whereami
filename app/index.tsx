import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Maps } from '../components/Maps/Maps';
import { Picker } from '@react-native-picker/picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Weather, NullableWeather, FetchWeatherProps } from '../components/IWeather';

const Home = () => {

  // Starting the map controller
  let mapController = new Maps();
  let allLocations = mapController.getAll();

  let [currentLocation, setCurrentLocation] = useState(mapController.getDefaultLocation());

  const [weather, setWeather] = useState<NullableWeather>(null);
  const [loading, setLoading] = useState(true);

  // Loading the styles of this page
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    section: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginBottom: 10,
      padding: 20,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      backgroundColor: '#f9f9f9',
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
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
      textAlign: 'center',
    },
    list: {
      width: '100%',
      paddingHorizontal: 10,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 8,
    },
    bullet: {
      width: 8,
      height: 8,
      marginTop: 6,
      borderRadius: 4,
      backgroundColor: '#333',
      marginRight: 10,
    },
    listText: {
      fontSize: 16,
      color: '#444',
      flex: 1,
      flexWrap: 'wrap',
    },
  });

  const fetchWeather = async ({ setWeather, setLoading }: FetchWeatherProps): Promise<void> => {
    try {

      let latitude = currentLocation.lat;
      let longitude = currentLocation.lng;
      // console.log(latitude, longitude)

      // Fetching the weather data from Open Meteo API
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
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
   * @param cityName 
   */
  const handleSelectChange = (cityName: string) => {

    // we need to find the location by name
    let currentLocation = mapController.getAll().find(location => location.name === cityName);

    // we are only load something if exist the location
    if (currentLocation) {
      setCurrentLocation(currentLocation); // we update the current location
      fetchWeather({ setWeather, setLoading }); // we update the weather
    }

  };

  // Fetching the weather data when the component mounts
  useEffect(() => {
    fetchWeather({ setWeather, setLoading });
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.section}>
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
        <Text>
          Code: {weather?.weathercode}
        </Text>
        <Text>
          {mapController.getWeatherCodeDescription(weather?.weathercode ?? 0)}
        </Text>
        <Text>
        {mapController.getWeatherIcons(weather?.weathercode ?? 0)}
        </Text>
        <View style={styles.list}>
          <MaterialCommunityIcons name={mapController.getWeatherIcons(weather?.weathercode ?? 0)} size={50} color="black" />
        </View>
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

    </View>
  );
}

export default Home