const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rvqfpjqefytwghtrjrte.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzcyMTE1NCwiZXhwIjoxOTMzMjk3MTU0fQ.5Og3crNRwVO6-Mctg2EOOtUw5Etfdz84UIGVOIsgCNY'
const supabase = createClient(supabaseUrl, supabaseKey)
const mercadopago = require('mercadopago')

mercadopago.configure({
    access_token: 'TEST-1669112607394412-041121-7feaa8d307068512a7059b684241e2c4-741939764'
  });


let order;

async function getPreferenceId(req,res){
    let {unit_price,quantity,title}=req.query
    unit_price=Number(unit_price)
    quantity=Number(quantity)
    // console.log(req.query.form)
    // { userId: req.userId, productId: req.body.productId }

    mercadopago.preferences.create({
        items:[{
                title,
                unit_price,
                quantity,
                currency_id:'USD'
        }]
    }).then(preference=> {
        console.log(preference)
        return res.json({preferenceId:preference.body.id})
    }).catch(e=>console.log(e))
}

// async function postPax(req,res){
//     const { uuid, first_name, last_name, phone, country, birth_date, address } = req.body;
//     const { data } = await supabase.from('paxes').insert([
//         {
//             uuid,
//             first_name,
//             last_name,
//             phone,
//             country: country[0],
//             birth_date: birth_date,
//             address,
//             titular: true,                              // esto no sirve si es admin 
//         }
//     ])  
//     res.json(data)
// }

// async function postBooking(req,res){
//     const {checkin,checkout,room_id}=req.body
//     const { data } = await supabase.from('paxes').insert([
//         {
//             checkin,
//             checkout,
//             room_id
//         }
//     ])
//     res.json(data)
// }


// async function getIPN(req,res){
//     const {type}=req.params
//     if(type==="payment"){
//         const paymentId=req.params.data.id
//         console.log(paymentId)
//     }
//     res.status(200)
    
// }



module.exports={getPreferenceId}
