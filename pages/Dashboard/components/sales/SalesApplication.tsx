import * as React from 'react';
import {FormControl,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,MenuItem,Select} from '@material-ui/core';
import styles from './index.module.css';;


interface Props {
    t:(params: String) => String;
    // testFunction:() => void;

  }
  
  function SalesApplication(props: Props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSelectionChange = (event)=>{
        // setAge(event.target.value);
    }

    const status = ()=>{
        
        return(
            <FormControl classes={{root:styles.outlined}}>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleSelectionChange}
                >
                <MenuItem className={styles.sales_new} value={"NEW"}>{ t("dashboard.sal.NEW")}</MenuItem>
                <MenuItem  className={styles.sales_PASS} value={"PASS"}>{ t("dashboard.sal.PASS")}</MenuItem>
                <MenuItem className={styles.sales_Declined} value={"Declined"}>{ t("dashboard.sal.Declined")}</MenuItem>
                <MenuItem className={styles.sales_Pending} value={"Pending"}>{ t("dashboard.sal.Pending")}</MenuItem>
                </Select>
            </FormControl>
            // classes={{root:styles.outlined}}
        )
    }

    const {t} = props
    const columns = [
        { id: 'Date', label: t("dashboard.sal.Date"), minWidth: 110 , align: "center",},
        { id: 'Name', label: t("dashboard.sal.Name"), minWidth: 110, align: "center", },
        {
          id: 'Emailaddress',
          label: t("dashboard.sal.Emailaddress"),
          minWidth: 110,
          align: "center",
          format: (value) => value.toLocaleString('en-GB'),
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

      const setFilter=()=>{

      }

      const handleView=(col:string,name:string)=>{
          console.log("click View",name,col)
      }

      const createData=(Date:any, Name:string, Emailaddress:string, Qualifications:any,SpecialtyArea:any,Certificate:any,Status:any,more:any)=>{
        // const density = population / size;
        return { Date, Name, Emailaddress, Qualifications, SpecialtyArea, Certificate,Status,more};
      }
      
      const stateSelection=(
          <div></div>
      )

      const more=(
        <div className={styles.sales_table_more_icon}>
            <img src={"/img/Dashboard/more.svg"}></img>
        </div>
      )

      const rows = [
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
        createData('20/08/21', 'Tom', "xx@gmail.com", (<a onClick={handleView.bind(this,"Qualifications","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),"digital sale",(<a onClick={handleView.bind(this,"Certificate","Tom")} className={styles.a}>{t("dashboard.sal.View")}</a>),status(),more),
      ];
    return(
        <div className={styles.salesApplication_container}>
            <div className={styles.filter_container}>
                <div className={styles.filter_container_text}>{t("dashboard.sal.Filter")}</div>
                <div onClick={setFilter} className={styles.filter_container_img}><img src="/img/Dashboard/filter_more.svg"></img></div>
            </div>

            <div className={styles.salesApplication_table_container}>
                <TableContainer className={styles.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead >
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                            {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                <TableCell key={column.id} align={column.align}>
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