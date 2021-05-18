import * as React from 'react';
import styles from './index.module.css';
import {Divider,FormControlLabel,Grid,Button,
    Table,TableBody,TableCell,TableContainer,
    TablePagination,TableRow,TableHead,Popper,MenuItem} from '@material-ui/core';

interface Props {
    t:(params: String) => String;
    columns:Array<any>;
    rows?:Array<any>;
    handleEdit:(event: any,row:any) => void;
    handleAction:(event: any,ope:any) => void;
    editMenuListAnchorEl:any,
    editOpen:boolean

}
// {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
// FeatureProducts:{item:"Feature Products",type:"string"},
// ProductName:{item:"5500 Onboard Diagnostic",
// des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
// Category:{item:"Onboard",type:"string"},
// Price:{item:470,type:"Price"},
// Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
// Sold:{item:120,tyle:"item"}
// },

function DataGrid(props: Props) {
    const {t,columns,rows,handleEdit,handleAction,editMenuListAnchorEl,editOpen=false} = props

    const [columnList, setColumnList] = React.useState(columns);
    const [states, setStates] = React.useState(0);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowsList, setRowsList] = React.useState(rows);
    // const [editOpen, setEditOpen] = React.useState(false);
    // const [editMenuListAnchorEl,setEditMenuListAnchorEl] = React.useState(null);

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

    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event:any) => {
        setRowsPerPage(+event.target.value);
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

    
    return(
        <div className={styles.dataGrid_container}>
             <TableContainer className={styles.TableContainer}>
                <Table aria-label="sticky table">
                    {/* stickyHeader */}
                    <TableHead>
                        <TableRow >
                            {columnList.map((column,index) => (
                                <TableCell
                                classes={{root:styles.tableCell_container}}
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
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
                    <TableBody>
                    {rowsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow classes={{root:styles.tableRow_root}} hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                // console.log('value.item',value)
                                if(value){
                                    switch( value.type){
                                        case IMG:
                                            return(<TableCell key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_tableCell_img}><img src={value.item}></img></div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case STRING:
                                            return(<TableCell key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_string_center}>{value.item}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case GROUP_STRING:
                                            return(<TableCell key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_stringGroup_black}>{value.item}</div>
                                                <div className={styles.dataGrad_stringGroup_grey}>{value.des}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case NUM:
                                            return(<TableCell key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_stringGroup_black}>{value.item}</div>
                                                <div className={styles.dataGrad_stringGroup_grey}>{value.des}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case COLOR:
                                            return(<TableCell key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_color}>
                                                    {value.item.map((c:any,i:any)=>(
                                                         <div key={i} className={styles.color_img}> <img src={c}></img></div>
                                                    ))}
                                                   
                                                </div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case ITEM:
                                            // console.log("value.item",value.item)
                                            return(<TableCell key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_string_center}>{value.item+value.type}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case PRICE:
                                            return(<TableCell key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_string_center}>{"$"+value.item}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>)
                                        case RANKING:
                                            return(
                                                <TableCell key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_ranking}>{"NO "+value.item}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>
                                            )
                                        case STRING_VIEW:
                                            return(
                                                <TableCell key={column.id} align={column.align}>
                                                <div className={styles.dataGrad_string_center}>{value.item}</div>
                                                <div  className={styles.dataGrad_string_view}>{t('dashboard.sal.View')}</div>
                                                {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                                            </TableCell>
                                            )
                                        case IMG_VIEW:
                                            return(
                                                <TableCell key={column.id} align={column.align}>
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
                                    return (<TableCell key={column.id} align={column.align}>
                                        <div className={styles.status_button_Group}>
                                            <Button classes={{root:styles.status_button}}>{t('dashboard.sal.Edit')}</Button>
                                            <div onClick={(ev)=>handleEdit(ev,row)} className={styles.status_button_more}><img src='/img/Dashboard/more.svg'></img></div>
                                        </div>
                                    </TableCell>) }
                                }
                                // return (
                                
                                // );
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            <Popper className={styles.popper} open={editOpen} anchorEl={editMenuListAnchorEl} placement="bottom-end" transition>
                    <div  className={styles.popper_content_more}>
                        <MenuItem onClick={(ev)=>{handleAction(ev,"Edit")}} classes={{root:styles.sales_opt}} value="Edit">{ t("dashboard.acc.productSche.Add")}</MenuItem>
                        <MenuItem onClick={(ev)=>{handleAction(ev,"Delete")}} className={styles.sales_opt} value="Delete">{ t("dashboard.acc.productSche.Edit")}</MenuItem>
                        <MenuItem onClick={(ev)=>{handleAction(ev,"Hide")}} className={styles.sales_opt} value="Hide">{ t("dashboard.acc.productSche.hideStatus")}</MenuItem>
                    </div>
                </Popper>
        </div>
    )

}

export default DataGrid