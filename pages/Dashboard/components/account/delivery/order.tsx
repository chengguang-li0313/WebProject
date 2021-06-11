import * as React from 'react';
import styles from './index.module.css';
import {FormControlLabel,RadioGroup,Radio, Button,Popper,
    Collapse,List,ListItem,ListItemText,ListSubheader} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DataGrid from '../../dataGrid'

interface Props {
    t:(params: String) => String;
    getDatachange:(comd:string,data:any)=>void
    order:any
  }
  
  function Order(props: Props){
    const {t} = props

    
  const customerOrientatedColumn =  [
    { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },  
    { id: 'amount', label: ['dashboard.acc.delivery.setDelivery.amount'], minWidth: 100 },  
    { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.rate'], minWidth: 100 },
    {
      id: 'more',
      label: "",
      minWidth: 10,
      align: "center",
    } ]

  const createData = (order:any)=>{
    let rows = []
    order.forEach((element:any,index:any) => {
        rows.push({index:{item:element.index,type:'string'},
        amount:{item:element.amount,type:'rate'},
        rate:{item:element.rate,type:'rate'}})
    });
    return rows
}


const [rows, setRows] = React.useState(createData(props.order));
const [value, setValue] = React.useState('female');
const [anchorEl, setAnchorEl] = React.useState(null);
const [expandOpen, setExpandOpen] = React.useState(false);
const [editMenuListAnchorEl,setEditMenuListAnchorEl]= React.useState(null);
const [editOpen,setEditOpen] = React.useState(false);
const [state,setState] = React.useState(0);
const [currentRow,setCurrentRow] = React.useState(null);

const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}

const forceUpdate =()=>{
  setState(prev=>prev+=1)
}
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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };

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
    
    forceUpdate()
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
    forceUpdate()
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
    forceUpdate()
}
const onEditValue=(ev:any,command:string,row:any)=>{
        
    setRows(prev=>{
        prev.map(p=>{
            if(p.index.item==row.index.item){
                p[command].item = ev.target.value
            }
        })
        return prev
    })

    forceUpdate()

}
const addNewRow = ()=>{

    setRows(prev=>{
        prev.push({index:{item:prev.length,type:'string'},
        amount:{item:0,type:'rate'},
        rate:{item:0,type:'rate'}})
        return prev
    })
    forceUpdate()
}
React.useEffect(() => {
    // forceUpdate()
    if(rows){
        let clean = []
        rows.map((p,i)=>{
            clean.push({index:p.index.item,
                amount:p.amount.item,
                rate:p.rate.item})
        })
        props.getDatachange("order",clean)
    }
    
},[rows]);
    return(
        <div className={styles.customer_container}>
            <DataGrid
                t={t}
                columns={customerOrientatedColumn}
                rows={rows}
                singlePage={true}
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

export default Order
