import * as React from 'react';
import styles from './index.module.css';
import {Dialog,DialogTitle,DialogContent,Select,
    MenuItem,TextField, Divider, Button,
    Accordion,AccordionSummary,AccordionDetails,
    Checkbox,FormControlLabel} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useMediaQuery } from 'react-responsive'

import DataGrid from '../../dataGrid'
import Product from './product'
import Customer from './customer'
import Order from './order'
import Coupon from './coupon'
import Distance from './distance'
import Postcode from './postcode'

import {deliveryProductOrientatedData,treeData} from '../../../../../public/fakeData'

interface Props {
    t:(params: String) => String;
    open:boolean;
    handleClose:() => void;
    dialogName:String;
    
  }

function DeliveryEditDialog(props: Props){
    const {t,open,handleClose,dialogName} = props
    
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

    const FLATCONDITION = [{id:"dontCare",label:"dashboard.acc.delivery.setDelivery.dontCare"},
    {id:"carepw",label:"dashboard.acc.delivery.setDelivery.carepw"},
    {id:"careVolume",label:"dashboard.acc.delivery.setDelivery.careVolume"},
    {id:"careWeight",label:"dashboard.acc.delivery.setDelivery.careWeight"}]
    const [flatRateCondition,setFlatRateCondition] = React.useState("dontCare");
    const [isSetVolume, setIsSetVolume] = React.useState(false);
    const [isSetWeight, setIsSetWeight] = React.useState(false);
    const [volume ,setVolume] =  React.useState(10);
    const [weight ,setWeight] =  React.useState(100);
    const [state,setState] = React.useState(0);
    const productOrientatedColumn =  [
        { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },
        { id: 'scope', label: ['dashboard.acc.delivery.setDelivery.Scope'], minWidth: 100 },
        { id: 'vw', label: ['dashboard.acc.delivery.setDelivery.vol_wei_range'], minWidth: 100 },
        { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.Rate'], minWidth: 100 },
    ]

    const createData=(rows:Array<any>)=>{
        let tempList = []
        rows.map((row,index)=>(
            tempList.push({index:{item:row.index,type:"string"},
            scope:{item:row.scope,type:"scope"},rate:{item:row.rate,type:"price"},
            vw:{item:{volume:row.vw.volume,weight:row.vw.weight},type:"slider"}})
            // tempList.push()
        ))
        // console.log('tempList',tempList)
        return tempList
    }
    const [productOrientatedRow ,setProductOrientatedRow] = React.useState(createData(deliveryProductOrientatedData));


    const handleflatRateConditionChange =(event:any) =>{
        setFlatRateCondition(event.target.value)
        setState((prov)=> prov+1)
        switch (event.target.value){
            case FLATCONDITION[0].id:
                setIsSetVolume(false)
                setIsSetWeight(false)
                break
            case FLATCONDITION[1].id:
                setIsSetVolume(true)
                setIsSetWeight(true)
                break
            case FLATCONDITION[2].id:
                setIsSetVolume(true)
                setIsSetWeight(false)
                break
            case FLATCONDITION[3].id:
                setIsSetVolume(false)
                setIsSetWeight(true)
                break
        }
    }

    const handleVolumechange=(event:any)=>{
        setVolume(event.target.value)
        setState((prov)=> prov+1)
    }
    
    const handleWeightchange=(event:any)=>{
        setWeight(event.target.value)
        setState((prov)=> prov+1)
    }
    
    const onDatachange=(rows:any)=>{

    }

    return(

        <Dialog classes={{paperWidthSm:styles.paper_WidthXs}}  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle classes={{root:styles.dialogTitle_root}} id="form-dialog-title">{ t("dashboard.sal.Edit")+" "+t(dialogName)}</DialogTitle>
                <DialogContent classes={{root:styles.dialog_root}}>
                    <div className={styles.deliveryEditDialog_container}>
                        <div className={styles.deliveryEditDialog_item}>
                            <Select
                                labelId="flatRateCondition"
                                id="flatRateCondition"
                                value={flatRateCondition}
                                onChange={handleflatRateConditionChange}
                                >
                                {FLATCONDITION.map(options => (
                                    <MenuItem key={options.id} value={options.id}>{t(options.label)}</MenuItem>
                                ))}   
                                
                            </Select>
                        </div>
                        <div className={styles.setLimitation_group}>
                        {isSetVolume?
                            <div className={styles.setLimitation_volume}>
                                {t("dashboard.acc.delivery.setDelivery.volumeNotBig")}
                                <TextField
                                    id="setLimitation_volume"
                                    // label="Password"
                                    onChange={handleVolumechange}
                                    type="number"
                                    // autoComplete="current-password"
                                    />
                                    {t("dashboard.acc.delivery.setDelivery.meter")}
                            </div>
                            :[]
                        }
                        {isSetWeight?
                            <div className={styles.setLimitation_Weight}>
                                {t("dashboard.acc.delivery.setDelivery.weightNotBig")}
                                <TextField
                                    id="setLimitation_Weight"
                                    // label="Password"
                                    onChange={handleWeightchange}
                                    type="number"
                                    // autoComplete="current-password"
                                    />
                                {t("dashboard.acc.delivery.setDelivery.kg")}
                            </div>
                        :[]
                    }
                        </div>
                        <div className={styles.setrules_container}>{t("dashboard.acc.delivery.setDelivery.setRule")}</div>
                        <Divider/>

                        {/* Product orientated */}
                        <div className={styles.orientated_container}>
                        <Accordion>
                            <AccordionSummary
                            
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                            >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                classes={{label:styles.accordionlabel_root}}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                                label={t("dashboard.acc.delivery.setDelivery.ProductOrientated")}
                            />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Product
                                t={t}
                                />
                            </AccordionDetails>
                        </Accordion>
                        </div>

                        {/* customer orientated */}
                        <div className={styles.orientated_container}>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                            >
                            <FormControlLabel
                                classes={{label:styles.accordionlabel_root}}
                                aria-label="Acknowledge"
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                                label={t("dashboard.acc.delivery.setDelivery.customerorientated")}
                            />
                            </AccordionSummary>
                            <AccordionDetails>
                            {/* <DataGrid
                                    t={t}
                                    columns={productOrientatedColumn}
                                    rows={productOrientatedRow}
                                    // handleEdit={handleEdit}
                                    // handleAction={handleAction}
                                    singlePage={true}
                                    volume={volume}
                                    weight={weight}
                                /> */}
                            <Customer
                            t={t}/>
                            {/* <Typography color="textSecondary">
                                The click event of the nested action will propagate up and expand the accordion unless
                                you explicitly stop it.
                            </Typography> */}
                            </AccordionDetails>
                        </Accordion>
                        </div>

                            {/* orderOrientated */}
                        <div className={styles.orientated_container}>
                        <Accordion>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-label="Expand"
                            aria-controls="additional-actions1-content"
                            id="additional-actions1-header"
                            >
                            <FormControlLabel
                                aria-label="Acknowledge"
                                classes={{label:styles.accordionlabel_root}}
                                onClick={(event) => event.stopPropagation()}
                                onFocus={(event) => event.stopPropagation()}
                                control={<Checkbox classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                                label={t("dashboard.acc.delivery.setDelivery.orderOrientated")}
                            />
                            </AccordionSummary>
                            <AccordionDetails>
                                <Order
                                t={t}
                                />
                            {/* <Typography color="textSecondary">
                                The click event of the nested action will propagate up and expand the accordion unless
                                you explicitly stop it.
                            </Typography> */}
                            
                            </AccordionDetails>
                        </Accordion>
                        </div>

                        {/* couponOrientated */}
                        <div className={styles.orientated_container}>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                                >
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    classes={{label:styles.accordionlabel_root}}
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                                    label={t("dashboard.acc.delivery.setDelivery.couponOrientated")}
                                />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Coupon
                                    t={t}/>
                                {/* <Typography color="textSecondary">
                                    The click event of the nested action will propagate up and expand the accordion unless
                                    you explicitly stop it.
                                </Typography> */}
                                </AccordionDetails>
                            </Accordion>
                        </div>

                        {/* distanceOrientated */}
                        <div className={styles.orientated_container}>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                                >
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    classes={{label:styles.accordionlabel_root}}
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                                    label={t("dashboard.acc.delivery.setDelivery.distanceOrientated")}
                                />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Distance
                                    t={t}/>
                                {/* <Typography color="textSecondary">
                                    The click event of the nested action will propagate up and expand the accordion unless
                                    you explicitly stop it.
                                </Typography> */}
                                </AccordionDetails>
                            </Accordion>
                        </div>

                         {/* postcodeOrientated */}
                         <div className={styles.orientated_container}>
                            <Accordion>
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls="additional-actions1-content"
                                id="additional-actions1-header"
                                >
                                <FormControlLabel
                                    aria-label="Acknowledge"
                                    classes={{label:styles.accordionlabel_root}}
                                    onClick={(event) => event.stopPropagation()}
                                    onFocus={(event) => event.stopPropagation()}
                                    control={<Checkbox classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                                    label={t("dashboard.acc.delivery.setDelivery.postcodeOrientated")}
                                />
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Postcode
                                        t={t}
                                    />
                                {/* <Typography color="textSecondary">
                                    The click event of the nested action will propagate up and expand the accordion unless
                                    you explicitly stop it.
                                </Typography> */}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        <div className={styles.button_group}>
                            <Button classes={{root:styles.dialog_bt}}>{t("common.save")}</Button>
                            <Button onClick={handleClose} classes={{root:styles.dialog_bt}}>{t("common.cancel")}</Button>
                        </div>
                    </div>
                </DialogContent>
        </Dialog>
    )
}

export default DeliveryEditDialog