import * as React from 'react';
import styles from './index.module.css';
import {
    Divider,
    Grid,
    TextField,
    InputBase,
    Checkbox,
    FormLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    DialogTitle,
    Chip,
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent
} from '@material-ui/core';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { addDays } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import eventData from '../../../../public/eventData/event_newEvent_web.json';
import { DateRangePicker } from 'react-date-range';
import DataGridPopper from '../dataGridPopper';
import Calendar from './calendar';
import { Products, customerList, sellerList } from '../../../../public/fakeData';

export interface Props {
    t: (params: String) => String;
}

const setColor = (scheme) => {
    let color = scheme.split('/');
    let colorL = [];
    color.forEach((c: string) => {
        colorL.push({ color: c, selected: false });
    });
    return colorL;
};

const initialState = {
    colorList: setColor(eventData.scheme),
    currentColor: setColor(eventData.scheme)[0].color,
    alignment: 'one_off',
    reminderAlignment: 'reminder',
    goalsAlignment: 'goals',
    ticketAlignment: 'ticket',
    productAlignment: 'product',
    productList: [
        { id: '1', src: '/img/Dashboard/product1.svg', name: 'event cup', price: '5' },
        { id: '2', src: '/img/Dashboard/product2.svg', name: 'event cup 2', price: '5' }
    ],
    sendtoAllst: false,
    sendtofuturestaff: false,
    sendToAllExiCus: false,
    sendToAllExiCusFu: false,
    eventData: eventData,
    products: eventData.products,
    recipients: eventData.recipients,
    dataGridPopperOpen: false,
    dataGridPopperAnchorEl: null,
    row: [],
    currentGrid: '',
    dialogOpen: false,
    timeRange:{
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }},
    timeRangeData:{
        from_time: new Date(),
        to_time: new Date()
    }
        //   compare: {
        //     startDate: new Date(),
        //     endDate: addDays(new Date(), 3),
        //     key: 'compare'
        //   }
    
};

type State = {
    colorList: Array<any>;
    currentColor: string;
    productList: Array<any>;
    sendtoAllst: boolean;
    sendtofuturestaff: boolean;
    eventData: Object;
    dataGridPopperOpen: boolean;
    dataGridPopperAnchorEl: any;
    row: Array<any>;
    currentGrid: string;
    dialogOpen: boolean;
    timeRange:any;
    timeRangeData:any
};

class Event extends React.Component<Props, object> {
    state = initialState;

    private checkList = { PRODICT: 'product', CUSTOMER: 'customer', SELLER: 'seller' };

    private customerColumn = [
        { id: 'id', label: ['dashboard.acc.delivery.setDelivery.index'], minWidth: 100 },
        { id: 'name', label: ['dashboard.acc.delivery.setDelivery.name'], minWidth: 100 }
    ];
    // private createdata = (data:any) =>{

    // }

    private onDateTimeRangePickerChange = (item: any) => {
        console.log(item);
        // setTimeRange({ ...timeRange, ...item });
        // setRange(item, timeRangeData);
    };
    private onTimeRangePickerChange = (event: any, id: string) => {
        // let temp = { from_time: timeRangeData.from_time, to_time: timeRangeData.to_time };
        // temp[id] = event;
        // setTimeRangeData(temp);
        // setRange(timeRange, temp);
    };

    private onSelectColor = (index: Number) => {
        this.setState((preState, preProps) => {
            preState['colorList'].map((color, i) => {
                if (i == index) {
                    color.selected = true;
                    preState['currentColor'] = color.color;
                } else {
                    color.selected = false;
                }
            });
            return { colorList: preState['colorList'], currentColor: preState['currentColor'] };
        });
    };
    private handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) {
            this.setState({ alignment: newAlignment });
        }
    };

    private handleReminderAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) this.setState({ reminderAlignment: newAlignment });
    };
    private handleGoalAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) this.setState({ goalsAlignment: newAlignment });
    };
    private handleTicketAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) this.setState({ ticketAlignment: newAlignment });
    };
    private handleProductAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null
    ) => {
        if (newAlignment) this.setState({ productAlignment: newAlignment });
    };

    private handlesendtoAllstChange = (event: React.MouseEvent<HTMLElement>) => {
        this.setState((statePrev, prop) => {
            statePrev['sendtoAllst'] = !statePrev['sendtoAllst'];
            return { sendtoAllst: statePrev['sendtoAllst'] };
        });
    };
    private handlesendtofuturestaffChange = (event: React.MouseEvent<HTMLElement>) => {
        // this.setState({sendtofuturestaff:true});
        this.setState((statePrev, prop) => {
            statePrev['sendtofuturestaff'] = !statePrev['sendtofuturestaff'];
            return { sendtofuturestaff: statePrev['sendtofuturestaff'] };
        });
    };

    private handleDelete = () => {};

    private handlePopperEdit = (event: React.MouseEvent<HTMLElement>, category: string) => {
        this.setState({ dataGridPopperAnchorEl: event.currentTarget });
        this.setState((prevState, prop) => {
            prevState['dataGridPopperOpen'] = !prevState['dataGridPopperOpen'];
            prevState['row'] = [];
            prevState['currentGrid'] = category;
            switch (category) {
                case this.checkList.PRODICT:
                    Products.map((p, i) => {
                        prevState['row'].push({
                            id: { item: p.id, type: 'string' },
                            name: { item: p.ProductName, type: 'string' }
                        });
                    });
                    break;
                case this.checkList.SELLER:
                    sellerList.map((p, i) => {
                        prevState['row'].push({
                            id: { item: p.id, type: 'string' },
                            name: { item: p.name, type: 'string' }
                        });
                    });
                    break;
                case this.checkList.CUSTOMER:
                    customerList.map((p, i) => {
                        prevState['row'].push({
                            id: { item: p.id, type: 'string' },
                            name: { item: p.name, type: 'string' }
                        });
                    });
                    break;
            }
            return {
                dataGridPopperOpen: prevState['dataGridPopperOpen'],
                row: prevState['row'],
                currentGrid: prevState['currentGrid']
            };
        });
    };

    private handleChange = (event: any) => {
        console.log(event.target.value, this.state.currentGrid);
        this.setState((prevState, prop) => {
            prevState['row'] = [];
            switch (prevState['currentGrid']) {
                case this.checkList.PRODICT:
                    Products.map((p, i) => {
                        // console.log('aa',p.ProductName==event.target.value)
                        if (p.ProductName == event.target.value) {
                            prevState['row'].push({
                                id: { item: p.id, type: 'string' },
                                name: { item: p.ProductName, type: 'string' }
                            });
                        }
                    });
                    break;
                case this.checkList.SELLER:
                    sellerList.map((p, i) => {
                        if (p.name.toString().includes(event.target.value))
                            prevState['row'].push({
                                id: { item: p.id, type: 'string' },
                                name: { item: p.name, type: 'string' }
                            });
                    });
                    break;
                case this.checkList.CUSTOMER:
                    customerList.map((p, i) => {
                        if (p.name.toString().includes(event.target.value))
                            prevState['row'].push({
                                id: { item: p.id, type: 'string' },
                                name: { item: p.name, type: 'string' }
                            });
                    });
                    break;
            }

            return { row: prevState['row'] };
        });
        // console.log("this.state.row",this.state.row)
    };

    private handleCheckBoxChanged = (ev: any, i: any, row: any) => {
        console.log('i', i, row, this.state.currentGrid);
        this.setState((prevState, prop) => {
            prevState['row'] = [];
            switch (prevState['currentGrid']) {
                case this.checkList.PRODICT:
                    prevState['eventData'].products.push({ id: row.id.item, name: row.name.item });
                    break;
                case this.checkList.CUSTOMER:
                    prevState['eventData'].recipients.push({
                        name: row.name.item,
                        type: 'customer'
                    });
                    break;
                case this.checkList.SELLER:
                    prevState['eventData'].recipients.push({ name: row.name.item, type: 'seller' });
                    break;
            }

            return { eventData: JSON.parse(JSON.stringify(prevState['eventData'])) };
        });
    };

    private handleDialogClose = () => {
        this.setState({ dialogOpen: false });
    };

    private handleDialogOpen = () => {
        this.setState({ dialogOpen: true });
    };

    render() {
        const { t } = this.props;

        return (
            <div className={styles.event_container}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={9}>
                        <div className={styles.event_card_continer_1}>
                            <div className={styles.event_card_wrapper}>
                                <Grid
                                    container
                                    classes={{
                                        root: styles.section1_grid_root,
                                        item: styles.grid_item
                                    }}
                                    spacing={0}>
                                    <Grid item xs={2}>
                                        <div className={styles.event_icon}>
                                            <div
                                                style={{ background: this.state.currentColor }}
                                                className={styles.select_color_icon}></div>
                                            <img src="/img/Dashboard/icon.svg"></img>
                                        </div>
                                        <div className={styles.userName_wrapper}>HQ WATER</div>
                                    </Grid>
                                    <Grid item xs={10}>
                                        <div className={styles.eventBasicInfo_column}>
                                            <Divider
                                                classes={{ vertical: styles.divider_column }}
                                                orientation="vertical"
                                            />
                                            <div className={styles.eventBasicInfo_container}>
                                                <InputBase
                                                    classes={{
                                                        input: styles.eventBasicInfo_input_name
                                                    }}
                                                    id="event_name"
                                                    placeholder={t('dashboard.eve.e_name')}
                                                />
                                                <InputBase
                                                    classes={{ input: styles.eventBasicInfo_input }}
                                                    id="event_title"
                                                    placeholder={t('dashboard.eve.title')}
                                                />
                                                <div className={styles.color_input_container}>
                                                    <div className={styles.color_input_label}>
                                                        {t('dashboard.eve.color')}
                                                    </div>
                                                    <div className={styles.color_selection}>
                                                        {this.state.colorList.map(
                                                            (color, index) => (
                                                                <div
                                                                    style={{
                                                                        background: color.color
                                                                    }}
                                                                    onClick={(ev) =>
                                                                        this.onSelectColor(index)
                                                                    }
                                                                    className={styles.color_options}
                                                                    key={index}>
                                                                    {color.selected ? (
                                                                        <div
                                                                            className={
                                                                                styles.selected_icon
                                                                            }>
                                                                            <img src="/img/Dashboard/selected.svg"></img>
                                                                        </div>
                                                                    ) : (
                                                                        []
                                                                    )}
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                    {/* <InputBase classes={{root:styles.eventBasicInfo_input_tag}} id="event_name" /> */}
                                                </div>
                                                <div className={styles.tag_input_container}>
                                                    <div className={styles.tag_input_label}>
                                                        {t('dashboard.eve.tags')}
                                                    </div>
                                                    <InputBase
                                                        classes={{
                                                            root: styles.eventBasicInfo_input_tag
                                                        }}
                                                        id="event_tag"
                                                    />
                                                </div>
                                                <div className={styles.tag_basic_des}>
                                                    {t('dashboard.eve.basic_des')}
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>

                                <Divider />

                                <Grid>
                                    <div className={styles.event_address_container}>
                                        <div className={styles.event_address_label}>
                                            {t('dashboard.eve.address')}
                                        </div>
                                        <InputBase
                                            classes={{ root: styles.eventBasicInfo_input_tag }}
                                            id="event_tag"
                                        />
                                    </div>

                                    <div>
                                        <ToggleButtonGroup
                                            value={this.state.alignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="one_off"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.one_off')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="recurring_normal"
                                                aria-label="centered">
                                                <div className={styles.bt_text_container}>
                                                    <div>{t('dashboard.eve.recurring')}</div>
                                                    <div className={styles.bt_des}>
                                                        {t('dashboard.eve.normal')}
                                                    </div>
                                                </div>
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="recurring_cus"
                                                aria-label="right aligned">
                                                <div className={styles.bt_text_container}>
                                                    <div>{t('dashboard.eve.recurring')}</div>
                                                    <div className={styles.bt_des}>
                                                        {t('dashboard.eve.customised')}
                                                    </div>
                                                </div>
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        
                                            <div className={styles.bt_oneOff_container}>
                                                <div className={styles.bt_oneOff_start_container}>
                                                    <div className={styles.bt_oneOff_start_text}>
                                                        <div className={styles.bt_oneOff_icon}>
                                                            <img src="/img/Dashboard/alert_icon.svg"></img>
                                                        </div>
                                                        <div className={styles.bt_oneOff_text}>
                                                            {t('dashboard.eve.startDT')}
                                                        </div>
                                                    </div>
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        classes={{ root: styles.eventBasicInfo_DT }}
                                                        id="event_tag"
                                                    />
                                                </div>
                                                <div className={styles.bt_oneOff_end_container}>
                                                    <div className={styles.bt_oneOff_end_text}>
                                                        <div className={styles.bt_oneOff_icon}>
                                                            <img src="/img/Dashboard/alert_icon.svg"></img>
                                                        </div>
                                                        <div className={styles.bt_oneOff_text}>
                                                            {t('dashboard.eve.endDT')}
                                                        </div>
                                                    </div>
                                                    <InputBase
                                                        onClick={this.handleDialogOpen}
                                                        classes={{ root: styles.eventBasicInfo_DT }}
                                                        id="event_tag"
                                                    />
                                                </div>
                                            </div>
                                            {/* {this.state.alignment === 'one_off' ? () : (
                                            []
                                        )} */}
                                    </div>

                                    <div>
                                        <ToggleButtonGroup
                                            value={this.state.reminderAlignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleReminderAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="reminder"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.reminder')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="noReminder"
                                                aria-label="centered">
                                                {t('dashboard.eve.noReminder')}
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        {this.state.reminderAlignment === 'reminder' ? (
                                            <div className={styles.reminder_container}>
                                                <div className={styles.bt_oneOff_icon}>
                                                    <img src="/img/Dashboard/alarm_icon.svg"></img>
                                                </div>
                                                <div className={styles.reminder_text}>
                                                    {t('dashboard.eve.every')}
                                                </div>
                                                <InputBase
                                                    type="number"
                                                    classes={{ root: styles.reminder_input }}
                                                    id="event_tag"
                                                />
                                                <div className={styles.reminder_text_des}>
                                                    {t('dashboard.eve.m/h')}
                                                </div>
                                                <div className={styles.reminder_text}>
                                                    {t('dashboard.eve.before')}
                                                </div>
                                                <InputBase
                                                    type="number"
                                                    classes={{ root: styles.reminder_input }}
                                                    id="event_tag"
                                                />
                                                <div className={styles.reminder_text_des}>
                                                    {t('dashboard.eve.m/h')}
                                                </div>
                                            </div>
                                        ) : (
                                            []
                                        )}
                                    </div>

                                    <div>
                                        <ToggleButtonGroup
                                            value={this.state.goalsAlignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleGoalAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="goals"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.goals')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="noGoals"
                                                aria-label="centered">
                                                {t('dashboard.eve.noGoals')}
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        {this.state.goalsAlignment === 'goals' ? (
                                            <div className={styles.goal_container}>
                                                <div className={styles.reminder_text}>
                                                    {t('dashboard.eve.goals')}
                                                </div>
                                                <InputBase
                                                    type="number"
                                                    classes={{ root: styles.goal_input }}
                                                    id="event_tag"
                                                />
                                            </div>
                                        ) : (
                                            []
                                        )}
                                    </div>

                                    <div>
                                        <ToggleButtonGroup
                                            value={this.state.ticketAlignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleTicketAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="ticket"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.ticker')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="noticket"
                                                aria-label="centered">
                                                {t('dashboard.eve.noticker')}
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        {this.state.ticketAlignment === 'ticket' ? (
                                            <div className={styles.goal_container}>
                                                <div className={styles.reminder_text}>
                                                    {t('dashboard.eve.ticketFee')} $
                                                </div>
                                                <InputBase
                                                    type="number"
                                                    classes={{ root: styles.goal_input }}
                                                    id="event_tag"
                                                />
                                            </div>
                                        ) : (
                                            []
                                        )}
                                    </div>

                                    <div className={styles.product_section_container}>
                                        <ToggleButtonGroup
                                            value={this.state.productAlignment}
                                            exclusive
                                            classes={{ root: styles.groupBT_container_root }}
                                            onChange={this.handleProductAlignment}
                                            aria-label="text alignment">
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="product"
                                                aria-label="left aligned">
                                                {t('dashboard.eve.product')}
                                            </ToggleButton>
                                            <ToggleButton
                                                classes={{
                                                    root: styles.groupBT_root,
                                                    selected: styles.groupBT_selected
                                                }}
                                                value="noProduct"
                                                aria-label="centered">
                                                {t('dashboard.eve.noProduct')}
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                        {this.state.productAlignment === 'product' ? (
                                            <div className={styles.product_container}>
                                                <div className={styles.product_text}>
                                                    {t('dashboard.eve.linkpro')}
                                                </div>
                                                <div className={styles.product_list_container}>
                                                    {this.state.eventData.products.map(
                                                        (p, index) => (
                                                            <div
                                                                className={styles.product_img}
                                                                key={index}>
                                                                <img src="/img/Dashboard/product1.svg"></img>
                                                            </div>
                                                        )
                                                    )}
                                                    <div
                                                        onClick={(ev) =>
                                                            this.handlePopperEdit(ev, 'product')
                                                        }
                                                        className={styles.product_img_add}>
                                                        <div
                                                            className={styles.product_img_add_icon}>
                                                            <img src="/img/Dashboard/add_product.svg"></img>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            []
                                        )}
                                    </div>

                                    <div className={styles.sendMsg_box}>
                                        <div className={styles.sendMsg_box_checkBox_group}>
                                            <FormControl
                                                component="fieldset"
                                                className={styles.formControl}>
                                                {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                                                <FormGroup>
                                                    <FormControlLabel
                                                        classes={{ label: styles.checkbox_label }}
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={this.state.sendtoAllst}
                                                                onChange={
                                                                    this.handlesendtoAllstChange
                                                                }
                                                                name="sendtoAllst"
                                                            />
                                                        }
                                                        label={t('dashboard.eve.sendtoAllst')}
                                                    />
                                                    <FormControlLabel
                                                        classes={{ label: styles.checkbox_label }}
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={
                                                                    this.state.sendtofuturestaff
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handlesendtofuturestaffChange
                                                                }
                                                                name="sendtofuturestaff"
                                                            />
                                                        }
                                                        label={t('dashboard.eve.sendtofuturestaff')}
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </div>
                                        <div className={styles.people_list}>
                                            {this.state.eventData.recipients.map(
                                                (person, index) => {
                                                    if (person.type === 'seller') {
                                                        return (
                                                            <Chip
                                                                color="primary"
                                                                classes={{
                                                                    root: styles.chip_root,
                                                                    colorPrimary:
                                                                        styles.chip_colorPrimary
                                                                }}
                                                                key={index}
                                                                label={person.name}
                                                                onDelete={this.handleDelete}
                                                                avatar={
                                                                    <Avatar src="/img/Dashboard/placeholder.svg" />
                                                                }
                                                            />
                                                        );
                                                    }
                                                }
                                            )}
                                            <AddCircleIcon
                                                onClick={(ev) =>
                                                    this.handlePopperEdit(ev, 'seller')
                                                }
                                                color="primary"
                                                classes={{
                                                    root: styles.AddCircleIcon_root,
                                                    colorPrimary: styles.AddCircleIcon_colorPrimary
                                                }}
                                            />
                                        </div>
                                        <div className={styles.message_box}>
                                            <InputBase
                                                placeholder={t('dashboard.eve.msg_placeholder')}
                                                classes={{
                                                    input: styles.msg_box_input,
                                                    multiline: styles.msg_box_multiline
                                                }}
                                                multiline={true}
                                                rows={10}></InputBase>
                                        </div>
                                    </div>

                                    <div className={styles.sendMsg_box}>
                                        <div className={styles.sendMsg_box_checkBox_group}>
                                            <FormControl
                                                component="fieldset"
                                                className={styles.formControl}>
                                                {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                                                <FormGroup>
                                                    <FormControlLabel
                                                        classes={{ label: styles.checkbox_label }}
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={this.state.sendToAllExiCus}
                                                                onChange={
                                                                    this.handlesendtoAllstChange
                                                                }
                                                                name="sendtoAllst"
                                                            />
                                                        }
                                                        label={t('dashboard.eve.sendToAllExiCus')}
                                                    />
                                                    <FormControlLabel
                                                        classes={{ label: styles.checkbox_label }}
                                                        control={
                                                            <Checkbox
                                                                color="primary"
                                                                checked={
                                                                    this.state.sendToAllExiCusFu
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handlesendtofuturestaffChange
                                                                }
                                                                name="sendtofuturestaff"
                                                            />
                                                        }
                                                        label={t('dashboard.eve.sendToAllExiCusFu')}
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </div>
                                        <div className={styles.people_list}>
                                            {this.state.eventData.recipients.map(
                                                (person, index) => {
                                                    if (person.type === 'customer') {
                                                        return (
                                                            <Chip
                                                                color="primary"
                                                                classes={{
                                                                    root: styles.chip_root,
                                                                    colorPrimary:
                                                                        styles.chip_colorPrimary
                                                                }}
                                                                key={index}
                                                                label={person.name}
                                                                onDelete={this.handleDelete}
                                                                avatar={
                                                                    <Avatar src="/img/Dashboard/placeholder.svg" />
                                                                }
                                                            />
                                                        );
                                                    }
                                                }
                                            )}
                                            <AddCircleIcon
                                                onClick={(ev) =>
                                                    this.handlePopperEdit(ev, 'customer')
                                                }
                                                color="primary"
                                                classes={{
                                                    root: styles.AddCircleIcon_root,
                                                    colorPrimary: styles.AddCircleIcon_colorPrimary
                                                }}
                                            />
                                        </div>
                                        <div className={styles.message_box}>
                                            <InputBase
                                                placeholder={t('dashboard.eve.msg_placeholder')}
                                                classes={{
                                                    input: styles.msg_box_input,
                                                    multiline: styles.msg_box_multiline
                                                }}
                                                multiline={true}
                                                rows={10}></InputBase>
                                        </div>
                                    </div>
                                </Grid>

                                {/* Add button */}
                                <div className={styles.sendBT_group}>
                                    <Button classes={{ root: styles.bt_draft_root }}>
                                        {t('dashboard.eve.save_draft')}
                                    </Button>
                                    <Button classes={{ root: styles.bt_root }}>
                                        {t('dashboard.eve.send')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Grid>

                    <Grid container item xs={3}>
                        <div className={styles.event_card_continer_2}>
                            <div className={styles.calendar_container}>
                                <Calendar />
                            </div>
                            <div className={styles.eventList_container}>
                                <div className={styles.eventList_title}>
                                    All Events (upcoming, new, completed):
                                </div>
                                <div className={styles.eventList_card}>

                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>

                <DataGridPopper
                    t={t}
                    open={this.state.dataGridPopperOpen}
                    anchorEl={this.state.dataGridPopperAnchorEl}
                    column={this.customerColumn}
                    row={this.state.row}
                    handleCheckBoxChanged={this.handleCheckBoxChanged}
                    handleChange={this.handleChange}
                />
                <Dialog
                    classes={{paperWidthSm:styles.event_WidthXs_map}}
                    open={this.state.dialogOpen}
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    {/* <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle> */}
                    <DialogContent classes={{root:styles.dialog_container}}>
                        <div className={styles.dialog_container}>
                            <div className={styles.dataRange_container}>
                                <Grid container>
                                    <Grid item xs = {2}>
                                        <div className={styles.calendar_icon}><img src='/img/Dashboard/dataRange.svg'></img></div>
                                        <div className={styles.text}>{t('dashboard.eve.dateRange')}</div>
                                    </Grid>
                                    <Grid item xs = {10}>
                                    <div className={styles.popper_content_DateTimeRangePicker}>
                                            <div className={styles.timeRangePicker_container}>
                                        
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        id="from_time"
                                                        label="From"
                                                        value={this.state.timeRangeData.from_time}
                                                        onChange={(ev) => this.onTimeRangePickerChange(ev, 'from_time')}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time'
                                                        }}
                                                    />
                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        id="to_time"
                                                        label="To"
                                                        value={this.state.timeRangeData.to_time}
                                                        onChange={(ev) => this.onTimeRangePickerChange(ev, 'to_time')}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time'
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>

                                            </div>
                                            <DateRangePicker
                                                onChange={(item: any) => this.onDateTimeRangePickerChange(item)}
                                                months={1}
                                                minDate={addDays(new Date(), -300)}
                                                maxDate={addDays(new Date(), 900)}
                                                direction="vertical"
                                                scroll={{ enabled: true }}
                                                ranges={[this.state.timeRange.selection]}
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className={styles.recurring_container}>
                                <Grid container>
                                    <Grid item xs = {2}>
                                        <div className={styles.calendar_icon}><img src='/img/Dashboard/recurring.svg'></img></div>
                                        <div className={styles.text}>{t('dashboard.eve.recurring')}</div>
                                    </Grid>
                                    <Grid item xs = {10}>
                                        
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            classes={{ root: styles.dialog_bt }}
                            onClick={this.handleDialogClose}
                            color="primary">
                            Cancel
                        </Button>
                        <Button
                            classes={{ root: styles.dialog_bt }}
                            onClick={this.handleDialogClose}
                            color="primary"
                            autoFocus>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default Event;
