import type { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import qs from "qs";
import Image from "next/image";
import { Item, useCart } from "react-use-cart";
import Link from "next/link";

export interface Product {
  id: string;
  name: string;
  price: number;
  details: string;
  quantity: number;
  categories: String[];
  images: {
    name: string;
    url: string;
    thumbnail: string;
  };
}

type Props = {
  products: Product[];
};

const Home = ({ products }: Props) => {
  const { addItem } = useCart();
  const addTocart = (product: Product | Item) => {
    addItem(product);
  };

  return (
    <div>
      <Head>
        <title>Smart Grocery BD</title>
      </Head>

      <h1 className="section_title">Products</h1>

      <div className={styles.grid + " products"}>
        {/* <div>{JSON.stringify(products)}</div> */}
        {products.map((product) => (
          <div className={styles.card + " product"} key={product.id}>
            <div className={styles.prod_img}>
              <Image
                src={"http://localhost:1337" + product.images.thumbnail}
                alt={product.images.name}
                width={200}
                height={200}
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
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const query = qs.stringify(
    {
      pagination: {
        page: 1,
        pageSize: 10,
      },
      fields: ["name", "price", "details", "quantity"],
      populate: ["categories", "prod_img"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`http://localhost:1337/api/products/?${query}`, {
    method: "GET",
    headers: new Headers({
      Authorization:
        "Bearer 09f03c9a9423368ff2f51674c9756f755da8e8823efd84a81aa944dc18bee1d6b80a71130f8b8ef11ecbace50ebf804d8542283a2433730b13b84531195f78d46f75025099dc537a6153dd7769641341e483ef35cea400aa1127239404e5683c673a6328e6c033aefd57d1d72fcb798584d532fd8fbcf524fc3267873277268f",
      "Content-Type": "application/json",
    }),
  });
  const mainres = await res.json();
  const products: Product[] = [];

  await mainres?.data.forEach(
    (product: {
      id: string;
      attributes: {
        name: any;
        details: any;
        price: any;
        quantity: any;
        categories: any;
        prod_img: any;
      };
    }) => {
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

      products.push(cproduct);
    }
  );

  // console.log(product);

  return {
    props: {
      products,
    },
  };
};
