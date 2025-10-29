// LoginScreen.js - UPDATED WITH PROPER ERROR HANDLING
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather as Icon } from "@expo/vector-icons";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from './firebase';
import styles from './css/LoginScreenStyles';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Client-side validation
    if (!email && !password) {
      Alert.alert("Login Failed", "Please enter your email and password.");
      return;
    }

    if (!email) {
      Alert.alert("Login Failed", "Please enter your email address.");
      return;
    }

    if (!password) {
      Alert.alert("Login Failed", "Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert("Email not verified", "Please verify your email before logging in.");
        await signOut(auth);
        return;
      }

      console.log("Login successful:", user.email);
      navigation.navigate('Home');
    } catch (error) {
      let errorMessage = "An unknown error occurred. Please try again.";

      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format. Please check your email.';
          break;
        case 'auth/user-not-found':
          errorMessage = 'No account found with this email address.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password. Please try again.';
          break;
        case 'auth/invalid-credential':
          // This error code covers both wrong email and wrong password scenarios
          if (email && password) {
            errorMessage = 'Incorrect email and password. Please try again.';
          }
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many failed login attempts. Please try again later.';
          break;
        default:
          errorMessage = error.message;
          break;
      }

      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#ffffff', '#ffffff']} style={styles.container}>
      {/* LOGO SECTION */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('./imagelogo/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Don Elmer's Resort</Text>
      <Text style={styles.subtitle}>Login to your account</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Icon name="mail" size={20} color="#C8A951" style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#C8A951" style={styles.icon} />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon
            name={passwordVisible ? "eye" : "eye-off"}
            size={20}
            color="#C8A951"
          />
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <LinearGradient colors={["#d4af37", "#d4af37"]} style={styles.gradientBtn}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Link to Register */}
      <TouchableOpacity onPress={() => navigation.replace("Register")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}