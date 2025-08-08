import CONFIG from "../environment/dev.env";
import { RESTAPIProvider } from './providers/rest/index';

export default () => {
    switch (CONFIG.API_TYPE as string) {
        case 'GRAPHQL':
            return null;
        case 'FIREBASE':
            return null;
        case 'REST':
            return RESTAPIProvider;
    }
};
