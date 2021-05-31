import * as React from 'react';
import styles from './index.module.css';
// import EditDialog from '../sales/EditDialog';
import DataGrid from '../dataGrid'
import {Grid,Divider} from '@material-ui/core';
import DataFilter from '../dataFilter';
import {salesApplicationDataList,salesApplicationDetail} from '../../../../public/fakeData'
import DetailBoard from './detailBoard'
// import { color } from 'echarts';

interface Props {
    t:(params: String) => String;
    downloadOnly:boolean
  }
  
  function SalesApplication(props: Props) {
    const {t} = props

    const [isCollapsed ,setIsCollapsed]= React.useState(true)
    const [detailData, setDetailData] = React.useState(salesApplicationDetail)
    const [states, setStates] = React.useState(0);
    const [filterList,setFilterList] = React.useState([{column:"Staff(NEW)",ope:"Contains",val:"",logicOpe:"and"}]);
    const [currentItemId,setCurrentItemId] = React.useState(0);
    const [filteredItem,setFilteredItem] = React.useState([{value:"Staff(NEW)",label:"dashboard.acc.sale.Staff(NEW)"},
    {value:"MostsaleProduct",label:"dashboard.acc.sale.MostsaleProduct"},
    {value:"Ranking",label:"dashboard.acc.sale.Ranking"}]);
    // filterList:[{column:"Staff(NEW)",ope:"Contains",val:"",logicOpe:"and"}],
    // filteredItem:
    
    const forceUpdate=()=>{
        setStates((prev:any)=>prev+1)
    }

    const handleChangeFilterCol = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].column = event.target.value
        setFilterList(tempList)
    }

    const handleChangeFilterOpe = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].ope = event.target.value
        setFilterList(tempList)
    }
    const getValue = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].val = event.target.value
        setFilterList(tempList)
    }

    const handleChangeFilterLogicOpe = (event:any,ind:any) =>{
        let tempList = this.state.filterList
        tempList[ind].logicOpe = event.target.value
        setFilterList(tempList)
    }

    const handAddCondition=()=>{
        const newfilter = {column:"products",ope:"Contains",val:"",logicOpe:"and"}
        let temfilterList = this.state.filterList
        temfilterList.push(newfilter)
        setFilterList(temfilterList)
    }

    const co2=[
        { id: 'Date', label: ["dashboard.sal.Date"], minWidth: 110 , align: "center"},
        { id: 'Name', label:[ "dashboard.sal.Name"], minWidth: 110, align: "center"},
        {
          id: 'Emailaddress',
          label: ["dashboard.sal.Emailaddress"],
          minWidth: 110,
          align: "center",
          format: (value:any) => value.toLocaleString('en-GB')
        }
    ]

    const col = [
        { id: 'Date', label: ["dashboard.sal.Date"], minWidth: 110 , align: "center",},
        { id: 'Name', label:[ "dashboard.sal.Name"], minWidth: 110, align: "center", },
        {
          id: 'Emailaddress',
          label: ["dashboard.sal.Emailaddress"],
          minWidth: 110,
          align: "center",
          format: (value:any) => value.toLocaleString('en-GB'),
        }
        ,
        {
          id: 'Qualifications',
          label: ["dashboard.sal.Qualifications"],
          minWidth: 110,
          align: "center",
        //   format: (value) => value.toLocaleString('en-US'),'Size\u00a0(km\u00b2)'
        },
        {
          id: 'SpecialtyArea',
          label: ["dashboard.sal.SpecialtyArea"],
          minWidth: 110,
          align: "center",
        //   align: 'right',
        //   format: (value) => value.toFixed(2),
        },
        {
            id: 'Certificate',
            label: ["dashboard.sal.Certificate"],
            minWidth: 110,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
          {
            id: 'Status',
            label: ["dashboard.sal.Status"],
            minWidth: 110,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
          {
            id: 'more',
            label: [""],
            minWidth: 10,
            align: "center",
          //   align: 'right',
          //   format: (value) => value.toFixed(2),
          },
      ]
      const [columns,setColumns] = React.useState(col)
    //   const [col2,setCol2] = React.useState(co2)
    
    const [rows, setRows] = React.useState(salesApplicationDataList)

      const setStatus=(result:any)=>{
        // let tempRow = rows[currentItemId]
        // tempRow.Status = result
        // setRows()
        console.log("result",result)
      }

    const onSetisCollapsed=()=>{
        // setColumns(col)
        setIsCollapsed(true)
    }
    const handleEdit=(event:any,row:any)=>{
        // this.setState({editMenuListAnchorEl:event.currentTarget,
        //     editOpen:!this.state.editOpen,
        //     currentEditRow:row})
    }
    const handleAction=(event: any,ope:any) =>{
        switch(ope){
            case ope.EDIT:
                // this.setState({dialogOpen:true})
                break;
            case ope.ADD:
                // this.setState({dialogOpen:true,currentEditRow:null})
                break;
            case ope.HIDE:
                break;
        }
            
    }
    const staffAction =(event: any,row:any)=>{
        // console.log("row",row)
        setCurrentItemId(row.id)
        setIsCollapsed(false)
        forceUpdate()
    }
    return(
        <div className={styles.salesApplication_container}>
        <div className={styles.sales_container}>
                <DataFilter
                    t={t}
                    filterList={filterList}
                    handleChangeFilterCol={handleChangeFilterCol}
                    handleChangeFilterOpe={handleChangeFilterOpe}
                    getValue={getValue}
                    handleChangeFilterLogicOpe={handleChangeFilterLogicOpe}
                    handAddCondition={handAddCondition}
                    filteredItem={filteredItem}
                />
            </div>
        <div className={styles.staff_salesApplication_container}>

        

            {/* <div className={styles.staff_tag_container}> */}
            <div className={!isCollapsed?styles.staff_datagrid_container:styles.staff_datagrid_open}>
                <div className={!isCollapsed?styles.staff_datagrid:styles.staff_datagrid_open}>
                {/* {isCollapsed? */}
                    <DataGrid
                    t={t}
                    columns={columns}
                    rows={rows}
                    handleEdit={handleEdit}
                    handleAction={handleAction}
                    simpleMore={true}
                    staffAction={staffAction}
                    singlePage={true}
                    hide_x_overflow={!isCollapsed}
                    />
                    
                </div>
            </div>

            {!isCollapsed?
            <div className={styles.detail_container}>
                <div onClick={onSetisCollapsed} className={styles.staff_datagrid_collapsed_bt_container}>
                    <div className={styles.staff_datagrid_collapsed_bt}>
                        <img className={styles.selectePointer_img} src="/img/dashboard/pointout.svg"></img>
                    </div>
                    <div className={styles.staff_datagrid_collapsed_toRight_bt}>
                        <img className={styles.selectePointer_img} src="/img/dashboard/toRight.svg"></img>
                    </div>
                </div>
                <div className={styles.staff_detail_container}>
                    <DetailBoard
                        t={t}
                        detailData={detailData[currentItemId]}
                        setStatus={setStatus}
                    />
                </div>
            </div>
            
            :[]}
        </div>
        </div>
    )
  }

  export default SalesApplication