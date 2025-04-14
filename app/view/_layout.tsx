import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Image } from 'react-native';
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { ParamListBase } from '@react-navigation/native';
import NotFound from './+not-found';

export default function TabLayout() {

  const tabStyles = StyleSheet.create({
    line: {
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

  // The useNavigation hook to navigate between screens
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  // Reload page function
  const reloadPage = () => {
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
        options={{
          title: 'Where Am I',
          headerTitle: 'Where Am I? (Your Weather Assistant)',
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
            <Image source={require('../../assets/convective_clouds.webp')} style={tabStyles.line} resizeMode="cover" />
          ),
          tabBarIcon: ({ color }: { color: string }) => <MaterialIcons size={28} name="house" color={color} />,
        }}
        listeners={{
          tabPress: (e) => {
            e.preventDefault(); // Optional: Prevent navigation
            reloadPage();
          },
        }}
      />

      <Tabs.Screen
        name="+not-found"
        options={{
          headerShown: true,
          title: 'Page Not Found',
          headerTitle: 'Where Am I? (Your Weather Assistant)',
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
            <Image source={require('../../assets/convective_clouds.webp')} style={tabStyles.line} resizeMode="cover" />
          ),
          tabBarIcon: ({ color }: { color: string }) => <MaterialIcons size={28} name="apple" color={color} />,
        }}
      />

    </Tabs>
  );
}
