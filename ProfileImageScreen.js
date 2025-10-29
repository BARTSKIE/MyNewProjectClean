// ProfileImageScreen.js - UPDATED WITH SAME HEADER STYLE
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import styles from './css/ProfileImageScreenStyles';

const ProfileImageScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          setUserEmail(user.email || '');
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              const data = userDoc.data();
              setFullName(data.fullName || "");
            } else {
              setFullName(user.email ? user.email.split('@')[0] : 'User');
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
            setFullName(user.email ? user.email.split('@')[0] : 'User');
          }
          setProfileImage(user.photoURL || null);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        Alert.alert('Error', 'Failed to load user information.');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // ... (rest of your functions remain the same)
  const requestPermissions = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
        return false;
      }
    }
    return true;
  };

  const selectImageFromGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      try {
        await updateProfile(auth.currentUser, {
          photoURL: result.assets[0].uri
        });
        Alert.alert('Success', 'Profile image updated!');
      } catch (error) {
        console.error("Error updating profile:", error);
        Alert.alert('Error', 'Failed to update profile image.');
      }
    }
  };

  const takePhotoWithCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      try {
        await updateProfile(auth.currentUser, {
          photoURL: result.assets[0].uri
        });
        Alert.alert('Success', 'Profile image updated!');
      } catch (error) {
        console.error("Error updating profile:", error);
        Alert.alert('Error', 'Failed to update profile image.');
      }
    }
  };

  const updateUserFullName = async (newFullName) => {
    try {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          fullName: newFullName
        });
        await updateProfile(user, {
          displayName: newFullName
        });
        setFullName(newFullName);
        Alert.alert('Success', 'Name updated successfully!');
      }
    } catch (error) {
      console.error("Error updating name:", error);
      Alert.alert('Error', 'Failed to update name.');
    }
  };

  const sendVerificationEmail = async () => {
    try {
      const user = auth.currentUser;
      if (user && user.email) {
        await sendPasswordResetEmail(auth, user.email);
        Alert.alert(
          'Verification Sent',
          'A password reset link has been sent to your email. Please check your inbox.'
        );
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      Alert.alert('Error', 'Failed to send verification email.');
    }
  };

  const promptChangePassword = () => {
    Alert.alert(
      'Change Password',
      'We will send a verification link to your email.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Send Verification', onPress: sendVerificationEmail },
      ]
    );
  };

  const promptForName = () => {
    Alert.prompt(
      'Edit Name',
      'Enter your full name:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Save',
          onPress: (newName) => {
            if (newName && newName.trim().length > 0) {
              updateUserFullName(newName.trim());
            } else {
              Alert.alert('Error', 'Please enter a valid name.');
            }
          }
        },
      ],
      'plain-text',
      fullName
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        {/* SAME HEADER AS RESERVATION HISTORY */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* SAME HEADER AS RESERVATION HISTORY */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ... rest of your content remains the same */}
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Profile Image</Text>
          <View style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Ionicons name="person" size={50} color="#fff" />
              </View>
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={selectImageFromGallery}>
              <Ionicons name="image" size={20} color="#fff" />
              <Text style={styles.buttonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={takePhotoWithCamera}>
              <Ionicons name="camera" size={20} color="#fff" />
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <TouchableOpacity onPress={promptForName}>
              <View style={styles.nameContainer}>
                <Text style={styles.infoValue}>{fullName || 'Not set'}</Text>
                <Ionicons name="pencil" size={16} color="#C8A951" style={styles.editIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{userEmail || 'Not set'}</Text>
          </View>
        </View>

        <View style={styles.passwordSection}>
          <Text style={styles.sectionTitle}>Security</Text>
          <TouchableOpacity style={styles.passwordButton} onPress={promptChangePassword}>
            <Ionicons name="key" size={22} color="#C8A951" />
            <Text style={styles.passwordButtonText}>Change Password</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          <Text style={styles.passwordNote}>
            We'll send a verification link to your email to change your password.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileImageScreen;