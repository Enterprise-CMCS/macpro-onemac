export interface Notification {
  pk: string;
  sk: string;
  notificationId: string;
  header: string;
  body: string;
  buttonText?: string;
  buttonLink?: string;
  publicationDate: string;
  expiryDate?: string;
  activeStatus: boolean;
  notificationType: string;
  dismissed: boolean;
}
