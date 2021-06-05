import * as React from "react";
import styles from "./index.module.css";
import { Grid, Divider, Button } from "@material-ui/core";
import BoardlineChart from "./boardLineChart";
import { useMediaQuery } from "react-responsive";

interface Props {
  t: (params: String) => String;
  detailData: any;
  setStatus?: (result: any) => void;
}

function DetailBoard(props: Props) {
  const { t, detailData } = props;

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  return (
    <div className={styles.detail_container}>
      <Grid container>
        <Grid container>
          <Grid xs={6} item>
            <div className={styles.basicInfo_group}>
              <div
                className={
                  isTabletOrMobile
                    ? styles.basicInfo_ava_small
                    : styles.basicInfo_ava
                }
              >
                <img src="/img/Dashboard/staff_test.svg"></img>
              </div>
              <div className={styles.basicInfo_text}>
                <div className={styles.basicInfo_text_name}>
                  {detailData.name}
                </div>
                <div className={styles.basicInfo_text_gray}>
                  {detailData.position}
                </div>
                <div className={styles.basicInfo_text_gray}>
                  {detailData.email}
                </div>
              </div>
            </div>
          </Grid>
          <Grid xs={1} item>
            <Divider orientation={"vertical"} />
          </Grid>
          <Grid xs={5} item>
            <div className={styles.basicInfo_group_2}>
              <div className={styles.basicInfo_text_title}>
                <img
                  className={styles.basicInfo_icon}
                  src="/img/Dashboard/phone_icon.svg"
                ></img>
                {detailData.phone}
              </div>
              <div className={styles.basicInfo_text_title}>
                <img
                  className={styles.basicInfo_icon}
                  src="/img/Dashboard/location_icon.svg"
                ></img>
                {detailData.address}
              </div>
            </div>
          </Grid>
        </Grid>
        <Divider classes={{ root: styles.Dividerroot }} />

        {detailData.data ? (
          <Grid container>
            <Grid classes={{ root: styles.gridroot }} container>
              {detailData.data.map((d, i) => (
                <Grid key={i} xs={4} item>
                  <div className={styles.basicInfo_value_bt_group}>
                    <div>
                      <div className={styles[d.id]}>{d.value}</div>
                      <div className={styles.basicInfo_value_name}>
                        {d.name}
                      </div>
                    </div>
                    <div className={styles.basicInfo_value_bt}>
                      <img src="/img/Dashboard/more.svg"></img>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
            <Grid container>
              <Grid xs={4} item>
                <div className={styles.staff_detail_cards_qual}>
                  <p>Qualification:</p>
                  <p>xxx University</p>
                </div>
              </Grid>
              <Grid xs={8} item>
                <div className={styles.staff_detail_cards_cert}>
                  <p>Certificates:</p>
                </div>
              </Grid>
              <Grid xs={4} item>
                <div className={styles.staff_detail_cards_spec}>
                  <p>Specialty Area:</p>
                </div>
              </Grid>
              <Grid xs={8} item>
                <div className={styles.staff_detail_cards_msg}>
                  <p>message to applicant</p>
                </div>
              </Grid>
              <Grid xs={4} item>
                <div></div>
              </Grid>
              <Grid xs={8} item>
                <div className={styles.staff_detail_cards_btns_container}>
                  <div className={styles.staff_detail_cards_btns}>
                    <Button
                      style={{ backgroundColor: "#39A049", width: "96px" }}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <p className={styles.staff_detail_cards_btns_text}>
                        Approve
                      </p>
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#908686",
                        width: "83px",
                        marginLeft: "20px",
                      }}
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      <p className={styles.staff_detail_cards_btns_text}>
                        Decline
                      </p>
                    </Button>
                    <Button
                      style={{
                        backgroundColor: "#39A049",
                        marginLeft: "50px",
                        width: "169px",
                      }}
                      variant="contained"
                      color="primary"
                      size="medium"
                    >
                      <p className={styles.staff_detail_cards_btns_text}>
                        Send message
                      </p>
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <div className={styles.staff_detail_bottom_container}>
            <Grid container>
              <Grid xs={4} item>
                <div className={styles.staff_detail_cards_qual}></div>
                <div className={styles.staff_detail_cards_spec}></div>
              </Grid>
              <Grid xs={8} item>
                <div className={styles.staff_detail_cards_cert}></div>
                <div className={styles.staff_detail_cards_msg}></div>
                <div
                  className={
                    isTabletOrMobile
                      ? styles.bt_group_row_small
                      : styles.bt_group_row
                  }
                >
                  <div className={styles.detail_bt}>
                    <Button
                      onClick={(ev) => props.setStatus("PASS")}
                      classes={{ root: styles.aprove_bt }}
                    >
                      {t("dashboard.sta.aprove")}
                    </Button>
                  </div>
                  <div className={styles.detail_bt}>
                    <Button
                      onClick={(ev) => props.setStatus("Decline")}
                      classes={{ root: styles.Decline_bt }}
                    >
                      {t("dashboard.sta.Decline")}
                    </Button>
                  </div>
                  <div className={styles.detail_bt}>
                    <Button
                      onClick={(ev) => props.setStatus("Pending")}
                      classes={{ root: styles.Messageapproval_bt }}
                    >
                      {t("dashboard.sta.Messageapproval")}
                    </Button>
                  </div>
                </div>
              </Grid>
            </Grid>

            {/* <div > <div/> */}
          </div>
        )}
      </Grid>
    </div>
  );
}

export default DetailBoard;
