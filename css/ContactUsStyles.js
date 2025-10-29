// css/ContactUsStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  scrollContent: {
    paddingBottom: 40, // ✅ Changed from paddingVertical to paddingBottom only
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 40, // ✅ Added paddingTop for proper spacing
    backgroundColor: '#fff', // ✅ Added background color
  },
  burgerButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: '600',
    color: '#222',
    fontFamily: 'PlayfairDisplay',
    flex: 1,
    textAlign: 'center',
    marginRight: 34,
  },
  goldLine: {
    height: 4,
    width: 80,
    backgroundColor: '#C8A951',
    alignSelf: 'center',
    marginBottom: 35,
    borderRadius: 2,
  },
  infoBox: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    padding: 16,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#34495e',
  },
  infoText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },
  linkText: {
    color: '#1a73e8',
    textDecorationLine: 'underline',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C8A951',
    marginTop: 14,
    marginBottom: 4,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  sectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 6,
  },
  socialIcon: {
    marginRight: 16,
  },
  icon: {
    marginRight: 12,
  },
  mapCard: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    padding: 16,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  mapContainer: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
  locationNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  footerText: {
    marginTop: 35,
    fontSize: 13,
    textAlign: 'center',
    color: '#aaa',
    fontStyle: 'italic',
  },
});

export default styles;