import algolia from "algoliasearch";

const client = algolia(process.env.ALGOLIA_APP_ID ?? 'QMURIJHZEO', process.env.ALGOLIA_API_KEY || '40e2b5f285436f153868b1ccf580ea11')

export default client;