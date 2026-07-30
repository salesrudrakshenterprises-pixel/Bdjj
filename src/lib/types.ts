export type UserRole = 'member' | 'guru' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  membershipId?: string;
  membershipType?: 'basic' | 'premium' | 'lifetime';
  membershipExpiry?: string;
  joinedAt: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'satsang' | 'meditation' | 'workshop' | 'festival' | 'retreat';
  description: string;
  date: string;
  time: string;
  endDate?: string;
  location: string;
  mode: 'online' | 'offline' | 'hybrid';
  price: number;
  capacity: number;
  registered: number;
  image: string;
  guruId: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image: string;
  publishedAt: string;
  readTime: number;
  featured: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  type: 'image' | 'video';
  url: string;
  thumbnail: string;
  category: string;
  uploadedAt: string;
}

export interface Donation {
  id: string;
  userId?: string;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  purpose: string;
  message?: string;
  anonymous: boolean;
  status: 'pending' | 'completed' | 'failed';
  date: string;
  receiptUrl?: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  tickets: number;
  amount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookedAt: string;
  qrCode?: string;
}

export interface MeditationSession {
  id: string;
  userId: string;
  duration: number;
  type: 'guided' | 'silent' | 'breathing' | 'mantra';
  completedAt: string;
  notes?: string;
  mood?: string;
}

export interface DailyBlessing {
  id: string;
  date: string;
  title: string;
  message: string;
  scripture: string;
  reflection: string;
  author: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'event' | 'donation' | 'blessing' | 'system';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface Certificate {
  id: string;
  userId: string;
  type: 'meditation' | 'course' | 'donation' | 'membership';
  title: string;
  issuedAt: string;
  url: string;
  expiryDate?: string;
}

export interface Appointment {
  id: string;
  userId: string;
  userName: string;
  guruId: string;
  date: string;
  time: string;
  duration: number;
  type: 'spiritual' | 'personal' | 'group';
  status: 'scheduled' | 'completed' | 'cancelled' | 'pending';
  notes?: string;
  meetingLink?: string;
}

export interface DownloadableFile {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'audio' | 'video' | 'document';
  url: string;
  size: string;
  category: string;
  downloads: number;
  uploadedAt: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  price?: number;
  duration?: string;
  category: string;
  available: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  content: string;
  rating: number;
  avatar?: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  contactEmail: string;
  contactPhone: string;
  address: string;
  workingHours: string;
}
