import algolia from "algoliasearch";

if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY) {
    throw new Error('Missing Algolia environment variables');
}

const client = algolia(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);

export default client;