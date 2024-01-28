import getConfig from "next/config";
import clientPromise from "../lib/mongodb";
import Layout from "./components/layout";

const { publicRuntimeConfig } = getConfig();

export default function Messages({ messages }) {
  return (
    <Layout>
      <h1>Warnings</h1>
      <div className="max-w-screen-sm">
        {messages.map((message) => (
          <div className="chat chat-start" key={messages._id}>
            <div className="chat-header">
              {message.talkerName}
              <time className="text-xs opacity-50 pl-1">{message.timestamp}</time>
            </div>
            <div className="chat-bubble chat-bubble-error">{message.text}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db(publicRuntimeConfig.db);

    const messages = await db
      .collection(publicRuntimeConfig.messages)
      .find({
        flagged: 1,
      })
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    return {
      props: { messages: JSON.parse(JSON.stringify(messages)) },
    };
  } catch (e) {
    console.error(e);
  }
}
