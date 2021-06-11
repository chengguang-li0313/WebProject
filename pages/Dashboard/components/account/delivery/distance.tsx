import * as React from 'react';
import styles from './index.module.css';
import {FormControlLabel,RadioGroup,Radio, Button,Popper,
    Collapse,List,ListItem,ListItemText,ListSubheader} from '@material-ui/core';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import BoardlineChart from './boardLineChart'
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
// import { useMediaQuery } from 'react-responsive'
import DataGrid from '../../dataGrid'
import {distance} from '../../../../../public/fakeData'

interface Props {
    t:(params: String) => String;
    getDatachange:(comd:string,data:any)=>void
    distance:any
    // open:boolean;
    // handleClose:() => void;
    // dialogName:String;
    
  }
  
  function Distance(props: Props){
    const {t} = props

    
  const customerOrientatedColumn =  [
    { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },  
    { id: 'distance', label: ['dashboard.acc.delivery.setDelivery.distance'], minWidth: 100 },  
    { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.rate'], minWidth: 100 }, 
    {
      id: 'more',
      label: "",
      minWidth: 10,
      align: "center",
    //   align: 'right',
    //   format: (value) => value.toFixed(2),
    } ]

  const createData = (product:any)=>{
    let rows = []
    product.forEach((element:any,index:any) => {
        rows.push({"index": {item:element.index,type:"string"},
        "distance": {item:element.distance,type:"slider_single"},
        "rate": {item:element.rate,type:"rate"},editable:false})
    });
    // console.log
    return rows
}

const [rows, setRows] = React.useState(createData(props.distance));
const [value, setValue] = React.useState('female');
const [anchorEl, setAnchorEl] = React.useState(null);
const [expandOpen, setExpandOpen] = React.useState(false);
const [editMenuListAnchorEl,setEditMenuListAnchorEl]= React.useState(null);
const [editOpen,setEditOpen] = React.useState(false);
const [currentRow,setCurrentRow] = React.useState(null);
const [state,setState] = React.useState(0);
const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}

const forceUpdate=()=>{
    setState(prev=>prev+=1)
  }

const handleEdit=(event: any,row:any) => {
  setEditOpen(prev => !prev)
  setCurrentRow(row)
  // anchorEl ? null : event.currentTarget
  setEditMenuListAnchorEl(editMenuListAnchorEl?null : event.currentTarget)

}
  const handleexpandOpenClick = () => {
    setExpandOpen(!expandOpen);
  };

  React.useEffect(() => console.log('mounted'), []);

  const handleClick = (event:any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };

  const onDatachange = (type:string,data:any,currentRow:any)=>{
    console.log(type,data,currentRow)
  }
  const handleAction =(ev:any,command:string,row?:any)=>{
//     if(row){
//       setCurrentRow(row)
//   }
    switch(command){
        case commandList.ADD:
            console.log('commend',command)
            addNewRow()
            break;
        case commandList.EDIT:

            enableEdit(ev,row)
            break;
        // case commandList.SAVE:

        //     saveEdit(ev)
        //     break;
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
        // let id = null
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
const onEditValue=(ev:any,command:string,row:any)=>{
        
    // if(command==='rate'){
        setRows(prev=>{
            prev.map(p=>{
                if(p.index.item==row.index.item){
                    p[command].item = ev.target.value
                    console.log("onEditValue", ev.target.value)
                }
            })
            return prev
        })

    // }
    forceUpdate()

}
// const saveEdit=(ev:any)=>{
//   setRows(prev=>{
//         prev.forEach((p,i)=>{
//             if(p.index.item ==row.index.item){
//                 p.editable = false
//             }

//         })
//         return prev
//     })
//     // forceUpdate()
// }
const enableEdit=(ev:any,row:any)=>{
    // currentRow
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
const addNewRow = ()=>{

    setRows(prev=>{
        // let temp = prev
        // prev.push({ editable: true,index:{item:prev.length+1,type:"string"},
        // scope:{item:'',treeList:setScope(""),type:"scope"},rate:{item:"0",type:"price"},
        // vw:{item:{volume:0,weight:0},type:"slider"}})
        // prev.push(prev[0])
        // prev[0].editable = true
        
        return prev
    })
    // forceUpdate()
    // console.log('productOrientatedRow',productOrientatedRow)
    
}
React.useEffect(() => {
    // forceUpdate()
    if(rows){
        let clean = []
        rows.map((p,i)=>{
            clean.push({index:p.index.item,
                "distance":p.distance.item,
                "percentage":p.rate.item})
        })
        props.getDatachange("distance",clean)
    }
    
    // setProductOrientatedRow(productOrientatedRow)
},[rows]);
    return(
        <div className={styles.customer_container}>
            
            {/* {rows.length>0? */}
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
                // onEditDialog={this.onEditDialog}
            />
            {/* :[]} */}
        </div>
    )
}

export default Distance
