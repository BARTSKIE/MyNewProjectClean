// Sidebar.js - COMPLETE FIXED VERSION
import React, { useRef, useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Dimensions, 
  Platform, 
  Animated, 
  Pressable, 
  Alert,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import styles from './css/SidebarStyles';

const sidebarWidth = Dimensions.get('window').width * 0.7;

export default function Sidebar({ isVisible, setVisible, navigation, showLogout = true }) {
  const sidebarAnim = useRef(new Animated.Value(-sidebarWidth)).current;
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState('Guest User');
  const [userEmail, setUserEmail] = useState('guest@example.com');
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const auth = getAuth();

    // Refresh profile data whenever sidebar is opened
    if (isVisible && auth.currentUser) {
      setUserName(auth.currentUser.displayName || 'Guest User');
      setUserEmail(auth.currentUser.email || 'guest@example.com');
      setProfileImage(auth.currentUser.photoURL || null);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || 'Guest User');
        setUserEmail(user.email || 'guest@example.com');
        setProfileImage(user.photoURL || null);
      } else {
        setUserName('Guest User');
        setUserEmail('guest@example.com');
        setProfileImage(null);
      }
    });

    return () => unsubscribe();
  }, [isVisible]);

  // Animate sidebar
  useEffect(() => {
    Animated.timing(sidebarAnim, {
      toValue: isVisible ? 0 : -sidebarWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isVisible]);

  // ✅ FIXED LOGOUT FUNCTION
  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);
      console.log("Starting logout process...");
      
      const auth = getAuth();
      
      if (!auth.currentUser) {
        console.log("No user is currently signed in");
        Alert.alert("Info", "No user is currently signed in.");
        setIsLoggingOut(false);
        return;
      }
      
      console.log("Signing out user:", auth.currentUser.email);
      
      await signOut(auth);
      console.log("Sign out successful");
      
      setVisible(false);
      
      // ✅ FIXED: USE REPLACE INSTEAD OF RESET
      setTimeout(() => {
        try {
          navigation.replace('Login');
          console.log("Successfully navigated to Login screen");
        } catch (replaceError) {
          console.log("Replace failed, trying navigate...");
          navigation.navigate('Login');
        }
      }, 300);
      
    } catch (error) {
      console.error("Logout error:", error);
      let errorMessage = "Failed to logout. Please try again.";
      
      if (error.code === 'auth/network-request-failed') {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many attempts. Please try again later.";
      }
      
      Alert.alert("Logout Error", errorMessage);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const confirmLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Logout", 
          onPress: handleLogout,
          style: "destructive"
        }
      ]
    );
  };

  const menuItems = [
    { title: 'Rooms', icon: 'bed-outline', screen: 'Bookings' },
    { title: 'Amenities', icon: 'cafe-outline', screen: 'Amenities' },
    { title: 'About Us', icon: 'information-circle-outline', screen: 'AboutUs' },
    { title: 'Contact', icon: 'call-outline', screen: 'ContactUs' },
    { title: 'Profile', icon: 'person-outline', screen: 'ProfileImage' },
    { title: 'Reservation History', icon: 'time-outline', screen: 'ReservationHistory' }, 
  ];

  const handleMenuPress = (screen) => {
    try {
      console.log(`Navigating to: ${screen}`);
      setVisible(false);
      
      // Small delay to ensure sidebar closes first
      setTimeout(() => {
        try {
          navigation.navigate(screen);
          console.log(`Successfully navigated to ${screen}`);
        } catch (navError) {
          console.error(`Navigation error to ${screen}:`, navError);
          Alert.alert(
            "Navigation Error", 
            `Cannot navigate to ${screen}. The screen might not be available.`
          );
        }
      }, 150);
      
    } catch (error) {
      console.error(`Error in handleMenuPress for ${screen}:`, error);
      Alert.alert(
        "Error", 
        "Something went wrong. Please try again."
      );
    }
  };

  const navigateToProfile = () => {
    try {
      setVisible(false);
      setTimeout(() => {
        navigation.navigate('ProfileImage');
      }, 150);
    } catch (error) {
      console.error("Error navigating to profile:", error);
      Alert.alert("Error", "Cannot open profile right now.");
    }
  };

  return (
    <>
      {isVisible && <Pressable style={styles.overlay} onPress={() => setVisible(false)} />}
      <Animated.View style={[styles.sidebar, { left: sidebarAnim }]}>
        
        {/* Profile Section */}
        <TouchableOpacity style={styles.profileSection} onPress={navigateToProfile}>
          <View style={styles.profileImageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={28} color="#fff" />
              </View>
            )}
            <View style={styles.cameraIcon}>
              <Ionicons name="camera" size={14} color="#fff" />
            </View>
          </View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <Text style={styles.editProfileText}>Tap to edit profile</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Menu */}
        <Text style={styles.menuHeader}>Menu</Text>
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.screen)}
            >
              <Ionicons name={item.icon} size={20} color="#333" style={styles.menuIcon} />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        {showLogout && (
          <View style={styles.logoutWrapper}>
            <TouchableOpacity 
              style={[
                styles.logoutBtn, 
                isLoggingOut && styles.logoutBtnDisabled
              ]} 
              onPress={confirmLogout}
              disabled={isLoggingOut}
            >
              <Ionicons 
                name={isLoggingOut ? "time-outline" : "log-out-outline"} 
                size={18} 
                color="#fff" 
              />
              <Text style={styles.logoutText}>
                {isLoggingOut ? "Logging out..." : "Logout"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Animated.View>
    </>
  );
}