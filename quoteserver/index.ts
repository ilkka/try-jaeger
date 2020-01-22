import express from "express";
import {
  initTracerFromEnv as initJaegerTracer,
  JaegerTracer
} from "jaeger-client";

const app = express();
const port = process.env.PORT || 3000;

function initTracer(serviceName: string): JaegerTracer {
  var config = {
    serviceName,
    reporter: {
      logSpans: true
    }
  };
  var options = {
    logger: {
      info: function logInfo(msg: string) {
        console.log(`INFO: ${msg}`);
      },
      error: function logError(msg: string) {
        console.log(`ERROR: ${msg}`);
      }
    }
  };
  // This will get values from the environment, but they can
  // be overwritten by the config.
  return initJaegerTracer(config, options);
}

const tracer = initTracer("quoteserver");

const quotes = [
  "On kaksi osaa ihmisiä. Joku vetää huumeita, joku urheilee, joku vetää itsensä loppuun ja joku vaan nukkuu. Minä kuulun siihen porukkaan, joka nukkuu, urheilee, rakastelee ja hakkaa itseään ja voipi olla, että siinä joskus osuu toiseenkin ihmiseen.",
  "Minä olen venäläinen, vaikka ei ole punaista päällä, olen kommunisti, mutta näyttelen vaan. Oikeasti olen ihminen, joka kävelee ja puhuu puhelimeen.",
  "Sävytän hiukseni kerran kahdessa kuukaudessa ja maailma muuttuu, ja minä sen mukana.",
  "Olen varautunut jokaiseen päivään. Huomiseenkin.",
  "Elämä on laiffii.",
  "Elämä on ihmisen parasta aikaa.",
  "Kun sä lähdet hyppyyn, sä olet ihan yksin. Sä joudut siinä hyppyrinnokalla tekemään yksinäsi ihan omat ratkaisut. Sä oot siellä ylhäällä ihan “up yours”.",
  "Aina ku mä hyppään ja pääsen siihen hyppyrin nokalle, niin mulle tulee sellanen “bon voyage” -tunne, siis että mä oon kokenu tän joskus aikasemminkin.",
  "Rakkaus on kuin lankakerä - se alkaa ja loppuu.",
  "Meikäläinen on nykyään avioliittoneuvoja. Jos menee hyvin niin meikäläinen paikalle. Se on seittemän sekuntia ja kaikki on päin persettä.",
  "Elokuva elokuvana. Elokuva kun tehdään, niin se on elokuvaa.",
  "Elokuva oli täyttä fiktiota, mutta oli siinä vähän faktaakin.",
  "Mä muutan Kööpenhaminaa ja haen Ruotsin kansalaisuuden.",
  "Saksa-Itävalta on mun toinen kotimaa.",
  "Huominen on aina tulevaisuutta.",
  "Kysymys kuulostaa kysymykseltä.",
  "Totuus on todellakin todellisuutta.",
  "Jokainen tsäänssi on mahdollisuus!",
  "Ja jos jokin asia on varma, se on aivan varma.",
  "Tekemätöntä ei saa tekemättömäksi.",
  "Sauvakävelin siellä järvellä ja opin avantouinnin.",
  "Olin kuolla pakkaseen, mutta vielä riitti voimia tilata taksi.",
  "Kun ihminen nukkuu, sille ei tapahdu mitään. Mutta kun se ei nuku, se voi saada vaikka kalan.",
  "Kaikki lähtee siitä kun sä opit syömään lihapullat haarukalla. Silloin sä osaat tehdä mitä tahansa. Kiinnostus ruokaan ja kiinnostus urheiluun menevät rinta rinnan.",
  "Se on ihan fifty - sixty miten käy."
];

app.get("/quote", async (req, res) => {
  const parentSpan = tracer.extract("http_headers", req.headers);
  const span = tracer.startSpan(
    "getQuote",
    parentSpan ? { childOf: parentSpan } : {}
  );
  await new Promise(resolve =>
    setTimeout(() => {
      span.log({ event: "timeoutFired" });
      resolve();
    }, Math.random() * 1000)
  );
  res.status(200).json({
    quote: quotes[Math.floor(Math.random() * quotes.length)],
    author: "Matti Nykänen"
  });
  span.finish();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
