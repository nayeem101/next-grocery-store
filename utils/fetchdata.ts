import axios from "axios";

export const fetchproducts = async (url: string) =>
  await axios({
    method: "GET",
    url: url,
    headers: {
      Authorization:
        "Bearer 09f03c9a9423368ff2f51674c9756f755da8e8823efd84a81aa944dc18bee1d6b80a71130f8b8ef11ecbace50ebf804d8542283a2433730b13b84531195f78d46f75025099dc537a6153dd7769641341e483ef35cea400aa1127239404e5683c673a6328e6c033aefd57d1d72fcb798584d532fd8fbcf524fc3267873277268f",
      "Content-Type": "application/json",
    },
  }).then((res) => res.data);
