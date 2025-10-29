// BookingScreen.js - UPDATED VERSION
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  Platform,
  ActivityIndicator,
  StyleSheet 
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { getDatabase, ref, onValue } from 'firebase/database';
import Sidebar from './Sidebar';
import styles from './css/BookingScreenStyles'; // <--- IMPORT STYLES FROM SEPARATE FILE

export default function BookingScreen({ navigation }) {
  const fontsLoaded = true;
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // ✅ Clean numeric formatter only
  const formatPrice = (price) => {
    const num = Number(price);
    if (isNaN(num)) return '₱0';
    return `₱${num.toLocaleString('en-PH')}`;
  };

  if (!fontsLoaded) return null;

  useEffect(() => {
    const db = getDatabase();
    const accRef = ref(db, 'accommodations');

    onValue(accRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.values(data);

        // ✅ Log the data from Firebase
        console.log('🔥 Raw data from Firebase:', JSON.stringify(arr, null, 2));

        // Ensure all prices are plain numbers (avoid strings like "₱1800")
        const cleanedArr = arr.map((room) => ({
          ...room,
          dayPrice: Number(String(room.dayPrice).replace(/[^\d.]/g, '')),
          overnightPrice: Number(String(room.overnightPrice).replace(/[^\d.]/g, '')),
          wholeResortPrice: Number(String(room.wholeResortPrice).replace(/[^\d.]/g, '')),
        }));

        console.log('🧹 Cleaned data:', cleanedArr);
        setAccommodations(cleanedArr);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#d4af37" />
      </View>
    );
  }

  const filteredRooms = accommodations.filter((room) =>
    selectedFilter === 'all' ? true : room.type === selectedFilter
  );

  const chunkedRooms = [];
  for (let i = 0; i < filteredRooms.length; i += 2) {
    chunkedRooms.push(filteredRooms.slice(i, i + 2));
  }

  const cardWidth = (Dimensions.get('window').width - 40) / 2;

  return (
    <View style={styles.container}>
      <Sidebar isVisible={sidebarVisible} setVisible={setSidebarVisible} navigation={navigation} />

      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => setSidebarVisible(true)}>
          <Ionicons name="menu" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Bookings</Text>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.pageTitle}>Our Rooms & Cottages</Text>
        <View style={styles.goldLine} />
      </View>

      <View style={styles.filterBar}>
        {['all', 'room', 'cottage', 'whole'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterBtn, selectedFilter === type && styles.activeFilter]}
            onPress={() => setSelectedFilter(type)}
          >
            <Text style={[styles.filterText, selectedFilter === type && styles.activeFilterText]}>
              {type === 'all' ? 'ALL' : type.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {chunkedRooms.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((room) => {
              const isActive = room.status === 'Active';
              return (
                <View key={room.id} style={[styles.card, { width: cardWidth }, !isActive && styles.inactiveCard]}>
                  <View style={styles.imagePlaceholder}>
                    <Image source={{ uri: room.image }} style={StyleSheet.absoluteFill} resizeMode="cover" />
                    {!isActive && (
                      <View style={styles.overlay}>
                        <Text style={styles.unavailableText}>UNAVAILABLE</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={styles.roomName}>{room.name}</Text>
                    {room.packageType && <Text style={styles.packageType}>{room.packageType}</Text>}
                    {!isActive && <Text style={styles.inactiveStatus}>Currently Unavailable</Text>}
                  </View>

                  {/* ✅ Correct Price Display */}
                  <View style={styles.priceContainer}>
                    {room.type === 'whole' ? (
                      <Text style={styles.wholeResortPrice}>
                        <Text style={styles.goldPrice}>{formatPrice(room.wholeResortPrice)}</Text> / 24 Hours
                      </Text>
                    ) : (
                      <>
                        <Text style={styles.priceLine}>
                          <Text style={styles.goldPrice}>{formatPrice(room.dayPrice)}</Text> / Day Use
                        </Text>
                        <Text style={styles.priceLine}>
                          <Text style={styles.goldPrice}>{formatPrice(room.overnightPrice)}</Text> / Overnight
                        </Text>
                      </>
                    )}
                  </View>

                  {isActive ? (
                    <TouchableOpacity
                      style={styles.bookBtn}
                      onPress={() => navigation.navigate('RoomDetails', { room })}
                    >
                      <Text style={styles.bookText}>Book Now</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.unavailableBtn} disabled={true}>
                      <Text style={styles.unavailableBtnText}>Unavailable</Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}