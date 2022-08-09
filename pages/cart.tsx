import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Form from "../components/Form";

import styles from "../styles/Cart.module.css";

const CartPage = () => {
  const { isEmpty, cartTotal, items, totalUniqueItems, removeItem } = useCart();

  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setIsCartEmpty(isEmpty);
    setTotalItems(totalUniqueItems);
    setTotalPrice(cartTotal);
    // console.log(isCartEmpty);
  }, [isEmpty, totalUniqueItems, cartTotal]);

  const removeProduct = (id: string) => {
    removeItem(id);
  };

  return (
    <>
      <Head>
        <title>Smart Grocery BD - Your Cart </title>
      </Head>

      <div className={styles.cart_warpper + " container"}>
        <div className={styles.shop_cart}>
          <h1 className={styles.section_header}>Shopping Cart</h1>

          <div className={styles.accordain}>
            <Link href="/">
              <a className="link">Store</a>
            </Link>
            <span>/</span>
            <Link href="/cart">
              <a className="link">Cart</a>
            </Link>
          </div>

          <h2>You have total : {totalItems} items</h2>
          <div className={styles.cart_items}>
            {isCartEmpty && (
              <div className="cart_noitems">No items in cart</div>
            )}
            {!isCartEmpty &&
              items.map((item) => (
                <div className={styles.cart_item} key={item.id}>
                  <Image
                    src={"http://localhost:1337" + item?.images?.thumbnail}
                    alt={item.images.name || "Smart Grocert Product"}
                    width={100}
                    height={100}
                  />
                  <div className={styles.cart_item_details}>
                    <div className={styles.cart_item_name}>
                      <p>
                        <Link href={"/products/" + item.id}>{item.name}</Link>
                      </p>
                      <a
                        className={styles.cart_item_remove}
                        title="remove"
                        onClick={() => removeProduct(item.id)}
                      >
                        ❌
                      </a>
                    </div>
                    <div className={styles.prod_details}>
                      <p>Quantity: {item.quantity}</p>
                      <p>{`৳${item.price}.00`}</p>
                    </div>
                  </div>
                </div>
              ))}
            <div className="hr"></div>
            <div className={styles.cart_items_total}>
              <p>
                <span>Subtotal:</span>
                <span>{`৳${totalPrice}.00`}</span>
              </p>
              <p>
                <span>Shipping cost:</span>
                <span>৳60.00</span>
              </p>
              <h3>
                <span>Total:</span>
                <span>{`৳${totalPrice + 60}.00`}</span>
              </h3>
            </div>
          </div>
        </div>
        {!isCartEmpty && (
          <div className={styles.checkout}>
            <h1 className={styles.section_header}>Checkout</h1>
            <Form />
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
