import getConfig from "next/config";
import clientPromise from "../lib/mongodb";

const { publicRuntimeConfig } = getConfig();

export default function Top({ reviews }) {
    return (
        <div>
            <h1>Top 1000 Reviews of All Time</h1>
            <p>
                <small>(According to Metacritic)</small>
            </p>
            <ul>
                {reviews.map((review) => (
                    <li key={review._id}>
                        <h2>{review.name}</h2>
                        <h3>{review.summary}</h3>
                        <p>{review.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export async function getStaticProps() {
  try {
    const client = await clientPromise;
    const db = client.db(publicRuntimeConfig.database);

    const reviews = await db
      .collection(publicRuntimeConfig.listingsAndReviews)
      .find({})
      .sort({ name: -1 })
      .limit(1000)
      .toArray();

    return {
      props: { reviews: JSON.parse(JSON.stringify(reviews)) },
    };
  } catch (e) {
    console.error(e);
  }
}
