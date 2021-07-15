import express from 'express';
import { MessagesController } from '../controllers/messages.controller';



const messagesRouter = express.Router();

messagesRouter.route('/getThreadsForUser').post(
    (req,res)=> new MessagesController().getThreadsForUser(req, res)
)
messagesRouter.route('/sendMessage').post(
    (req,res)=> new MessagesController().sendMessage(req, res)
)
messagesRouter.route('/archiveThread').post(
    (req,res)=> new MessagesController().archiveThread(req, res)
)
messagesRouter.route('/unarchiveThread').post(
    (req,res)=> new MessagesController().unarchiveThread(req, res)
)

export default messagesRouter;