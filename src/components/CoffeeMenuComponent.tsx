import { useEffect, useState } from "react";
import useCoffeeMenuState from "../store/useCoffeeMenuStore";

import Loader from "./common/Loader";
import useCartStore from "../store/useCartStore";
import { MenuItem } from "../store/storeTypes";
import fetchCoffeeMenu from "../services/coffeeMenuService";

type CoffeeMenuProp = {
    addIconPath: string;
}

const CoffeeMenuComponent: React.FC<CoffeeMenuProp> = ({addIconPath}) => {
    const { menu, setMenu } = useCoffeeMenuState();
    const [loading, setLoading] = useState(false);
    const { addToCart } = useCartStore();

useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const newMenuItems = await fetchCoffeeMenu();
  
        setMenu(newMenuItems);
      } catch (error) {

        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [setMenu]);

  const handleClick = (item: MenuItem) => {
    addToCart(item);
    console.log("Item added to cart:", item);
  };




  return (
    <div>
      <h1>Coffee Menu</h1>

      {loading && <Loader />}

      {!loading && (
        <ul>
          {menu.map((item) => (
            <li key={item.id}>
                  <img
                  className="nav__img"
                  src={addIconPath}
                  alt="Add icon image"
                  onClick={() => handleClick(item)}
                />

              <strong>{item.title}</strong>
              <p>{item.desc}</p>
              <p>Price: ${item.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoffeeMenuComponent;