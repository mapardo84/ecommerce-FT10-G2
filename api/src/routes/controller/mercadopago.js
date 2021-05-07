const mercadopago = require('mercadopago')
var mercado_to= process.env.MERCADO_PAGO

mercadopago.configure({
    access_token: mercado_to
});

async function getPreferenceId(req, res) {
    let { unit_price, quantity, title } = req.query
    unit_price = Number(unit_price)
    quantity = Number(quantity)

    mercadopago.preferences.create({
        back_urls: { success: "https://henryhotel.hruiz.com/booking/success" },
        items: [{
            title,
            unit_price,
            quantity,
	    currency_id: 'USD'
        }]
    }).then(preference => {
        console.log(preference)
        return res.json({ preferenceId: preference.body.id })
    }).catch(e => console.log(e))
}


module.exports = { getPreferenceId }
