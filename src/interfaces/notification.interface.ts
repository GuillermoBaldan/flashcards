import { title } from 'process';
export interface NotificationPayload {
  user_id: string;
  type: 'deck_share_request' | 'deck_share_response' | 'reminder' | 'system';
  title?: string;
  message?: string;
  action?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'expired' | 'read' | 'archived';
  sender_id?: string;
  metadata?: {
    request_id?: string;
    deck_id?: string;
    response?: 'accepted' | 'rejected';
    deck_name?: string;
    deck_color?: string;
    sender_name?: string;
    receiver_name?: string;
    username?: string;
  };
  expires_at?: Date;
  created_at: Date;
  updated_at?: Date;
}

// Tipos auxiliares
export type NotificationType = NotificationPayload['type'];
export type NotificationStatus = NotificationPayload['status'];
export type NotificationResponse = NotificationPayload['metadata']['response'];
