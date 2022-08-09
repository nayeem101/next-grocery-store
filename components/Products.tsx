import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useCart } from "react-use-cart";
import styles from "../styles/Home.module.css";
import { Product } from "../pages";

export type product = {
  id: string;
  attributes: {
    name: any;
    details: any;
    price: any;
    quantity: any;
    categories: any;
    prod_img: any;
  };
};

type Prop = {
  productsData: product[];
};

const Products = ({ productsData }: Prop) => {
  const { addItem } = useCart();

  const addTocart = (product: Product) => {
    addItem(product);
  };

  const [products, setProducts] = useState<Product[]>([]);

  useMemo(() => {
    productsData.forEach((product) => {
      let { name, details, price, quantity, categories, prod_img } =
        product.attributes;

      let ccategories: String[] = [];

      categories.data.forEach((category: { attributes: { title: any } }) => {
        ccategories.push(category.attributes.title);
      });

      let cproduct = {
        id: product.id,
        name,
        details,
        price,
        quantity,
        categories: ccategories,
        images: {
          name: prod_img?.data?.attributes?.name,
          url: prod_img?.data?.attributes?.url,
          thumbnail: prod_img?.data?.attributes?.formats?.thumbnail.url,
        },
      };

      setProducts([...products, cproduct]);
    });
  }, [productsData]);

  return (
    <div className={styles.grid + " products"}>
      {/* <div>{JSON.stringify(products)}</div> */}
      {products.map((product: Product) => (
        <div className={styles.card + " product"} key={product.id}>
          <div className={styles.prod_img}>
            <Image
              src={"http://localhost:1337" + product.images.thumbnail}
              alt={product.images.name}
              width={200}
              height={180}
            />
          </div>
          <div className={styles.card_details}>
            <Link href={`/products/${product.id}`}>
              <a className={styles.card_title}>
                <h1>{product.name}</h1>
              </a>
            </Link>
            <h2>Price: ৳{product.price}</h2>
            <button className="button" onClick={() => addTocart(product)}>
              Add to cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
