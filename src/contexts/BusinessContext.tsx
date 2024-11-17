import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { 
  BusinessConfig, 
  BusinessState, 
  BusinessAction, 
  Service, 
  BusinessType,
  Business,
  Theme,
  isBusinessType
} from '../types/business';

interface BusinessContextType {
  state: BusinessState;
  currentBusinessConfig: BusinessConfig | null;
  dispatch: React.Dispatch<BusinessAction>;
  setCurrentBusiness: (type: BusinessType, config?: BusinessConfig) => void;
  selectService: (service: Service | null) => void;
  selectLocation: (location: string | null) => void;
  toggleModal: (isOpen: boolean) => void;
}

const initialState: BusinessState = {
  currentBusiness: null,
  currentBusinessConfig: null,
  business: null,
  theme: null,
  selectedService: null,
  selectedLocation: null,
  isModalOpen: false
};

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

function businessReducer(state: BusinessState, action: BusinessAction): BusinessState {
  switch (action.type) {
    case 'SET_BUSINESS':
      const config = action.config;
      const business: Business | null = config ? {
        config,
        type: action.payload,
        theme: config.theme
      } : null;

      return {
        ...state,
        currentBusiness: action.payload,
        currentBusinessConfig: config || null,
        business,
        theme: config?.theme || null,
        selectedService: null,
        selectedLocation: null
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
}

interface BusinessContextProviderProps {
  children: React.ReactNode;
  initialConfig?: BusinessConfig;
}

export function BusinessProvider({ children, initialConfig }: BusinessContextProviderProps) {
  const [state, dispatch] = useReducer(businessReducer, {
    ...initialState,
    currentBusiness: initialConfig?.type || null,
    currentBusinessConfig: initialConfig || null,
    business: initialConfig ? {
      config: initialConfig,
      type: initialConfig.type,
      theme: initialConfig.theme
    } : null,
    theme: initialConfig?.theme || null
  });

  const setCurrentBusiness = useCallback((type: BusinessType, config?: BusinessConfig) => {
    dispatch({ type: 'SET_BUSINESS', payload: type, config: config || initialConfig });
  }, [initialConfig]);

  const selectService = useCallback((service: Service | null) => {
    dispatch({ type: 'SET_SERVICE', payload: service });
  }, []);

  const selectLocation = useCallback((location: string | null) => {
    dispatch({ type: 'SET_LOCATION', payload: location });
  }, []);

  const toggleModal = useCallback((isOpen: boolean) => {
    dispatch({ type: 'TOGGLE_MODAL', payload: isOpen });
  }, []);

  const value = {
    state,
    currentBusinessConfig: state.currentBusinessConfig,
    dispatch,
    setCurrentBusiness,
    selectService,
    selectLocation,
    toggleModal
  };

  return (
    <BusinessContext.Provider value={value}>
      {children}
    </BusinessContext.Provider>
  );
}

export function useBusinessContext() {
  const context = useContext(BusinessContext);
  if (context === undefined) {
    throw new Error('useBusinessContext must be used within a BusinessContextProvider');
  }
  return context;
}

export function useBusinessConfig() {
  const { state } = useBusinessContext();
  return state.currentBusinessConfig;
}

export function useSelectedService() {
  const { state } = useBusinessContext();
  return state.selectedService;
}

export function useTheme() {
  const { state } = useBusinessContext();
  return state.theme;
}

export function useModal() {
  const { state, toggleModal } = useBusinessContext();
  return [state.isModalOpen, toggleModal] as const;
}

export { 
  BusinessContext,
  BusinessProvider,
  useBusinessContext,
  useBusinessConfig,
  useSelectedService,
  useTheme,
  useModal
};
