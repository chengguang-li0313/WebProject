import * as React from 'react';
import styles from './index.module.css';
import DataGrid from '../../dataGrid';

export interface Props {
    t:(params: String) => String;
}

// const isDesktopOrLaptop = useMediaQuery({
//     query: '(max-width: 1440px)'
//   })

const initialState = {
    columns:[{ id: 'StaffProfile',currentLabel:1,idList:['Staff(NEW)','StaffProfile'], label: ['dashboard.acc.sale.Staff(NEW)','dashboard.acc.sale.StaffProfile'], minWidth: 100 },  
    { id: 'MostsaleProduct', label: ["dashboard.acc.sale.MostsaleProduct"],minWidth: 100 },
    { id: 'Ranking', label: ["dashboard.acc.sale.Ranking"], minWidth: 100 },
    { id: 'YearlyCommisiion',currentLabel:1,idList:['YearlyCommisiion','MonthlyCommisiion'],  label: ["dashboard.acc.sale.YearlyCommisiion","dashboard.acc.sale.MonthlyCommisiion"], minWidth: 100 },
    { id: 'Customer', label: ["dashboard.acc.sale.Customer"], minWidth: 100 },
    { id: 'Products_sale',currentLabel:1,idList:['Products_sale','TotalsolditemMonthly','Products_New'], label: ["dashboard.acc.sale.Products_sale","dashboard.acc.sale.TotalsolditemMonthly","dashboard.acc.sale.Products_New"], minWidth: 100 },
    { id: 'Status', label:["dashboard.acc.productSche.Status"], minWidth: 100 }],
    editMenuListAnchorEl:null  ,
    editOpen:false ,
    rows:[
        {StaffProfile:{item:"/img/Dashboard/staff_test.svg",type:"img_view",view:true},
        'Staff(NEW)':{item:"Staff(NEW)",type:"string"},
        MostsaleProduct:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Ranking:{item:1,type:"ranking"},
        YearlyCommisiion:{item:125750,type:"price"},
        MonthlyCommisiion:{item:25750,type:"price"},
        Customer:{item:"Tom, Jim ,jenny",type:"string_view"},
        Products_sale:{item:120,type:"item"},
        TotalsolditemMonthly:{item:20,type:"item"},
        Products_New:{item:12,type:"item"}
        }
    ]
}
// Tom, Jim ,jenny 
type State = {
    columns:Array<any>,
    editMenuListAnchorEl:any,
    editOpen:boolean
}

class Sales extends React.Component<Props, object> {

    state = initialState
    private handleEdit=(event:any,row:any)=>{
        this.setState({editMenuListAnchorEl:event.currentTarget,
            editOpen:!this.state.editOpen})
    }
    private handleAction=(event: any,ope:any) =>{
        this.setState({
            editOpen:!this.state.editOpen})
    }

    render(){
        const {t} = this.props
        return (
            <div className={styles.sales_container}>
                <div className={styles.sales_dataGrid_container}>
                    <DataGrid
                        t={t}
                        columns={this.state.columns}
                        handleEdit={this.handleEdit}
                        handleAction={this.handleAction}
                        editMenuListAnchorEl={this.state.editMenuListAnchorEl}
                        editOpen={this.state.editOpen}
                        rows={this.state.rows}
                    />
                </div>
            </div>
        )
    }
}

export default Sales