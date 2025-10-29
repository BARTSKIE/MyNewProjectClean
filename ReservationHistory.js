import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from './firebase';
import styles from './css/ReservationHistoryScreenStyles'; // IMPORT STYLES

export default function ReservationHistoryScreen({ navigation }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchUserReservations();
  }, []);

  const fetchUserReservations = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        Alert.alert('Error', 'Please login to view reservation history');
        navigation.navigate('Login');
        return;
      }

      console.log("Fetching reservations for user ID:", user.uid);
      
      // Query using userId - BEST PRACTICE
      const q = query(
        collection(db, 'reservations'),
        where('userId', '==', user.uid), // Using userId instead of email
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const userReservations = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log("Found reservations:", userReservations.length);
      setReservations(userReservations);
    } catch (error) {
      console.error('Error fetching reservations:', error);
      Alert.alert('Error', 'Failed to load reservation history');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUserReservations();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#4CAF50';
      case 'checked-in': return '#2196F3';
      case 'cancelled': return '#F44336';
      case 'pending': return '#FF9800';
      case 'completed': return '#757575';
      default: return '#757575';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'checkmark-circle';
      case 'checked-in': return 'bed';
      case 'cancelled': return 'close-circle';
      case 'pending': return 'time';
      case 'completed': return 'checkmark-done';
      default: return 'help-circle';
    }
  };

  const formatCurrency = (amount) => {
    return `₱${amount?.toLocaleString() || '0'}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getTimePeriod = (reservation) => {
    if (reservation.isWholeResort) return "24 HOURS";
    if (reservation.dayHours > 0 && reservation.overnightHours > 0) return "DAY + OVERNIGHT";
    if (reservation.dayHours > 0) return "DAY PACKAGE";
    if (reservation.overnightHours > 0) return "OVERNIGHT PACKAGE";
    return "CUSTOM";
  };

  const filterReservations = () => {
    switch (selectedFilter) {
      case 'upcoming':
        return reservations.filter(res => 
          res.status === 'confirmed' || res.status === 'pending'
        );
      case 'past':
        return reservations.filter(res => 
          res.status === 'completed' || res.status === 'checked-in'
        );
      case 'cancelled':
        return reservations.filter(res => res.status === 'cancelled');
      default:
        return reservations;
    }
  };

  const filteredReservations = filterReservations();

  const renderReservationItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.reservationCard}
      onPress={() => navigation.navigate('ReservationDetails', { reservationData: item })}
    >
      <View style={styles.cardHeader}>
        <View style={styles.reservationIdContainer}>
          <Text style={styles.reservationId}>#{item.reservationId}</Text>
          <Text style={styles.timePeriod}>{getTimePeriod(item)}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Ionicons 
            name={getStatusIcon(item.status)} 
            size={12} 
            color="#fff" 
            style={styles.statusIcon}
          />
          <Text style={styles.statusText}>{item.status?.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <Text style={styles.roomName}>{item.room?.name || 'Unknown Room'}</Text>
        <View style={styles.dateAmountContainer}>
          <View style={styles.dateContainer}>
            <Ionicons name="calendar" size={14} color="#666" />
            <Text style={styles.date}>{formatDate(item.date)}</Text>
          </View>
          <Text style={styles.amount}>{formatCurrency(item.totalAmount)}</Text>
        </View>
        <Text style={styles.guestName}>
          {item.userFullName || 'Guest'} • {item.guests || 1} guest(s)
        </Text>
      </View>
      
      <View style={styles.cardFooter}>
        <Ionicons name="chevron-forward" size={20} color="#C8A951" />
      </View>
    </TouchableOpacity>
  );

  const FilterButton = ({ title, value }) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === value && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFilter(value)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === value && styles.filterButtonTextActive
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reservation History</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#C8A951" />
          <Text style={styles.loadingText}>Loading your reservations...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reservation History</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        <FilterButton title="All" value="all" />
        <FilterButton title="Upcoming" value="upcoming" />
        <FilterButton title="Past" value="past" />
        <FilterButton title="Cancelled" value="cancelled" />
      </View>

      {filteredReservations.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="calendar-outline" size={80} color="#C8A951" />
          <Text style={styles.emptyTitle}>
            {selectedFilter === 'all' ? 'No Reservations Yet' : `No ${selectedFilter} Reservations`}
          </Text>
          <Text style={styles.emptyText}>
            {selectedFilter === 'all' 
              ? "You haven't made any reservations yet. Start by booking a room!"
              : `You don't have any ${selectedFilter} reservations.`
            }
          </Text>
          {selectedFilter === 'all' && (
            <TouchableOpacity 
              style={styles.bookNowButton}
              onPress={() => navigation.navigate('Bookings')}
            >
              <Ionicons name="add" size={20} color="#fff" />
              <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={filteredReservations}
          renderItem={renderReservationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#C8A951']}
              tintColor="#C8A951"
            />
          }
          ListHeaderComponent={
            <Text style={styles.resultsCount}>
              {filteredReservations.length} reservation(s) found
            </Text>
          }
        />
      )}
    </SafeAreaView>
  );
}