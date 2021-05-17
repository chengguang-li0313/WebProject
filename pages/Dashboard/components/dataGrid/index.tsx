import * as React from 'react';
import styles from './index.module.css';
import {Divider,FormControlLabel,Grid,Button} from '@material-ui/core';

interface Props {
    t:(params: String) => String;
    
}


function DataGrid(props: Props) {
    const {t} = props
    return(
        <div className={styles.dataGrid_container}>
            <Grid container >
                
            </Grid>
        </div>
    )

}

export default DataGrid