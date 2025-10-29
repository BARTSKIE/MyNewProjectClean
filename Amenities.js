// Amenities.js - UPDATED VERSION
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import Sidebar from './Sidebar';
import styles from './css/AmenitiesStyles'; // <--- IMPORT STYLES FROM SEPARATE FILE

export default function Amenities({ navigation }) {
  const fontsLoaded = true;
  const [sidebarVisible, setSidebarVisible] = useState(false);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Sidebar Component */}
      <Sidebar 
        isVisible={sidebarVisible} 
        setVisible={setSidebarVisible} 
        navigation={navigation} 
      />
      
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Don Elmer's Resort</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>What Don Elmer's Offers</Text>
        <View style={styles.goldLine} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Swimming Pools</Text>
          <Text style={styles.sectionDesc}>
            Don Elmer's Inn and Resort boasts a beautifully maintained swimming pool area,
            designed for both adults and children to enjoy. Our spacious adult pool offers a
            refreshing dip, while a dedicated kiddie pool provides a safe and fun environment for the little ones.{"\n\n"}
            Surrounded by lush greenery and comfortable lounge chairs, it's the perfect spot
            to relax, sunbathe, or simply unwind.
          </Text>
        </View>

        <Text style={styles.heading}>More Pool Views</Text>
        <View style={styles.goldLine} />
        <View style={styles.poolGrid}>
          <View style={styles.poolBox}>
            <Image
  source={require('./AmenitiesImage/Amenities1.png')}
  style={styles.poolImage}
  resizeMode="cover"
/>
            <Text style={styles.poolLabel}>Kiddie Pool</Text>
            <Text style={styles.poolDesc}>A safe and shallow area for kids to play.</Text>
          </View>
          <View style={styles.poolBox}>
           <Image
  source={require('./AmenitiesImage/Amenities.png')}
  style={styles.poolImage}
  resizeMode="cover"
/>
            <Text style={styles.poolLabel}>Adult Pool</Text>
            <Text style={styles.poolDesc}>Relax and swim in our spacious adult pool.</Text>
          </View>
          <View style={styles.poolBox}>
            <Image
  source={require('./AmenitiesImage/Amenities2.png')}
  style={styles.poolImage}
  resizeMode="cover"
/>
            <Text style={styles.poolLabel}>Pool Slide</Text>
            <Text style={styles.poolDesc}>Exclusive water slide designed for adult enjoyment.</Text>
          </View>
          <View style={styles.poolBox}> 
           <Image
          source={require('./AmenitiesImage/Amenities3.png')}
          style={styles.poolImage}
          resizeMode="cover"
        />
            <Text style={styles.poolLabel}>Cottage</Text>
            <Text style={styles.poolDesc}>Enjoy an evening swim under the stars.</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food and Drinks</Text>
          <View style={styles.goldLine} />
          <Text style={styles.sectionDesc}>
            Quench your thirst and satisfy your cravings at our poolside snack bar! We offer a variety of refreshing beverages, light snacks, and delicious meals to keep you energized throughout your stay.{"\n\n"} Enjoy convenient service right by the pool, ensuring you never have to step far from the fun.
          </Text>
          <Text style={[styles.sectionDesc, styles.foodHeading]}>
            Don Elmer's Food and Drinks
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}