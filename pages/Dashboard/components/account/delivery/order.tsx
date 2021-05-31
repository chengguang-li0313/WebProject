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
import {SalesData} from '../../../../../public/fakeData'

interface Props {
    t:(params: String) => String;
    // open:boolean;
    // handleClose:() => void;
    // dialogName:String;
    
  }
  
  function Order(props: Props){
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
            
            {/* {rows.length>0? */}
            <DataGrid
                t={t}
                columns={customerOrientatedColumn}
                rows={rows}
                singlePage={true}
                // onEditDialog={this.onEditDialog}
            />
            {/* :[]} */}
        </div>
    )
}

export default Order
