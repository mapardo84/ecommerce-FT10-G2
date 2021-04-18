const mercadopago = require('mercadopago')
const {createClient}=require('@supabase/supabase-js')

mercadopago.configure({
    access_token: 'TEST-1669112607394412-041121-7feaa8d307068512a7059b684241e2c4-741939764'
  });


let order;

async function getPreferenceId(req,res){
    let {unit_price,quantity,title}=req.query
    unit_price=Number(unit_price)
    quantity=Number(quantity)

    order = {
        title,
        unit_price, 
        quantity, 
    }

    // { userId: req.userId, productId: req.body.productId }

    mercadopago.preferences.create({
        items:[{
                title,
                unit_price,
                quantity
        }]
    }).then(preference=> {
        console.log(preference.body)
        return res.json({preferenceId:preference.body.id})
    }).catch(e=>console.log(e))
}



module.exports={getPreferenceId}
