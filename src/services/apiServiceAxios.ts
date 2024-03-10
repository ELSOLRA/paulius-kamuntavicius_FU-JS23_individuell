import axios from 'axios';

const apiUrl = 'https://airbean-api-xjlcn.ondigitalocean.app';

export const submitOrder = async (orderData: any) => {
  try {
    const response = await axios.post(`${apiUrl}/api/beans/order`, orderData, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',

      },
    });

    return response.data;
  } catch (error: any) {
    throw new Error(`Error submitting order: ${error.message}`);
  }
};