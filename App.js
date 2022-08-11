import { registerRootComponent } from 'expo';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from './screens/Homescreen';
import RequestPlate from './screens/RequestSong';
// TrackPlayer.registerPlaybackService(() => require('./service'));

const Stack = createNativeStackNavigator();

function App() {
  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false,}}>
              <Stack.Screen name="Home" component={Homescreen}/>
              <Stack.Screen name="Request" component={RequestPlate}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}
registerRootComponent(App);
export default App;

