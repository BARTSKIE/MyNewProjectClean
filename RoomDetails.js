// RoomDetails.js 
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collection, doc, getDocs, query, where, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import styles from './css/RoomDetailsStyles';

const { width } = Dimensions.get('window');

export default function RoomDetails({ route, navigation }) {
  const { room } = route.params || {
    name: 'Deluxe Room',
    type: 'room',
    dayPrice: 2500,
    overnightPrice: 3500,
    wholeResortPrice: 40000,
    image: 'https://images.unsplash.com/photo-1582582621959-48d27397dc69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwa90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    description: 'Premium accommodation with modern amenities and breathtaking views for an unforgettable stay.'
  };

  const [date, setDate] = useState('');
  const [dayHours, setDayHours] = useState(0);
  const [overnightHours, setOvernightHours] = useState(0);
  const [guests, setGuests] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [bookedDates, setBookedDates] = useState({});
  const [availableAmenities, setAvailableAmenities] = useState([]);

  // Extract prices with fallbacks
  const dayPrice = room.dayPrice || 0;
  const nightPrice = room.overnightPrice || 0;
  const wholeResortPrice = room.wholeResortPrice || 0;

  const isWholeResort = room.type === 'whole';
  const isCottage = room.type === 'cottage';
  const isRoom = room.type === 'room';

  const dayTotal = dayHours > 0 ? dayPrice : 0;
  const overnightTotal = overnightHours > 0 ? nightPrice : 0;
  const amenitiesTotal = selectedAmenities.reduce((sum, amenity) => sum + (amenity.price || 0), 0);
  const basePrice = isWholeResort ? wholeResortPrice : (dayTotal + overnightTotal);
  const totalPrice = basePrice + amenitiesTotal;

  // Use capacity from room data, if no capacity use default based on type
  const getDefaultCapacity = () => {
    if (isWholeResort) return 50;
    if (isCottage || isRoom) return 8;
    return 8; // fallback
  };
  
  const maxGuests = room.capacity !== undefined && room.capacity !== null ? room.capacity : getDefaultCapacity();

  const isReservationValid = date && (isWholeResort || dayHours > 0 || overnightHours > 0) && guests > 0;

  // Process amenities when component mounts or room changes
  useEffect(() => {
    processAmenities();
  }, [room]);

  // Fetch booked dates for this room
  useEffect(() => {
    fetchBookedDates();
  }, [room.name]);

  const processAmenities = () => {
    let amenities = [];
    
    // First check if room has amenities array from database
    if (room.amenities && Array.isArray(room.amenities) && room.amenities.length > 0) {
      // Convert string array to object array with name only (free amenities)
      amenities = room.amenities.map(amenityName => ({
        name: amenityName,
        price: 0 // All amenities from database are free/included
      }));
    } 
    // If no amenities in database, check for old features structure
    else if (room.features && Array.isArray(room.features) && room.features.length > 0) {
      amenities = room.features;
    }
    // If no amenities at all, leave it empty
    
    setAvailableAmenities(amenities);
  };

  const fetchBookedDates = async () => {
    try {
      const datesCollection = collection(db, 'dates');
      const querySnapshot = await getDocs(datesCollection);
      
      const bookedDatesMap = {};
      
      querySnapshot.forEach((docSnapshot) => {
        const dateData = docSnapshot.data();
        const normalizedDate = dateData.normalizedDate || dateData.date;
        
        if (dateData.reservations && Array.isArray(dateData.reservations)) {
          dateData.reservations.forEach(reservation => {
            // Check if this reservation is for the current room AND has active status
            if (reservation.roomName === room.name) {
              // Store the reservation data including status
              if (!bookedDatesMap[normalizedDate]) {
                bookedDatesMap[normalizedDate] = [];
              }
              bookedDatesMap[normalizedDate].push({
                status: reservation.status || 'pending' // Default to pending if no status
              });
            }
          });
        }
      });
      
      setBookedDates(bookedDatesMap);
    } catch (error) {
      console.error('Error fetching booked dates:', error);
    }
  };

  const handleDayHoursIncrement = () => {
    setDayHours(10);
    setOvernightHours(0);
  };

  const handleDayHoursDecrement = () => {
    setDayHours(0);
  };

  const handleOvernightHoursIncrement = () => {
    setOvernightHours(10);
    setDayHours(0);
  };

  const handleOvernightHoursDecrement = () => {
    setOvernightHours(0);
  };

  const isDaySelected = dayHours === 10;
  const isOvernightSelected = overnightHours === 10;

  const isAmenityOptional = (amenity) => amenity.price > 0;

  const toggleAmenity = (amenity) => {
    if (!isAmenityOptional(amenity)) {
      return;
    }
    setSelectedAmenities(prevSelected => {
      if (prevSelected.some(item => item.name === amenity.name)) {
        return prevSelected.filter(item => item.name !== amenity.name);
      } else {
        return [...prevSelected, amenity];
      }
    });
  };

  const handleReservePress = () => {
    if (!isReservationValid) {
      Alert.alert(
        "Incomplete Reservation",
        "Please select a check-in date" + (isWholeResort ? "" : " and a stay duration") + " and at least 1 guest to proceed.",
        [{ text: "OK" }]
      );
      return;
    }
    navigation.navigate('ReservationReviewScreen', {
      room,
      date,
      dayHours,
      overnightHours,
      guests,
      totalPrice,
      selectedAmenities
    });
  };

  // Helper function to format date like Firestore (e.g., "Oct 6, 2025")
  const formatDateForComparison = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // NEW LOGIC: Check if date is booked based on reservation status
  const isDateBooked = (date) => {
    const formattedDate = formatDateForComparison(date);
    const reservations = bookedDates[formattedDate];
    
    // No reservations = date is available
    if (!reservations) return false;
    
    // Check if any reservation has pending or confirmed status
    // Only these statuses should block the date
    const hasActiveReservation = reservations.some(reservation => 
      reservation.status === 'pending' || reservation.status === 'confirmed'
    );
    
    return hasActiveReservation;
  };

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<View key={`empty-${i}`} style={styles.dayCell} />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentYear, currentMonth, day);
      currentDate.setHours(0, 0, 0, 0);

      const isPast = currentDate < today;
      const isBooked = isDateBooked(currentDate);
      const isDisabled = isPast || isBooked;
      const isSelected = selectedDate &&
        currentDate.getDate() === selectedDate.getDate() &&
        currentDate.getMonth() === selectedDate.getMonth() &&
        currentDate.getFullYear() === selectedDate.getFullYear();

      days.push(
        <TouchableOpacity
          key={`day-${currentYear}-${currentMonth}-${day}`}
          style={[
            styles.dayCell,
            isSelected && styles.selectedDay,
            isDisabled && styles.disabledDay
          ]}
          onPress={() => {
            if (!isDisabled) {
              setSelectedDate(currentDate);
            }
          }}
          disabled={isDisabled}
        >
          <Text style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            isDisabled && styles.disabledDayText
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }

    return days;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#2c3e50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{room.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: room.image }}
            style={styles.roomImage}
            resizeMode="cover"
          />
          <View style={styles.priceBadge}>
            <Text style={styles.priceBadgeText}>
              FROM ₱{isWholeResort ? wholeResortPrice.toLocaleString() : dayPrice.toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <View style={styles.titleRow}>
            <Text style={styles.roomName}>{room.name}</Text>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{room.type.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>DESCRIPTION</Text>
          <Text style={styles.description}>
            {room.description || 'Premium accommodation with modern amenities and breathtaking views for an unforgettable stay.'}
          </Text>

          {/* Always show amenities section, but with appropriate content */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>AMENITIES & INCLUSIONS</Text>
          <View style={styles.amenitiesGrid}>
            {availableAmenities.length > 0 ? (
              availableAmenities.map((item, index) => {
                const isOptional = isAmenityOptional(item);
                const isSelected = selectedAmenities.some(amenity => amenity.name === item.name);

                return (
                  <TouchableOpacity
                    key={`amenity-${item.name}-${index}`}
                    style={styles.amenityItem}
                    onPress={() => toggleAmenity(item)}
                    disabled={!isOptional}
                  >
                    <Ionicons
                      name={isSelected ? "checkmark-circle" : (isOptional ? "add-circle-outline" : "checkmark-circle")}
                      size={16}
                      color={isSelected || !isOptional ? "#d4af37" : "#ccc"}
                    />
                    <Text style={[styles.amenityText, { color: isOptional ? '#555' : '#777' }]}>
                      {item.name}
                      {isOptional && (
                        <Text style={styles.amenityPrice}> (+₱{item.price.toLocaleString()})</Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                );
              })
            ) : (
              <Text style={styles.noAmenitiesText}>No amenities or inclusions available.</Text>
            )}
          </View>

          <View style={styles.pricingCard}>
            {isWholeResort ? (
              <View style={styles.pricingRow}>
                <Text style={styles.pricingLabel}>24-Hour Stay Package:</Text>
                <Text style={styles.pricingValue}>₱{wholeResortPrice.toLocaleString()}</Text>
              </View>
            ) : (
              <>
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Day Rate (10 hours):</Text>
                  <Text style={styles.pricingValue}>₱{dayPrice.toLocaleString()}</Text>
                </View>
                <View style={styles.pricingRow}>
                  <Text style={styles.pricingLabel}>Overnight (10 hours):</Text>
                  <Text style={styles.pricingValue}>₱{nightPrice.toLocaleString()}</Text>
                </View>
              </>
            )}
          </View>

          <Text style={styles.sectionTitle}>BOOK YOUR STAY</Text>
          <View style={styles.bookingForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CHECK-IN DATE</Text>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={date ? styles.dateText : styles.placeholderText}>
                  {date || 'Select a date'}
                </Text>
                <Ionicons name="calendar" size={20} color="#d4af37" />
              </TouchableOpacity>
            </View>

            {!isWholeResort ? (
              <View style={styles.counterRow}>
                <View style={styles.counterGroup}>
                  <Text style={styles.inputLabel}>DAY HOURS (7AM-5PM)</Text>
                  <View style={styles.counter}>
                    <TouchableOpacity
                      onPress={handleDayHoursDecrement}
                      style={styles.counterButton}
                      disabled={dayHours === 0 || isOvernightSelected}
                    >
                      <Ionicons
                        name="chevron-back"
                        size={18}
                        color={dayHours === 0 || isOvernightSelected ? '#ccc' : '#d4af37'}
                      />
                    </TouchableOpacity>
                    <Text style={[
                      styles.counterValue,
                      (dayHours === 0 || isOvernightSelected) && styles.disabledText
                    ]}>
                      {dayHours === 0 || dayHours === 10 ? 'DAY' : dayHours}
                    </Text>
                    <TouchableOpacity
                      onPress={handleDayHoursIncrement}
                      style={styles.counterButton}
                      disabled={dayHours === 10 || isOvernightSelected}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={dayHours === 10 || isOvernightSelected ? '#ccc' : '#d4af37'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.counterGroup}>
                  <Text style={styles.inputLabel}>OVERNIGHT HOURS (7PM-5AM)</Text>
                  <View style={styles.counter}>
                    <TouchableOpacity
                      onPress={handleOvernightHoursDecrement}
                      style={styles.counterButton}
                      disabled={overnightHours === 0 || isDaySelected}
                    >
                      <Ionicons
                        name="chevron-back"
                        size={18}
                        color={overnightHours === 0 || isDaySelected ? '#ccc' : '#d4af37'}
                      />
                    </TouchableOpacity>
                    <Text style={[
                      styles.counterValue,
                      (overnightHours === 0 || isDaySelected) && styles.disabledText
                    ]}>
                      {overnightHours === 0 || overnightHours === 10 ? 'OVERNIGHT' : overnightHours}
                    </Text>
                    <TouchableOpacity
                      onPress={handleOvernightHoursIncrement}
                      style={styles.counterButton}
                      disabled={overnightHours === 10 || isDaySelected}
                    >
                      <Ionicons
                        name="chevron-forward"
                        size={18}
                        color={overnightHours === 10 || isDaySelected ? '#ccc' : '#d4af37'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.packageInfo}>
                <Text style={styles.packageTitle}>FULL DAY & NIGHT PACKAGE</Text>
                <Text style={styles.packageDescription}>
                  Includes 24-hour access to the entire resort, including all facilities and amenities.
                </Text>
              </View>
            )}

            {/* Always show guest counter */}
            <View style={styles.counterGroup}>
              <Text style={styles.inputLabel}>GUESTS (Max: {maxGuests})</Text>
              <View style={styles.counter}>
                <TouchableOpacity
                  onPress={() => setGuests(Math.max(0, guests - 1))}
                  style={styles.counterButton}
                >
                  <Ionicons
                    name="remove"
                    size={18}
                    color={guests === 0 ? '#ccc' : '#d4af37'}
                  />
                </TouchableOpacity>
                <Text style={styles.counterValue}>{guests}</Text>
                <TouchableOpacity
                  onPress={() => setGuests(Math.min(maxGuests, guests + 1))}
                  style={styles.counterButton}
                  disabled={guests === maxGuests}
                >
                  <Ionicons
                    name="add"
                    size={18}
                    color={guests === maxGuests ? '#ccc' : '#d4af37'}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.totalContainer}>
            <View style={styles.priceBreakdown}>
              {dayHours > 0 && (
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>DAY</Text>
                  <Text style={styles.priceValue}>₱{dayTotal.toLocaleString()}</Text>
                </View>
              )}
              {overnightHours > 0 && (
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>OVERNIGHT</Text>
                  <Text style={styles.priceValue}>₱{overnightTotal.toLocaleString()}</Text>
                </View>
              )}
              {isWholeResort && (
                <View style={styles.priceRow}>
                  <Text style={styles.priceLabel}>24-HOUR PACKAGE</Text>
                  <Text style={styles.priceValue}>₱{wholeResortPrice.toLocaleString()}</Text>
                </View>
              )}
              {selectedAmenities.map((amenity, index) => (
                <View key={`selected-amenity-${amenity.name}-${index}`} style={styles.priceRow}>
                  <Text style={styles.priceLabel}>{amenity.name}</Text>
                  <Text style={styles.priceValue}>₱{amenity.price.toLocaleString()}</Text>
                </View>
              ))}
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TOTAL</Text>
              <Text style={styles.totalPrice}>₱{totalPrice.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.bookButton, !isReservationValid && styles.disabledButton]}
          onPress={handleReservePress}
          disabled={!isReservationValid}
        >
          <Text style={styles.bookButtonText}>RESERVE NOW</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Check-in Date</Text>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Ionicons name="close" size={24} color="#2c3e50" />
              </TouchableOpacity>
            </View>

            <View style={styles.calendarLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, styles.availableColor]} />
                <Text style={styles.legendText}>Available</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendColor, styles.disabledColor]} />
                <Text style={styles.legendText}>Unavailable</Text>
              </View>
            </View>

            <View style={styles.calendar}>
              <View style={styles.calendarHeader}>
                <TouchableOpacity
                  onPress={() => {
                    if (currentMonth === 0) {
                      setCurrentMonth(11);
                      setCurrentYear(currentYear - 1);
                    } else {
                      setCurrentMonth(currentMonth - 1);
                    }
                  }}
                >
                  <Ionicons name="chevron-back" size={20} color="#2c3e50" />
                </TouchableOpacity>

                <Text style={styles.monthText}>
                  {new Date(currentYear, currentMonth).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    if (currentMonth === 11) {
                      setCurrentMonth(0);
                      setCurrentYear(currentYear + 1);
                    } else {
                      setCurrentMonth(currentMonth + 1);
                    }
                  }}
                >
                  <Ionicons name="chevron-forward" size={20} color="#2c3e50" />
                </TouchableOpacity>
              </View>

              <View style={styles.weekDays}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <Text key={`weekday-${day}`} style={styles.weekDayText}>{day}</Text>
                ))}
              </View>

              <View style={styles.daysGrid}>
                {renderCalendarDays()}
              </View>
            </View>

            <TouchableOpacity
              style={[styles.dateconfirmButton, !selectedDate && styles.disabledButton]}
              onPress={() => {
                if (selectedDate) {
                  setDate(selectedDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  }));
                }
                setShowDatePicker(false);
              }}
              disabled={!selectedDate}
            >
              <Text style={styles.dateconfirmButtonText}>
                {selectedDate ? 'Confirm Date' : 'Select a Date'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}