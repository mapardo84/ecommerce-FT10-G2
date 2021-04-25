const { Router } = require('express');
const { send_confirmation } = require('./controller/emails');

const router = Router();
router.post('/',send_confirmation);

module.exports = router;
