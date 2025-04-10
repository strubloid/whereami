export type MapLocations = {
  name: string;
  lat: number;
  lng: number;
};

export class Maps {
  // This is the map list, we have the MapLocations type
  private locations: MapLocations[];

  // Starting all maps related elements
  constructor() {
    this.locations = [
      { name: "Cork", lat: 51.8985, lng: -8.4756 },
      { name: "Tokyo", lat: 35.6895, lng: 139.6917 },
      { name: "Paris", lat: 48.8566, lng: 2.3522 },
      { name: "Hong Kong", lat: 22.3193, lng: 114.1694 },
      { name: "Bangkok", lat: 13.7563, lng: 100.5018 },
      { name: "St. Petersburg", lat: 59.9343, lng: 30.3351 },
      { name: "Kiev", lat: 50.4501, lng: 30.5234 },
      { name: "Berlin", lat: 52.52, lng: 13.405 },
      { name: "Dublin", lat: 53.3498, lng: -6.2603 },
      { name: "London", lat: 51.5072, lng: -0.1276 },
      { name: "New York", lat: 40.7128, lng: -74.006 },
      { name: "Mexico City", lat: 19.4326, lng: -99.1332 },
    ];
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
   * Code	        Description
   * 0	            Clear sky
   * 1, 2, 3	    Mainly clear, partly cloudy, and overcast
   * 45, 48	        Fog and depositing rime fog
   * 51, 53, 55	    Drizzle: Light, moderate, and dense intensity
   * 56, 57	        Freezing Drizzle: Light and dense intensity
   * 61, 63, 65	    Rain: Slight, moderate and heavy intensity
   * 66, 67	        Freezing Rain: Light and heavy intensity
   * 71, 73, 75	    Snow fall: Slight, moderate, and heavy intensity
   * 77	            Snow grains
   * 80, 81, 82	    Rain showers: Slight, moderate, and violent
   * 85, 86	        Snow showers slight and heavy
   * 95 	        Thunderstorm: Slight or moderate
   * 96, 99 	    Thunderstorm with slight and heavy hail
   */
  public weatherCodeDescriptions: { [code: number]: string } = {
    0: "Clear sky",
    1: "Clear sky",
    2: "Cloudy",
    3: "Cloudy",
    45: "Fog",
    48: "Fog",
    51: "Drizzle",
    53: "Drizzle",
    55: "Drizzle",
    56: "Freezing Drizzle",
    57: "Freezing Drizzle",
    61: "Rain",
    63: "Rain",
    65: "Rain",
    66: "Freezing Rain",
    67: "Freezing Rain",
    71: "Snowfall",
    73: "Snowfall",
    75: "Snowfall",
    77: "Snow",
    80: "Rain showers",
    81: "Rain showers",
    82: "Rain showers",
    85: "Snow showers",
    86: "Snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm",
    99: "Thunderstorm",
  };
}
