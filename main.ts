import Shopify from '@shopify/shopify-api'
import fs, { readdirSync } from 'fs'

const gql = (str: any) => {
  return str[0]
}

const client = new Shopify.Clients.Graphql(
  'luxeshopfromlondon.myshopify.com',
  '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'
)

const findImageByHandle = async (handle: any, src: any) => {
  const data: any = await client.query({
    data: {
      query: `
        query ProductByHandle($handle: String!) {
          productByHandle(handle: $handle) {
            id
            images(first: 1) {
              edges {
                node {
                  id
                  url
                }
              }
            }
          }
        }
      `,
      variables: {
        handle,
      },
    },
  })

  const { productByHandle } = data.body?.data

  return {
    productId: productByHandle?.id,
    image: {
      id: productByHandle?.images.edges[0].node.id,
      src: `https://image.arescar.com/tmp/${src}`,
    },
  }
}

const run = async () => {
  const files = readdirSync('/Users/think2011/Desktop/头图20220104')

  const data = await Promise.all(
    files.map(async (filename) => {
      const handle = filename.split('@')[0]

      return {
        ...(await findImageByHandle(handle, filename)),
      }
    })
  )

  for (const item of data) {
    const products: any = await client.query({
      data: {
        query: gql`
          mutation productImageUpdate($image: ImageInput!, $productId: ID!) {
            productImageUpdate(image: $image, productId: $productId) {
              image {
                id
                src
              }
              userErrors {
                field
                message
              }
            }
          }
        `,
        variables: item,
      },
    })

    console.log(products.body?.data.productImageUpdate)
  }

  // console.log(products.body)
}

run()
