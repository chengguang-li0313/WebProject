import * as React from 'react';
import styles from './index.module.css';
import {FormControlLabel,RadioGroup,Radio, Button,Dialog,DialogContent,
    Collapse,List,ListItem,ListItemText,ListSubheader} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DataGrid from '../../dataGrid'
// import {vw} from '../../../../../public/fakeData';
import Map from './map'


interface Props {
    t:(params: String) => String;
    getDatachange:(comd:string,data:any)=>void
    vwdata:any
  }
  

function VOrientated(props: Props){
    const {t} = props

    
  const customerOrientatedColumn =  [
      { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },  
      { id: 'volume', label: ['common.volume'], minWidth: 100 },  
      { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.rate'], minWidth: 100 },  
      {
        id: 'more',
        label: "",
        minWidth: 10,
        align: "center"
      }
  ]

    const createData = (data:any)=>{
        let rows = []
        data.forEach((element:any,index:any) => {
            let rate = element.rate.replace("$",'')
            rows.push({index:{item:element.index,type:'string'},
                volume:{item:element.v,type:'rs'},
                        rate:{item:rate,type:'rate'}})
        });
        return rows
    }

    const [rows, setRows] = React.useState(createData(props.vwdata));
    const [value, setValue] = React.useState('female');
    const [open, setOpen] = React.useState(false);
    const [expandOpen, setExpandOpen] = React.useState(false);
    const [editMenuListAnchorEl,setEditMenuListAnchorEl]= React.useState(null);
    const [editOpen,setEditOpen] = React.useState(false);
    const [currentRow,setCurrentRow] = React.useState(null);
    const [state,setState] = React.useState(0);
    const [subList,setSubList] = React.useState('');

    const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}

    const forceUpdate =()=>{
        setState(prev=>prev+=1)
    }
    const handleEdit=(event: any,row:any) => {
    setEditOpen(prev => !prev)
    if(row){
        setCurrentRow(row)
    }
    setEditMenuListAnchorEl(editMenuListAnchorEl?null : event.currentTarget)

    }
  const handleexpandOpenClick = () => {
    setExpandOpen(!expandOpen);
  };


  const handleClick = (event:any) => {
    setOpen(true)
  };

  const id = open ? 'simple-popper' : undefined;

  const handleChange = (event:any) => {
    setValue(event.target.value);
  };

  const handleClose=(event:any)=>{

  }
  const handleNaoDialogClose=()=>{
    setOpen(false)
  }
  const handleAction =(ev:any,command:string,row?:any)=>{
    if(row){
      setCurrentRow(row)
      forceUpdate()
  }
    switch(command){
        case commandList.ADD:
            addNewRow()
            break;
        case commandList.EDIT:

            enableEdit(ev,row)
            break;
        case commandList.DELETE:
            deleteEdit(ev,row)
            break;
        default:
            break
    }
}
    const deleteEdit=(ev:any,row:any)=>{
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
        update()
        setEditMenuListAnchorEl(null)
        setEditOpen(false)
        forceUpdate()
    }


    const saveEdit=(ev:any,row:any)=>{
        setRows(prev=>{
            prev.forEach((p,i)=>{
                if(p.index.item ==row.index.item){
                    p.editable = false
                }

            })
            return prev
        })
        update()
        forceUpdate()
        setOpen(false)
    }
    const onSave =()=>{
        let newList = ''
        if(subList!=""){
            let temp = subList.split(', ')
            temp.forEach(t=>{
                let templ = t.split(" ")
                newList+=templ[templ.length-1]+" "

            })
        }
        setRows(prev=>{
                prev.map(p=>{
                    if(p.index.item==currentRow.index.item){
                        p.to.item = newList
                    }
                    
                })
                    return prev
        })
        update()
        setOpen(false)
    }
    const onselectedSub=(list:string)=>{
        setSubList(list)
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
        update()
        forceUpdate()
    }
    const onCusSeteditOpen =()=>{
        setOpen(true)
    }
    const addNewRow = ()=>{

        setRows(prev=>{
            prev.push({index:{item:prev.length+1,type:'string'},
            volume:{item:0.00,type:'rs'},
            rate:{item:0.00,type:'rate'}})  
            return prev
        })
        update()
        forceUpdate()

        
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
        update()
        forceUpdate()
    }

    const update = () =>{
        if(rows){
            let clean = []
            rows.map((p,i)=>{
                clean.push({"index":p.index.item,
                    "v":p.volume.item,
                    "rate":p.rate.item})
            })
            props.getDatachange("vitems",clean)
        }
    }
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
                onCusSeteditOpen={onCusSeteditOpen}
            />
        </div>
    )
}

export default VOrientated
