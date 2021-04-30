const { Router } = require('express');
const { confirmation_email, cancel_email } = require('./controller/emails');

const router = Router();

router.post('/cancel', cancel_email);
router.post('/',confirmation_email);

module.exports = router;
