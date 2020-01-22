import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import tracer from "../../tracer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const parentSpan = tracer.extract("http_headers", req.headers);
  const span = tracer.startSpan(
    "randomQuote",
    parentSpan ? { childOf: parentSpan } : {}
  );
  await new Promise(resolve =>
    setTimeout(() => {
      span.log({ event: "timeout_fired" });
      resolve();
    }, Math.random() * 1000)
  );
  const timestamp = new Date();
  const headers = {};
  tracer.inject(span, "http_headers", headers);
  const result = await axios.get<{ author: string; quote: string }>(
    `${process.env.BACKEND_URL}/quote`,
    {
      headers
    }
  );
  res.status(200).json({ ...result.data, timestamp });
  span.finish();
};
