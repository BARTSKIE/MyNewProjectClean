// ReservationReviewScreen.js - UPDATED VERSION
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './css/ReservationReviewScreenStyles'; // <--- IMPORT STYLES FROM SEPARATE FILE

export default function ReservationReviewScreen({ route, navigation }) {
  const { room, date, guests, totalPrice, dayHours, overnightHours } = route.params;
  const [selectedPayment, setSelectedPayment] = useState('');

  const isWholeResort = room.type === 'whole';

  const handleConfirmReservation = () => {
    navigation.navigate('PaymentScreen', {
      room,
      date,
      guests,
      totalPrice,
      selectedPayment,
      dayHours,
      overnightHours,
      isWholeResort
    });
  };

  return (
    <SafeAreaView style={styles.reservationFullScreenContainer}>
      <View style={styles.reservationHeader}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.reservationHeaderTitle}>Reservation Review</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView 
        style={styles.reviewContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.roomCard}>
          <Image 
            source={{ uri: room.image }} 
            style={styles.reservationRoomImage}
            resizeMode="cover"
          />
          <View style={styles.roomInfo}>
            <Text style={styles.roomNameReservation}>
              {room.name.replace(/•.*/g, '').trim()}
            </Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitleReservation}>Reservation Details</Text>
          <View style={styles.detailsGrid}>
            {date && (
              <View style={styles.detailItem}>
                <View style={styles.detailIcon}>
                  <Ionicons name="calendar-outline" size={20} color="#d4af37" />
                </View>
                <View>
                  <Text style={styles.detailLabel}>Check-in Date</Text>
                  <Text style={styles.detailValue}>{date}</Text>
                </View>
              </View>
            )}
            
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Ionicons name="time-outline" size={20} color="#d4af37" />
              </View>
              <View>
                <Text style={styles.detailLabel}>Duration</Text>
                <Text style={styles.detailValue}>
                  {isWholeResort ? '24-HOUR PACKAGE' : (
                    <>
                      {dayHours > 0 && `DAY`} 
                      {dayHours > 0 && overnightHours > 0 && ' • '}
                      {overnightHours > 0 && `OVERNIGHT`}
                    </>
                  )}
                </Text>
              </View>
            </View>
            
            <View style={styles.detailItem}>
              <View style={styles.detailIcon}>
                <Ionicons name="people-outline" size={20} color="#d4af37" />
              </View>
              <View>
                <Text style={styles.detailLabel}>Guests</Text>
                <Text style={styles.detailValue}>{guests} Guest(s)</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitleReservation}>Pricing Breakdown</Text>
          <View style={styles.pricingList}>
            {dayHours > 0 && (
              <View style={styles.pricingItem}>
                <Text style={styles.pricingDescription}>DAY</Text>
                <Text style={styles.pricingAmount}>{room.dayPrice}</Text>
              </View>
            )}
            {overnightHours > 0 && (
              <View style={styles.pricingItem}>
                <Text style={styles.pricingDescription}>OVERNIGHT</Text>
                <Text style={styles.pricingAmount}>{room.overnightPrice}</Text>
              </View>
            )}
            {isWholeResort && (
              <View style={styles.pricingItem}>
                <Text style={styles.pricingDescription}>24-HOUR PACKAGE</Text>
                <Text style={styles.pricingAmount}>{room.wholeResortPrice}</Text>
              </View>
            )}
            <View style={styles.divider} />
            <View style={styles.totalItem}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalAmount}>₱{totalPrice.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionCard}>
  <Text style={styles.sectionTitleReservation}>Policies</Text>
  <View style={styles.policyItem}>
    <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
    <Text style={styles.policyText}>Cancellation is only allowed if reservation has not been confirmed by admin</Text>
  </View>
  <View style={styles.policyItem}>
    <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
    <Text style={styles.policyText}>Reservation status can be checked in your booking history</Text>
  </View>
  {isWholeResort && (
    <View style={styles.policyItem}>
      <Ionicons name="information-circle-outline" size={16} color="#6B7280" />
      <Text style={styles.policyText}>Whole resort rental includes exclusive access to all facilities</Text>
    </View>
  )}
</View>
      </ScrollView>

      <View style={styles.reservationFooter}>
        <View style={styles.footerContent}>
          <View style={styles.priceSummary}>
            <Text style={styles.footerLabel}>Total</Text>
            <Text style={styles.footerPrice}>₱{totalPrice.toLocaleString()}</Text>
          </View>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleConfirmReservation}
          >
            <Text style={styles.confirmButtonText}>Confirm Reservation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}