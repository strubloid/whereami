import { Tabs } from 'expo-router';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Image, View } from 'react-native';


export default function TabLayout() {
  
  const tabStyles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      width: '100%',
      height: '100%',
      flex: 1,
      margin : 0,
      padding: 0
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
        tabBarStyle: { backgroundColor: '#333', borderTopWidth: 0, },
      }}
    >
      <Tabs.Screen
        name="index"        
        options={{
          title: 'Reload',
          headerTitle: 'Where am I?',
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
          headerBackground: () => (<Image source={require('../assets/convective_clouds.webp')} style={ tabStyles.title } resizeMode="cover" />),
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} click />,
          // tabBarButton: (base) => {
          //   return (
          //     <View style={{ 
          //       flexDirection: 'row', 
          //       alignItems: 'center',
          //       alignContent: 'center',
          //       backgroundColor: '#333',
          //       borderRadius: 8,
          //       justifyContent: 'center',
          //       gap: 20,
          //       width: '100%',
          //       height: '100%',
          //       }}>
          //       <MaterialIcons size={28} name="house" color="#fff" />
          //       <MaterialIcons size={28} name="refresh" color="#fff" />
          //     </View>
          //   );
          // }
          
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Optional: Prevent navigation
            // Call any function you want:
            reloadPage();
          },
        }}
      />
  </Tabs>
  );
}

