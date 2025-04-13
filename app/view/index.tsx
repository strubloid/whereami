import { StyleSheet, ImageResizeMode, ScrollView, useWindowDimensions, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Maps } from '../../components/Maps/Maps';
import { Weather, NullableWeather, FetchWeatherProps } from '../../components/IWeather';
import { WeatherBackgroundImages } from '../../components/WeatherBackgroundImages';
import WeatherBubble from '../components/WeatherBubble';
import WeatherTextBox from '../components/WeatherTextBox';
import WeatherSelect from '../components/WeatherSelect';

/**
 * This return the homepage element, this will ecampsulate all the
 * rules for this project.
 * @returns {JSX.Element} - The Home component that renders the weather app.
 */
const Home = () => {

    // Starting the map controller
    let mapController = new Maps();
    let allLocations = mapController.getAll();
    let [currentLocation, setCurrentLocation] = useState(mapController.getDefaultLocation());

    const { width } = useWindowDimensions();
    const [weather, setWeather] = useState<NullableWeather>(null);
    const [loading, setLoading] = useState(true);

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
        background: {
            flex: 1,
            height: '100%',
        },
        imageBackground: {
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
            alignItems: 'center',

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
            marginBottom: 10,
            padding: 10,
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 5,
            backgroundColor: '#f9f9f9A4',
        },
        sectionHeader: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: width > 600 ? '20%' : '40%',
            marginBottom: 10,
            marginTop: 20,
            padding: 10,
            borderWidth: 1,
            borderColor: 'transparent',
            borderRadius: 100,
            backgroundColor: '#f9f9f9A4',
        },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
        },

        title: {
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
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            overflow: 'hidden',
            backgroundColor: '#f9f9f9',
        },
        picker: {
            height: 50,
            width: '100%',
            paddingHorizontal: 10,
            color: '#333',
        },
        pickeritem: {
            height: 50,
            width: '100%',
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
     * @param params.setLoading
     * @description This function fetches the weather data from the Open Meteo API and updates the state with the current weather.
     * @returns {Promise<void>}
     * @throws {Error} If there is an issue with the network or the response is not ok.
     */
    const fetchWeather = async ({ setWeather, setLoading }: FetchWeatherProps): Promise<void> => {
        try {

            let latitude = currentLocation.lat;
            let longitude = currentLocation.lng;

            // Fetching the weather data from Open Meteo API
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`
            );

            // First validation, is the response ok?
            if (!response.ok) {
                throw new Error('Issues with the network');
            }

            const data = await response.json();
            setWeather(data.current_weather as Weather);

        } catch (error) {
            console.error('Error fetching weather:', error);
        } finally {
            setLoading(false);
        }
    };

    /**
     * This will be handing the select field change
     * @param placeName 
     */
    const handleSelectChange = (placeName: string) => {

        // we need to find the location by name
        let currentLocation = mapController.getAll().find(location => location.name === placeName);

        // we are only load something if exist the location
        if (currentLocation) {
            setCurrentLocation(currentLocation); // we update the current location
            fetchWeather({ setWeather, setLoading }); // we update the weather
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

    // Fetching the weather data when the component mounts, this will be only once
    // and will be used to set the weather data for the first time.
    useEffect(() => {
        fetchWeather({ setWeather, setLoading });
    }, []);

    return (
        <ScrollView contentContainerStyle={[styles.background]}>
            <ImageBackground
                source={WeatherBackgroundImages[mapController.getWeatherIcons(weather?.weathercode ?? 0) as keyof typeof WeatherBackgroundImages]}
                style={styles.imageBackground}
                resizeMode={recizeRuleImageBackground()}
            >
                <ScrollView contentContainerStyle={[styles.scrollView]}>
                    <WeatherBubble styles={styles} mapController={mapController} weather={weather} currentLocation={currentLocation} />
                    <WeatherSelect styles={styles} currentLocation={currentLocation} allLocations={allLocations} handleSelectChange={handleSelectChange} />
                    <WeatherTextBox styles={styles} mapController={mapController} weather={weather} weatherMessages={weatherMessages} />
                </ScrollView>
            </ImageBackground>
        </ScrollView>
    );
}

export default Home