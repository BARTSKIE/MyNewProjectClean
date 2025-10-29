// css/HomeScreenStyles.js
import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#ffffffff' 
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  navTitle: {
    marginLeft: 15,
    fontSize: 22,
    fontWeight: '600',
    fontFamily: 'PlayfairDisplay',
    color: '#2c3e50',
  },
  body: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredContent: { 
    alignItems: 'center' 
  },
  smallText: {
    fontSize: 14,
    color: '#A67C00',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 1,
  },
  bigText: {
    fontSize: 30,
    color: '#A67C00',
    textAlign: 'center',
    lineHeight: 36,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontFamily: 'PlayfairDisplay',
  },
  button: {
    borderWidth: 1.5,
    borderColor: '#A67C00',
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#ad6433ff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default styles;