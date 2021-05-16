import { Grid ,Button} from '@material-ui/core';
import * as React from 'react';
import styles from './index.module.css';

interface MethodTableProps {
    children?: React.ReactNode;
    t:(params: String) => String;
    content:any;
    IOSSwitch:any;
    tableName:string;
    handleChange:(ev: any,i:any,tableName:string) => void;
    // index: any;
    // value: any;
  }
  
  function MethodTable(props: MethodTableProps) {
    const { children,t,content,IOSSwitch,handleChange,tableName, ...other } = props;
    console.log('content',content)
    
    return (
        <div className={styles.methodTable_container}>
          <div>
            <Grid justify='center' container spacing={0}>
              <Grid classes={{root:styles.grid_item_root}} item xs={2}>{t("dashboard.acc.payment.method")}</Grid>
              <Grid classes={{root:styles.grid_item_root}} item xs={2}>{t("dashboard.acc.payment.Enabled")}</Grid>
              <Grid classes={{root:styles.grid_item_root}} item xs={8}>{t("dashboard.acc.payment.Description")}</Grid>
            </Grid>
          </div>
          
            <div>
            {content.map((method:any,i:any)=>(
              <Grid key={i} classes={{root:styles.grid_body_container_root}} justify='center' container spacing={0}>
                {/* {children} */}
                  <Grid item xs={2}>
                    <div className={styles.methodName_container}>
                      {method.icon?(
                        <div className={styles.methodName_icon}><img src={method.icon}></img></div>
                      ):[]}
                      <div className={styles.methodName_text}>{t(method.name)}</div>
                    </div>
                  </Grid>
                  <Grid classes={{root:styles.grid_item_body_root}} item xs={2}>
                    <div><IOSSwitch checked={method.enable} onChange={(ev)=>handleChange(ev,i,tableName)} name="own" /></div>
                  </Grid>
                  <Grid item xs={6}>{t(method.des)}</Grid>
                  <Grid classes={{root:styles.grid_item_body_root}} item xs={2}><Button classes={{root:styles.methodTable_setUp_button}}>{t("dashboard.acc.payment.setup")}</Button></Grid>
              </Grid>
            ))}
              
          </div>
        </div>
    )
}


export default MethodTable