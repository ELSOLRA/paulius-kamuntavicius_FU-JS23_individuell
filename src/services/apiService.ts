
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

export default submitOrder;