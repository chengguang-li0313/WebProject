import * as React from 'react';
import styles from './index.module.css';
import {Divider} from '@material-ui/core';

export interface Props {
    t:(params: String) => String;
}

// const isDesktopOrLaptop = useMediaQuery({
//     query: '(max-width: 1440px)'
//   })

const initialState = {

}

type State = {

}

class PaymentMethod extends React.Component<Props, object> {
    render(){
        return(
            <div className={styles.paymentMethod_container}>
                
            </div>
        )
    }
}

export default PaymentMethod