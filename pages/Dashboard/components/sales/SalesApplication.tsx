import * as React from 'react';
import {Tooltip,Chip,FormControl,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,MenuItem,Select,Popper,TextField} from '@material-ui/core';
import styles from './index.module.css';
// import { AppendKeys } from 'react-i18next';
// import AddIcon from '@material-ui/icons/Add';

interface Props {
    t:(params: String) => String;
    // testFunction:() => void;

  }
  
  function SalesApplication(props: Props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [column, setColumn] = React.useState("Name"); 
    const [ope, setOpe]= React.useState("Contains"); 
    const [val,setVal] = React.useState(""); 
    // const [value,setValue] = React.useState(""); 
    // const [tagList, setTagList] = React.useState(["test"]); 
    // const [valList, setFiltersList] = React.useState(["test"]); 

    const {t} = props

    const handleChangePage = (event:any, newPage:any) => {
        console.log("page")
        setPage(newPage);
        // setOpen((prev) => !prev);
    };

    const handleChangeRowsPerPage = (event:any)=> {
        setRowsPerPage(event.target.value);
        setPage(0);
    };

    const handleSelectionChange =(event: React.ChangeEvent<{ value: string }>) =>{
        console.log('event.target.value',event.target.value)
        // setValue(event.target.value);
        // console.log("svalue",svalue)
    }

    const handleFilter = (event:any) =>{
        // console.log("event",event)
        setAnchorEl(event.currentTarget);
        setOpen((prev) => !prev);

    }
    const handleClose = () => {
        setOpen((prev) => false);
      };

    
    const status = (
            <FormControl classes={{root:styles.outlined}}>
                <Select
                // labelId="status-label"
                // id="status"
                // value={value}
                onChange={handleSelectionChange}
                >
                    <MenuItem className={styles.sales_opt} value={""}></MenuItem>
                    <MenuItem className={styles.sales_new} value="NEW">{ t("dashboard.sal.NEW")}</MenuItem>
                    <MenuItem className={styles.sales_PASS} value="PASS">{ t("dashboard.sal.PASS")}</MenuItem>
                    <MenuItem className={styles.sales_Declined} value="Declined">{ t("dashboard.sal.Declined")}</MenuItem>
                    <MenuItem className={styles.sales_Pending} value="Pending">{ t("dashboard.sal.Pending")}</MenuItem>
                </Select>
            </FormControl>
            // classes={{root:styles.outlined}}
        )
    

    

    const columns = [
        { id: 'Date', label: t("dashboard.sal.Date"), minWidth: 110 , align: "center",},
        { id: 'Name', label: t("dashboard.sal.Name"), minWidth: 110, align: "center", },
        {
          id: 'Emailaddress',
          label: t("dashboard.sal.Emailaddress"),
          minWidth: 110,
          align: "center",
          format: (value:any) => value.toLocaleString('en-GB'),
        },
        {
          id: 'Qualifications',
          label: t("dashboard.sal.Qualifications"),
          minWidth: 110,
          align: "center",
        //   format: (value) => value.toLocaleString('en-US'),'Size\u00a0(km\u00b2)'
        },
        {
          id: 'SpecialtyArea',
          label: t("dashboard.sal.SpecialtyArea"),
          minWidth: 110,
          align: "center",
        //   align: 'right',
        //   format: (value) => value.toFixed(2),
        },
        {
            id: 'Certificate',
            label: t("dashboard.sal.Certificate"),
            minWidth: 110,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
          {
            id: 'Status',
            label: t("dashboard.sal.Status"),
            minWidth: 110,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
          {
            id: 'more',
            label: "",
            minWidth: 10,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
      ];

      

      const setRow=()=>{

      }

      const handleView=(col:string,name:string)=>{
          console.log("click View",name,col)
      }

      const createData=(Date:any, Name:string, Emailaddress:string, Qualifications:any,SpecialtyArea:any,Certificate:any,Status:any,more:any)=>{
        // const density = population / size;
     
        return { Date, Name, Emailaddress, Qualifications, SpecialtyArea, Certificate,Status,more};
      }
      
    //   const stateSelection=(
    //       <div></div>
    //   )

      const more=()=>{return(
        <div className={styles.sales_table_more_icon}>
            <img src={"/img/Dashboard/more.svg"}></img>
        </div>
      )}

      const setView =(col:any,row:any)=>{
          return (<a onClick={handleView.bind(this,col,row)} className={styles.a}>{t("dashboard.sal.View")}</a>)
      }

      const rows = [
        createData('20/08/21','Tom', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/08/21','Jerry', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/05/21','Richard', "xx@gmail.com",setView("Qualifications","Richard"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/02/21','David', "xx@gmail.com",setView("Qualifications","David"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/08/21','Tom', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/08/21','Jerry', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/05/21','Richard', "xx@gmail.com",setView("Qualifications","Richard"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/02/21','David', "xx@gmail.com",setView("Qualifications","David"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/08/21','Tom', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/08/21','Jerry', "xx@gmail.com",setView("Qualifications","Tom"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/05/21','Richard', "xx@gmail.com",setView("Qualifications","Richard"),"digital sale",setView("Certificate","Tom"),status,more()),
        createData('20/02/21','David', "xx@gmail.com",setView("Qualifications","David"),"digital sale",setView("Certificate","Tom"),status,more()),
        
      ]
  

    const [filterData,setFilterData] = React.useState(rows); 

    const handleSetFilter = (val:any,ope:any,column:any)=>{
        var filRow=[]
        // console.log(val,ope,column)
        if(val&&ope&&column){
            rows.forEach((row,ind)=>{
                switch(ope){
                    case "Contains":
                        if(row[column].includes(val)) filRow.push(row)
                        break;
                    case "Equals":
                        if(row[column]==val) filRow.push(row)
                        break;
                }
                
            })
        }else{
            filRow = rows
        }
        setFilterData(filRow)
    }

    const getValue=(event:any)=>{

        setVal(event.target.value)
        handleSetFilter(event.target.value,ope,column)
        // console.log(val,ope,column)
        
    }

    const handleChangeFilterOpe=(event:any)=>{
        console.log("event.target.value",event.target.value)
        setOpe(event.target.value)
        handleSetFilter(val,event.target.value,column)
    }

    const handleChangeFilterCol=(event: any)=>{
        
        setColumn(event.target.value)
        handleSetFilter(val,ope,event.target.value)
    }

    return(
        <div className={styles.salesApplication_container}>

            <div  className={styles.filter_container}>
                <div onClick={handleFilter} className={styles.filter_container_text}>{t("dashboard.sal.Filter")}</div>
                <div onClick={handleFilter} className={styles.filter_container_img}><img src="/img/Dashboard/filter_more.svg"></img></div>
                
               {/* {tagList.map((tag,index) => 
                   (<Chip key={index} label={tag} onDelete={handleDelete.bind(this,tag)}/>)
               )} */}
            </div>
            <Popper className={styles.popper} open={open} anchorEl={anchorEl} placement="bottom-start" transition>
                <div  className={styles.popper_content}>
                <MenuItem >
                    <Select
                    value={column}
                    onChange={handleChangeFilterCol}
                    >
                       {/* { filterList.map((ele:any,index:Number)=>{
                           <MenuItem key={ele.id} value={ele.id}>{ele.value}</MenuItem>
                       })} */}
                       <MenuItem value="Date">{t("dashboard.sal.Date")} </MenuItem>
                       <MenuItem value="Name">{t("dashboard.sal.Name")} </MenuItem>
                       <MenuItem value="Emailaddress">{t("dashboard.sal.Emailaddress")} </MenuItem>
                       <MenuItem value="SpecialtyArea">{t("dashboard.sal.SpecialtyArea")} </MenuItem>
                       {/* <MenuItem value="Status">{t("dashboard.sal.Status")} </MenuItem> */}
                    </Select>
                </MenuItem>
                <MenuItem >
                    <Select
                        value={ope}
                        onChange={handleChangeFilterOpe}
                        >
                       {/* { filterList.map((ele:any,index:Number)=>{
                           <MenuItem key={ele.id} value={ele.id}>{ele.value}</MenuItem>
                       })} */}
                       <MenuItem value="Contains">{t("dashboard.sal.Contains")}</MenuItem>
                       <MenuItem value="Equals">{t("dashboard.sal.Equals")}</MenuItem>
                    </Select>
                </MenuItem>
                <MenuItem >
                    <TextField onChange={getValue} value={val} id="value" />
                </MenuItem>
                {/* <div className={styles.addMoreFilter}>
                    <Tooltip title="Add more conditions" aria-label="add">
                        <AddIcon />
                    </Tooltip>
                </div> */}
                </div>
            </Popper>

            <div onClick={handleClose} className={styles.salesApplication_table_container}>
            
                <TableContainer classes={{root:styles.sales_MuiTableContainer_root}} className={styles.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            // align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    //  align={column.align}
                                <TableCell key={column.id}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                </TableCell>
                                );
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
            </div>
        </div>
    )
}

export default SalesApplication


// {/* <div style={{ height: 400, width: '100%' }}> */}
// <DataGrid
// {...data}
// filterModel={riceFilterModel}
// components={{
// Toolbar: GridToolbar,
// }}
// />
// {/* </div> */}