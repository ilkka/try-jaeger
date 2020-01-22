import { NextApiRequest, NextApiResponse } from "next";
import tracer from "../../initTracer";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const span = tracer.startSpan("randomQuote");
  res.status(200).json({
    quote: "Olen varautunut jokaiseen päivään. Huomiseenkin.",
    author: "Matti Nykänen"
  });
  span.finish();
};
