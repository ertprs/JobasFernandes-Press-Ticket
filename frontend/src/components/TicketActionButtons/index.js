import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { MoreVert, Replay } from "@material-ui/icons";

import { i18n } from "../../translate/i18n";
import api from "../../services/api";
import TicketOptionsMenu from "../TicketOptionsMenu";
import toastError from "../../errors/toastError";
import { AuthContext } from "../../context/Auth/AuthContext";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import UndoRoundedIcon from '@material-ui/icons/UndoRounded';
import CancelIcon from '@material-ui/icons/Cancel';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
	actionButtons: {
		marginRight: 5,
		flex: "none",
		alignSelf: "center",
		marginLeft: "auto",
		"& > *": {
			margin: theme.spacing(0),
		},
	},
	bottomButton: {
		position: "relative",
		cursor: "pointer",
	},
}));

const TicketActionButtons = ({ ticket }) => {
	const classes = useStyles();
	const history = useHistory();
	const [anchorEl, setAnchorEl] = useState(null);
	const [loading, setLoading] = useState(false);
	const ticketOptionsMenuOpen = Boolean(anchorEl);
	const { user } = useContext(AuthContext);

	const handleOpenTicketOptionsMenu = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleCloseTicketOptionsMenu = e => {
		setAnchorEl(null);
	};

	const handleUpdateTicketStatus = async (e, status, userId) => {
		setLoading(true);
		try {
			await api.put(`/tickets/${ticket.id}`, {
				status: status,
				userId: userId || null,
			});

			setLoading(false);
			if (status === "open") {
				history.push(`/tickets/${ticket.id}`);
			} else {
				history.push("/tickets");
			}
		} catch (err) {
			setLoading(false);
			toastError(err);
		}
	};

	return (
		<div className={classes.actionButtons}>
			{ticket.status === "closed" && (
				<Tooltip title={i18n.t("messagesList.header.buttons.reopen")}>
					<Replay
						loading={loading}
						style={{
							marginRight: 7,
							fontSize: "26px",
							marginBottom: -10,
						}}
						className={classes.bottomButton}
						color="primary"
						onClick={e => handleUpdateTicketStatus(e, "open", user?.id)} />
				</Tooltip>
			)}
			{ticket.status === "open" && (
				<>
					<Tooltip title={i18n.t("messagesList.header.buttons.return")}>
						<UndoRoundedIcon
							loading={loading}
							style={{
								marginRight: 7,
								fontSize: "22px",
								marginBottom: -10,
							}}
							className={classes.bottomButton}
							color="primary"
							onClick={e => handleUpdateTicketStatus(e, "pending", null)} />
					</Tooltip>
					<Tooltip title={i18n.t("messagesList.header.buttons.resolve")}>
						<CancelIcon
							loading={loading}
							style={{
								fontSize: "22px",
								marginBottom: -10,
							}}
							className={classes.bottomButton}
							color="primary"
							onClick={e => handleUpdateTicketStatus(e, "closed", user?.id)} />
					</Tooltip>
					<Tooltip title={i18n.t("messagesList.header.buttons.more")}>
						<MoreVert
							loading={loading}
							style={{
								marginLeft: 7,
								marginRight: 7,
								fontSize: "22px",
								marginBottom: -10,
							}}
							className={classes.bottomButton}
							onClick={handleOpenTicketOptionsMenu} />
					</Tooltip>
					<TicketOptionsMenu
						ticket={ticket}
						anchorEl={anchorEl}
						menuOpen={ticketOptionsMenuOpen}
						handleClose={handleCloseTicketOptionsMenu}
					/>
				</>
			)}
			{ticket.status === "pending" && (
				<Tooltip title={i18n.t("messagesList.header.buttons.accept")}>
					<CheckCircleIcon
						loading={loading}
						style={{
							marginRight: 10,
							marginBottom: -10,
							fontSize: "22px",
						}}
						className={classes.bottomButton}
						onClick={e => handleUpdateTicketStatus(e, "open", user?.id)}
						color="primary" />
				</Tooltip>
			)}
		</div>
	);
};

export default TicketActionButtons;
