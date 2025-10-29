// css/SidebarStyles.js
import { StyleSheet, Dimensions, Platform } from "react-native";

const sidebarWidth = Dimensions.get('window').width * 0.7;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)', 
    zIndex: 5,
  },
  sidebar: {
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    width: sidebarWidth,
    backgroundColor: '#fff', 
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 18, 
    shadowColor: '#000', 
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 0 }, 
    shadowRadius: 5,
    elevation: 10, 
    zIndex: 20,
  },
  profileSection: { 
    alignItems: 'center', 
    marginBottom: 15,
    marginTop: Platform.OS === 'ios' ? 10 : 0,
  },
  profileImageContainer: { 
    width: 70, 
    height: 70, 
    borderRadius: 35, 
    overflow: 'hidden', 
    marginBottom: 8 
  },
  profileImage: { 
    width: '100%', 
    height: '100%', 
    borderRadius: 35 
  },
  profileImagePlaceholder: { 
    flex: 1, 
    backgroundColor: '#d4af37', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  cameraIcon: { 
    position: 'absolute', 
    bottom: 0, 
    right: 0, 
    backgroundColor: '#333', 
    padding: 3, 
    borderRadius: 10 
  },
  userName: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#333' 
  },
  userEmail: { 
    fontSize: 13, 
    color: '#666' 
  },
  editProfileText: { 
    fontSize: 11, 
    color: '#999', 
    marginTop: 2 
  },
  divider: { 
    height: 1, 
    backgroundColor: '#ddd', 
    marginVertical: 8 
  },
  menuHeader: { 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 10, 
    color: '#d4af37', 
    textAlign: 'center' 
  },
  menuList: { 
    flex: 1 
  },
  menuItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10, 
    borderBottomColor: '#ddd', 
    borderBottomWidth: 1 
  },
  menuIcon: { 
    marginRight: 12 
  },
  menuText: { 
    fontSize: 15, 
    color: '#333' 
  },
  logoutWrapper: { 
    paddingVertical: 12, 
    borderTopColor: '#ddd', 
    borderTopWidth: 1 
  },
  logoutBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#b22222', 
    paddingVertical: 10, 
    paddingHorizontal: 15, 
    borderRadius: 25, 
    justifyContent: 'center' 
  },
  logoutBtnDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  logoutText: { 
    color: '#fff', 
    fontSize: 15, 
    marginLeft: 6, 
    fontWeight: '600' 
  },
});

export default styles;