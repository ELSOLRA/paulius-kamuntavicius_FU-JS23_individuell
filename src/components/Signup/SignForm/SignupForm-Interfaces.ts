
export interface OrderHistoryItem {
    total: number;
    orderNr: string;
    orderDate: string;
  }
  
  export interface OrderHistoryResponse {
    success: boolean;
    orderHistory?: OrderHistoryItem[];
    error?: string;
  }

export interface AuthFormProps {
    defaultEndpoint: 'signup' | 'login';
    // loginSuccess: (username: string, email: string, orderHistory: OrderHistoryItem[]) => void;
    signupSuccess: (username: string, email: string) => void;
  }