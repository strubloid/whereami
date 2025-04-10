import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';


const Home = () => {
  
  const [weather, setWeather] = useState<NullableWeather>(null);
  const [loading, setLoading] = useState(true);

  // Berlin data, to test
  // const latitude = 52.52;   
  // const longitude = 13.41;

  // Cork
  const latitude = 51.89;   
  const longitude =  8.47;
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    title: {
      fontSize: 20,
      marginBottom: 10
    }
  });

  interface Weather {
    temperature: number;
    windspeed: number;
    time: string;
  }

  type NullableWeather = Weather | null;

  interface FetchWeatherProps {
    setWeather: React.Dispatch<React.SetStateAction<Weather | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }

  const fetchWeather = async ({ setWeather, setLoading }: FetchWeatherProps): Promise<void> => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
      );
      const data = await response.json();
      console.log(data)
      setWeather(data.current_weather as Weather);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather({setWeather, setLoading});
  }, []);

  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Weather in Cork</Text>
      <Text>Temperature: {weather?.temperature}°C</Text>
      <Text>Windspeed: {weather?.windspeed} km/h</Text>
      <Text>Time: {weather?.time}</Text>
    </View>
  );
}

export default Home

const styles = StyleSheet.create({})