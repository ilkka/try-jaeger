import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({
    quote: "Olen varautunut jokaiseen päivään. Huomiseenkin.",
    author: "Matti Nykänen"
  });
};
