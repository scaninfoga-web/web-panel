import { createLogger, format, transports } from 'winston';
import LokiTransport from 'winston-loki';

const logger = createLogger({
  level: 'info',
  format: format.json(),
  transports: [
    new LokiTransport({
      host: 'http://127.0.0.1:3100',
      labels: { job: 'nextjs-app' },
    }),
    new transports.Console(),
  ],
});

interface Props {
  logType: 'error' | 'info';
  method: string;
}

export default logger;
// export default async function Logger({logType, method}: Props){
//     if(logType === "info"){
//       logger.info('HTTP Request Log', {
//         method: method,
//         timestamp: new Date().toISOString(),
//       });
//     }
// }
