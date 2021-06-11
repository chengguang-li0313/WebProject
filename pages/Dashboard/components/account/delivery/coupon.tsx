import * as React from 'react';
import styles from './index.module.css';
import {FormControlLabel,RadioGroup,Radio, Button,Popper,
    Collapse,List,ListItem,ListItemText,ListSubheader} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DataGrid from '../../dataGrid'
import {coupon} from '../../../../../public/fakeData'

interface Props {
    t:(params: String) => String;
    getDatachange:(comd:string,data:any)=>void
    coupon:any
  }
  
  function Coupon(props: Props){
    const {t} = props

    
  const customerOrientatedColumn =  [
      { id: 'index',label:["dashboard.acc.delivery.setDelivery.index"], minWidth: 100 },  
      { id: 'code',label:["dashboard.acc.delivery.setDelivery.couponCode"], minWidth: 100 },
      { id: 'scope',label:["dashboard.acc.delivery.setDelivery.scope"], minWidth: 100 },    
      { id: 'period',label:["dashboard.acc.delivery.setDelivery.period"], minWidth: 100 },  
      { id: 'custom',label:["dashboard.acc.delivery.setDelivery.customers"], minWidth: 100 },
      { id: 'percentage',label:["dashboard.acc.delivery.setDelivery.percentage"], minWidth: 100 } ,
      {
        id: 'more',
        label: "",
        minWidth: 10,
        align: "center",
      }
  ]



const [rows, setRows] = React.useState(props.coupon);
const [value, setValue] = React.useState('female');
const [anchorEl, setAnchorEl] = React.useState(null);
const [expandOpen, setExpandOpen] = React.useState(false);
const [editMenuListAnchorEl,setEditMenuListAnchorEl]= React.useState(null);
const [editOpen,setEditOpen] = React.useState(false);
const [currentRow,setCurrentRow] = React.useState(null);
const [state ,setState] = React.useState(0);

const forceUpdate=()=>{
  setState(prev=>prev+=1)
}
const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}

const handleEdit=(event: any,row:any) => {
  setEditOpen(prev => !prev)
  setCurrentRow(row)
  setEditMenuListAnchorEl(editMenuListAnchorEl?null : event.currentTarget)
}
  const handleexpandOpenClick = () => {
    setExpandOpen(!expandOpen);
  };


  

  const handleClick = (event:any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const onDatachange =(dataId:string,data:any,currentRow:any)=>{
    let temp = []
    rows.slice().map((row:any)=>{
      if(row.index.item == currentRow.index.item){
        let tempR = JSON.parse(JSON.stringify(currentRow))
        tempR.period.item = data.toString()
        temp.push(tempR)
      }else{
        temp.push(row)
      }
    })

    setRows(temp)
  }

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };
  const onSetdata=()=>{
    // let temp 
  }
  const handleAction =(ev:any,command:string,row?:any)=>{
    if(row){
      setCurrentRow(row)
  }
    switch(command){
        case commandList.ADD:
            addNewRow()
            break;
        case commandList.EDIT:

            enableEdit(ev,row)
            break;
        case commandList.SAVE:

            saveEdit(ev)
            break;
        case commandList.DELETE:
            deleteEdit(ev,row)
            break;
        default:
            break
    }
}
const deleteEdit=(ev:any,row:any)=>{
  setEditMenuListAnchorEl(null)
  setEditOpen(false)
  setRows(prev=>{
    let temp = JSON.parse(JSON.stringify(prev))
    temp.map((p,i)=>{
        if(p.index.item ==row.index.item){
            prev.splice(i,1)
        }
    
    })
    return prev
    })
}
  const saveEdit=(ev:any)=>{
    setRows(prev=>{
          prev.forEach((p,i)=>{
              if(p.index.item ==currentRow.index.item){
                  p.editable = false
              }

          })
          return prev
      })
  }
  const enableEdit=(ev:any,row:any)=>{
      setRows(prev=>{
          prev.forEach((p,i)=>{
              if(p.index.item ==row.index.item){
                  p.editable = true
              }

          })
          return prev
      })
  }
  const addNewRow = ()=>{

      setRows(prev=>{
          return prev
      })
  }
  const onEditValue=(ev:any,command:string,therow:any)=>{
    setRows(prev=>{
        prev.map(p=>{
            if(p.index.item==therow.index.item){
              
                p[command].item = ev.target.value
            }
        })
        return prev
    })
    forceUpdate()

  }
  React.useEffect(() => {
    if(rows){
        let clean = []
        rows.map((p,i)=>{
          if(p.index){
            clean.push({"index":p.index.item,
                "code":p.code.item,
                "scope": p.scope.item,
                "custom": p.custom.item,
                "period": p.period.item,
                "percentage": p.percentage.item})}
        })
        props.getDatachange("coupon",clean)
  }},[rows]);
    return(
        <div className={styles.customer_container}>
            <DataGrid
                t={t}
                columns={customerOrientatedColumn}
                rows={rows}
                singlePage={true}
                onDatachange={onDatachange}
                editMenuListAnchorEl={editMenuListAnchorEl}
                editOpen={editOpen}
                handleEdit={handleEdit}
                delivery={true}
                handleAction={handleAction}
                onEditValue={onEditValue}
            />
        </div>
    )
}

export default Coupon
