import { NextPage } from "next";
import useSWR from "swr";

import "../styles/main.css";

interface HomeProps {
  userAgent: string;
}

const Home: NextPage<HomeProps> = ({ userAgent }) => {
  const { data, error } = useSWR("/api/randomQuote", url =>
    fetch(url).then(r => r.json())
  );
  const author = data?.author;
  const quote = data?.quote;
  let output = quote;
  if (!data) {
    output = "Loading...";
  }
  if (error) {
    output = "Failed to fetch quote";
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-xl">Hello world!</h1>
      <h2 className="text-lg">User Agent: {userAgent}</h2>
      <h3 className="italic">Quote of the day</h3>
      <blockquote className="text-2xl">
        {output} —<span className="italic">{author}</span>
      </blockquote>
    </div>
  );
};

Home.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers["user-agent"] || "" : navigator.userAgent;
  return { userAgent };
};

export default Home;
