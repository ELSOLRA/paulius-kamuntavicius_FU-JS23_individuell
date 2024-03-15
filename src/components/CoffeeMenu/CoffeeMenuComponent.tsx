import { useEffect, useState } from "react";
import useCoffeeMenuState from "../../store/useCoffeeMenuStore";
import "./coffeemenu.scss"
import Loader from "../common/Loader";
import useCartStore from "../../store/useCartStore";
import { MenuItem } from "../../store/storeTypes";
import fetchCoffeeMenu from "../../services/coffeeMenuService";
import Dots from "../common/Dots";

type CoffeeMenuProp = {
  addIconPath: string;
}

const CoffeeMenuComponent: React.FC<CoffeeMenuProp> = ({ addIconPath }) => {
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
  };

  return (
    <section className="coffee-menu">
      <h1 className="coffee-menu__title">Meny</h1>

      {loading && <Loader />}

      {!loading && (
        <ul className="coffee-menu__list">
          {menu.map((item) => (
            <li key={item.id} className="coffee-menu__item">
              <img
                className="coffee-menu__add-icon"
                src={addIconPath}
                alt="Add icon image"
                onClick={() => handleClick(item)}
              />
              <section className="coffee-menu__item-info">
                <h2 className="coffee-menu__item-title">
                  <span>{item.title}</span>
                  <Dots />
                  <span className="coffee-menu__item-price">{`${item.price} kr`}</span>
                </h2>
                <p className="coffee-menu__item-desc">{item.desc}</p>
              </section>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default CoffeeMenuComponent;