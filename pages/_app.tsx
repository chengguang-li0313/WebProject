import type { AppProps /*, AppContext */ } from 'next/app'
import App from "next/app";
import './styles.css'
import '../i18n'
// import { addLocaleData, IntlProvider } from 'react-intl';
// // import {appWithTranslation} from '../i18n';
// import _EN from '../public/locales/en';

// let appLocale = { messages: { ...enMessages, }, locale: 'en', data: appLocaleData, };

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp