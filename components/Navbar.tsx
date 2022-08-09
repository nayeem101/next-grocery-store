import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "../utils/categories";

import styles from "../styles/Navbar.module.css";
import { useCart } from "react-use-cart";

type Category = {
  id: number;
  title: string;
};

const Navbar = () => {
  const { totalUniqueItems } = useCart();

  const [categories, setcategories] = useState<Category[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setcategories(getCategories());
  }, []);

  useEffect(() => {
    setTotalItems(totalUniqueItems);
  }, [totalUniqueItems]);

  return (
    <nav>
      <div className={styles.brand}>
        <Link href="/">🏪 Smart Grocery</Link>
      </div>

      <div className={styles.categories}>
        {categories.length !== 0
          ? categories.map((category) => (
              <Link href={`/categories/${category.title}`} key={category.id}>
                <a className={styles.link}>{category.title}</a>
              </Link>
            ))
          : null}

        <div className={styles.cart} title="cart">
          <Link href="/cart">
            <a>
              <span className={styles.cart_icon}>🛒</span>
              <span className={styles.cart_items}>{totalItems}</span>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
