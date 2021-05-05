import * as React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import MediaQuery from 'react-responsive';
import styles from './index.module.css';
import Layout from '../../layout/Landing';
import {Grid,Divider,Box,Button} from '@material-ui/core';
import { useTranslation, Trans, Translation } from 'react-i18next';

export interface Props {
  
}

const onContactUs=()=>{
  
}

const contactForm=()=>{
  return(
    <Box></Box>
  )
}

const Landing = () => {
  
      const { t ,i18n} = useTranslation()

      return (
        <Layout
        t={t}
        >
          <div className="body_container">
            <Box className={styles.banner_container}>
              <Grid container className={styles.footer_root} spacing={2}>
                  <Grid item lg={6} xs={7} className={styles.banner_left}>
                    <Box className={styles.banner_box}>
                      <div className={styles.commonSoon}>
                        {t('common.commonSoon')}
                      </div>
                      <div className={styles.banner_title}>
                        {t('landing.banner.title_1')}
                      </div>
                      <div className={styles.banner_title}>
                        {t('landing.banner.title_2')}
                      </div>
                      <div className={styles.banner_subtitle}>
                        {t('landing.banner.subTitle')}
                      </div>
                    </Box>
                    <div className={styles.register_container}></div>
                    
                  </Grid>
                  <Grid item className={styles.banner_right} lg={6} xs={5}>
                    <div className={styles.banner_bg_wrapper}>
                      <img src='/img/LandingIMG/banner_bg.svg'></img>
                    </div>
                  </Grid>
                </Grid>
            </Box>

            <Box className={styles.section2_container}>
              <Box className={styles.section2}>
              <Grid container className={styles.section2_root} spacing={2}>
                  <Grid item xs={6} className={styles.section2_row1_left}>
                    <div className={styles.section2_title}>
                      {t('landing.section_2.title')}
                    </div>
                  </Grid>
                  <Grid item className={styles.section2_container} xs={6}>
                    <div className={styles.section2_description}>
                      {t('landing.section_2.description')}
                    </div>
                  </Grid>
                </Grid>
                  <Divider/>

                  <Grid container className={styles.section2_root} spacing={3}>
                    <Grid item xs={4} className={styles.section2_row2_col1}>
                      <div className={styles.section2_order}>
                        01.
                      </div>
                      <div className={styles.section2_content_title}>
                        {t('landing.section_2.content_1.title')}
                      </div>
                      <div className={styles.section2_content_des}>
                        {t('landing.section_2.content_1.description')}
                      </div>
                    </Grid>
                    <Grid item xs={4} className={styles.section2_row2_col2} >
                      <div className={styles.section2_order}>
                        02.
                      </div>
                      <div className={styles.section2_content_title}>
                        {t('landing.section_2.content_2.title')}
                      </div>
                      <div className={styles.section2_content_des}>
                        {t('landing.section_2.content_2.description')}
                      </div>
                    </Grid>
                    <Grid item xs={4} className={styles.section2_row2_col3} >
                      <div className={styles.section2_order}>
                        03.
                      </div>
                      <div className={styles.section2_content_title}>
                        {t('landing.section_2.content_3.title')}
                      </div>
                      <div className={styles.section2_content_des}>
                        {t('landing.section_2.content_3.description')}
                      </div>
                    </Grid>
                  </Grid>

                  <Divider/>
                  
                  <Grid container className={styles.section2_root} spacing={2}>
                    <Grid item xs={8} className={styles.section2_row3_col1} >
                      <div className={styles.section2_content_iNeed}>
                        {t('landing.section_2.iNeed')}
                      </div>
                    </Grid>
                    <Grid item xs={4} className={styles.section2_row3_col2} >
                      <div className={styles.section2_content_bt_wrapper}>
                          <Button onClick={onContactUs} className={styles.section2_content_bt}> {t('common.contactUs')}</Button>
                      </div>
                    </Grid>
                </Grid>
                </Box>
            </Box>
          
          <Box className={styles.section3_container}>
            <Grid container className={styles.section3_root} spacing={2}>
              <Grid item xs={6} className={styles.section3_row1_col3} >
                <Box></Box>
              </Grid>
              <Grid item xs={6} className={styles.section3_row2_col3} >
                <Box></Box>
                <Box></Box>
                <Box></Box>
              </Grid>
            </Grid>
          </Box>
        </div>
        </Layout>
      );
  }

  
  export default Landing