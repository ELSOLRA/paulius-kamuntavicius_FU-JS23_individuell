
const apiUrl = 'https://airbean-api-xjlcn.ondigitalocean.app';

const submitOrder = async (orderData: any, userToken?: string) => {

    try {


      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      };
      // Include user token in headers if available
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



export { submitOrder, getOrderStatus, authenticateUser };