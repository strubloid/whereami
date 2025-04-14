import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface WeatherBubbleProps {
  styles: any;
  mapController: any;
  weather: any;
  currentLocation: any;
}

/**
 * This component displays bubble on the top that shows an icon of the weather
 * the name of selected place, and a how is the teamperature.
 * It shows the weather message based on the weather code provided by the map controller.
 * 
 * @param param - styles: styles of the page
 * @param param - mapController: the map controller to get the weather information
 * @param param - weather: the weather information
 * @param currentLocation - Current location information
 * @returns React.FC<WeatherBubbleProps> This is a TypeScript type annotation that means: 
 * This component is a React Function Component. It expects props that match the WeatherBubbleProps interface
 */
const WeatherBubble: React.FC<WeatherBubbleProps> = ({ styles, mapController, weather, currentLocation }) => {
  return (
    <View style={[styles.sectionHeader, styles.shadows]}>
      <View style={styles.list}>
        <MaterialCommunityIcons
          style={styles.listItem}
          name={mapController.getWeatherIcons(weather?.weathercode ?? 0)}
          size={50}
          color="black"
        />
      </View>
      <Text style={styles.line}>{currentLocation.name}</Text>
      <Text style={styles.line}>{weather?.temperature}°C</Text>
    </View>
  );
};

export default WeatherBubble;