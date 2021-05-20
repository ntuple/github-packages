import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import LogRocket from 'logrocket';
import { APP_VERSION } from 'constants';

if (
  process.env.NODE_ENV === 'production' &&
  process.env.NEXT_PUBLIC_BUGSNAG_KEY
) {
  Bugsnag.start({
    apiKey: process.env.NEXT_PUBLIC_BUGSNAG_KEY,
    appVersion: APP_VERSION,
    plugins: [new BugsnagPluginReact()],
    autoTrackSessions: false,
    autoDetectErrors: false,
    releaseStage: process.env.NEXT_PUBLIC_BUGSNAG_STAGE,
    onError(event) {
      if (event?.originalError?.isAxiosError && event.originalError.response) {
        event.addMetadata('Custom', {
          ...(Boolean(event.originalError.response.data) && {
            Response: event.originalError.response.data,
          }),
          ...(Boolean(event.originalError.config.data) && {
            Request:
              JSON.parse(event.originalError.config.data) ||
              event.originalError.config.data,
          }),
        });
        if (LogRocket.sessionURL) {
          event.addMetadata('LogRocket', {
            sessionURL: LogRocket.sessionURL,
          });
        }
      }
    },
  });
}

export default Bugsnag;
