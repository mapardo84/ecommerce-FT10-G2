const mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: 'TEST-1669112607394412-041121-7feaa8d307068512a7059b684241e2c4-741939764'
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
