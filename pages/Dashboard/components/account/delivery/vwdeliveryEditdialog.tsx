import * as React from 'react';
import styles from './index.module.css';
import {Dialog,DialogTitle,DialogContent,Accordion,AccordionSummary,AccordionDetails,
    Checkbox,FormControlLabel,Radio,Button} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataGrid from '../../dataGrid'
import vwData from '../../../../../public/deliveryData/account_deliveryScheme_volumeWeight_web.json'
import VWOrientated from './vwOrientated'
import WOrientated from './wOrientated'
import VOrientated from './vOrientated'

interface Props {
    t:(params: String) => String;
    open:boolean;
    handleClose:() => void;
    dialogName:String;
    handleSave:(data:any) =>void;
    data:any
}

function VWDeliveryEditDialog(props: Props){
    const {t,open,handleClose,dialogName,handleSave,data} = props
    const [state,setState] = React.useState(0);
    const [delivVWData,setDelivVWData ] = React.useState(vwData);

    const forceUpdate=()=>{
        setState(prev=>prev+=1)
    }

    const onDatachange = (event:any, cmd:string) =>{

    }

    const getDatachange = (comd:string,data:any) =>{
        console.log(comd,data)
        setDelivVWData(prev=>{
            prev[comd] = data
            return prev
        })
        forceUpdate()
    }

    const onSave =() =>{
        handleClose()

        handleSave(delivVWData)
    }

    return(
        <Dialog classes={{paperWidthSm:styles.paper_WidthXs}}  open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle classes={{root:styles.dialogTitle_root}} id="form-dialog-title">{ t("dashboard.sal.Edit")+" "+t(dialogName)}</DialogTitle>
            <DialogContent classes={{root:styles.dialog_root}}>
                <div className={styles.display_group}>
                    <div className={styles.display_line}>{t("dashboard.acc.delivery.setDelivery.biggerVolume")}{props.data.vw.volume}{t("dashboard.acc.delivery.setDelivery.meter")}</div>
                    <div className={styles.display_line}>{t("dashboard.acc.delivery.setDelivery.biggerWeight")}{props.data.vw.weight}{t("dashboard.acc.delivery.setDelivery.kg")}</div>
                </div>

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
                            control={<Radio onChange={ev=>onDatachange(ev,'a')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                            label={t("dashboard.acc.delivery.setDelivery.vwo")}
                        />
                        </AccordionSummary>
                        <AccordionDetails>
                            <VWOrientated
                                t={t}
                                getDatachange={getDatachange}
                                vwdata={delivVWData.vwitems}

                            />
                        </AccordionDetails>
                    </Accordion>
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
                            control={<Radio onChange={ev=>onDatachange(ev,"a")} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                            label={t("dashboard.acc.delivery.setDelivery.wo")}
                        />
                        </AccordionSummary>
                        <AccordionDetails>
                            <WOrientated
                                t={t}
                                getDatachange={getDatachange}
                                vwdata={delivVWData.witems}

                            />
                        
                        </AccordionDetails>
                    </Accordion>
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
                            control={<Radio onChange={ev=>onDatachange(ev,'a')} classes={{checked:styles.checkbox_colorPrimary}} color="primary"/>}
                            label={t("dashboard.acc.delivery.setDelivery.vo")}
                        />
                        </AccordionSummary>
                        <AccordionDetails>
                            <VOrientated
                                t={t}
                                getDatachange={getDatachange}
                                vwdata={delivVWData.vitems}

                            />

                        </AccordionDetails>
                    </Accordion>

                    <div className={styles.button_group}>
                        <Button onClick={onSave} classes={{root:styles.dialog_bt}}>{t("common.save")}</Button>
                        <Button onClick={handleClose} classes={{root:styles.dialog_bt}}>{t("common.cancel")}</Button>
                    </div>
            </DialogContent>
        </Dialog>
    
    )
}

export default VWDeliveryEditDialog