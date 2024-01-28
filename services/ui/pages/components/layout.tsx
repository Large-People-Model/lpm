import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <div className="container">
      <Head>
        <title>LPM</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="align-center">
        <h1 className="text-lg flex items-center p-5">
          <img src="/logo.jpg" alt="LPM Logo" className="logo mr-2" width={50} height={50} />
          <span>Large People Model</span>
        </h1>
        <div role="tablist" className="tabs tabs-boxed">
          <Link
            href="/warnings"
            role="tab"
            className={`tab ${router.pathname.toLocaleLowerCase().includes("warnings") ? "tab-active" : ""}`}
          >
            Warnings
          </Link>
          <Link
            href="/messages"
            role="tab"
            className={`tab ${router.pathname.toLocaleLowerCase().includes("messages") ? "tab-active" : ""}`}
          >
            Messages
          </Link>

          <Link
            href="/members"
            role="tab"
            className={`tab ${router.pathname.toLocaleLowerCase().includes("members") ? "tab-active" : ""}`}
          >
            Members
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer>
        <a href="https://mongodb.com" target="_blank" rel="noopener noreferrer">
          Powered by MongoDB
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          width: 100%;
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        tabs {
          width: 100%;
          max-width: 600px;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
