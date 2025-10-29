import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity,
  Alert,
  Modal,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import styles from './css/ReservationDetailsStyles'; // IMPORT STYLES

export default function ReservationDetails({ route, navigation }) {
  const { reservationData } = route.params;
  const [showActionModal, setShowActionModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(300)).current;

  // If no data, show error
  if (!reservationData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reservation Details</Text>
          <View style={styles.headerRight} />
        </View>
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={48} color="#FF6B6B" />
          <Text style={styles.errorText}>No reservation data found</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

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

  const formatDateTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const getTimePeriod = () => {
    if (reservationData.isWholeResort) return "24 HOURS";
    if (reservationData.dayHours > 0 && reservationData.overnightHours > 0) return "DAY + OVERNIGHT";
    if (reservationData.dayHours > 0) return "DAY PACKAGE";
    if (reservationData.overnightHours > 0) return "OVERNIGHT PACKAGE";
    return "CUSTOM";
  };

  const canCancelReservation = () => {
    // ONLY pending reservations can be cancelled by users
    return reservationData.status === 'pending';
  };

  const showActionModalFunc = () => {
    setShowActionModal(true);
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true })
    ]).start();
  };

  const hideActionModal = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 300, duration: 200, useNativeDriver: true })
    ]).start(() => setShowActionModal(false));
  };

  const handleCancelReservation = async () => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this reservation?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive", 
          onPress: async () => {
            try {
              setIsProcessing(true);
              const reservationRef = doc(db, 'reservations', reservationData.id);
              await updateDoc(reservationRef, {
                status: 'cancelled',
                updatedAt: new Date()
              });
              Alert.alert("Success", "Reservation cancelled successfully");
              navigation.goBack();
            } catch (error) {
              console.error("Error cancelling reservation:", error);
              Alert.alert("Error", "Failed to cancel reservation");
            } finally {
              setIsProcessing(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reservation Details</Text>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={showActionModalFunc}
        >
          <Ionicons name="ellipsis-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        {/* Status Banner */}
        <View style={[styles.statusBanner, { backgroundColor: getStatusColor(reservationData.status) }]}>
          <Ionicons name={getStatusIcon(reservationData.status)} size={32} color="#fff" />
          <Text style={styles.statusBannerText}>
            {reservationData.status?.charAt(0).toUpperCase() + reservationData.status?.slice(1) || 'Unknown'}
          </Text>
          <Text style={styles.reservationId}>
            #{reservationData.reservationId}
          </Text>
        </View>

        {/* Guest Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Guest Information</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="person" size={20} color="#C8A951" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Guest Name</Text>
              <Text style={styles.infoValue}>{reservationData.userFullName || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="mail" size={20} color="#C8A951" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{reservationData.userEmail || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="people" size={20} color="#C8A951" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Number of Guests</Text>
              <Text style={styles.infoValue}>{reservationData.guests || 0} person(s)</Text>
            </View>
          </View>
        </View>

        {/* Reservation Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Reservation Details</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="calendar" size={20} color="#C8A951" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Reservation Date</Text>
              <Text style={styles.infoValue}>{reservationData.date || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="bed" size={20} color="#C8A951" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Room</Text>
              <Text style={styles.infoValue}>
                {reservationData.room?.name || 'Unknown Room'}
                {reservationData.isWholeResort && ' (Whole Resort)'}
              </Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="time" size={20} color="#C8A951" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Time Period</Text>
              <Text style={styles.infoValue}>{getTimePeriod()}</Text>
            </View>
          </View>

          {reservationData.checkInTime && (
            <View style={styles.infoItem}>
              <Ionicons name="log-in" size={20} color="#4CAF50" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Checked In At</Text>
                <Text style={styles.infoValue}>
                  {formatDateTime(reservationData.checkInTime)}
                </Text>
              </View>
            </View>
          )}

          {reservationData.checkOutTime && (
            <View style={styles.infoItem}>
              <Ionicons name="log-out" size={20} color="#2196F3" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Checked Out At</Text>
                <Text style={styles.infoValue}>
                  {formatDateTime(reservationData.checkOutTime)}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Payment Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Information</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="card" size={20} color="#C8A951" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Payment Method</Text>
              <Text style={styles.infoValue}>{reservationData.paymentMethod || 'N/A'}</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="cash" size={20} color="#C8A951" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Total Amount</Text>
              <Text style={[styles.infoValue, styles.amountText]}>
                {formatCurrency(reservationData.totalAmount)}
              </Text>
            </View>
          </View>
        </View>

        {/* Timestamps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Timestamps</Text>
          
          <View style={styles.infoItem}>
            <Ionicons name="create" size={16} color="#666" />
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Created</Text>
              <Text style={styles.timestampValue}>
                {formatDateTime(reservationData.createdAt)}
              </Text>
            </View>
          </View>

          {reservationData.updatedAt && (
            <View style={styles.infoItem}>
              <Ionicons name="refresh" size={16} color="#666" />
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Last Updated</Text>
                <Text style={styles.timestampValue}>
                  {formatDateTime(reservationData.updatedAt)}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Action Modal */}
      <Modal
        visible={showActionModal}
        transparent
        animationType="none"
        onRequestClose={hideActionModal}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={hideActionModal}
        >
          <Animated.View 
            style={[
              styles.modalContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* CANCEL RESERVATION BUTTON - Shows ONLY for pending reservations */}
            {canCancelReservation() && (
              <TouchableOpacity 
                style={[styles.modalAction, styles.cancelAction]}
                onPress={() => {
                  hideActionModal();
                  handleCancelReservation();
                }}
                disabled={isProcessing}
              >
                <Ionicons name="close-circle" size={20} color="#FFA726" />
                <Text style={styles.modalActionText}>Cancel Reservation</Text>
              </TouchableOpacity>
            )}

            {/* NO ACTIONS AVAILABLE */}
            {!canCancelReservation() && (
              <View style={styles.noActions}>
                <Ionicons name="information-circle" size={24} color="#666" />
                <Text style={styles.noActionsText}>
                  No actions available for this reservation
                </Text>
              </View>
            )}

            <TouchableOpacity 
              style={[styles.modalAction, styles.closeAction]}
              onPress={hideActionModal}
            >
              <Ionicons name="close" size={20} color="#666" />
              <Text style={styles.modalActionText}>Close</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}