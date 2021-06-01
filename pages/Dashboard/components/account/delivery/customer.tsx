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
import {SalesData,customerList} from '../../../../../public/fakeData'

interface Props {
    t:(params: String) => String;
    // open:boolean;
    // handleClose:() => void;
    // dialogName:String;
    
  }
  
  function Customer(props: Props){
    const {t} = props

    
  const customerOrientatedColumn =  [
      { id: 'StaffProfile',currentLabel:1,idList:['Staff(NEW)','StaffProfile'], label: ['dashboard.acc.sale.Staff(NEW)','dashboard.acc.sale.StaffProfile'], minWidth: 100 },  
  { id: 'MostsaleProduct', label: ["dashboard.acc.sale.MostsaleProduct"],minWidth: 100 },
  { id: 'Ranking', label: ["dashboard.acc.sale.Ranking"], minWidth: 100 },
  { id: 'YearlyCommisiion',currentLabel:1,idList:['YearlyCommisiion','MonthlyCommisiion'],  label: ["dashboard.acc.sale.YearlyCommisiion","dashboard.acc.sale.MonthlyCommisiion"], minWidth: 100 },
  { id: 'Customer', label: ["dashboard.acc.sale.Customer"], minWidth: 100 },
  { id: 'Products_sale',currentLabel:1,idList:['Products_sale','TotalsolditemMonthly','Products_New'], label: ["dashboard.acc.sale.Products_sale","dashboard.acc.sale.TotalsolditemMonthly","dashboard.acc.sale.Products_New"], minWidth: 100 }]

  const createData = (product:any)=>{
    let rows = []
    product.forEach((element:any,index:any) => {
        element.StaffProfile = {item:element.StaffProfile,type:"img" }
        element['Staff(NEW)'] = {item:element['Staff(NEW)'],type:"string" }
        element.MostsaleProduct = {item:element.MostsaleProduct,type:"group_string" ,des:element.des}
        element.Ranking = {item:element.Ranking,type:"ranking"}
        element.YearlyCommisiion = {item:element.YearlyCommisiion,type:"price"}
        element.MonthlyCommisiion = {item:element.MonthlyCommisiion,type:"price"}
        element.Customer={item:element.Customer,type:"string"}
        element.Products_sale={item:element.Products_sale,type:"item"}
        element.TotalsolditemMonthly={item:element.TotalsolditemMonthly,type:"item"}
        element.Products_New={item:element.Products_New,type:"item"}
        rows.push(element)
    });
    // console.log
    return rows
}

const [rows, setRows] = React.useState([]);
const [value, setValue] = React.useState('female');
const [anchorEl, setAnchorEl] = React.useState(null);
const [expandOpen, setExpandOpen] = React.useState(false);
const [customers, setCustomers] = React.useState(customerList);

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

    return(
        <div className={styles.customer_container}>
            <div className={styles.selectCustomer_container}>
                <Button onClick={handleClick} classes={{root:styles.setSelect_bt}}>{t('dashboard.acc.delivery.setDelivery.selectCustomer')}</Button>
                <div className={styles.selectCustomer_radio_container}>
                    <RadioGroup row aria-label="selectCustomer_radio_container" name="selectCustomer_radio_container" value={value} onChange={handleChange}>
                        <FormControlLabel value="business" control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>} label={t("dashboard.acc.delivery.setDelivery.businessCustomer")} />
                        <FormControlLabel value="consumer" control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>} label={t("dashboard.acc.delivery.setDelivery.consumerCustomer")} />
                        <FormControlLabel value="both" control={<Radio classes={{colorPrimary:styles.radio_color}} color="primary"/>} label={t("dashboard.acc.delivery.setDelivery.both")} />
                    </RadioGroup>
                </div>  
            </div>
            <Popper className={styles.poppers} placement="bottom-start" id={id} open={open} anchorEl={anchorEl}>
                <div className={styles.customer_poppers_content}>
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    // subheader={
                    //     <ListSubheader component="div" id="nested-list-subheader">
                    //     Nested List Items
                    //     </ListSubheader>
                    // }
                    className={styles.root}
                    >
                        {customers.map((c,index)=>(
                            <div>
                            <ListItem button onClick={handleexpandOpenClick}>
                                {/* <ListItemIcon>
                                <InboxIcon />
                                </ListItemIcon> */}
                                
                                <ListItemText primary={c.name} />
                                {expandOpen ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={expandOpen} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                <ListItem button className={styles.nested}>
                                    {/* <ListItemIcon>
                                    <StarBorder />
                                    </ListItemIcon> */}
                                    <ListItemText primary="Starred" />
                                </ListItem>
                                <ListItem button className={styles.nested}>
                                    {/* <ListItemIcon>
                                    <StarBorder />
                                    </ListItemIcon> */}
                                    <ListItemText primary="Starred2" />
                                </ListItem>
                                </List>
                            </Collapse>
                            </div>
                        ))}
                    
                </List>
                </div>
            </Popper>
            {rows.length>0?
            <DataGrid
                t={t}
                columns={customerOrientatedColumn}
                rows={rows}
                singlePage={true}
                // onEditDialog={this.onEditDialog}
            />:[]}
        </div>
    )
}

export default Customer
