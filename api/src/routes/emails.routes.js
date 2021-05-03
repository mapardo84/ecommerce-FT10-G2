const { Router } = require('express');
const { confirmation_email, cancel_email,newsletter_email, cancelSuscription } = require('./controller/emails');

const router = Router();

router.post('/cancel', cancel_email);
router.post('/',confirmation_email);
router.post('/newsletter',newsletter_email)
router.get('/cancelsuscription',cancelSuscription)


module.exports = router;
