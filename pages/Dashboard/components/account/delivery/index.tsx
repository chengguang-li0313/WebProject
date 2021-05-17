import * as React from 'react';
import styles from './index.module.css';
import {Divider,FormControlLabel,Grid,Button} from '@material-ui/core';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import MethodTable from '../../methodTable'

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
  }

export interface Props {
    t:(params: String) => String;
    
}

interface CusSwitchProps{
    checked?:any;
    onChange?:any;
    name?:any;
    classes?: Styles;
}


const initialState = {
    noDelivery:false,
    ownDelivery:false,
    bubDelivery:true,
    ownDeliveryObj:[{name:"dashboard.acc.delivery.Flatrate",des:"dashboard.acc.delivery.Flatrate_des",enable:false},
            {name:"dashboard.acc.delivery.Post",des:"dashboard.acc.delivery.Post_des",enable:false},
            {name:"dashboard.acc.delivery.Cashondelivery",des:"dashboard.acc.delivery.Cashondelivery_des",enable:false},],
    bubDeliveryObj:[
        {icon:"",name:"dashboard.acc.delivery.Advancezone",des:"dashboard.acc.delivery.Advancezone_des",enable:true},
        {icon:"",name:"dashboard.acc.delivery.Freeproduct",des:"dashboard.acc.delivery.Freeproduct_des",enable:true},
        {icon:"",name:"dashboard.acc.delivery.WeightShipping",des:"dashboard.acc.delivery.WeightShipping_des",enable:false},
        {icon:"",name:"dashboard.acc.delivery.CustomDelivery",des:"dashboard.acc.delivery.CustomDelivery_des",enable:false}
    ]
}

type State = {
    noDelivery:boolean,
    ownDelivery:boolean,
    bubDelivery:boolean,
    ownDeliveryObj:any,
    bubDeliveryObj:any
}

class Delivery extends React.Component<Props, object> {

    state= initialState

    private OWNDELIVERYOBJ = "ownDeliveryObj"
    private BUBDELIVERYOBJ = "bubDeliveryObj"

    private handleChangeNoPayment=()=>{
        this.setState({noDelivery:!this.state.noDelivery})
    }   

    private handleChangeBubPayment=()=>{
        this.setState({bubDelivery:!this.state.bubDelivery})
    }

    private handleChangeOwnPayment=()=>{
        this.setState({ownDelivery:!this.state.ownDelivery})
    }
    private handleContentChange =(event:any,i:any,tableName:string)=>{
        // console.log('event',i,tableName)
        let tempObj = null
        switch(tableName){
            case this.OWNDELIVERYOBJ:
                tempObj= this.state.ownDeliveryObj
                tempObj[i].enable = !tempObj[i].enable
                this.setState({ownDeliveryObj:tempObj})
                break;
            case this.BUBDELIVERYOBJ:
                tempObj = this.state.bubDeliveryObj
                tempObj[i].enable = !tempObj[i].enable
                this.setState({bubDeliveryObj:tempObj})
                break;
        }
    }
    render(){
        const {t} = this.props

        const IOSSwitch = withStyles((theme: Theme) =>
        createStyles({
            root: {
            width: 51,
            height: 22,
            padding: 0,
            margin: theme.spacing(1),
            },
            switchBase: {
            padding: 1,
            '&$checked': {
                transform: 'translateX(29px)',
                color: theme.palette.common.white,
                '& + $track': {
                backgroundColor: '#3464DC',
                opacity: 1,
                border: 'none',
                },
            },
            '&$focusVisible $thumb': {
                color: '#3464DC',
                // border: '6px solid #fff',
            },
            },
            thumb: {
            width: 20,
            height: 20,
            },
            track: {
            borderRadius: 26 / 2,
            // border: `1px solid ${theme.palette.grey[400]}`,
            backgroundColor: '#B4B6BA',
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
            },
            checked: {},
            focusVisible: {},
        }),
        )(({ classes, ...props }: CusSwitchProps) => {
        return (
            <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            // checked={checked}
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
            />
        );
        });

        return(
            <div className={styles.paymentMethod_container}>
                <div className={styles.paymentMethod_section}>
                    <div className={styles.paymentMethod_section_title_container}>
                        <div className={styles.paymentMethod_section_title_icon}><img src="/img/Dashboard/entypo_circle-with-cross.svg"></img></div>
                        <div className={styles.paymentMethod_section_title_tra}><img src="/img/Dashboard/Polygon_5.svg"></img></div>
                        <div className={styles.paymentMethod_section_title}>{t("dashboard.acc.delivery.NoDelivery")}</div>
                        <div className={styles.paymentMethod_section_title_switch}>
                            <IOSSwitch checked={this.state.noDelivery} onChange={this.handleChangeNoPayment} name="noDelivery" />
                        </div>
                    </div>
                    <Divider/>
                </div>
                <div className={styles.paymentMethod_section}>
                    <div className={styles.paymentMethod_section_title_container}>
                        <div className={styles.paymentMethod_section_title_icon}><img src="/img/Dashboard/carbon_delivery-truck.svg"></img></div>
                        <div className={styles.paymentMethod_section_title_tra}><img src="/img/Dashboard/Polygon_5_blue.svg"></img></div>
                        <div className={styles.paymentMethod_section_title}>{t("dashboard.acc.delivery.OwnDelivery")}</div>
                        <div className={styles.paymentMethod_section_title_switch}>
                            <IOSSwitch  name="own" onChange={this.handleChangeOwnPayment} checked={this.state.ownDelivery}  />
                        </div>
                        <div className={styles.paymentMethod_section_title_des}>{t("dashboard.acc.delivery.OwnDelivery_des")}</div>
                    </div>

                    <div>
                        <MethodTable
                            t={t}
                            tableName="ownDeliveryObj"
                            content={this.state.ownDeliveryObj}
                            IOSSwitch={IOSSwitch}
                            handleChange={this.handleContentChange}
                        >
                            
                        </MethodTable>
                    </div>
                    <Divider/>

                </div>
                <div className={styles.paymentMethod_section}>
                    <div className={styles.paymentMethod_section_title_container}>
                        <div className={styles.paymentMethod_section_title_icon}><img src="/img/Dashboard/carbon_delivery-parcel.svg"></img></div>
                        <div className={styles.paymentMethod_section_title_tra}><img src="/img/Dashboard/Polygon_5_blue.svg"></img></div>
                        <div className={styles.paymentMethod_section_title}>{t("dashboard.acc.delivery.BUBBLE8UPDelivery")}</div>
                        <div className={styles.paymentMethod_section_title_switch}>
                            <IOSSwitch checked={this.state.bubDelivery} onChange={this.handleChangeBubPayment} name="bubble8up" />
                        </div>
                        <div className={styles.paymentMethod_section_title_des}>{t("dashboard.acc.delivery.BUBBLE8UPDelivery_des")}</div>
                    </div>
                    
                    <div>
                        <MethodTable
                            t={t}
                            tableName="bubDeliveryObj"
                            content={this.state.bubDeliveryObj}
                            IOSSwitch={IOSSwitch}
                            handleChange={this.handleContentChange}
                        >
                        </MethodTable>
                    </div>
                    {/* <Divider/> */}
                </div>
                <div className={styles.paymentMethod_update_bt}>
                    <Button classes={{root:styles.paymentMethod_update}}>{t("common.upload")}</Button>
                </div>
            </div>
        )
    }
}

export default Delivery