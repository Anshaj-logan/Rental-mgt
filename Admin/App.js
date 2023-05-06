const express = require('express')
var bodyParser = require('body-parser')
const ProductRouter = require('./src/routes/ProductRouter')
const FeedbackRouter = require('./src/routes/FeedbackRouter')
const ManageuserRouter = require('./src/routes/ManageuserRouter')
const ManagedeliveryRouter = require('./src/routes/ManagedeliveryRouter')
const OrdersRouter = require('./src/routes/OrdersRouter')
const PaymentRouter = require('./src/routes/PaymentRouter')
const DeliveryRouter = require('./src/routes/DeliveryRouter')
const ComplaintRouter = require('./src/routes/ComplaintRouter')
const productoldmodel = require('./src/models/ProductOld')
const RegRouter = require('./src/routes/RegRouter')
const UsermsgRouter = require('./src/routes/UsermsgRouter')
const BillingRouter = require('./src/routes/BillingRouter')
const ShippingRouter = require('./src/routes/ShippingRouter')

const app = express()
app.use(express.static('./public'))
app.set('view engine','ejs')
app.set('views','./src/views')
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/user',ManageuserRouter)
app.use('/delivery',ManagedeliveryRouter)
app.use('/product',ProductRouter)
app.use('/orders',OrdersRouter)
app.use('/payment',PaymentRouter)
app.use('/delivery',DeliveryRouter)
app.use('/feedback',FeedbackRouter)
app.use('/complaint',ComplaintRouter)
app.use('/usermsg',UsermsgRouter)
app.use('/billing',BillingRouter)
app.use('/shipping',ShippingRouter)



app.use('/reg',RegRouter)



app.get('/',(req,res)=>{
  res.render('dashboard')
})


app.get('/oldproduct', async function (req, res) {
    
  try {
    const data=await productoldmodel.find()
    console.log(data);
    res.render('1oldProduct',{data})
  } catch (error) {
    
  }
  
})


app.listen(2000,()=>
{
  console.log("server started at http://localhost:2000")
})