export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  duration?: number; // in minutes
  availability?: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  service?: string;
  preferredDate?: string;
  preferredTime?: string;
  message: string;
}

export interface Theme {
  isDark: boolean;
  accentColor: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
}

export interface AppState {
  services: Service[];
  selectedService: Service | null;
  isModalOpen: boolean;
  theme: Theme;
  user: UserState | null;
  booking: BookingState | null;
}

export interface UserState {
  id?: string;
  name?: string;
  email?: string;
  preferences?: {
    notifications: boolean;
    theme: 'light' | 'dark';
  };
}

export interface BookingState {
  service: Service | null;
  selectedDate?: string;
  selectedTime?: string;
  contactInfo?: ContactForm;
  paymentStatus?: 'pending' | 'completed' | 'failed';
}

export type AppAction =
  | { type: 'SET_SERVICES'; payload: Service[] }
  | { type: 'SELECT_SERVICE'; payload: Service }
  | { type: 'CLOSE_MODAL' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_ACCENT_COLOR'; payload: string }
  | { type: 'SET_USER'; payload: UserState }
  | { type: 'UPDATE_BOOKING'; payload: Partial<BookingState> }
  | { type: 'CLEAR_BOOKING' };
