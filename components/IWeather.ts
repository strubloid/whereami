export interface Weather {
    temperature: number;
    windspeed: number;
    time: string;
    weathercode: number;
  }
  
  export type NullableWeather = Weather | null;

  export interface FetchWeatherProps {
    setWeather: React.Dispatch<React.SetStateAction<Weather | null>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }