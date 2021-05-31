import * as React from 'react';
// import styles from './index.module.css';
// import {Dialog,DialogTitle,DialogContent,Select,
//     MenuItem,TextField, Divider, Button,
//     Accordion,AccordionSummary,AccordionDetails,
//     Checkbox,FormControlLabel} from '@material-ui/core';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import BoardlineChart from './boardLineChart'
import { useMediaQuery } from 'react-responsive'
import DataGrid from '../../dataGrid'
import {deliveryProductOrientatedData,treeData} from '../../../../../public/fakeData'

interface Props {
    t:(params: String) => String;
    // open:boolean;
    // handleClose:() => void;
    // dialogName:String;
    
  }

function Product(props: Props){
    const {t} = props
    
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
        // <div>
            <DataGrid
                t={t}
                columns={productOrientatedColumn}
                rows={productOrientatedRow}
                singlePage={true}
                volume={volume}
                weight={weight}
                treeData={treeData}
                                />
        // </div>
    )
}

export default Product