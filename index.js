import { AppRegistry } from 'react-native';
import App from './src/App';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent('Bitezy-app', () => Root);