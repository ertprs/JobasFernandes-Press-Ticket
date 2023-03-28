import { Op } from "sequelize";
import AppError from "../errors/AppError";
import Ticket from "../models/Ticket";
import User from "../models/User";
import { logger } from "../utils/logger";

const CheckContactOpenTickets = async (
  contactId: number,
  whatsappId: number
): Promise<void> => {
  const ticket = await Ticket.findOne({
    where: {
      contactId,
      whatsappId,
      status: {
        [Op.or]: ["open", "pending"]
      }
    },
    include: [{ model: User, as: "user" }] // associa modelo User
  });

  if (ticket) {
    const userName = ticket.user?.name; // acessa o nome do usuário através do objeto ticket

    logger.info('Debug chamado ja Aberto ' + (userName ? userName : 'sem atendente'));

    if (userName) {
      throw new AppError(`Já existe um chamado aberto para este contato com ${userName}`);
    } else {
      logger.info('Debug chamado ja Aberto ' + 'sem atendente');
      throw new AppError("Ja existe um chamado aberto para este contato sem atendente.");
    }
  }
};

export default CheckContactOpenTickets;