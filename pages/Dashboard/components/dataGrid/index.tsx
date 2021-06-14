import * as React from 'react';
import styles from './index.module.css';
import {Divider,FormControl,TextField,Checkbox,Button,
    Table,TableBody,TableCell,TableContainer,
    TablePagination,TableRow,TableHead,Popper,MenuItem,
    Slider} from '@material-ui/core';
import {TreeView,TreeItem} from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { DateRangePicker } from 'react-date-range';
import CenterFocusStrongIcon from '@material-ui/icons/CenterFocusStrong';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker
  } from '@material-ui/pickers';

interface Props {
    t:(params: String) => String;
    columns:Array<any>;
    rows?:Array<any>;
    handleEdit?:(event: any,row:any) => void;
    handleAction?:(event: any,ope:any) => void;
    editMenuListAnchorEl?:any;
    editOpen?:boolean;
    simpleMore?:boolean;
    staffAction?:(event: any,row:any) => void;
    singlePage?:any;
    hide_x_overflow?:boolean,
    weight?:any,
    volume?:any,
    onDatachange?:any,
    treeData?:any,
    delivery?:boolean,
    checkedLine?:boolean,
    handleCheckBoxChanged?:(event: any,i:any,row:any) => void;
    onCusSeteditOpen?:(event: any,row:any) => void;
    onEditValue?:(ev:any,commend:string,row:any) => void;
    // onEditDialog:(addNew:boolean,row?:any)=>void;

}

function DataGrid(props: Props) {
    const {t,columns,rows,handleEdit,handleAction,editMenuListAnchorEl,editOpen=false,onDatachange} = props

    const [columnList, setColumnList] = React.useState(columns);
    const [states, setStates] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(props.singlePage?props.rows.length:10);
    const [rowsList, setRowsList] = React.useState(rows);
    const [editOpen_2,setEditOpen_2] = React.useState(false);
    // popEditTimePickerAnchorEl
    const [editOpen_timePicker,setEditOpen_timePicker] = React.useState(false);
    const [popEditMenuListAnchorEl,setPopEditMenuListAnchorEl]= React.useState(null);
    const [popEditTimePickerAnchorEl,setPopEditTimePickerAnchorEl]= React.useState(null);
    const [currentRow,setCurrentRow] = React.useState(rows[0]);
    // const [selectedRow,setCelectedRow] = React.useState([]);
    const [timeRange,setTimeRange] = React.useState({
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
          }
        //   compare: {
        //     startDate: new Date(),
        //     endDate: addDays(new Date(), 3),
        //     key: 'compare'
        //   }
      });
    const [timeRangeData,setTimeRangeData] = React.useState({
        from_time:new Date(),
        to_time:new Date()
    })

// 
    React.useEffect(() => {
        props.delivery?setRowsPerPage(props.singlePage?props.rows.length:10):[]
    });

    const IMG = "img"
    const STRING = "string"
    const GROUP_STRING="group_string"
    const NUM = "num"
    const COLOR = "color"
    const ITEM = "item"
    const PRICE = "price"
    const STATUS = "Status"
    const RANKING = "ranking"
    const STRING_VIEW = "string_view"
    const IMG_VIEW = "img_view"
    const QUALIIFICATION ="Qualifications"
    const CERTIFICATE = "Certificate"
    const SCOPE = "scope"
    const SLIDER = "slider"
    const SLIDER_SINGLE = "slider_single"
    const DATERANGE ="Daterange"
    const RATE = "rate"
    const CUS_SCOPE = "cus-scope"
    const MAP = "map"
    const ES= "es"

    // const [checked, setChecked] = React.useState(false);

  const handleChange = (event:any,key:any) => {
    const {prefix,i} = key
    if(prefix==""){
        currentRow.scope.treeList[i].checked = !currentRow.scope.treeList[i].checked
        setparent(currentRow.scope.treeList[i],i)
    }else{
        currentRow.scope.treeList[Number(prefix)].children[i].checked = !currentRow.scope.treeList[Number(prefix)].children[i].checked
        // currentRow.scope.treeList[Number(prefix)][i].checked = !currentRow.scope.treeList[Number(prefix)][i].checked
    }


    forceUpdate()
    let result = getCurrentList(currentRow.scope.treeList,"")
    let temp = []
    if(rows){
            
        rows.forEach((r,i)=>{
            if(r.index.item==currentRow.index.item){
                r.scope.item = result
                console.log(rows)
                console.log(r)
            }
            temp.push(r)
            
           
            
        })
        // console.log("temp",temp)
        // setRowsList(temp)
        
    }
  };

  const setparent=(node:any,i:any)=>{
    if(node.checked){
        if(node.children){
            node.children.forEach(element => {
                element.checked = true
                setparent(element,i)
            });
        }
    }else{
        if(node.children){
            node.children.forEach(element => {
                element.checked = false
                setparent(element,i)
            });
        }
    }
  }

  const getCurrentList=(nodeList:any,list:string)=>{

    nodeList.forEach((node:any) => {
        if(node.checked){
            list==""?list+=node.name:list+=","+node.name
        }
        if(node.children){
            if(list!=getCurrentList(node.children,list)&&!list.includes(getCurrentList(node.children,list))){
                list=getCurrentList(node.children,list)
            }
        }
        
    });
        return list
    
  }

    const onSeteditOpen_2=(event:any,row:any)=>{
        
        setCurrentRow(row)
        setEditOpen_2((prev)=>!prev)
        setPopEditMenuListAnchorEl(event.currentTarget)
        forceUpdate()
        
    }
    const onSeteditOpen_3=(event:any,row:any)=>{
        setEditOpen_timePicker((prev)=>!prev)
        setPopEditTimePickerAnchorEl(event.currentTarget)
        setCurrentRow(row)
        forceUpdate()
    }
    const handleSelect=(event: object, value: Array <string>)=>{
        console.log(event,value)
    }

    
    const valuetext=(event:any,value:any,index:any,type:string)=> {
        // console.log(value,index,type)
        let tempRowList = []
        let save = false
        // if(type!="distance"){
            if(rows){
                
                rows.forEach((r,i)=>{
                    if(i==index){
                        if(type!="distance"){
                            if(r.vw.item[type] != value)save = true
                            r.vw.item[type] = value
                        }else{
                            if(r.item != value)save = true
                            r[type].item = value
                        }
                    }
                
                tempRowList.push(r)
                })
            }
            // console.log('tempRowList',tempRowList)
            if(save){
                setRowsList(tempRowList)
                if(type=="distance"){
                    onDatachange("distance",value,rows[index])
                }else if(type=="volume"|| type=="weight"){
                    onDatachange(type,value,rows[index])
                }
            }
            
        // }else{

        // }
        // 
        return `${value}`;
      }

    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event:any) => {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const forceUpdate=()=>{
        setStates((prev:any)=>prev+1)
    }

    const goToPre=(event:any,index:any)=>{
        if(columns[index].currentLabel-1>=0){
            columns[index].currentLabel = columns[index].currentLabel-1
            columns[index].id =  columns[index].idList[columns[index].currentLabel]
            setColumnList(columns)
            forceUpdate()
        }   
        
        
    }
    const goToNext=(event:any,index:any)=>{
        if(columns[index].currentLabel+1<columns[index].label.length){
            columns[index].currentLabel = columns[index].currentLabel+1
            columns[index].id =  columns[index].idList[columns[index].currentLabel]
            setColumnList(columns)
            forceUpdate()
        }
        
    }

    const onDateTimeRangePickerChange=(item:any)=>{
        console.log(item);
        setTimeRange({ ...timeRange, ...item })
        setRange(item,timeRangeData)
        
      }
      const onTimeRangePickerChange=(event:any,id:string)=>{
          let temp = {from_time:timeRangeData.from_time,to_time:timeRangeData.to_time}
          temp[id] = event
        setTimeRangeData(temp)
        setRange(timeRange,temp)
      }

    const setRange=(dateData:any,timeData:any)=>{
        let dateTimeRange = `${dateData.selection.startDate.getFullYear()}-${dateData.selection.startDate.getMonth()+1}-${dateData.selection.startDate.getDate()} ${timeData.from_time.getHours()}:${timeData.from_time.getMinutes()}, ${dateData.selection.endDate.getFullYear()}-${dateData.selection.endDate.getMonth()+1}-${dateData.selection.endDate.getDate()} ${timeData.to_time.getHours()}:${timeData.to_time.getMinutes()}`
        onDatachange("dateTimeRange",dateTimeRange,currentRow)
    }

    const popperUp =(props:any,nodeData:Array<any>,prefix:string)=>{
        return nodeData.map((n,i)=>(
            n.children?
                <TreeItem key={`${prefix}${i}`} nodeId={`${prefix}${i}`} label={<div className={styles.checkedBox}><Checkbox checked={n.checked} color="primary" 
                    onChange={(ev)=>handleChange(ev,{prefix,i})} inputProps={{ 'aria-label': 'primary checkbox' }}/>
                    <div>{n.name}</div></div>}>
                
                    {popperUp(props,n.children,i.toString())}
                    
                
                </TreeItem>:
            <TreeItem key={`${prefix}${i}`} nodeId={`${prefix}${i}`} label={<div className={styles.checkedBox}><Checkbox checked={n.checked} color="primary" 
            onChange={(ev)=>handleChange(ev,{prefix,i})} inputProps={{ 'aria-label': 'primary checkbox' }}/>
            <div>{n.name}</div></div>}/>
          
            ))
            
        
    }
    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

  const handleDateChange = (date:any) => {
    setSelectedDate(date);
  };
  const onCheckBoxChanged = (ev:any,i:any,row:any) =>{
    props.handleCheckBoxChanged(ev,i,row)
    // console.log('props.handleCheckBoxChanged',props.handleCheckBoxChanged)
  }
    // const maxDate = moment(start).add(24, "hour")
    return(
        <div className={styles.dataGrid_container}>
             <TableContainer classes={{root:props.hide_x_overflow?styles.dataGrid_TableBody_hide_x:styles.dataGrid_TableBody}} className={styles.TableContainer}>
                <Table stickyHeader={!props.singlePage?false:true} aria-label="sticky table">
                    {/* stickyHeader */}
                    <TableHead>
                        <TableRow >
                            {columnList.map((column,index) => (
                                <TableCell
                                classes={{root:styles.tableCell_container}}
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                                padding={props.delivery?"checkbox":"default"}
                                >
                                   
                                    {/* <div> */}
                                    { column.label.length>1?
                                        (<div className={styles.header_Text_container}>
                                            {/* <div> */}
                                                <div>
                                                    {column.label[column.currentLabel-1]?
                                                    (<div className={styles.header_options}>
                                                        {t(column.label[column.currentLabel-1])}
                                                    </div>):[]
                                                    }
                                                    <div className={styles.header_Text}>
                                                        {t(column.label[column.currentLabel])}
                                                    </div>
                                                    {column.label[column.currentLabel+1]?
                                                    (<div className={styles.header_options}>
                                                        {t(column.label[column.currentLabel+1])}
                                                    </div>):[]
                                                    }
                                                </div>
                                            {/* </div> */}
                                            <div className={styles.header_Text_bt_container}>
                                                <div onClick={(ev)=>goToPre(ev,index)} className={styles.header_Text_bt}>
                                                    <img src='/img/Dashboard/preOption.svg'></img>
                                                </div>
                                                <div onClick={(ev)=>goToNext(ev,index)} className={styles.header_Text_bt}>
                                                    <img src='/img/Dashboard/nextOption.svg'></img>
                                                </div>
                                            </div>
                                         </div>):
                                        <div className={styles.header_Text}>
                                         {t(column.label[0])}
                                        </div>
                                    }
                                    {/* </div> */}
                               
                                </TableCell>))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                    {props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,i) => {
                        return (
                            <TableRow onClick={(ev) => {props.staffAction?props.staffAction(ev,row):[]}} classes={{root:styles.tableRow_root}} hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column,colIndex) => {
                                const value = row[column.id];
                                // console.log('value',value)
                                if(value){
                                    switch(value.type){
                                        case MAP:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_scope_group}>
                                                    <div className={styles.dataGrad_string_center_scope}>{value.item}</div>
                                                    {row.editable?<div className={styles.dataGrad_scope_bt}><Button onClick={(ev)=>props.onCusSeteditOpen(ev,row)} ><CenterFocusStrongIcon classes={{root:styles.scope_bt}}/></Button></div>:[]}
                                                </div>
                                               
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case ES:
                                        case "rs":
                                        case RATE:
                                            return(
                                                <TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                
                                                     <div className={styles.dataGrad_string_center}>
                                                     {value.type==RATE?'$':[]}<TextField disabled={!row.editable} type={value.type==ES?'text':"number"} onChange ={(ev)=>props.onEditValue(ev,column.id,row)} value={value.item} />
                                                     </div>
                                                </TableCell>
                                            );
                                        case SLIDER_SINGLE:
                                            return(
                                                <TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                    <div className={styles.slider_group}>
                                                        <div className={styles.slider_text}>{t("dashboard.acc.delivery.setDelivery.distance")} </div>
                                                        {row.editable?<Slider
                                                            valueLabelDisplay="off"
                                                            // defaultValue={props.volume}
                                                            value={Number(value.item)}
                                                            // getAriaValueText={(val)=>valuetext(val,i,"volume")}
                                                            onChange={(event,val)=>valuetext(event,val,i,"distance")}
                                                            aria-labelledby={`${i}distance`}
                                                            key={`${i}distance`}
                                                            step={1}
                                                            // marks
                                                            // onChange=
                                                            min={0}
                                                            max={100}
                                                        />:[]}
                                                        <div className={styles.slider_label}>
                                                            {value.item+"km"}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                            )
                                        case SLIDER:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_SLIDER}>
                                                    {/* {value.item.volume? */}
                                                    <div className={styles.slider_group}>
                                                        <div className={styles.slider_text}>{t("common.volume")} </div>
                                                        {row.editable?
                                                        <Slider
                                                            valueLabelDisplay="off"
                                                            // defaultValue={props.volume}
                                                            value={value.item.volume}
                                                            // getAriaValueText={(val)=>valuetext(val,i,"volume")}
                                                            onChange={(event,val)=>valuetext(event,val,i,"volume")}
                                                            aria-labelledby={`${i}_volume`}
                                                            key={`${i}_volume`}
                                                            step={0.1}
                                                            // marks
                                                            // onChange=
                                                            min={0}
                                                            max={props.volume}
                                                        />:[]}
                                                        <div className={styles.slider_label}>
                                                            {value.item.volume}
                                                        </div>
                                                    </div>
                                                    {/* :[]} */}
                                                    {/* {value.item.weight? */}
                                                    <div className={styles.slider_group}>
                                                        <div className={styles.slider_text}>{t("common.weight")} </div>
                                                        {row.editable?
                                                        <Slider
                                                            key={`${i}_weight`}
                                                            // defaultValue={props.weight}
                                                            value={value.item.weight}
                                                            onChange={(event,val)=>valuetext(event,val,i,"weight")}
                                                            aria-labelledby={`${i}_weight`}
                                                            valueLabelDisplay="off"
                                                            step={1}
                                                            // marks
                                                            min={0}
                                                            max={props.weight}
                                                        />:[]}
                                                        <div className={styles.slider_label}>
                                                            {value.item.weight}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* :[]} */}
                                                </div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)

                                        case SCOPE:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_scope_group}>
                                                    <div className={styles.dataGrad_string_center_scope}>{value.item}</div>
                                                    {row.editable?<div className={styles.dataGrad_scope_bt}><Button onClick={(ev)=>onSeteditOpen_2(ev,row)} ><CenterFocusStrongIcon classes={{root:styles.scope_bt}}/></Button></div>:[]}
                                                </div>
                                               
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case CUS_SCOPE:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_scope_group}>
                                                    <div className={styles.dataGrad_string_center_scope}>{value.item}</div>
                                                    {row.editable?<div className={styles.dataGrad_scope_bt}><Button onClick={(ev)=>props.onCusSeteditOpen(ev,row)} ><CenterFocusStrongIcon classes={{root:styles.scope_bt}}/></Button></div>:[]}
                                                </div>
                                               
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case DATERANGE:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_scope_group}>
                                                    <div className={styles.dataGrad_string_center_scope}>{value.item}</div>
                                                    {row.editable?<div className={styles.dataGrad_scope_bt}><Button onClick={(ev)=>onSeteditOpen_3(ev,row)} ><CenterFocusStrongIcon classes={{root:styles.scope_bt}}/></Button></div>:[]}
                                                </div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)

                                        case IMG:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_tableCell_img}><img src={value.item}></img></div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        default:
                                        case STRING:
                                            if(column.id == QUALIIFICATION || column.id == CERTIFICATE){
                                                return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                    
                                                    <a className={styles.a}>{t("dashboard.sal.View")}</a>
                                                </TableCell>)
                                            }
                                            else{
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                
                                                <div className={styles.dataGrad_string_center}>
                                                    {props.checkedLine&&colIndex==0?
                                                        <Checkbox
                                                            color="primary"
                                                            checked={value.checked}
                                                            onChange={(ev)=>onCheckBoxChanged(ev,i,row)}
                                                            // inputProps={{ checkbox: i }}
                                                            />:[]}
                                                    {value.item}
                                                </div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)}
                                        case GROUP_STRING:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_stringGroup_black}>{value.item}</div>
                                                <div className={styles.dataGrad_stringGroup_grey}>{value.des}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case NUM:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_stringGroup_black}>{value.item}</div>
                                                <div className={styles.dataGrad_stringGroup_grey}>{value.des}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case COLOR:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_color}>
                                                    {value.item.map((c:any,i:any)=>(
                                                         <div key={i} className={styles.color_img}> <img src={c}></img></div>
                                                    ))}
                                                   
                                                </div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case ITEM:
                                            // console.log("value.item",value.item)
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_string_center}>{value.item+value.type}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case PRICE:
                                            return(<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_string_center}>{"$"+value.item}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case RANKING:
                                            return(
                                                <TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_ranking}>{"NO "+value.item}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>
                                            )
                                        case STRING_VIEW:
                                            return(
                                                <TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_string_center}>{value.item}</div>
                                                <div  className={styles.dataGrad_string_view}>{t('dashboard.sal.View')}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>
                                            )
                                        case IMG_VIEW:
                                            return(
                                                <TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                    <div className={styles.dataGrad_tableCell_img_view_container}>
                                                        <div className={styles.dataGrad_tableCell_img}><img src={value.item}></img></div>
                                                        <div  className={styles.dataGrad_string_img_view}>{t('dashboard.sal.View')}</div>
                                                    </div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>
                                            )
                                    }
                                   
                                }
                                else{
                                    // console.log('column.id',column.id==STATUS)
                                    
                                    if(column.id==STATUS){
                                    return (<TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>

                                        <div className={styles.status_button_Group}>
                                            {row.msg?<div className={styles.msg_count}>{row.msg.item}</div>:[]}
                                            {!props.simpleMore?<Button classes={{root:styles.status_button}}>{t('dashboard.sal.Edit')}</Button>:[]}
                                            <div onClick={(ev)=>handleEdit(ev,row)} className={styles.status_button_more}><img src='/img/Dashboard/more.svg'></img></div>
                                        </div>
                                    </TableCell>) }
                                    if(column.id=="more"&&props.delivery){
                                        return(
                                            <TableCell classes={{root:styles.tableCell_container}} key={column.id} align={column.align}>
                                                <div  className={styles.status_button_more}>
                                                    <EditIcon  color="primary" classes={{root:styles.group_bt}} onClick={(ev)=>{handleAction(ev,"Edit",row)}}/>
                                                    <DeleteForeverIcon color="primary" classes={{root:styles.group_bt_DeleteForeverIcon}} onClick={(ev)=>{handleAction(ev,"Delete",row)}}/>
                                                    {i==props.rows.length-1? <AddCircleIcon classes={{root:styles.group_bt_add}} onClick={(ev)=>{handleAction(ev,"Add",row)}} color="primary"/>:[]}
                                                </div>
                                        </TableCell>)
                                    }
                                }
                                // return (
                                
                                // );onClick={(ev)=>handleEdit(ev,row)}
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {!props.singlePage?
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            :[]
            }
            <Popper className={styles.popper} open={editOpen} anchorEl={editMenuListAnchorEl} placement="bottom-end" transition>
                    <div  className={styles.popper_content_more}>
                        <MenuItem key={"Add"} onClick={(ev)=>{handleAction(ev,"Add")}} classes={{root:styles.sales_opt}} value="Add">{ t("dashboard.acc.productSche.Add")}</MenuItem>
                        <MenuItem key={"Edit"} onClick={(ev)=>{handleAction(ev,"Edit")}} className={styles.sales_opt} value="Edit">{ t("dashboard.acc.productSche.Edit")}</MenuItem>
                        {props.delivery?<MenuItem key={"Save"} onClick={(ev)=>{handleAction(ev,"Save")}} className={styles.sales_opt} value="Edit">{ t("common.save")}</MenuItem>:<MenuItem key={"Hide"} onClick={(ev)=>{handleAction(ev,"Hide")}} className={styles.sales_opt} value="Hide">{ t("dashboard.acc.productSche.hideStatus")}</MenuItem>}
                        {/* {props.delivery?<MenuItem key={"Delete"} onClick={(ev)=>{handleAction(ev,"Delete")}} className={styles.sales_opt} value="Edit">{ t("dashboard.sal.Delete")}</MenuItem>:[]} */}
                    </div>
                </Popper>
            
                <Popper className={styles.popper} open={editOpen_2} anchorEl={popEditMenuListAnchorEl} placement="bottom-end" transition>
                    <div  className={styles.popper_content_tree}>
                    <TreeView

                        defaultCollapseIcon={<ExpandMoreIcon />}
                        defaultExpandIcon={<ChevronRightIcon />}
                        multiSelect
                        onNodeSelect={handleSelect}
                        // selected
                        >   
                        {props.treeData?
                            popperUp(props,currentRow.scope.treeList,"")
                            :[]
                        }
                    </TreeView>
                   
                    </div>
                </Popper>
                <Popper className={styles.popper} open={editOpen_timePicker} anchorEl={popEditTimePickerAnchorEl} placement="bottom-end" transition>
                    <div  className={styles.popper_content_DateTimeRangePicker}>
                    <div className={styles.timeRangePicker_container}>
                        {/* <TextField
                            id="from_time"
                            label="From"
                            type="time"
                            value={timeRangeData.from_time}
                            className={styles.timePicker_textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                            step: 300, // 5 min
                            }}
                            lang="en"
                            onChange={(ev)=>onTimeRangePickerChange(ev)}
                        /> */}
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardTimePicker
                            margin="normal"
                            id="from_time"
                            label="From"
                            value={timeRangeData.from_time}
                            onChange={(ev)=>onTimeRangePickerChange(ev,"from_time")}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                        <KeyboardTimePicker
                            margin="normal"
                            id="to_time"
                            label="To"
                            value={timeRangeData.to_time}
                            onChange={(ev)=>onTimeRangePickerChange(ev,"to_time")}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                        </MuiPickersUtilsProvider>
                        {/* <TextField
                            id="to_time"
                            label="To"
                            type="time"
                            value={timeRangeData.to_time}
                            className={styles.timePicker_textField}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            inputProps={{
                            step: 300, // 5 min
                            }}
                            onChange={(ev)=>onTimeRangePickerChange(ev)}
                        /> */}
                    </div>
                    <DateRangePicker
                     onChange={(item:any) => onDateTimeRangePickerChange(item) }
                     months={1}
                     minDate={addDays(new Date(), -300)}
                     maxDate={addDays(new Date(), 900)}
                     direction="vertical"
                     scroll={{ enabled: true }}
                     ranges={[timeRange.selection]}
                    />
                    </div>
                </Popper>
        </div>
    )

}

export default  React.memo(DataGrid, (prevProps, nextProps) => nextProps.rows !== prevProps.rows)