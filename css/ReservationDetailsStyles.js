import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /** BASE **/
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },

  /** HEADER **/
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#C8A951',
    paddingHorizontal: 18,
    paddingVertical: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  headerTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#fff',
  },
  actionButton: {
    padding: 8,
  },
  headerRight: {
    width: 32,
  },

  /** CONTAINER **/
  container: {
    flex: 1,
    padding: 18,
  },

  /** STATUS BANNER **/
  statusBanner: {
    borderRadius: 14,
    padding: 22,
    marginBottom: 22,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 4,
  },
  statusBannerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginTop: 10,
    letterSpacing: 1,
  },
  reservationId: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
    marginTop: 2,
  },

  /** SECTION **/
  section: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
    paddingBottom: 8,
  },

  /** INFO ITEMS **/
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoContent: {
    flex: 1,
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '600',
  },
  amountText: {
    color: '#C8A951',
    fontWeight: '700',
    fontSize: 18,
  },
  timestampValue: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },

  /** ERROR STATE **/
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#C8A951',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  /** MODAL **/
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },
  modalAction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
  },
  cancelAction: {
    backgroundColor: '#FFF6E5',
  },
  closeAction: {
    backgroundColor: '#F5F5F5',
    marginTop: 10,
  },
  modalActionText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    color: '#333',
  },
  noActions: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  noActionsText: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default styles;