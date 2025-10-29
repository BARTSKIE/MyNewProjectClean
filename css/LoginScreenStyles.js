  // LoginScreenStyles.js - UPDATED WITH LOGO STYLES
  import { StyleSheet } from "react-native";

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 25,
    },
    // LOGO STYLES
    logoContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#222",
      textAlign: "center",
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 16,
      color: "#666",
      textAlign: "center",
      marginBottom: 30,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 12,
      paddingHorizontal: 12,
      marginBottom: 15,
      elevation: 2,
    },
    icon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      height: 50,
      color: "#333",
      fontSize: 16,
    },
    eyeIcon: {
      padding: 5,
    },
    button: {
      borderRadius: 12,
      overflow: "hidden",
      marginTop: 10,
    },
    gradientBtn: {
      paddingVertical: 15,
      alignItems: "center",
      borderRadius: 12,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },
    link: {
      marginTop: 20,
      textAlign: "center",
      fontSize: 14,
      color: "#d4af37",
      fontWeight: "600",
    },
  });

  export default styles;