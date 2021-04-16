const mercadopago = require('mercadopago')
const {createClient}=require('@supabase/supabase-js')

const supabaseUrl = 'https://rvqfpjqefytwghtrjrte.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzcyMTE1NCwiZXhwIjoxOTMzMjk3MTU0fQ.5Og3crNRwVO6-Mctg2EOOtUw5Etfdz84UIGVOIsgCNY'
const supabase = createClient(supabaseUrl, supabaseKey)

mercadopago.configure({
    access_token: 'TEST-1669112607394412-041121-7feaa8d307068512a7059b684241e2c4-741939764'
  });


let order;

async function getPreferenceId(req,res){
    let {unit_price,quantity,title}=req.query
    unit_price=Number(unit_price)
    quantity=Number(quantity)

    order = {
        id: '1',
        title,
        unit_price, 
        quantity, 
        totalPrice: unit_price * quantity,
        status: ''
    }

    // { userId: req.userId, productId: req.body.productId }
    const hola=await supabase.from("rooms").select("*")

    mercadopago.preferences.create({
        external_reference: order.id,
        notification_url: 'http://localhost:4000/mercadopago/ipn',
        items:[{
                title,
                unit_price,
                quantity
        }]
    }).then(preference=> {
        console.log(preference)
        res.json({preferenceId:preference.body.id})
    }).catch(e=>console.log(e))
}

async function getIPN(req,res){
        
}


module.exports={getPreferenceId,getIPN}
