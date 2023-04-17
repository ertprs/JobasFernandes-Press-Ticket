import React from "react";

import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TicketHeaderSkeleton from "../TicketHeaderSkeleton";
import ArrowBackIos from "@material-ui/icons/ArrowBackIos";
import { i18n } from "../../translate/i18n";
import Tooltip from '@material-ui/core/Tooltip';
import { useHistory } from "react-router-dom";
import { system } from "../../config.json";

const useStyles = makeStyles((theme) => ({
  ticketHeader: {
    display: "flex",
    backgroundColor: theme.palette.background.default,
    flex: "none",
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  bottomButton: {
    position: "relative",
  },
}));

const TicketHeader = ({ loading, children }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleBack = () => {
    history.push("/tickets");
  };

  return (
    <>
      {loading ? (
        <TicketHeaderSkeleton />
      ) : (
        <Card square className={classes.ticketHeader}>
          <Tooltip title={i18n.t("messagesList.header.buttons.back")}>
            <ArrowBackIos
              style={{
                backgroundColor: system.color.lightTheme.palette.primary,
                padding: 3,
                paddingLeft: "7px",
                alignSelf: "center",
                color: "#FFF",
                borderRadius: "30px",
                left: '8px',
                fontSize: "22px"
              }}
              cursor="pointer"
              className={classes.bottomButton}
              onClick={handleBack}
            />
          </Tooltip>
          {children}
        </Card>
      )}
    </>
  );
};

export default TicketHeader;
