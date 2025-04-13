import { MaterialCommunityIcons } from "@expo/vector-icons";
import WeatherCodeDescriptions from "../../data/WeatherCodes.json";
import WeatherCodeIcons from "../../data/WeatherCodesIcons.json";
import WeatherLocations from "../../data/WeatherLocations.json";

export type MapLocations = {
  name: string;
  lat: number;
  lng: number;
};

export class Maps {
  // This is the map list, we have the MapLocations type
  private locations: MapLocations[] = WeatherLocations as MapLocations[]; // This will load from the json WeatherLocations.json file

  // This will load from the json WeatherCodes.json file
  private weatherCodeDescription: { [code: number]: string } = WeatherCodeDescriptions;
  private weatherCodeIcons: { [code: number]: string } = WeatherCodeIcons;

  // Starting all maps related elements
  constructor() {
    
  }

  /**
   * The first one is the Cork map, so we can use it as a default map.
   * @description This is the default map, we can use it as a default map when we load the app.
   * @returns {MapLocations} an instance to use on select when we load
   */
  public getDefaultLocation(): MapLocations {
    return this.locations[0];
  }

  /**
   * * Get all maps.
   * @returns {MapLocations[]} The list of maps
   */
  public getAll(): MapLocations[] {
    return this.locations;
  }

  /**
   * * Get all map names.
   * @returns {string[]} The list of map names
   */
  public getAllNames(): string[] {
    return this.locations.map((location) => location.name);
  }

  /**
   * * Get a specific map by its index.
   * @returns {MapLocations[]} The list of maps
   */
  public getByIndex(index: number): MapLocations | undefined {

    // Checking if the index is a number or is a valid number
    if (typeof index !== "number" || isNaN(index)) {
      console.warn(
        "[GetByIndex]: Invalid index number, please add a valid number."
      );
      return undefined;
    }

    if (index < 0 || index >= Object.keys(this.locations).length) {
      console.warn(
        `[GetByIndex][${index}]: Idex out of bounds, please add a valid number.`
      );
      return undefined;
    }

    return this.locations[index];
  }

  /**
   * This will be getting the weather code descriptions from the Open Meteo API.
   * @description This is the weather code descriptions from the Open Meteo API.
   * @returns {string} The weather code descriptions
   * @see https://open-meteo.com/en/docs
   *
   * Weather variable documentation
   *
   * WMO Weather interpretation codes (WW)
   * Code	          Description
   * 0	            Clear sky
   * 1, 2, 3	      Mainly clear, partly cloudy, and overcast
   * 45, 48	        Fog and depositing rime fog
   * 51, 53, 55	    Drizzle: Light, moderate, and dense intensity
   * 56, 57	        Freezing Drizzle: Light and dense intensity
   * 61, 63, 65	    Rain: Slight, moderate and heavy intensity
   * 66, 67	        Freezing Rain: Light and heavy intensity
   * 71, 73, 75	    Snow fall: Slight, moderate, and heavy intensity
   * 77	            Snow grains
   * 80, 81, 82	    Rain showers: Slight, moderate, and violent
   * 85, 86	        Snow showers slight and heavy
   * 95 	          Thunderstorm: Slight or moderate
   * 96, 99 	      Thunderstorm with slight and heavy hail
   */
  public getWeatherCodeDescription = (code: number | null): string => {
    // for the null case meaninig being the first one, in this case will be showing clear sky
    if (code === null || code === undefined) {
      console.warn("[getWeatherCodeDescriptions]: Null code.");
      return this.weatherCodeDescription[0];
    }

    return this.weatherCodeDescription[code];
  };

  /**
   * This will be following the same weather code descriptions to build the logic of the weather icons.
   * @description This is the weather code descriptions from the Open Meteo API.
   * @returns {string} The weather icon
   * @see https://open-meteo.com/en/docs
   *
   * Weather variable documentation
   *
   * WMO Weather interpretation codes (WW)
   * Code	              Description
   * 0                  weather-sunny
   * 1:                 weather-sunny
   * 2:                 weather-cloudy
   * 3:                 weather-cloudy
   * 45, 48:            weather-fog
   * 51, 53, 55:        weather-partly-rainy
   * 56, 57:            weather-snowy-rainy
   * 61, 63, 65:        weather-rainy
   * 66, 67:            weather-snowy-rainy
   * 71, 73, 75, 77:    weather-snowy
   * 80, 81, 82:        weather-rainy
   * 85, 86:            weather-snowy-rainy
   * 95:                weather-partly-lightning
   * 96, 99:            weather-partly-lightning
   */
  public getWeatherIcons = (code: number | null): keyof typeof MaterialCommunityIcons.glyphMap => {
    
    // I will be using this sunny as a fallback icon, in a case of null or undefined code
    let icon: keyof typeof MaterialCommunityIcons.glyphMap = "weather-sunny";
  
    try 
    {
      // Checking if the code is null or undefined, in this case will be showing the sunny icon
      icon = (code === null || code === undefined || typeof code !== "number" || !(code in this.weatherCodeIcons) ) 
        ?  "weather-sunny" 
        :  this.weatherCodeIcons[code] as keyof typeof MaterialCommunityIcons.glyphMap;

    } catch (error) {
      console.error("[getWeatherIcons]: An error occurred.", error);
    } finally {
      return icon; // Ensuring that i will have a valid data always returned
    }
  };

}
