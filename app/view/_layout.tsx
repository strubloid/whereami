import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Image } from 'react-native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';

export default function TabLayout() {
  
  const tabStyles = StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      width: '100%',
      height: '100%',
      flex: 1,
      margin: 0,
      padding: 0,
    }
  });

  /**
   * Function that will be a tab NAvigation options, it will be used to set the title, headerTitle, headerTitleAlign, headerTitleStyle, tabBarLabelStyle, tabBarActiveTintColor, tabBarInactiveTintColor, tabBarStyle, headerBackground and tabBarIcon.
   * @returns {BottomTabNavigationOptions} - The options for the tab navigation
   */
  const screenOptions : BottomTabNavigationOptions   = {
    title: 'Homepage',
    headerTitle: 'Weather App',
    headerTitleAlign: "center",
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
    },
    tabBarLabelStyle: { fontSize: 12 },
    tabBarActiveTintColor: '#fff',
    tabBarInactiveTintColor: '#fff',
    tabBarStyle: { backgroundColor: '#333', borderTopWidth: 0 },
    headerBackground: () => (
      <Image source={require('../../assets/convective_clouds.webp')} style={tabStyles.title} resizeMode="cover" />
    ),
    tabBarIcon: ({ color }: { color: string }) => <MaterialIcons size={28} name="house" color={color} />,
  };

  // The useNavigation hook to navigate between screens
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  /**
   * This function will reload the page when the tab is pressed. It will reset the navigation stack and navigate to the index screen.
   * @returns {void}  - It will not return anything.
   * @example reloadPage() // This will reload the page
   */
  let reloadPage = () => {
    console.log('Reloading the page...');
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' }],
    });
  };

  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={screenOptions}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Optional: Prevent navigation
            reloadPage();
          },
        }}
      />
    </Tabs>
  );
}