// css/InboxStyles.js - NEW FILE
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#666',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingTop: 10,
  },
  burgerButton: {
    padding: 5,
  },
  header: {
    fontSize: 26,
    fontWeight: '600',
    color: '#222',
    fontFamily: 'PlayfairDisplay',
    textAlign: 'center',
    flex: 1,
  },
  refreshButton: {
    padding: 5,
  },
  goldLine: {
    height: 3,
    width: 60,
    backgroundColor: '#C8A951',
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  contactButton: {
    backgroundColor: '#C8A951',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  inquiryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#C8A951',
  },
  inquiryHeader: {
    marginBottom: 15,
  },
  inquiryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  inquiryDate: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
  statusNew: {
    backgroundColor: '#ffebee',
  },
  statusProcessed: {
    backgroundColor: '#e8f5e9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusNew: {
    backgroundColor: '#ffebee',
  },
  statusProcessed: {
    backgroundColor: '#e8f5e9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusNew: {
    backgroundColor: '#ffebee',
  },
  statusProcessed: {
    backgroundColor: '#e8f5e9',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusNew: {
    backgroundColor: '#ffebee',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#c62828',
  },
  statusProcessed: {
    backgroundColor: '#e8f5e9',
  },
  statusProcessedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
  },
  messageContainer: {
    marginBottom: 15,
  },
  messageLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  userMessageBubble: {
    backgroundColor: '#f1f8ff',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#3498db',
  },
  adminReplyBubble: {
    backgroundColor: '#f0f8f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#27ae60',
  },
  adminName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  replyDate: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
  },
  repliesContainer: {
    marginTop: 10,
  },
  repliesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  noRepliesContainer: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#ffc107',
  },
  noRepliesText: {
    fontSize: 14,
    color: '#856404',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  footer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default styles;