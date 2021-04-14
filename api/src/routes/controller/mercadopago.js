const mercadopago = require('mercadopago')
const {createClient}=require('@supabase/supabase-js')

const supabaseUrl = 'https://rvqfpjqefytwghtrjrte.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYxNzcyMTE1NCwiZXhwIjoxOTMzMjk3MTU0fQ.5Og3crNRwVO6-Mctg2EOOtUw5Etfdz84UIGVOIsgCNY'
const supabase = createClient(supabaseUrl, supabaseKey)

mercadopago.configure({
    access_token: 'TEST-1669112607394412-041121-7feaa8d307068512a7059b684241e2c4-741939764'
  });



async function getPreferenceId(req,res){
    let {unit_price,quantity,title}=req.query
    unit_price=Number(unit_price)
    quantity=Number(quantity)


    const hola=await supabase.from("rooms").select("*")
    mercadopago.preferences.create(
        {
            items:[{
                title,
                unit_price,
                quantity
        }]
    }).then(preference=> {
        console.log(preference)
        res.json({preferenceId:preference.body.id})
    }).catch(e=>console.log(unit_price,quantity,title))
}

async function getIPN(req,res){

}

module.exports={getPreferenceId,getIPN}

