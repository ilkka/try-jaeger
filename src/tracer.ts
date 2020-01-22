import {
  initTracerFromEnv as initJaegerTracer,
  JaegerTracer
} from "jaeger-client";
import logger from "./logger";

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
        logger.info(msg);
      },
      error: function logError(msg: string) {
        logger.error(msg);
      }
    }
  };
  // This will get values from the environment, but they can
  // be overwritten by the config.
  return initJaegerTracer(config, options);
}

const tracer = initTracer("try-jaeger");
export default tracer;
