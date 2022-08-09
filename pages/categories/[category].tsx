import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import qs from "qs";
import { useRouter } from "next/router";
import React from "react";
import Products, { product } from "../../components/Products";

type Prop = {
  products: product[];
};

const CategoryPage = ({ products }: Prop) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div>
      <Head>
        <title>
          Smart Grocery BD - {category?.toString().toUpperCase()} products
        </title>
      </Head>

      <h1 className="section_title">{category?.toString()}</h1>

      <Products productsData={products} />
    </div>
  );
};

export default CategoryPage;

//getstaticpaths
export const getStaticPaths: GetStaticPaths = async () => {
  const query = qs.stringify(
    {
      fields: ["title"],
    },
    {
      encodeValuesOnly: true,
    }
  );
  const res = await fetch(`http://localhost:1337/api/categories/?${query}`, {
    method: "GET",
    headers: new Headers({
      Authorization:
        "Bearer 09f03c9a9423368ff2f51674c9756f755da8e8823efd84a81aa944dc18bee1d6b80a71130f8b8ef11ecbace50ebf804d8542283a2433730b13b84531195f78d46f75025099dc537a6153dd7769641341e483ef35cea400aa1127239404e5683c673a6328e6c033aefd57d1d72fcb798584d532fd8fbcf524fc3267873277268f",
      "Content-Type": "application/json",
    }),
  });

  const dataRes = await res.json();
  // console.log(dataRes);

  const categories = await dataRes.data;
  const paths = categories.map(
    (category: { id: number; attributes: { title: string } }) => ({
      params: { category: category.attributes.title },
    })
  );

  return { paths, fallback: false };
};

// getstaticprops
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // console.log(params?.category);

  const query = qs.stringify(
    {
      fields: ["name", "price", "details", "quantity"],
      populate: ["categories", "prod_img"],
      filters: {
        $and: [
          {
            categories: {
              title: {
                $contains: params?.category,
              },
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true,
    }
  );

  // console.log(query);
  const res = await fetch(`http://localhost:1337/api/products?${query}`, {
    method: "GET",
    headers: new Headers({
      Authorization:
        "Bearer 09f03c9a9423368ff2f51674c9756f755da8e8823efd84a81aa944dc18bee1d6b80a71130f8b8ef11ecbace50ebf804d8542283a2433730b13b84531195f78d46f75025099dc537a6153dd7769641341e483ef35cea400aa1127239404e5683c673a6328e6c033aefd57d1d72fcb798584d532fd8fbcf524fc3267873277268f",
      "Content-Type": "application/json",
    }),
  });

  const mainres = await res.json();
  const products = await mainres.data;
  // console.log(product);

  return {
    props: {
      products,
    },
  };
};
