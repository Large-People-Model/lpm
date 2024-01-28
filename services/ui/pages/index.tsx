import getConfig from "next/config";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Members from "./members";
import Messages from "./messages";
import Layout from "./components/layout";

const { publicRuntimeConfig } = getConfig();

type ConnectionStatus = {
  isConnected: boolean;
};

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
  try {
    await clientPromise;
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
};

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      {!isConnected && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>You are NOT connected to MongoDB.</span>
          </div>
        </div>
      )}

      <h1 className="title pb-5">Large People Network</h1>

      <div role="tablist" className="tabs tabs-lifted">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Flagged Messages"
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Messages messages={[]} />
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Sentiment"
          checked
        />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <div className="title">Sentiment</div>
          <div className="grid grid-cols-2 gap-4">
            <div>Number of messages</div>
            <div>09</div>
          </div>
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Members" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Members members={[]} />
        </div>

        <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="All Messages" />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        ></div>
      </div>
    </Layout>
  );
}

