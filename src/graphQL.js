import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

// Functions

const getProducts = async () => {
  let { data } = await client.query({
    query: gql`
      query GetProducts {
        category {
          products {
            id
            # category,
            name
            gallery
            prices {
              amount
              currency {
                label
              }
            }
          }
        }
      }
    `,
  });
  return data.category.products;
};

const getProductByID = async (p_id) => {
  let { data } = await client.query({
    query: gql`
      query GetProductByID($pid: String!) {
        product(id: $pid) {
          id
          name
          description
          gallery
          prices {
            amount
            currency {
              label
            }
          }
        }
      }
    `,
    variables: {
      pid: p_id,
    },
  });
  // console.log(data.product)
  return data.product;
};

const getAllCategories = async () => {
  let { data } = await client.query({
    query: gql`
      query getAllCategories {
        categories {
          name
        }
      }
    `,
  });
  return data.categories.map((item) => item.name);
};

const getAllCurrencies = async () => {
  let { data } = await client.query({
    query: gql`
      query getAllCurrencies {
        currencies {
          label
        }
      }
    `,
  });
  return data.currencies.map((item) => item.label);
};

export { getProducts, getProductByID, getAllCategories, getAllCurrencies };
