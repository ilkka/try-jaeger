import { format, createLogger, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.Console()]
});

export default logger;
