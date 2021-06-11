import * as React from 'react';
import styles from './index.module.css';
import {FormControlLabel,RadioGroup,Radio, Button,TextField,Popper,Checkbox,Dialog,DialogContent,
    Collapse,List,ListItem,ListItemText,ListSubheader} from '@material-ui/core';
import DataGrid from '../../dataGrid'
import {customerList,customer} from '../../../../../public/fakeData'
import { id } from 'date-fns/locale';

interface Props {
    t:(params: String) => String;
    getDatachange:(comd:string,data:any)=>void
    customer:any
  }

  const createData=(data:any)=>{
    let temp = []
    data.map((d:any,i:any)=>{
        // console.log("ds",d)
        temp.push({editable:false,index:{item:d.index,type:"string"},scope:{item:d.scope,type:"cus-scope"},rate:{item:d.rate,type:"rate"}})
    })
    return temp
  }
  const commandList={ADD:"Add",EDIT:"Edit",SAVE:"Save",DELETE:"Delete"}

  const createCustomerListData=(data:any)=>{
    let temp = []
    data.map((d:any,i:any)=>{
        // console.log("ds",d)
        temp.push({id:{item:d.id,type:"string",checked:false},name:{item:d.name,type:"string"},Category:{item:d.Category,type:"string"}})
    })
    return temp
  }

  const initialState = {
    value:'',
    anchorEl:null,
    expandOpen:false,
    customerLi:[],
    customers:[
        {name:"Business",id:"business",checked:false},
        {name:"Consumer",id:"consumer",checked:false},
        {name:"All",id:"all",checked:true},
        {name:"Important",id:"important",checked:false}
    ],
    customerRow:createCustomerListData(customerList),
    rowsList:createData(customer),
    open:false,
    editMenuListAnchorEl:null,
    editOpen:false,
    currentRow:null,
    newRate:'',
    newScope:'',
    editrow:false
  }
  type State = {
    value:string,
    anchorEl:any,
    expandOpen:boolean,
    customers:Array<any>,
    customerLi:Array<any>,
    rowsList:any,
    customerRow:any,
    open:boolean,
    editMenuListAnchorEl:any,
    editOpen:boolean
    currentRow:any,
    newRate:any,
    newScope:any,
    editrow:boolean
}
  
class Customer extends React.Component<Props, object> {

    
    state= initialState
    
    componentDidMount(){
        let tmp = []
        customerList.map((cus,ind)=>{
            cus.checked = false
            tmp.push(cus)
        })
        // console.log('this',this)
        this.setState({customerLi:tmp})
    }

    componentDidUpdate(prevProps:any, prevState:any) {
        
  }
  private customerColumn =[
    { id: 'id', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },
    { id: 'name', label: ['dashboard.acc.delivery.setDelivery.name'], minWidth: 100 },  
  { id: 'Category', label: ['dashboard.acc.delivery.setDelivery.category'], minWidth: 100 }, 
  ]
  private customerOrientatedColumn =[{ id: 'index', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },  
  { id: 'scope', label: ['dashboard.acc.delivery.setDelivery.scope'], minWidth: 100 },  
  { id: 'rate', label: ['dashboard.acc.delivery.setDelivery.rate'], minWidth: 100 }, 
  {
    id: 'more',
    label: "",
    minWidth: 10,
    align: "center",
  }
]
    private handleClose=(event:any)=>{

    }
    private handleAction =(ev:any,command:string,row?:any)=>{
        // if(row){
        //     // setCurrentRow(row)
        //     this.setState({currentRow:row})
        // }
        switch(command){
            case commandList.ADD:
                console.log('commend',command)
                this.addNewRow()
                break;
            case commandList.EDIT:

                this.enableEdit(ev,row)
                break;
            // case commandList.SAVE:

            //     this.saveEdit(ev)
            //     break;
            case commandList.DELETE:
                this.deleteEdit(ev,row)
                break;
            default:
                break
        }
    }
    private deleteEdit=(ev:any,row:any)=>{
        // setEditMenuListAnchorEl(null)
        this.setState((preState,props)=>{
            // console.log('preState',preState['rowsList'])
            preState['rowsList'].map((p,i)=>{
                if(p.index.item ==row.index.item){
                    preState['rowsList'].splice(i,1)
                }
            
            })
            // preState['rowsList'].push({index:{item:preState['rowsList'].length+1,type:"string"},scope:{item:"",type:"string"},rate:{item:"",type:"price"}})
            return {rowsList:preState['rowsList'],editOpen:false,editMenuListAnchorEl:false}})   
            
        // })
        // this.setState(editOpen:false)

    }
    private saveEdit=(ev:any)=>{
        // setProductOrientatedRow(prev=>{
        //     prev.forEach((p,i)=>{
        //         if(p.index.item ==currentRow.index.item){
        //             p.editable = false
        //         }

        //     })
        //     return prev
        // })

    }
    private enableEdit=(ev:any,row:any)=>{
        this.setState((preState,props)=>{
            
            preState['rowsList'].map((p,i)=>{
                if(p.index.item ==row.index.item){
                    preState['rowsList'][i].editable = true
                    
                    let tempcusList = row.scope.item.split(',')

                    tempcusList.map((t:any,index:any)=>{
                        preState['customerRow'].map((c:any,index:any)=>{
                            if(t==c.name.item){
                                c.id.checked = true
                            }
                        })
                    })
                    
                }
            
            })
            console.log("preState['customerRow']",preState['customerRow'])
            // preState['rowsList'].push({index:{item:preState['rowsList'].length+1,type:"string"},scope:{item:"",type:"string"},rate:{item:"",type:"price"}})
            return {rowsList:preState['rowsList'],editOpen:false,editMenuListAnchorEl:false,customerRow:preState['customerRow']}})   
        // this.setState({editrow:true,newRate:"",
        // newScope:""})
        // this.handleClick()

    }

    private onCusSeteditOpen=(event:any,row:any)=>{
        console.log('onCusSeteditOpen')
        this.handleClick(event)
    }

    private addNewRow =()=>{
        // this.handleClick()
        // this.setState({newRate:"",
        //     newScope:""})
        this.setState((preState,props)=>{
            preState['rowsList'].push({editable:true,index:{item:preState['rowsList'].length+1,type:"string"},scope:{item:this.state.newRate,type:"cus-scope"},rate:{item:this.state.newRate,type:"rate"}})
                return {rowsList:preState['rowsList']}
        })


    }

    private onEditValue=(ev:any,command:string,row:any)=>{
        
        if(command==='rate'){
            this.setState(prevState=>{
                prevState['rowsList'].map(p=>{
                    if(p.index.item==row.index.item){
                        p.rate.item = ev.target.value
                        // console.log("onEditValue", ev.target.value)
                    }
                })
                return {rowsList: prevState['rowsList']}
            })

        }
        // forceUpdate()

    }

    private handleCheckBoxChanged=(ev:any,i:any)=>{

        this.setState((preState,props)=>{
            preState['customerRow'].map((cus:any,index:any)=>{
                if(index ==i){
                    preState['customerRow'][i].id.checked = !preState['customerRow'][i].id.checked
                    preState['newScope']+=`${preState['customerRow'][i].name.item},`
                }
                // temp.push(cus)
            })
            return {customerRow:preState['customerRow'],newScope: preState['newScope']}
        })

    }
    private handleEdit=(event: any,row:any) => {
        this.setState({editMenuListAnchorEl:event.currentTarget,editOpen:!this.state.editOpen,currentRow:row})
        // anchorEl ? null : event.currentTarget
        // setEditMenuListAnchorEl(editMenuListAnchorEl?null : event.currentTarget)
      
      }

    private handleexpandOpenClick = () => {
        this.setState({expandOpen:!this.state.expandOpen});
    };
    private handleNaoDialogClose=()=>{
        this.setState({
            // anchorEl:event.currentTarget,
            open:false})
      }

    private onSave=()=>{
        this.handleNaoDialogClose()
        if(!this.state.editrow){
            this.setState((preState,props)=>{
                // console.log('preState',preState['rowsList'])
                preState['rowsList'].push({index:{item:preState['rowsList'].length+1,type:"string"},scope:{item:this.state.newRate,type:"string"},rate:{item:this.state.newRate,type:"price"}})
                return {rowsList:preState['rowsList']}})
        }else{
            this.setState((preState,props)=>{

                preState['rowsList'].map((p,i)=>{
                    if(p.index.item ==this.state.currentRow.index.item){
                        // preState['rowsList'].splice(i,1)
                        preState['rowsList'][i].scope.item = this.state.newScope
                        preState['rowsList'][i].rate.item = this.state.newRate
                    }
                
                })
                return {rowsList:preState['rowsList'],editrow:true}})
        }
        

    }

    private getnewRate =(event:any)=>{
        this.setState({newRate:event.target.value})
        // console.log("event.target.value",event.target.value)
    }
    private handleClick = (event?:any) => {
        this.setState({
            anchorEl:event.currentTarget,
            customerRow:createCustomerListData(customerList),
            open:!this.state.open,
            editOpen:false})
        
    };


    private handleChange = (event:any) => {
     
    
        let temp=[]
        let tempData = {}
        Object.assign(tempData,customer)
        customer.map(item=>{
            // console.log('event.target.value',event.target.value)
            let tempcusList = item.scope.split(',')
            // console.log(tempcusList)
            let added = false
            tempcusList.map((cus,i)=>{
                customerList.map((c)=>{
                    if(c.name.toString() === cus && !added){
                        console.log(cus)
                        if(c.Category === event.target.value){
                            let tempItem = JSON.parse(JSON.stringify(item))
                            // tempItem.index+=1
                            temp.push(tempItem)
                            added=true
                        }else if(event.target.value=='both' ){
                            let tempItem = JSON.parse(JSON.stringify(item))
                            temp.push(tempItem)
                            added=true
                        }
                    }
                })
            })
            // if(item.Category==event.target.value){
                
            //     // console.log('item.Category.item',item)
            //     let tempItem = JSON.parse(JSON.stringify(item))
            //     // tempItem.index+=1
            //     temp.push(tempItem)
            // }else if(event.target.value=='both'){
            //     let tempItem = JSON.parse(JSON.stringify(item))
            //     temp.push(tempItem)
            // }
        })
        this.setState({rowsList:createData(temp),value:event.target.value})

  };



render(){
    const {t} = this.props

    return(
        <div className={styles.customer_container}>
            <div className={styles.selectCustomer_container}>
                {/* <Button onClick={this.handleClick} classes={{root:styles.setSelect_bt}}>{t('common.addNew')}</Button> */}
                <div className={styles.selectCustomer_radio_container}>
                    <RadioGroup row aria-label="selectCustomer_radio_container" name="selectCustomer_radio_container" value={this.state.value} onChange={this.handleChange}>
                        <FormControlLabel value="business" control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>} label={t("dashboard.acc.delivery.setDelivery.businessCustomer")} />
                        <FormControlLabel value="consumer" control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>} label={t("dashboard.acc.delivery.setDelivery.consumerCustomer")} />
                        <FormControlLabel value="both" control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>} label={t("dashboard.acc.delivery.setDelivery.both")} />
                    </RadioGroup>
                </div>  
            </div>
            <Popper className={styles.poppers} open={this.state.open} placement="bottom-end"  anchorEl={this.state.anchorEl} >
                {/* <DialogContent> */}
                <div className={styles.customer_poppers_content}>
                {/* <TextField type="number" id="standard-search" label="Rate" onChange={this.getnewRate}/> */}
                    <DataGrid
                        t={t}
                        columns={this.customerColumn}
                        rows={this.state.customerRow}
                        handleEdit={this.handleEdit}
                        editMenuListAnchorEl={this.state.editMenuListAnchorEl}
                        editOpen={this.state.editOpen}
                        delivery={true}
                        checkedLine={true}
                        singlePage={true}
                        handleCheckBoxChanged={this.handleCheckBoxChanged}
                        // onEditDialog={this.onEditDialog}
                    />
                    {/* <div className={styles.map_dialog_bt_container}>
                        <Button onClick={this.onSave} classes={{root:styles.dialog_bt}}>{t("common.save")}</Button>
                        <Button onClick={this.handleNaoDialogClose} classes={{root:styles.dialog_bt}}>{t("common.cancel")}</Button>
                    </div> */}
           
                </div>
                {/* </DialogContent> */}
            </Popper>
            {this.state.rowsList.length>0?
            <DataGrid
                t={t}
                columns={this.customerOrientatedColumn}
                rows={this.state.rowsList}
                singlePage={true}
                handleEdit={this.handleEdit}
                editMenuListAnchorEl={this.state.editMenuListAnchorEl}
                editOpen={this.state.editOpen}
                delivery={true}
                handleAction={this.handleAction}
                onCusSeteditOpen={this.onCusSeteditOpen}
                onEditValue={this.onEditValue}
                // onEditDialog={this.onEditDialog}
            />:[]}
        </div>
    )
}
}

export default Customer
