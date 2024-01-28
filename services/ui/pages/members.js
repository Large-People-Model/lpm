import getConfig from "next/config";
import clientPromise from "../lib/mongodb";
import Layout from "./components/layout";

const { publicRuntimeConfig } = getConfig();

export default function Members({ members }) {
  return (
    <Layout>
      {members.map((member) => (
        <div className="card w-96 shadow-xl bg-emerald-100 glass mb-2" key={member._id}>
          <div className="card-body">
            <h2 className="card-title text-base">{member.name}</h2>
            {/* <p className="text-sm">If a dog chews shoes whose shoes does he choose?</p> */}
          </div>
        </div>
      ))}
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db(publicRuntimeConfig.db);

    const members = await db.collection(publicRuntimeConfig.members).find({}).limit(100).toArray();

    return {
      props: { members: JSON.parse(JSON.stringify(members)) },
    };
  } catch (e) {
    console.error(e);
  }
}
