import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface WeatherBubbleProps {
  styles: any;
  mapController: any;
  weather: any;
  currentLocation: any;
}

const WeatherBubble: React.FC<WeatherBubbleProps> = ({ styles, mapController, weather, currentLocation }) => {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.list}>
        <MaterialCommunityIcons
          style={styles.listItem}
          name={mapController.getWeatherIcons(weather?.weathercode ?? 0)}
          size={50}
          color="black"
        />
      </View>
      <Text style={styles.title}>{currentLocation.name}</Text>
      <Text style={styles.title}>{weather?.temperature}°C</Text>
    </View>
  );
};

export default WeatherBubble;