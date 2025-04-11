import { Tabs } from 'expo-router';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Image, View } from 'react-native';


export default function TabLayout() {
  
  const tabStyles = StyleSheet.create({
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#333',
      width: '100%',
      height: '100%',
      flex: 1,
      margin : 0,
      padding: 0,
    }
  });

  let reloadPage = () => {
    console.log('Reloading the page...');
    // const state = navigation.getState();
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: { backgroundColor: 'green', borderTopWidth: 0, },
      }}
    >
      <Tabs.Screen
        name="index"        
        options={{
          title: 'Homepage',
          headerTitle: 'Weather App',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
          },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#fff',
          tabBarStyle: { backgroundColor: '#333', borderTopWidth: 0, },
          headerBackground: () => (
              <Image source={require('../assets/convective_clouds.webp')} style={ tabStyles.title } resizeMode="cover" />
          ),
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} click />,         
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            reloadPage();
          },
        }}
      />
  </Tabs>
  );
}

