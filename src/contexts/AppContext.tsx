import React, { createContext, useContext, useReducer } from 'react';
import { BusinessConfig, Service, BusinessType, BusinessState, BusinessAction } from '../types/business';
import { serviceConfigs } from '../templates/config';

type AppState = BusinessState;
type AppAction = BusinessAction;

interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  setSelectedService: (service: Service | null) => void;
  setSelectedLocation: (location: string | null) => void;
  business: BusinessConfig;
}

const initialState: AppState = {
  currentBusiness: BusinessType.TURF_SERVICE,
  selectedService: null,
  selectedLocation: null,
  theme: serviceConfigs[BusinessType.TURF_SERVICE].theme,
  business: serviceConfigs[BusinessType.TURF_SERVICE],
  isModalOpen: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_BUSINESS':
      const config = serviceConfigs[action.payload];
      return {
        ...state,
        currentBusiness: action.payload,
        theme: config.theme,
        selectedService: null,
        selectedLocation: null,
        business: config
      };
    case 'SET_SERVICE':
      return {
        ...state,
        selectedService: action.payload
      };
    case 'SET_LOCATION':
      return {
        ...state,
        selectedLocation: action.payload
      };
    case 'TOGGLE_MODAL':
      return {
        ...state,
        isModalOpen: action.payload
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setSelectedService = (service: Service | null) => {
    dispatch({ type: 'SET_SERVICE', payload: service });
  };

  const setSelectedLocation = (location: string | null) => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        setSelectedService,
        setSelectedLocation,
        business: state.business
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
