// css/BookingScreenStyles.js
import { StyleSheet, Platform, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: '#fff',
    elevation: 4,
  },
  navTitle: { 
    marginLeft: 15, 
    fontSize: 22, 
    fontWeight: '600', 
    fontFamily: 'PlayfairDisplay', 
    color: '#2c3e50' 
  },
  titleContainer: { 
    alignItems: 'center', 
    marginVertical: 15 
  },
  pageTitle: { 
    fontSize: 22, 
    fontWeight: '600', 
    fontFamily: 'PlayfairDisplay', 
    color: '#333' 
  },
  goldLine: { 
    marginTop: 6, 
    width: 80, 
    height: 3, 
    backgroundColor: '#d4af37', 
    borderRadius: 2 
  },
  filterBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#aaa',
    backgroundColor: '#fff',
  },
  filterText: { 
    color: '#000', 
    fontWeight: '600' 
  },
  activeFilter: { 
    backgroundColor: '#d4af37', 
    borderColor: 'transparent' 
  },
  activeFilterText: { 
    color: '#fff' 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10, 
    marginBottom: 12 
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    padding: 8,
    elevation: 2,
    minHeight: 310,
    justifyContent: 'space-between',
  },
  inactiveCard: { 
    opacity: 0.7 
  },
  imagePlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
    overflow: 'hidden',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unavailableText: { 
    color: 'white', 
    fontWeight: 'bold', 
    fontSize: 16, 
    textAlign: 'center' 
  },
  textContainer: { 
    alignItems: 'center', 
    marginBottom: 8 
  },
  roomName: { 
    fontSize: 15, 
    fontFamily: 'PlayfairDisplay', 
    fontWeight: '600', 
    color: '#333', 
    textAlign: 'center' 
  },
  packageType: { 
    fontSize: 12, 
    fontStyle: 'italic', 
    color: '#03963bff', 
    textAlign: 'center' 
  },
  inactiveStatus: { 
    fontSize: 11, 
    color: '#ff4444', 
    fontStyle: 'italic', 
    marginTop: 4 
  },
  priceContainer: { 
    alignItems: 'center', 
    marginBottom: 8 
  },
  priceLine: { 
    fontSize: 14, 
    color: '#444', 
    marginBottom: 2, 
    textAlign: 'center' 
  },
  wholeResortPrice: { 
    fontSize: 14, 
    color: '#444', 
    fontWeight: '600', 
    textAlign: 'center' 
  },
  goldPrice: { 
    color: '#d4af37', 
    fontWeight: '700' 
  },
  bookBtn: { 
    backgroundColor: '#d4af37', 
    paddingVertical: 6, 
    borderRadius: 6, 
    alignItems: 'center' 
  },
  bookText: { 
    color: '#fff', 
    fontWeight: '600', 
    fontSize: 15 
  },
  unavailableBtn: { 
    backgroundColor: '#cccccc', 
    paddingVertical: 6, 
    borderRadius: 6, 
    alignItems: 'center' 
  },
  unavailableBtnText: { 
    color: '#666666', 
    fontWeight: '600', 
    fontSize: 15 
  },
});

export default styles;