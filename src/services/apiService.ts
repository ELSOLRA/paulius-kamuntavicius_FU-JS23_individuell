import { OrderHistoryResponse } from "../components/Signup/SignupForm";

const apiUrl = 'https://airbean-api-xjlcn.ondigitalocean.app';

const submitOrder = async (orderData: any, userToken?: string) => {

    try {


      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      };
   
      if (userToken) {
        headers['Authorization'] = `Bearer ${userToken}`;

      }
    
      const response = await fetch(`${apiUrl}/api/beans/order`, {
      method: 'POST',
      headers,
      body: JSON.stringify(orderData),
    });

        if (!response.ok) {
            throw new Error(`Error submitting : ${response.statusText}`);
          }

        return await response.json();

        
    }  catch (error:any) {
        throw new Error(`Error submitting : ${error.message}`);
    }

};

const getOrderStatus = async (orderNr: string, userToken?: string) => {
    try {

      const headers: Record<string, string> = {
        'accept': 'application/json',
      };
      if (userToken) {
        headers['Authorization'] = `Bearer ${userToken}`;
      }
  
      const response = await fetch(`${apiUrl}/api/beans/order/status/${orderNr}`, {
        method: 'GET',
        headers,
      });

          if (response.ok) {
            return await response.json();
    } else {
        throw new Error(`Order status error: ${response.statusText}`);
      }
    } catch (error: any) {
      throw new Error(`Order status error: ${error.message}`);
    }
  };

  const authenticateUser = async (userData: { username: string; password: string;  }, endpoint: string) => {
    
    try {
      const response = await fetch(`${apiUrl}/api/user/${endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`Signup failed: ${response.statusText}`);
      }
    } catch (error: any) {
      throw new Error(`An error occurred during signup: ${error.message}`);
    }
  };

  const fetchOrderHistory = async (userToken: string): Promise<OrderHistoryResponse> => {
    try {

      const headers: Record<string, string> = {
        'accept': 'application/json',
      };

      if (userToken) {
        headers['Authorization'] = `Bearer ${userToken}`;
      }

      const response = await fetch(`${apiUrl}/api/user/history`, {
        method: 'GET',
        headers,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Order History:', result.orderHistory);
        return result;
      } else {
        console.error(`Error fetching History: ${response.statusText}`);
      }
    } catch (error: any) {
      console.error(`Error fetching History: ${error.message}`);
      throw new Error(`Error fetching History: ${error.message}`);
    }
    return { success: false, error: 'Unexpected error occurred' };
  };


export { submitOrder, getOrderStatus, authenticateUser, fetchOrderHistory };