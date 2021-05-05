import * as React from 'react';
import styles from './index.module.css';
import {Grid,Divider,Container,SvgIcon,Box} from '@material-ui/core';
import Head from 'next/head';
import { useTranslation, Trans, Translation } from 'react-i18next';
// import StarIcon from '../../public/img/BlankPageIMG/header_icon.svg';


export interface Props {
  t:(params: String) => String;
}


class Layout extends React.Component<Props, object> {
  
    render() {
      const { children ,t} = this.props;
      return (
        
          <div className={styles.container}>
            <Head>
              <div className={styles.header}>
                <div className={styles.logo_wrapper}>
                  <img src="/img/BlankPageIMG/Logo.svg"></img>
                </div>
                <div className={styles.headerIcon_wrapper}>
                  <img src="/img/BlankPageIMG/header_icon.svg"></img>
                </div>
              </div>
            </Head>
            <main>{children}</main>
            <footer>
              <div className={styles.footer}>
                <div className={styles.footer_container}>
                  <Divider/>
                  <Grid container className={styles.footer_root} spacing={2}>
                    <Grid item xs={6} className={styles.footer_left}>
                      <div>{t('common.copyright')}</div>
                    </Grid>
                    <Grid item xs={6} className={styles.footer_right} >
                      <div>{t('common.sitemap')}</div>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </footer>
          </div>
          
      );
    }
  }
  
  export default Layout;