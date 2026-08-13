import { Router } from 'express';
import { gmailController } from './gmail.controller';

const GmailRouter = Router();

GmailRouter.get(
    '/connect',
    gmailController.connectGmail
);

GmailRouter.get(
    '/callback',
    gmailController.gmailCallback
);

GmailRouter.get(
    '/',
    gmailController.getAllEmailInTest
);

export default GmailRouter;