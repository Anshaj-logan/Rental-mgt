const express = require('express')
const mongoose = require('mongoose')
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
const registerRouter = require('./src/routes/api/registerRouter')
const signinRouter = require('./src/routes/api/signinRouter')
const productRouter = require('./src/routes/api/productRouter')


const app = express()
app.use(express.static('./public'))
app.set('view engine','ejs')
app.set('views','./src/views')
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser())
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader( 
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


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





app.use('/api/register/',registerRouter)
app.use('/api/login/',signinRouter)
app.use('/api/product/',productRouter)



app.get('/admin',(req,res)=>{
  res.render('login')
})
app.get('/dashboard',(req,res)=>{
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


const MONGODB_URL=
"mongodb+srv://maneeshmaitexa:maneeshmaitexa@cluster0.fv75o1k.mongodb.net/RentalDB?retryWrites=true&w=majority"


const port=2000;

mongoose.connect(MONGODB_URL).then(()=>{
    app.listen(port,()=>{
        console.log(`server running on port http://localhost:2000/admin`);
    })
}).catch((error)=>{
    console.log(` ${error} did not connect`); 
})