import * as React from 'react';
import styles from './index.module.css';
import DataGrid from '../../dataGrid';
import {Popper,MenuItem,Select,TextField} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export interface Props {
    t:(params: String) => String;
}

// const isDesktopOrLaptop = useMediaQuery({
//     query: '(max-width: 1440px)'
//   })

const initialState = {
    columns:[{ id: 'products', label: ['dashboard.acc.productSche.products'], minWidth: 100 },  
            { id: 'ProductName',idList:['FeatureProducts','ProductName','sku'], label: ["dashboard.acc.productSche.FeatureProducts","dashboard.acc.productSche.ProductName","dashboard.acc.productSche.sku"],currentLabel:1, minWidth: 100 },
            { id: 'Category', label: ["dashboard.acc.productSche.Category"], minWidth: 100 },
            { id: 'Price', label: ["dashboard.acc.productSche.Price"], minWidth: 100 },
            { id: 'Color', label: ["dashboard.acc.productSche.Color"], minWidth: 100 },
            { id: 'Sold', label: ["dashboard.acc.productSche.Sold"], minWidth: 100 },
            { id: 'Status', label:["dashboard.acc.productSche.Status"], minWidth: 100 }],
    rows:[
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
        {products:{item:"/img/Dashboard/product_test.svg",type:"img"},
        sku:{item:"sku",type:"string"},
        FeatureProducts:{item:"Feature Products",type:"string"},
        ProductName:{item:"5500 Onboard Diagnostic",
        des:"Onboard Diagnostic Voltmeter Onboard",type:"group_string"},
        Category:{item:"Onboard",type:"string"},
        Price:{item:470,type:"price"},
        Color:{item:["/img/Dashboard/blue.svg","/img/Dashboard/black.svg","/img/Dashboard/orange.svg"],type:"color"},
        Sold:{item:120,type:"item"}
        },
    ],
    editMenuListAnchorEl:null,
    editOpen:false,
    anchorEl:null,
    open:false,
    filterList:[{column:"products",ope:"Contains",val:"",logicOpe:"and"}]
}


type State = {
    columns:Array<any>,
    rows:Array<any>,
    editMenuListAnchorEl:any,
    editOpen:boolean,
    anchorEl:any,
    open:boolean,
    filterList:any
}

class ProductScheme extends React.Component<Props, object> {

    state= initialState
    
    private handleEdit=(event:any,row:any)=>{
        this.setState({editMenuListAnchorEl:event.currentTarget,
            editOpen:!this.state.editOpen})
    }
    private handleAction=(event: any,ope:any) =>{
        this.setState({
            editOpen:!this.state.editOpen})
    }
    private handleFilter = (event:any) =>{
        // console.log("event",event)
        this.setState({anchorEl:event.currentTarget,
            open:!this.state.open});
        // setOpen((prev) => !prev);
    }

    private handleChangeFilterCol = (event:any,ind:any) =>{

    }

    private handleChangeFilterOpe = (event:any,ind:any) =>{

    }
    private getValue = (event:any,ind:any) =>{

    }
    private handleChangeFilterLogicOpe = (event:any,ind:any) =>{

    }

    private handAddCondition=()=>{
        const newfilter = {column:"Date",ope:"Contains",val:"",logicOpe:"and"}
        let temfilterList = this.state.filterList
        temfilterList.push(newfilter)
        this.setState({filterList:temfilterList})
        // setFilterList(temfilterList)
        // forceUpdate()
        // console.log('filterList',filterList)
    }

    render(){
        const {t} = this.props
        return (
            <div className={styles.productScheme_container}>
                <div  className={styles.filter_container}>
                <div onClick={this.handleFilter} className={styles.filter_container_text}>{t("dashboard.sal.Filter")}</div>
                <div onClick={this.handleFilter} className={styles.filter_container_img}><img src="/img/Dashboard/filter_more.svg"></img></div>

            </div>
            <Popper className={styles.popper} open={this.state.open} anchorEl={this.state.anchorEl} placement="bottom-start" transition>
                <div className={styles.popper_content_container}>
                    {this.state.filterList.map((filter,ind)=>(

                    <div key={ind}>
                        <div  className={styles.popper_content_line}>
                        <MenuItem >
                            <Select
                            value={filter.column}
                            onChange={(ev)=>this.handleChangeFilterCol(ev,ind)}
                            >
                            <MenuItem value="Date">{t("dashboard.sal.Date")} </MenuItem>
                            <MenuItem value="Name">{t("dashboard.sal.Name")} </MenuItem>
                            <MenuItem value="Emailaddress">{t("dashboard.sal.Emailaddress")} </MenuItem>
                            <MenuItem value="SpecialtyArea">{t("dashboard.sal.SpecialtyArea")} </MenuItem>
                            {/* <MenuItem value="Status">{t("dashboard.sal.Status")} </MenuItem> */}
                            </Select>
                        </MenuItem>
                        <MenuItem >
                            <Select
                                value={filter.ope}
                                onChange={(ev)=>this.handleChangeFilterOpe(ev,ind)}
                                >

                            <MenuItem value="Contains">{t("dashboard.sal.Contains")}</MenuItem>
                            <MenuItem value="Equals">{t("dashboard.sal.Equals")}</MenuItem>
                            </Select>
                        </MenuItem>
                        <MenuItem >
                            <TextField onChange={(ev)=>this.getValue(ev,ind)} value={filter.val} id="value" />
                        </MenuItem>
                        </div>
                        <div className={styles.popper_content_line}>
                            <MenuItem >
                                <Select
                                    value={filter.logicOpe}
                                    onChange={(ev)=>this.handleChangeFilterLogicOpe(ev,ind)}
                                    >
                                    <MenuItem value="and">{t("dashboard.sal.and")}</MenuItem>
                                    <MenuItem value="or">{t("dashboard.sal.or")}</MenuItem>
                                </Select>
                            </MenuItem>
                            <MenuItem>
                                <AddCircleIcon onClick={this.handAddCondition} classes={{root:styles.icon_root}} color="primary"/>
                            </MenuItem>
                        </div>
                    </div>))}
                </div>
            </Popper>
                <div className={styles.productScheme_dataGrid_container}>
                    <DataGrid
                        t={t}
                        columns={this.state.columns}
                        rows={this.state.rows}
                        handleEdit={this.handleEdit}
                        handleAction={this.handleAction}
                        editMenuListAnchorEl={this.state.editMenuListAnchorEl}
                        editOpen={this.state.editOpen}
                    />
                </div>
            </div>
        )
    }
}

export default ProductScheme
 