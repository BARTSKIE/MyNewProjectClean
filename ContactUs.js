// ContactUs.js - SIMPLER VERSION (walang expo-linking)
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Linking,
  Alert
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Sidebar from './Sidebar';
import MapView, { Marker } from 'react-native-maps';
import styles from './css/ContactUsStyles';

export default function ContactUs({ navigation }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // ✅ SIMPLE LINKING FUNCTION (React Native Linking only)
  const openExternalLink = async (url) => {
    try {
      console.log('Opening URL:', url);
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          'Cannot Open Link',
          'Please make sure you have a browser app installed.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert(
        'Error',
        'Failed to open link. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const openGoogleMaps = () => {
    const googleMapsUrl = 'https://www.google.com/maps/place/Don+Elmer\'s/@14.7284423,121.1290513,17z/data=!3m1!4b1!4m6!3m5!1s0x3397bb194f106ef7:0x19206220602b4154!8m2!3d14.7284423!4d121.1316262!16s%2Fg%2F11ckw28b74?entry=ttu&g_ep=EgoyMDI1MTAyMC4wIKXMDSoASAFQAw%3D%3D';
    openExternalLink(googleMapsUrl);
  };

  const openFacebookPage = () => {
    const facebookUrl = 'https://www.facebook.com/profile.php?id=100083573612681';
    openExternalLink(facebookUrl);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Sidebar 
        isVisible={sidebarVisible} 
        setVisible={setSidebarVisible} 
        navigation={navigation} 
      />
      
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => setSidebarVisible(true)} style={styles.burgerButton}>
            <Ionicons name="menu" size={28} color="#222" />
          </TouchableOpacity>
          <Text style={styles.header}>Contact Us</Text>
        </View>

        <View style={styles.goldLine} />

        {/* Scrollable Content */}
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          {/* Info Section */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>How to Reach Us</Text>
            <Text style={styles.infoText}>
              We're here to help! Whether you have questions about reservations, facilities, or special requests, feel free to contact Don Elmer's Inn and Resort using the information below.
            </Text>

            <View style={styles.sectionRow}>
              <Ionicons name="call" size={20} color="#FFD700" style={styles.icon} />
              <Text style={styles.sectionHeader}>Call Us</Text>
            </View>
            <Text style={styles.infoText}>Mobile: (09) 38 196 4481 (Smart)</Text>

            <View style={styles.sectionRow}>
              <Ionicons name="mail" size={20} color="#FFD700" style={styles.icon} />
              <Text style={styles.sectionHeader}>Email Us</Text>
            </View>
            <Text style={styles.infoText}>donelmersresort@gmail.com </Text>

            <View style={styles.sectionRow}>
              <Ionicons name="location" size={20} color="#FFD700" style={styles.icon} />
              <Text style={styles.sectionHeader}>Visit Us</Text>
            </View>
            <Text style={styles.infoText}>P4HJ+9MC, Dao St, Rodriguez (Montalban), 1860 Rizal</Text>
            
            <TouchableOpacity onPress={openGoogleMaps}>
              <Text style={[styles.infoText, styles.linkText]}>View on Google Maps</Text>
            </TouchableOpacity>

            <View style={styles.sectionRow}>
              <Ionicons name="time" size={20} color="#FFD700" style={styles.icon} />
              <Text style={styles.sectionHeader}>Operating Hours</Text>
            </View>
            <Text style={styles.infoText}>Front Desk: 24/7</Text>
            <Text style={styles.infoText}>Pool Area: 7:00 AM - 5:00 PM Daily</Text>

            <View style={styles.sectionRow}>
              <FontAwesome name="facebook" size={20} color="#FFD700" style={styles.icon} />
              <Text style={styles.sectionHeader}>Follow Us</Text>
            </View>
            <View style={styles.socialIcons}>
              <TouchableOpacity style={styles.socialIcon} onPress={openFacebookPage}>
                <FontAwesome name="facebook-square" size={30} color="#777" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Map Section */}
          <View style={styles.mapCard}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                    latitude: 14.7284423,
                    longitude: 121.1316262,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                    coordinate={{ latitude: 14.7284423, longitude: 121.1316262 }}
                    title="Don Elmer's Inn and Resort"
                    description="P4HJ+9MC, Dao St, Rodriguez (Montalban), 1860 Rizal"
                    />
                </MapView>
            </View>
            <Text style={styles.locationNote}>
              Our exact location: P4HJ+9MC, Dao St, Rodriguez (Montalban), 1860 Rizal
            </Text>
          </View>

          <Text style={styles.footerText}>
            © 2025 Don Elmer's Inn and Resort. All rights reserved.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}