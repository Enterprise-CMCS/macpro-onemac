export interface Notification {
  notificationId: string;
  header: string;
  body: string;
  buttonText?: string;
  buttonLink?: string;
  publicationDate: string;
  expiryDate?: string;
  activeStatus: boolean;
  notificationType: string;
}
