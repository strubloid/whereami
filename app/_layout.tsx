import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Image } from 'react-native';


export default function TabLayout() {
  
  const styles = StyleSheet.create({
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      width: '100%',
      height: '100%',
      flex: 1,
      margin : 0,
      padding: 0,
    },
  });

  return (
    <Tabs>
      <Tabs.Screen
        name="index"        
        options={{
          title: 'Home',
          headerTitle: 'Where am I?',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: '#fff',
          },
          headerBackground: () => (
            <Image
              source={require('../assets/convective_clouds.webp')}
              style={ styles.title }
              resizeMode="cover"
            />
          ),
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
        }}
      />
    </Tabs>
  );
}

