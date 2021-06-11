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
    getDatachange:(comd:string,data:any)=>void
    product:any
    // open:boolean;
    // handleClose:() => void;
    // dialogName:String;
    
  }

function Product(props: Props){
    const {t} = props
    const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}
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
    const [editMenuListAnchorEl,setEditMenuListAnchorEl]= React.useState(null);
    const [editOpen,setEditOpen] = React.useState(false);
    const [currentRow,setCurrentRow] = React.useState(null);
    // const [editable, setEditable] = React.useState(false);

    const forceUpdate =()=>{
        setState(prev=>prev+=1)
    }
    const handleEdit=(event: any,row:any) => {
    setEditOpen(prev => !prev)
    if(row){
        setCurrentRow(row)
    }
    // anchorEl ? null : event.currentTarget
    setEditMenuListAnchorEl(editMenuListAnchorEl?null : event.currentTarget)

    }

    const productOrientatedColumn =  [
        { id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },
        { id: 'scope', label: ['dashboard.acc.delivery.setDelivery.Scope'], minWidth: 100 },
        { id: 'vw', label: ['dashboard.acc.delivery.setDelivery.vol_wei_range'], minWidth: 100 },
        { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.Rate'], minWidth: 100 },
        {
            id: 'more',
            label: "",
            minWidth: 10,
            align: "center",
          } 
    ]

    const createData=(rows:Array<any>)=>{
        let tempList = []
        rows.map((row,index)=>(
            tempList.push({
            editable:false,
            index:{item:row.index,type:"string"},
            scope:{item:row.scope,treeList:setScope(row.scope),type:"scope"},rate:{item:row.rate,type:"rate"},
            vw:{item:{volume:row.vw.volume,weight:row.vw.weight},type:"slider"}})
            // tempList.push()
        ))
        // console.log('tempList',tempList)
        return tempList
    }
    const setScope = (scope:any) =>{    
        let scopeList = scope.split(',')
        
        let tempNode = JSON.parse(JSON.stringify(treeData));
        let nodesList = setnode(tempNode,scopeList)
        return nodesList
    }
    const setnode = (nodes:any,scopeList:any) =>{
        // let tempNodesList = []
        nodes.forEach((n,i) => {
            scopeList.forEach(element => {
                if(element==n.name){
                    n.checked = true
                }else if(n.children){
                    n.checked = false
                    // console.log("setnode(treeData,scope)",n.name)
                    n.children=setnode(n.children,scopeList)
                }else{
                    n.checked = false
                }
            });
            
        });

        return nodes
        
    }

    
    const [productOrientatedRow ,setProductOrientatedRow] = React.useState(createData(props.product));

    const handleAction =(ev:any,command:string,row?:any)=>{
        // console.log('row',row)
        // if(row){
        //     setCurrentRow(prev=>row)
        //     // forceUpdate()
        // }
        switch(command){
            case commandList.ADD:
                // console.log('commend',command)
                addNewRow()
                break;
            case commandList.EDIT:

                enableEdit(ev,row)
                break;
            // case commandList.SAVE:

            //     saveEdit(ev,row)
            //     break;
            case commandList.DELETE:
                deleteEdit(ev,row)
                break;
            default:
                break
        }
    }
    const deleteEdit=(ev:any,row:any)=>{
        setProductOrientatedRow(prev=>{
            // let id = null
            let temp = JSON.parse(JSON.stringify(prev))
            temp.map((p,i)=>{
                if(p.index.item ==row.index.item){
                    prev.splice(i,1)
                }
            
            })
            return prev
            
            
        })
        setEditMenuListAnchorEl(null)
        setEditOpen(false)
        forceUpdate()
    }
    const saveEdit=(ev:any,row:any)=>{
        setProductOrientatedRow(prev=>{
            prev.forEach((p,i)=>{
                if(p.index.item ==row.index.item){
                    p.editable = false
                }

            })
            return prev
        })
        forceUpdate()
    }
    const onEditValue=(ev:any,command:string,row:any)=>{
        
        // if(command==='rate'){
            setProductOrientatedRow(prev=>{
                prev.map(p=>{
                    if(p.index.item==row.index.item){
                        p[command].item = ev.target.value
                        // console.log("onEditValue", ev.target.value)
                    }
                })
                return prev
            })

        // }
        forceUpdate()

    }
    const enableEdit=(ev:any,row:any)=>{
        // currentRow
        console.log('row',row)
        setProductOrientatedRow(prev=>{
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

        setProductOrientatedRow(prev=>{
            // let temp = prev
            prev.push({ editable: true,index:{item:prev.length+1,type:"string"},
            scope:{item:'',treeList:setScope(""),type:"scope"},rate:{item:"0",type:"rate"},
            vw:{item:{volume:0,weight:0},type:"slider"}})
            // prev.push(prev[0])
            // prev[0].editable = true
            
            return prev
        })
        forceUpdate()
        // console.log('productOrientatedRow',productOrientatedRow)
        
    }
    React.useEffect(() => {
        // forceUpdate()
        console.log(" updated")
        if(productOrientatedRow){
            
            let clean = []
            productOrientatedRow.map((p,i)=>{
                clean.push({"index":p.index.item,
                    "scope":p.scope.item,
                    "vw":{"volume":p.vw.item.volume,
                        "weight":p.vw.item.weight},
                    "rate":p.rate.item})
            })
            props.getDatachange("product",clean)
        }
        
        // setProductOrientatedRow(productOrientatedRow)
    },[]);


    return(
        // <div>
            <DataGrid
                t={t}
                columns={productOrientatedColumn}
                rows={productOrientatedRow}
                singlePage={true}
                simpleMore={true}
                volume={volume}
                weight={weight}
                treeData={treeData}
                editMenuListAnchorEl={editMenuListAnchorEl}
                editOpen={editOpen}
                handleEdit={handleEdit}
                delivery={true}
                handleAction={handleAction}
                onEditValue={onEditValue}
                
                                />
        // </div>
    )
}

export default Product