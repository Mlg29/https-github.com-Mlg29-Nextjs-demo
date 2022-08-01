
import type { AppProps } from 'next/app';
import "../../styles/globals.css"
import 'antd/dist/antd.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'material-react-toastify/dist/ReactToastify.css';

import { wrapper } from '../app/store';

function MyApp({ Component, pageProps }: AppProps) {
    return  <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);