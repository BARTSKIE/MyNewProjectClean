import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, ActivityIndicator } from 'react-native';

import BookingScreen from './BookingScreen';
import AboutUs from './AboutUs';
import Amenities from './Amenities';
import ContactUs from './ContactUs';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import HomeScreen from './HomeScreen';
import { auth } from './firebase';
import RoomDetails from './RoomDetails';
import AvailableRooms from './AvailableRooms';
import ReservationReviewScreen from './ReservationReviewScreen';
import PaymentScreen from './PaymentScreen';
import ProfileImageScreen from './ProfileImageScreen';
import ReservationHistory from './ReservationHistory';
import ReservationDetails from './ReservationDetails';

enableScreens();

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth state changed:", currentUser ? currentUser.email : "No user");
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#C8A951" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ 
              headerShown: false,
              animation: 'slide_from_right'
            }}
          >
            {user ? (
              // User is logged in - show main app
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Bookings" component={BookingScreen} />
                <Stack.Screen name="AvailableRooms" component={AvailableRooms} />
                <Stack.Screen name="RoomDetails" component={RoomDetails} />
                <Stack.Screen name="ReservationReviewScreen" component={ReservationReviewScreen} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                <Stack.Screen name="ProfileImage" component={ProfileImageScreen} />
                <Stack.Screen name="AboutUs" component={AboutUs} />
                <Stack.Screen name="Amenities" component={Amenities} />
                <Stack.Screen name="ContactUs" component={ContactUs} />
                <Stack.Screen name="ReservationHistory" component={ReservationHistory} />
                <Stack.Screen name="ReservationDetails" component={ReservationDetails} />
                
                {/* ✅ KEEP LOGIN SCREEN ACCESSIBLE FOR LOGOUT */}
                <Stack.Screen name="Login" component={LoginScreen} />
              </>
            ) : (
              // User is not logged in - show auth screens first
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Bookings" component={BookingScreen} />
                <Stack.Screen name="AvailableRooms" component={AvailableRooms} />
                <Stack.Screen name="RoomDetails" component={RoomDetails} />
                <Stack.Screen name="ReservationReviewScreen" component={ReservationReviewScreen} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                <Stack.Screen name="ProfileImage" component={ProfileImageScreen} />
                <Stack.Screen name="AboutUs" component={AboutUs} />
                <Stack.Screen name="Amenities" component={Amenities} />
                <Stack.Screen name="ContactUs" component={ContactUs} />
                <Stack.Screen name="ReservationHistory" component={ReservationHistory} />
                <Stack.Screen name="ReservationDetails" component={ReservationDetails} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}