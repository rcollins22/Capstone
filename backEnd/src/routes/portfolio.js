// import { Router } from 'express';
const { Router } = require('express');

 
const router = Router();
//  return all portfolios saved in the database
router.get('/', async (req, res) => {
  const portfolios = await req.context.models.Portfolio.find();
  return res.send(portfolios);
});
//  return a portfolio by id
router.get('/:portfolioId', async (req, res) => {
  const portfolio = await req.context.models.Portfolio.findById(
    req.params.portfolioId,
  );
  return res.send(portfolio);
});

// return a portfolio history over the last x days
router.get('/history/:portfolioId', async (req, res) => {
    let interval = req.query.days;
    let portfolio = await req.context.models.Portfolio.findById(req.params.portfolioId);
    interval = Math.min(portfolio.history.length, req.query.days)
    rv = portfolio.history.slice(0).slice(-interval)
  return res.send(rv)
})

router.get('/portfolio-allocations/:userId', async (req, res) => {
  // returns each portfolio's name and amount of funds in the portfolio
  try {
   const user = await req.context.models.User.findById(req.params.userId) // get current user
   var portfolioInfo = []

   user[0].portfolios.forEach(async port => {
       let portfolio = await req.context.models.Portfolio.findById(port._id);
       const pf = {name: portfolio.name, startingValue: portfolio.startingValue} //
       portfolioInfo.push(pf)

       if (port == user[0].portfolios.slice(-1)[0]) {
           // last portfolio finished calculating
           return res.send(portfolioInfo) // send all porfolio infos.
       }
   });
 } catch (err) {
     // user can't be found
     return res.send(err)
 }
});

//  create a new portfolio
router.post('/', async (req, res) => {
  // needs to be updated
  // const portfolio = await req.context.models.Portfolio.create({
  //   name: req.body.name,
  //   user: req.context.currentUser.id,
  //   funds: 0,
  //   percent_allocated: 0,
  //   active: false,
  //   asset_num: 0,
  //   last_rebalance: new Date(),
  // });
 
  return res.send(message);
});
// update portfolio based on form
router.put('/update/:portfolioId', async (req, res) => {
    const portfolio = await req.context.models.Portfolio.save({
      name: req.body.name,
      user: req.context.currentUser.id,
      funds: req.body.funds,
      percent_allocated: req.body.percent_allocated,
      active: req.body.active,
      asset_num: req.body.asset_num,
    // can not be handled by user
    //   last_rebalance: new Date(), 
    });

    return res.json(portfolio);
});

// do a fetch and use the method from API. have express.json
router.delete('/delete/:portfolioId', async (req, res) => {
  const portfolio = await req.context.models.Portfolio.findById(
    req.params.portfolioId,
  );
 
  if (portfolio) {
    await portfolio.remove();
  }
 
  return res.send(portfolio);
});
 
// export default router;
module.exports = router;

// name: req.body.name
// active: req.body.active
// usableFunds: req.body.usableFunds
// startingValue: { // What

// },
// currentValue: { // changes of all of the stocks accounted for. Sum of all tickerCurrValues
//   type: Number,
//   required: true
// },
// // Array of all the tickers: [{symbol : 'TSLA', allocation: 21, currValue: 20}, {symbol : 'AMZN', allocation: 79, currValue: 80}]
// tickers: [{
//   symbol: String,
//   allocation: Number,
//   desiredAllocation: Number,
//   currValue: Number,
//   units: Number,
// }],
// followers: { 
//   type: Array,
//   required: true,
// },
// history: [{
//   date: Date,
//   value: Number
// }],
// user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},