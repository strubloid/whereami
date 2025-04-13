import React from 'react';
import { View, Text } from 'react-native';

interface WeatherTextBoxProps {
  styles: any;
  mapController: any;
  weather: any;
  weatherMessages: Record<string, string>;
}

const WeatherTextBox: React.FC<WeatherTextBoxProps> = ({ styles, mapController, weather, weatherMessages }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Today</Text>
      <Text style={styles.title}>
        {weatherMessages[mapController.getWeatherIcons(weather?.weathercode ?? 0) as keyof typeof weatherMessages] || "Weather information not available"}
      </Text>
    </View>
  );
};

export default WeatherTextBox;