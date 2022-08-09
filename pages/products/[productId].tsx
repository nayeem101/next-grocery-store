import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import qs from "qs";
import Image from "next/image";
import { Item, useCart } from "react-use-cart";
import styles from "../../styles/Home.module.css";
import prodstyles from "../../styles/Product.module.css";

import { Product } from "../index";
import React, { ChangeEvent, FormEvent, useState } from "react";

import useSWR from "swr";
import { fetchproducts } from "../../utils/fetchdata";
import Products from "../../components/Products";

type Prop = {
  product: Product;
};

const ProductPage = ({ product }: Prop) => {
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(0);

  const setQuantityInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
    // console.log(quantity);
  };

  const addTocart = (product: Product | Item, quantity: number) => {
    const { id, name, categories, price, images } = product;
    const cartProduct = { id, name, categories, price, images };
    addItem(cartProduct, quantity);
  };

  const address = `http://localhost:1337/api/products?filters[$and][0][categories][title][$contains]=${product.categories[0]}&populate[0]=categories&populate[1]=prod_img`;

  const { data, error } = useSWR(address, fetchproducts);

  return (
    <div className="container">
      <Head>
        <title>Smart Grocery BD - {product.name}</title>
      </Head>

      <h1 className="section_title">Single Products</h1>

      <div
        className={prodstyles.card + " " + prodstyles.product}
        key={product.id}
      >
        <div className={styles.prod_img}>
          <Image
            src={"http://localhost:1337" + product.images.url}
            alt={product.images.name || "smart grocery product"}
            width={500}
            height={480}
          />
        </div>
        <div className={styles.card_details}>
          <h1 className={styles.card_title}>{product.name}</h1>
          <h3>Price: ৳{product.price}</h3>
          <h3>Category: {product.categories.toString()}</h3>
          <h3>Available: {product.quantity} </h3>
          <h3>
            Quantity:
            <input
              className={prodstyles.input_quantity}
              type="number"
              name="quantity"
              id="quantity"
              min="0"
              max={product.quantity.toString()}
              onChange={(e) => setQuantityInput(e)}
            />
          </h3>
          <button
            className="button"
            onClick={() => addTocart(product, quantity)}
          >
            Add to cart
          </button>
          <h4>Details: {product.details} </h4>
        </div>
      </div>

      <div className="similar_products">
        <h1 className="section_title">Similar Products</h1>
        {data && <Products productsData={data.data} />}
        {error && <div>{error.message}</div>}
      </div>
    </div>
  );
};

export default ProductPage;

//getstaticpaths
export const getStaticPaths: GetStaticPaths = async () => {
  const query = qs.stringify(
    {
      fields: ["id"],
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

  const dataRes = await res.json();

  const products = await dataRes.data;
  const paths = products.map((product: { id: number }) => ({
    params: { productId: product.id.toString() },
  }));

  // console.log(products);

  return { paths, fallback: false };
};

// getstaticprops
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = qs.stringify(
    {
      populate: ["categories", "prod_img"],
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(
    `http://localhost:1337/api/products/${params && params.productId}?${query}`,
    {
      method: "GET",
      headers: new Headers({
        Authorization:
          "Bearer 09f03c9a9423368ff2f51674c9756f755da8e8823efd84a81aa944dc18bee1d6b80a71130f8b8ef11ecbace50ebf804d8542283a2433730b13b84531195f78d46f75025099dc537a6153dd7769641341e483ef35cea400aa1127239404e5683c673a6328e6c033aefd57d1d72fcb798584d532fd8fbcf524fc3267873277268f",
        "Content-Type": "application/json",
      }),
    }
  );

  const product = await res.json();

  let { name, details, price, price_sale, quantity, categories, prod_img } =
    product.data.attributes;

  let ccategories: String[] = [];

  categories.data.forEach((category: { attributes: { title: any } }) => {
    ccategories.push(category.attributes.title);
  });

  let images = {
    name: prod_img?.data?.attributes?.name,
    url: prod_img?.data?.attributes?.url,
    thumbnail: prod_img?.data?.attributes?.formats?.thumbnail?.url,
  };

  // console.log(images);

  let cproduct = {
    id: product.data.id,
    name,
    details,
    price,
    price_sale,
    quantity,
    categories: ccategories,
    images,
  };

  return {
    props: {
      product: cproduct,
    },
  };
};
