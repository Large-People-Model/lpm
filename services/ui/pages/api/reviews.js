import getConfig from "next/config";
import clientPromise from "../../lib/mongodb";

const { publicRuntimeConfig } = getConfig();

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db(publicRuntimeConfig.db);

    const reviews = await db
      .collection(publicRuntimeConfig.messages)
      .find({})
      .sort({ name: -1 })
      .limit(10)
      .toArray();

    res.json(reviews);
  } catch (e) {
    console.error(e);
  }
};
