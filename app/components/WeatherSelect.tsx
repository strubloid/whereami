import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface WeatherSelectProps {
  styles: any;
  currentLocation: any;
  allLocations: any[];
  handleSelectChange: (placeName: string) => void;
}

const WeatherSelect: React.FC<WeatherSelectProps> = ({ styles, currentLocation, allLocations, handleSelectChange }) => {
  return (
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
  );
};

export default WeatherSelect;