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
    try {

        if (req.params.type === 'payment') { // hay otros, nos importa solo payment
            const paymentId = req.params.data.id; // ID de payment en MercadoPago
            
            // Documentación de pagos: https://www.mercadopago.cl/developers/es/reference/payments/_payments_search/get/
            mercadopago.payments.get(paymentId).then((error, payment) => {
              // Obtenemos los datos del pago desde MP
              const orderId = payment.external_reference; // esto es el ID de la orden que especificamos en la linea 15
              
              console.log(orderId)
    // buscamos en nuestra db la orden
        // db.orders.find(orderId).then((order) => {
    
                console.log(order)
    
            if (order.totalPrice === payment.transaction_amount) { // para que no se nos hagan los vivos XD
    
                console.log('se pago el total')
            order.status = payment.status; // hay muchos estados, revisa https://www.mercadopago.cl/developers/es/reference/payments/_payments_search/get/
            
            // comprobamos que sea "approved" y que no hayamos entregado ya el pedido... recuerda que "order" es algo que
            // debes implementar tu, que podría tener un cambpo "delivered" para saber si ya hiciste entrega o no del
            // pedido
            if (order.status === 'approved' && !order.delivered) {
                console.log('aprobada')
                // deliverOrder(order); // función ficticia que debes implementar... es básicamente "entregar" el producto
            }
            }
        
    //   })
            });
        }

        return res.json({payment})
    } catch(e) {
        res.json({e})
    }
}


module.exports={getPreferenceId,getIPN}
