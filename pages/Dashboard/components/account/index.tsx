import * as React from 'react';
import styles from './index.module.css';
import CompanyInfo from './companyInfo';
import TabPanel from '../TabPanel';
import {Divider,Tabs,Tab} from '@material-ui/core';

export interface Props {
    t:(params: String) => String;
}

const initialState = {currentBoard:"companyInfo"}

type State = {
    currentBoard:String
}

class Account extends React.Component<Props, object> {
    state= initialState

    private test() {
        console.log("this is test")
    }
    private handleChange = (event: React.ChangeEvent<{}>, newValue: String) => {
        // test(newValue)
        this.setState({currentBoard:newValue})
        // this.handlePointPosition(newValue)
    };
    render(){
        const {t} = this.props
        return(
            <div className={styles.account_container}>
                <div className={styles.account_tab_container}>
                <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    value={this.state.currentBoard}
                    onChange={this.handleChange}
                    classes={{ indicator:styles.indicator,flexContainer:styles.account_tabsList}}
                >
                    {/* <div className={styles.group}> */}
                        <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}} 
                        label={t("dashboard.acc.companyInfo")} 
                        value="companyInfo" 
                        icon={<div onClick={this.test} className={styles.account_down_icon}>
                        <img src={this.state.currentBoard=="companyInfo"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                    </div>}
                        />
                        {/* <div onClick={this.test} className={styles.account_down_icon}>
                            <img src={this.state.currentBoard=="companyInfo"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                        </div> */}
                    {/* </div> */}
                    <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                        label={t("dashboard.acc.paymentMethod")} 
                        value="paymentMethod" 
                        icon={<div onClick={this.test} className={styles.account_down_icon}>
                        <img src={this.state.currentBoard=="paymentMethod"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                    </div>}
                        />
                    <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                            label={t("dashboard.acc.productScheme")} 
                            value="productScheme" 
                            icon={<div onClick={this.test} className={styles.account_down_icon}>
                                <img src={this.state.currentBoard=="productScheme"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                            </div>}
                            />
                    <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                            label={t("dashboard.acc.sales")} 
                            value="sales" 
                            icon={<div onClick={this.test} className={styles.account_down_icon}>
                                <img src={this.state.currentBoard=="sales"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                            </div>}
                            />
                    <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot}}  
                            label={t("dashboard.acc.setting")} 
                            value="setting" 
                            icon={<div onClick={this.test} className={styles.account_down_icon}>
                                <img src={this.state.currentBoard=="setting"?"/img/Dashboard/Polygon_5_blue.svg":"/img/Dashboard/Polygon_5.svg"}></img>
                            </div>}
                            />
                    <Tab classes={{selected:styles.tabSelected,root:styles.tabRoot,wrapper:styles.wrapper}}  
                        label={t("dashboard.acc.more")} 
                        value="more" 
                        icon={<div onClick={this.test} className={styles.account_down_icon}>
                                <img className={styles.account_more_icon} src={this.state.currentBoard=="more"?"/img/Dashboard/more.svg":"/img/Dashboard/more.svg"}></img>
                            </div>}
                        />
                </Tabs>
                <Divider/>
                </div>

                <div className={styles.account_body_container}>

                    <TabPanel value={this.state.currentBoard} index={"companyInfo"}>
                        <CompanyInfo
                            t={t}
                            // testFunction={this.test}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.currentBoard} index={"paymentMethod"}>
                        <CompanyInfo
                            t={t}
                            // testFunction={this.test}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.currentBoard} index={"productScheme"}>
                        <CompanyInfo
                            t={t}
                            // testFunction={this.test}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.currentBoard} index={"sales"}>
                        <CompanyInfo
                            t={t}
                            // testFunction={this.test}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.currentBoard} index={"setting"}>
                        <CompanyInfo
                            t={t}
                            // testFunction={this.test}
                        />
                    </TabPanel>
                    <TabPanel value={this.state.currentBoard} index={"more"}>
                        <CompanyInfo
                            t={t}
                            // testFunction={this.test}
                        />
                    </TabPanel>
                </div>
                
                
            </div>
        )
    }
}

export default Account