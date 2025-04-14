import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface WeatherSelectProps {
  styles: any;
  currentLocation: any;
  allLocations: any[];
  handleSelectChange: (placeName: string) => void;
}

/**
 * This function shows the weather select field, that is importing a main function handleSelectChange
 * that will be triggering rules and things change into the application layout.
 * @param param - styles: styles of the page 
 * @param currentLocation - Current location information
 * @param allLocations - all locations, place to match data and retrieve an object to use into API
 * @param handleSelectChange - this is the main function that know what to do when we change the select field data
  * @returns React.FC<WeatherSelectProps> This is a TypeScript type annotation that means: 
 * This component is a React Function Component. It expects props that match the WeatherSelectProps interface
 */
const WeatherSelect: React.FC<WeatherSelectProps> = ({ styles, currentLocation, allLocations, handleSelectChange }) => {
  return (
    <View style={[styles.pickerWrapper, styles.shadows]}>
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
  );
};

export default WeatherSelect;