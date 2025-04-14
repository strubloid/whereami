import React from 'react';
import { View, Text } from 'react-native';

interface WeatherTextBoxProps {
  styles: any;
  mapController: any;
  weather: any;
  weatherMessages: Record<string, string>;
}

/**
 * This component displays the weather information in a text box.
 * It shows the weather message based on the weather code provided by the map controller.
 * 
 * @param param - styles: styles of the page
 * @param param - mapController: the map controller to get the weather information
 * @param param - weather: the weather information
 * @param param - weatherMessages: the weather messages to display
 * @returns React.FC<WeatherTextBoxProps> This is a TypeScript type annotation that means: 
 * This component is a React Function Component. It expects props that match the WeatherTextBoxProps interface
 */
const WeatherTextBox: React.FC<WeatherTextBoxProps> = ({ styles, mapController, weather, weatherMessages }) => {
  return (
    <View style={[styles.section, styles.shadows, styles.textBox]}>
      <Text style={styles.line}>Today</Text>
      <Text style={styles.line}>
        {weatherMessages[mapController.getWeatherIcons(weather?.weathercode ?? 0) as keyof typeof weatherMessages] || "Weather information not available"}
      </Text>
    </View>
  );
};

export default WeatherTextBox;