
const fetchCoffeeMenu = async (/* setLoading: React.Dispatch<React.SetStateAction<boolean>> */) => {
    try {
    //   setLoading(true);
  
  const response = await fetch('https://airbean-api-xjlcn.ondigitalocean.app/api/beans/', {
        headers: {
          Accept: 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch coffee menu');
      }
  
      const data = await response.json();
      return data.menu;
    } catch (error) {
      console.error(error);
      throw error;
    } 
  };
  
  export default fetchCoffeeMenu ;