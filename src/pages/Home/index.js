import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Info from './Info';
import Market from './Market';
import MarketDetail from './MarketDetail';
import Native from './Native';

const HomeTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MarketDetail" component={MarketDetail} />
    </Stack.Navigator>
  );
}
const Home = () => {
  return (
    <HomeTabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Info') {
            iconName = 'info';
          } else if (route.name === 'Market') {
            iconName = 'shopping-cart';
          } else if (route.name === 'Native') {
            iconName = 'phone-iphone';
          }

          // You can return any component that you like here!
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}>
      <HomeTabs.Screen name="Info" component={Info} />
      <HomeTabs.Screen name="Market" component={Market} />
      <HomeTabs.Screen name="Native" component={Native} />
    </HomeTabs.Navigator>
  );
};

export default StackNavigator;
