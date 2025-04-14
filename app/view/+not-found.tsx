import { StyleSheet, TouchableOpacity, ImageResizeMode, ScrollView, useWindowDimensions, ImageBackground, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react';
import { Maps } from '../../components/Maps/Maps';
import { NullableWeather } from '../../components/IWeather';
import { WeatherBackgroundImages } from '../../components/WeatherBackgroundImages';
/**
 * This return the homepage element, this will ecampsulate all the
 * rules for this project.
 * @returns - The Home component that renders the weather app.
 */
const NotFound = () => {

    // Starting the map controller
    let mapController = new Maps();
    
    // This will load the page width
    const { width } = useWindowDimensions();

    // state variables
    const [weather, setWeather] = useState<NullableWeather>(null);

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
            justifyContent: 'flex-end',
            alignItems: 'center',
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
        shadows: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 5
        },
        line: {
            fontSize: 28,
            marginBottom: 10,
            textAlign: 'center',
        }
    });


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

    return (
        <ScrollView contentContainerStyle={[styles.mainScrollContent]}>

            <ImageBackground
                source={WeatherBackgroundImages[mapController.getWeatherIcons(weather?.weathercode ?? 0) as keyof typeof WeatherBackgroundImages]}
                style={styles.imageBackground}
                resizeMode={recizeRuleImageBackground()}
            >
                <ScrollView contentContainerStyle={[styles.scrollView]}>

                    <View style={[styles.section, styles.sectionRounded, styles.shadows]}>
                        <Text style={styles.line}>Page Not Found</Text>
                    </View>
                    
                    <View style={[styles.section, styles.sectionRounded, styles.shadows]}>
                        <Text style={styles.line}>Oops! The page you’re looking for doesn’t exist.</Text>
                    </View>

                </ScrollView>
            </ImageBackground>
        </ScrollView>
    );
}

export default NotFound