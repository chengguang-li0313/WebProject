import type { AppProps , AppContext } from 'next/app'
import App from "next/app";
import './styles.css'
import '../i18n'
import { useTranslation, Trans, Translation } from 'react-i18next';


// let appLocale = { messages: { ...enMessages, }, locale: 'en', data: appLocaleData, };


function MyApp({ Component, pageProps }: AppProps) {
  const { t ,i18n} = useTranslation()
  return <Component t={t} i18n={i18n} {...pageProps}/>
}
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }


export default MyApp