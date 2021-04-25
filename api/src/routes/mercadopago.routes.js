const { Router } = require('express');
const { getPreferenceId, getIPN, postBooking, postPax} = require('./controller/mercadopago.js');
// import all routers;


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.get('/', getPreferenceId);
// router.post('/postpax',postPax)
// router.post('/postBooking',postBooking)

module.exports = router;
