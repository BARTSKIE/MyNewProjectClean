// PaymentScreen.js - UPDATED VERSION (On Arrival Payment)
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, get } from 'firebase/database';
import { app } from './firebase';
import { getFirestore, collection, addDoc, serverTimestamp, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import styles from './css/PaymentScreenStyles';

export default function PaymentScreen({ route }) {
  const navigation = useNavigation();
  const { room, date, guests, dayHours, overnightHours, isWholeResort } = route.params;
  const [selectedPayment, setSelectedPayment] = useState('');
  const [firebasePrice, setFirebasePrice] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userData, setUserData] = useState({
    userId: '',
    fullName: '',
    email: ''
  });

  // Initialize Firebase services
  const db = getFirestore(app);
  const auth = getAuth(app);

  // Get current user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Get user document from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userDataFromFirestore = userDoc.data();
            setUserData({
              userId: user.uid,
              email: userDataFromFirestore.email || user.email || '',
              fullName: userDataFromFirestore.fullName || 'User'
            });
          } else {
            // Fallback to auth user data if Firestore document doesn't exist
            setUserData({
              userId: user.uid,
              email: user.email || '',
              fullName: user.displayName || 'User'
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to auth user data on error
          setUserData({
            userId: user.uid,
            email: user.email || '',
            fullName: user.displayName || 'User'
          });
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchPriceFromFirebase = async () => {
      try {
        const db = getDatabase(app);
        const roomRef = ref(db, `accommodations/${room.id}`);
        const snapshot = await get(roomRef);
        if (snapshot.exists()) {
          const roomData = snapshot.val();
          
          // Helper function to parse price (handles both string and number)
          const parsePrice = (price) => {
            if (typeof price === 'string') {
              return parseInt(price.replace(/₱|,/g, '')) || 0;
            }
            return Number(price) || 0;
          };

          if (isWholeResort) {
            setFirebasePrice(parsePrice(roomData.wholeResortPrice));
          } else if (dayHours > 0 && overnightHours > 0) {
            const dayPrice = parsePrice(roomData.dayPrice);
            const overnightPrice = parsePrice(roomData.overnightPrice);
            setFirebasePrice(dayPrice + overnightPrice);
          } else if (dayHours > 0) {
            setFirebasePrice(parsePrice(roomData.dayPrice));
          } else if (overnightHours > 0) {
            setFirebasePrice(parsePrice(roomData.overnightPrice));
          }
        }
      } catch (error) {
        console.error("Error fetching price from Firebase:", error);
        setFirebasePrice(0); // Set default price on error
      }
    };

    fetchPriceFromFirebase();
  }, [room.id, dayHours, overnightHours, isWholeResort]);

  // Function to generate a unique reservation ID
  const generateReservationId = () => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 8);
    return `RES-${timestamp}-${randomStr}`.toUpperCase();
  };

  // Function to get room type for dates collection
  const getRoomType = () => {
    if (isWholeResort) {
      return 'whole_resort';
    } else {
      // Use the room ID directly for better consistency
      return room.id || `room_${room.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    }
  };

  // Function to normalize date format for document ID
  const normalizeDateForId = (dateString) => {
    // Convert date from "MM/DD/YYYY" to "YYYY-MM-DD" format for consistency
    const parts = dateString.split('/');
    if (parts.length === 3) {
      return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
    }
    return dateString.replace(/\//g, '-');
  };

  // Function to save reservation date to the dates collection
  const saveReservationDate = async (reservationId, roomType, reservationDate) => {
    try {
      // Normalize the date for document ID
      const normalizedDate = normalizeDateForId(reservationDate);
      
      // Create a document ID based on room type and normalized date
      const dateDocId = `${roomType}_${normalizedDate}`;
      
      console.log('Saving to dates collection with ID:', dateDocId);
      
      // Reference to the dates collection document
      const dateDocRef = doc(db, 'dates', dateDocId);
      
      // Get existing document if it exists
      const dateDoc = await getDoc(dateDocRef);
      
      const reservationData = {
        reservationId: reservationId,
        roomType: roomType,
        date: reservationDate,
        roomName: room.name,
        guests: guests,
        bookedAt: new Date().toISOString(),
        userId: userData.userId,
        userFullName: userData.fullName,
        status: 'pending' // ADDED: Include status in dates collection too
      };

      if (dateDoc.exists()) {
        // Document exists, update it by adding the new reservation using arrayUnion
        await updateDoc(dateDocRef, {
          reservations: arrayUnion(reservationData),
          lastUpdated: new Date().toISOString()
        });
        console.log('Updated existing date document');
      } else {
        // Document doesn't exist, create new one
        await setDoc(dateDocRef, {
          date: reservationDate,
          normalizedDate: normalizedDate,
          roomType: roomType,
          reservations: [reservationData],
          createdAt: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        });
        console.log('Created new date document');
      }
      
      console.log('Reservation date successfully saved to dates collection');
      return true;
    } catch (error) {
      console.error('Error saving reservation date:', error);
      console.error('Error details:', error.message);
      return false;
    }
  };

  const handlePayment = async () => {
    if (!selectedPayment) {
      Alert.alert('Payment Method', 'Please select a payment method to proceed.');
      return;
    }

    if (!userData.userId) {
      Alert.alert('Error', 'User not authenticated. Please log in again.');
      return;
    }

    setIsProcessing(true);

    try {
      // Generate reservation ID
      const reservationId = generateReservationId();

      // Determine room type for dates collection
      const roomType = getRoomType();
      console.log('Room type for dates collection:', roomType);

      // Create base reservation data
      const reservationData = {
        reservationId: reservationId,
        // User information
        userId: userData.userId,
        userFullName: userData.fullName,
        userEmail: userData.email,
        // Room information
        room: {
          id: room.id,
          name: room.name,
          type: roomType
        },
        date: date,
        guests: guests,
        totalAmount: firebasePrice,
        paymentMethod: selectedPayment,
        status: 'pending', // Changed from 'confirmed' to 'pending'
        createdAt: serverTimestamp(),
        // Initialize QR code related fields
        qrCodeSent: false,
        qrData: {
          date: date,
          guestName: userData.fullName,
          reservationId: reservationId,
          room: room.name,
          verificationCode: generateVerificationCode()
        }
      };

      // Only include relevant fields based on booking type
      if (isWholeResort) {
        reservationData.isWholeResort = true;
      } else {
        if (dayHours > 0) {
          reservationData.dayHours = dayHours;
        }
        if (overnightHours > 0) {
          reservationData.overnightHours = overnightHours;
        }
      }

      console.log('Saving reservation to Firestore...');

      // Save to Firestore reservations collection
      const docRef = await addDoc(collection(db, 'reservations'), reservationData);
      
      console.log('Reservation saved with ID: ', docRef.id);

      // Save to dates collection
      console.log('Saving to dates collection...');
      const dateSaveSuccess = await saveReservationDate(reservationId, roomType, date);
      
      if (!dateSaveSuccess) {
        console.warn('Reservation was saved but there was an issue updating the dates collection');
      } else {
        console.log('Successfully saved to both reservations and dates collections');
      }

      // Show success message for on arrival payment
      Alert.alert(
        "Reservation Submitted Successfully!",
        `Your reservation has been submitted and is now pending confirmation.\n\nReservation ID: ${reservationId}\n\nPayment Method: ${selectedPayment}\n\nTotal Amount: ₱${firebasePrice.toLocaleString()}\n\nPlease proceed with payment upon arrival at the resort.`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate('Home') // Adjust to your home screen name
          }
        ]
      );

    } catch (error) {
      console.error('Error saving reservation:', error);
      console.error('Error details:', error.message);
      Alert.alert('Error', 'There was an error processing your reservation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Function to generate verification code for QR
  const generateVerificationCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const paymentOptions = [
    { name: 'On Arrival', icon: 'cash-outline' },
    // You can add more payment options here later like 'Bank Transfer', etc.
  ];

  return (
    <SafeAreaView style={styles.fullScreenContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Total Amount</Text>
          <View style={styles.totalAmountContainer}>
            <Text style={styles.totalAmountText}>₱{firebasePrice.toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {paymentOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.paymentOption,
                selectedPayment === option.name && styles.selectedPaymentOption,
              ]}
              onPress={() => {
                if (selectedPayment === option.name) {
                  setSelectedPayment('');
                } else {
                  setSelectedPayment(option.name);
                }
              }}
            >
              <View style={styles.paymentOptionContent}>
                <Ionicons
                  name={option.icon}
                  size={24}
                  color={selectedPayment === option.name ? '#d4af37' : '#6B7280'}
                />
                <Text style={[
                  styles.paymentOptionText,
                  selectedPayment === option.name && styles.selectedPaymentText,
                ]}>
                  {option.name}
                </Text>
              </View>
              {selectedPayment === option.name && (
                <Ionicons name="checkmark-circle" size={20} color="#d4af37" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Reservation Summary</Text>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Room:</Text>
            <Text style={styles.summaryValue}>{room.name}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Check-in Date:</Text>
            <Text style={styles.summaryValue}>{date}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Guests:</Text>
            <Text style={styles.summaryValue}>{guests}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Booked By:</Text>
            <Text style={styles.summaryValue}>{userData.fullName}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Email:</Text>
            <Text style={styles.summaryValue}>{userData.email}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Duration:</Text>
            <Text style={styles.summaryValue}>
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

        {/* Information about on arrival payment */}
        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={24} color="#3b82f6" />
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>On Arrival Payment</Text>
            <Text style={styles.infoDescription}>
      Once admin confirms your reservation, a QR code will be sent to your email. 
      Proceed to the resort on your check-in date and present the QR code at the front desk. 
      Staff will check you in. Please bring a valid ID.
    </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.payButton,
            isProcessing && styles.payButtonDisabled
          ]}
          onPress={handlePayment}
          disabled={isProcessing}
        >
          <Text style={styles.payButtonText}>
            {isProcessing ? 'Processing...' : 'Submit Reservation'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

