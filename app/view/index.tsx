import { StyleSheet, TouchableOpacity, ImageResizeMode, ScrollView, useWindowDimensions, ImageBackground, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Maps } from '../../components/Maps/Maps';
import { Weather, NullableWeather, FetchWeatherProps } from '../../components/IWeather';
import { WeatherBackgroundImages } from '../../components/WeatherBackgroundImages';
import WeatherBubble from '../components/WeatherBubble';
import WeatherTextBox from '../components/WeatherTextBox';
import WeatherSelect from '../components/WeatherSelect';
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

/**
 * This return the homepage element, this will ecampsulate all the
 * rules for this project.
 * @returns - The Home component that renders the weather app.
 */
const Home = () => {

    // Starting the map controller
    let mapController = new Maps();
    let allLocations = mapController.getAll();
    let [currentLocation, setCurrentLocation] = useState(mapController.getDefaultLocation());

    // This will load the page width
    const { width } = useWindowDimensions();

    // state variables
    const [weather, setWeather] = useState<NullableWeather>(null);
    const [starting, setStarting] = useState(true);
    const [selected, setSelected] = useState(false);
    const [selectedGPS, setSelectedGPS] = useState(false);

    // screen variables
    const mobile = 600;
    const tablet = 1024;
    const desktop = 1440;

    // Loading the styles of this page
    const styles = StyleSheet.create({
        scrollView: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            alignContent: 'center',
        },
        mainScrollContent: {
            flex: 1,
            height: '100%',
        },
        imageBackground: {
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            backgroundColor: '#4b80c5',
            paddingVertical: 6,
            paddingHorizontal: 10,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 10,
        },
        buttonText: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '600',
        },
        imageTitle: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
        },
        section: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '80%',
            padding: 6,
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 5,
            backgroundColor: '#f9f9f9A4',
            margin: 12
        },
        sectionRounded: {
            borderRadius: width < 600 ? 30 : 10,
            width: width < 600 ? 'auto' : '100%',
        },
        sectionTitle: {
            marginBottom: 10,
            padding: 10,
            backgroundColor: '#f9f9f9A4',
            margin: 20,
            width: 200,
        },
        sectionSelectAndButton: {
            padding: 12,
            backgroundColor: '#f9f9f9A4',
            margin: 10,
            width: 330,
            borderRadius: 20,
        },
        shadows: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5
        },
        sectionHeader: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: width > 600 ? 200 : 200,
            marginBottom: 10,
            marginTop: 10,
            padding: 2,
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 100,
            backgroundColor: '#f9f9f9A4',
            fontSize: 10,
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },
        line: {
            fontSize: 28,
            marginBottom: 10,
            textAlign: 'center',
        },
        list: {
            paddingHorizontal: 10,
        },
        listItem: {
            alignItems: 'flex-start',
            margin: 2,
        },
        pickerWrapper: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 10,
            backgroundColor: '#f9f9f9A4',
            margin: 10
        },
        picker: {
            height: 50,
            width: "100%",
            paddingHorizontal: 10,
            color: '#333',
        },
        pickeritem: {
            height: 50,
            width: '100%',
        },
        textBox : {
            width: width < 600 ? "auto"  : 800,
            borderRadius: 100,
            padding: 10,
        }
    });

    // Messages for the weather
    const weatherMessages = {
        "weather-sunny": `It’s full sun mode in ${currentLocation.name}! The sky is showing off, the sun is blazing like it’s on a mission, and every surface is a frying pan. SPF 50+ is your best friend today, unless you’re trying to roast. It’s the perfect time to fake productivity with a cold drink in hand, while secretly melting into the pavement. Welcome to human-toast mode.`,
        "weather-cloudy": `${currentLocation.name} is draped in a thick, stylish coat of clouds. Not bright, not rainy, just perfectly “meh.” The sun called in sick, the clouds showed up to work, and the mood outside screams introspection. It's the kind of day where you stare out the window and ponder life choices while sipping something warm and pretending you’re in a sad indie film.`,
        "weather-fog": `Fog has swallowed ${currentLocation.name} like a fantasy realm about to reveal a dragon. You can’t see three steps ahead, the air feels like mystery soup, and everything looks ten times spookier than usual. It’s giving thriller movie opening scene vibes. Probably not the best day for a long drive or a confident jog, unless you're training to be a ghostbuster.`,
        "weather-partly-rainy": `${currentLocation.name} is in that awkward mood between bright and soggy. The sky is indecisive—sun’s peeking through like it didn’t mean to intrude, while the drizzle is vibing in the background. It’s the kind of day where your weather app says “maybe” and your outfit screams “regret.” Take the umbrella, don’t trust the clouds—they're flaky.`,
        "weather-snowy-rainy": `It’s absolute chaos above ${currentLocation.name}. Rain and snow are in a wild tag-team match, and you’re the unlucky referee. It’s wet, cold, confusing, and somehow beautiful in a messy kind of way. This is the type of weather that laughs at your shoes, ignores your coat, and dares you to step outside like you’re on a survival game show.`,
        "weather-rainy": `The skies over ${currentLocation.name} are leaking with style. It's raining like the clouds have been holding it in all week. Streets are slick, umbrellas are flipping, and your socks are definitely going to suffer. It’s a good day to embrace your inner puddle-hopper or wrap yourself in a blanket and pretend the outside world doesn’t exist.`,
        "weather-snowy": `Snow has officially taken over ${currentLocation.name}, turning every inch of the city into a winter wonderland—or a frozen obstacle course, depending on your vibe. Everything is peaceful, fluffy, and incredibly inconvenient. The roads are chaos, the cold is unforgiving, and the snowmen are silently judging. Wear your thickest socks. Maybe two pairs.`,
        "weather-partly-lightning": `Things are getting flashy in ${currentLocation.name}. There’s a light show in the sky, and thunder’s laying down beats like nature’s subwoofer. It’s moody, electric, and full of surprises. Not quite storm territory, but enough to make your power flicker and your cat question its existence. Stay cozy, charge your devices, and enjoy the free fireworks.`
    };

    /**
     * This function will be doing the fetch of the weather using the API from Open Meteo.
     * @param params.setWeather
     * @description This function fetches the weather data from the Open Meteo API and updates the state with the current weather.
     * @returns {Promise<void>}
     * @throws {Error} If there is an issue with the network or the response is not ok.
     */
    const fetchWeather = async ({ setWeather }: FetchWeatherProps): Promise<void> => {
        try {

            let latitude = currentLocation.lat;
            let longitude = currentLocation.lng;

            // Fetching the weather data from Open Meteo API
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`, {
                method: 'GET',
                headers: {
                    'User-Agent': 'WhereAmI',
                    'Referer': 'whereami.strubloid.com',
                },
            });

            // First validation, is the response ok?
            if (!response.ok) {
                throw new Error('Issues with the network');
            }

            const data = await response.json();
            setWeather(data.current_weather as Weather);

        } catch (error) {
            console.error('[fetchWeather]: Error fetching weather:', error);
        }
    };

    /**
     * This will be handing the select field change
     * @param placeName 
     */
    const handleSelectChange = (placeName: string) => {
        try 
        {
            // validation for the not selected option
            if(placeName === "-- not selected --"){
                setCurrentLocation(mapController.getDefaultLocation());
                throw new Error(`You need to select a place`);
            }


            // We need to find the location by name
            let currentLocation = mapController.getAll().find(location => location.name === placeName);

            // If the location does not exist, throw an error
            if (!currentLocation) {
                throw new Error(`Location not found: ${placeName}`);
            }

            // Update the current location and fetch weather only if the location exists
            setCurrentLocation(currentLocation);
            fetchWeather({ setWeather });
            setSelected(true);
            setStarting(false);

        } catch (error) {
            console.error("[handleSelectChange]: Error handling select change:", error);
            setStarting(true);
        }
    };

    /**
     * This function is an example of how to get the sizes for mobile and tablet and consider
     * that they cna change the configuration according to the screen size.
     * In this case i want to stretch the image background > 1024 and < 1440px.
     * @returns {string} - The resize mode for the image background based on the screen width.
     */
    const recizeRuleImageBackground = (): ImageResizeMode => {

        let resizeMode: ImageResizeMode = "cover";

        // checkinf if the width of this object is lower than 600px
        if (width < mobile) {
            return resizeMode;
        }

        // checking if the width of this object is between 600px and 1024px
        if (width < tablet) {
            return resizeMode;
        }

        // checking if the width of this object is between 1024px and 1440px
        if (width > tablet && width < desktop) {
            resizeMode = "stretch";
            return resizeMode;
        }

        // checking if the width of this object is greater than 1440px
        if (width > desktop) {
            return resizeMode;
        }

        return resizeMode;
    }

    /**
     * This will be getting a position in Asynchronous way, so will return an object with:
     * coords: 
     *    accuracy: 10
     *    altitude: null
     *    altitudeAccuracy: null
     *    heading: null
     *    latitude: 38.883333
     *    longitude: -77
     *    speed: null
     * @returns current position using the geolocation of a phone or gps device.
     */

    const getCurrentPositionAsync = async (): Promise<Location.LocationObject> => {
        try 
        {
            const { status } = await Location.requestForegroundPermissionsAsync();
            let location: Location.LocationObject;

    
            if (status !== 'granted') {
                // Attempt using Geolocation as a fallback method
                location = await new Promise<Location.LocationObject>((resolve, reject) => 
                    Geolocation.getCurrentPosition(
                        (position) => resolve(position as Location.LocationObject),
                        (error) => reject(error),
                        {
                            timeout: 1000,
                            maximumAge: 3000
                        }
                    )
                );
            } else {
                // Use Expo's Location API for high accuracy
                location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
            }
    
            return location;

        } catch (error) {
            console.error("Error getting location:", error);
            throw new Error("Failed to get location");
        }
    };

    /**
     * This button will update for you try to get your own gps position
     * and discover things in it.
     */
    const updateGPS = async () => {
        try 
        {
            // getting the position coords
            const position = await getCurrentPositionAsync();
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            // fetching with the API from nominatim, we are getting here the address by the latitude and longiude
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse.php?lat=${latitude}&lon=${longitude}&zoom=18&format=jsonv2`, {
                method: 'GET',
                headers: {
                    'User-Agent': 'WhereAmI', // Replace with your app's name and website
                    'Referer': 'whereami.strubloid.com', // Replace with your app's URL
                },
            });

            // First validation, is the response ok?
            if (!response.ok) {
                throw new Error('[Update GPS]: Issues with the network');
            }

            // Loading the data from the API
            const data = await response.json();
            let address = data.address;
            
            // building the MapLocations object 
            let location = {
                name: address.country,
                lat: latitude,
                lng: longitude
            };

            // we need to find the location name
            setCurrentLocation(location);

            // update the weather
            fetchWeather({ setWeather });

            // We update the gps things
            setSelectedGPS(true);

            setStarting(false);

        } catch (error) {
            console.error('[update GPS]: not able to get gps:', error);
            setSelectedGPS(false);
            setSelected(false);
            setStarting(true);
        } 
    }

    // Fetching the weather data when the component mounts, this will be only once
    // and will be used to set the weather data for the first time.
    useEffect(() => {
        // I was using this when I auto loaded Cork as current position
        // fetchWeather({ setWeather });
    }, []);

    return (
        <ScrollView contentContainerStyle={[styles.mainScrollContent]}>

            <ImageBackground
                source={WeatherBackgroundImages[mapController.getWeatherIcons(weather?.weathercode ?? 0) as keyof typeof WeatherBackgroundImages]}
                style={styles.imageBackground}
                resizeMode={recizeRuleImageBackground()}
            >
                <ScrollView contentContainerStyle={[styles.scrollView]}>

                    {starting && (
                        <>
                            <View style={[styles.sectionRounded, styles.sectionTitle, styles.shadows]}>
                                <Text style={styles.line}>Your weather companion</Text>
                            </View>
                            <View style={[styles.section, styles.sectionRounded, styles.shadows]}>
                                <Text style={styles.line}>Stay updated with real-time forecasts, and get alerts to your location.</Text>
                                <Text style={styles.line}>You can                                 
                                    <Text style={{fontWeight: 'bold'}}> select one of our options </Text> or
                                    <Text style={{fontWeight: 'bold'}}> click on GPS </Text> to get your current local weather.
                                </Text>

                            </View>
                        </>
                    )}

                    {!starting && (selected || selectedGPS) && (
                        <>
                            <WeatherBubble styles={styles} mapController={mapController} weather={weather} currentLocation={currentLocation} />
                            <WeatherTextBox styles={styles} mapController={mapController} weather={weather} weatherMessages={weatherMessages} />
                        </>
                    )}

                    <View style={[styles.sectionRounded, styles.shadows, styles.sectionSelectAndButton]}>
                        <WeatherSelect styles={styles} currentLocation={currentLocation} allLocations={allLocations} handleSelectChange={handleSelectChange} />
                        <TouchableOpacity onPress={updateGPS} style={styles.button}><Text style={styles.buttonText}>GPS</Text></TouchableOpacity>    
                    </View>
                    
                </ScrollView>
            </ImageBackground>
        </ScrollView>
    );
}

export default Home