// css/ProfileImageScreenStyles.js - UPDATED HEADER STYLES
import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  
  /** UPDATED HEADER - Same as ReservationHistoryScreen **/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    elevation: 2,
  },
  backButton: { 
    padding: 5 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },

  // ... (keep all your existing styles below, they remain the same)
  scrollContent: { 
    padding: 20, 
    paddingBottom: 40 
  },
  profileSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    color: '#333', 
    alignSelf: 'flex-start' 
  },
  imageContainer: { 
    marginBottom: 20 
  },
  profileImage: { 
    width: 150, 
    height: 150, 
    borderRadius: 75 
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#C8A951',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: { 
    width: '100%' 
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C8A951',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600', 
    marginLeft: 10 
  },
  infoSection: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 20, 
    marginBottom: 20, 
    elevation: 2 
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: { 
    fontSize: 16, 
    color: '#666', 
    fontWeight: '500' 
  },
  infoValue: { 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#333' 
  },
  nameContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  editIcon: { 
    marginLeft: 8 
  },
  passwordSection: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 20, 
    elevation: 2 
  },
  passwordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  passwordButtonText: { 
    flex: 1, 
    marginLeft: 10, 
    fontSize: 16, 
    fontWeight: '500', 
    color: '#333' 
  },
  passwordNote: { 
    fontSize: 14, 
    color: '#666', 
    fontStyle: 'italic', 
    marginTop: 10 
  },
  
  // ... (other styles remain the same)
});

export default styles;