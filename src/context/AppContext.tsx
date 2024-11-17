import React, { createContext, useContext, useReducer } from 'react';
import { AppState, AppAction, Service, Theme, UserState, BookingState } from '../types';

const initialTheme: Theme = {
  isDark: false,
  accentColor: '#0070f3',
  primaryColor: '#2563eb',
  secondaryColor: '#3b82f6',
  textColor: '#1f2937',
  backgroundColor: '#ffffff'
};

const initialState: AppState = {
  services: [],
  selectedService: null,
  isModalOpen: false,
  theme: initialTheme,
  user: null,
  booking: null
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_SERVICES':
      return { ...state, services: action.payload };
    case 'SELECT_SERVICE':
      return { ...state, selectedService: action.payload, isModalOpen: true };
    case 'CLOSE_MODAL':
      return { ...state, isModalOpen: false };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: { ...state.theme, isDark: !state.theme.isDark }
      };
    case 'SET_ACCENT_COLOR':
      return {
        ...state,
        theme: { ...state.theme, accentColor: action.payload }
      };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_BOOKING':
      return {
        ...state,
        booking: { ...state.booking, ...action.payload }
      };
    case 'CLEAR_BOOKING':
      return { ...state, booking: null };
    default:
      return state;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export function useTheme() {
  const { state } = useApp();
  return state.theme;
}

export function useServices() {
  const { state } = useApp();
  return state.services;
}

export function useSelectedService() {
  const { state } = useApp();
  return state.selectedService;
}

export function useUser() {
  const { state } = useApp();
  return state.user;
}

export function useBooking() {
  const { state } = useApp();
  return state.booking;
}
