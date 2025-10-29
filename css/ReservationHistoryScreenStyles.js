import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /** BASE **/
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  /** UPDATED HEADER - Same as ProfileImageScreen **/
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

  /** FILTER **/
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  filterButton: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F4F4F4',
  },
  filterButtonActive: {
    backgroundColor: '#C8A951',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#777',
  },
  filterButtonTextActive: {
    color: '#fff',
  },

  /** LOADING **/
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 15,
    color: '#777',
  },

  /** LIST **/
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
  },
  resultsCount: {
    fontSize: 14,
    color: '#888',
    marginBottom: 14,
    textAlign: 'center',
  },

  /** CARD **/
  reservationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reservationIdContainer: {
    flexDirection: 'column',
  },
  reservationId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
  },
  timePeriod: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 2,
    fontStyle: 'italic',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    backgroundColor: '#C8A951',
    shadowColor: '#C8A951',
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 2,
  },
  statusIcon: {
    marginRight: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  cardBody: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F1F1',
    paddingTop: 10,
  },
  roomName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 6,
  },
  dateAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 5,
  },
  amount: {
    fontSize: 17,
    fontWeight: '700',
    color: '#C8A951',
  },
  guestName: {
    fontSize: 13,
    color: '#6B7280',
    marginTop: 2,
  },
  cardFooter: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  /** EMPTY STATE **/
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 36,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 22,
    lineHeight: 22,
  },
  bookNowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C8A951',
    paddingHorizontal: 26,
    paddingVertical: 12,
    borderRadius: 10,
    elevation: 4,
  },
  bookNowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default styles;