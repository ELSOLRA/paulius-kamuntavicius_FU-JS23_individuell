
const apiUrl = 'https://airbean-api-xjlcn.ondigitalocean.app';

const submitOrder = async (orderData: any) => {

    try {
        const response = await fetch (`${apiUrl}/api/beans/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
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

const getOrderStatus = async (orderNr: string) => {
    try {
        const response = await fetch(`${apiUrl}/api/beans/order/status/${orderNr}`, {
            method: 'GET',
            headers: {
              'accept': 'application/json',
            },
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

  const signupUser = async (userData: { username: string; password: string }) => {
    
    try {
      const response = await fetch(`${apiUrl}/api/user/signup`, {
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



export { submitOrder, getOrderStatus, signupUser };