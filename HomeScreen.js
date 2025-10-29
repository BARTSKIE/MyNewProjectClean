// HomeScreen.js - UPDATED VERSION
import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Sidebar from './Sidebar';
import styles from './css/HomeScreenStyles'; // <--- IMPORT STYLES FROM SEPARATE FILE

export default function HomeScreen({ navigation }) {
  const fontsLoaded = true;

  const [sidebarVisible, setSidebarVisible] = useState(false);

  if (!fontsLoaded) return null;

  const handleBookNow = () => {
    navigation.navigate("Bookings");
  };

  return (
    <View style={styles.container}>
      {/* Sidebar with logout */}
      <Sidebar
        isVisible={sidebarVisible}
        setVisible={setSidebarVisible}
        navigation={navigation}
        showLogout={true}
      />

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Don Elmer's Resort</Text>
      </View>

      {/* Main Content */}
      <LinearGradient
        colors={['#ffffff', '#c5b580ff']} 
        locations={[0.1, 0.9]} 
        style={styles.body}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.centeredContent}>
          <Text style={styles.smallText}>LUXURY & COMFORT</Text>
          <Text style={styles.bigText}>Discover Your Perfect Stay at Don Elmer's Inn and Resort</Text>
          <TouchableOpacity style={styles.button} onPress={handleBookNow}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <StatusBar style="light" />
    </View>
  );
}