// import { Router } from 'express';
const { Router } = require('express');
const { models } = require('../models')
const allocate = require('../action/portfolio/allocateStock').allocate


const findNewPortfolio = async (userId) => {
    const portfolios = await models.Portfolio.find(); // all portfolios
    // // just for testing purposes
    // return portfolios[0]
    const ports = portfolios.filter(p => p.user.toString() === userId.toString()) // all portfolios for this user
    const p = ports.find(p => p.history.length == 0) //only a new portfolio would have zero history
  return p
}
 
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

//  create a new portfolio
router.post('/name/:name/:id', async (req, res) => {
  // needs to be updated
  console.log(req.params.id)
  const portfolio = await req.context.models.Portfolio.create({
    name: req.params.name,
    active: false,
    usableFunds: 0,
    startingValue: 0,
    currentValue: 0,
    tickers: [],
    followers: false,
    history: [],
    user: req.params.id
  });
  // await portfolio.save()
  return res.send({"rv": portfolio});
});
// update portfolio funds based on id
router.post('/addFunds/:id/:funds', async (req, res) => {
  console.log(req) // how do I grab the payload???
  let userId = req.params.id
  let data = req.params.funds
  // find portfolio by name and update funds based on post data
  let p = await findNewPortfolio(userId)
  await models.Portfolio.updateOne({ _id: p._id },
    { usableFunds: data })
  return res.send({"rv": p});
});

// add portfolio tickers based on id
router.post('/addTickers/:id/', async (req, res) => {
  let tickers = req.query.tickers.split(',')
  console.log(tickers)
  let userId = req.params.id
  // find portfolio by name and update funds based on post data
  let p = await findNewPortfolio(userId)
  let tickerData = tickers.map(t => {
    return {symbol: t, allocation: 0, desiredAllocation: 0, currValue: 0, units: 0}
  })
  await models.Portfolio.updateOne({ _id: p._id },
    { tickers: tickerData })
  return res.send("Complete");
});

router.get('/portfolio-allocations/:userId', async (req, res) => {
  // returns each portfolio's name and amount of funds in the portfolio
  const user = await req.context.models.User.findById(req.params.userId) // get current user
  var portfolioInfo = []
  for (let i = 0; i<user.portfolios.length; i++) {
    let portfolio = await req.context.models.Portfolio.findById(user.portfolios[i]._id);
    portfolioInfo.push({name: portfolio.name, currentValue: portfolio.currentValue})
    }
  return res.send({"rv": portfolioInfo, unAllocated: user.usableFunds})
})

// return new portfolio tickers based on id
router.get('/addTickers/:id', async (req, res) => {
  let userId = req.params.id
  // find portfolio by name and update funds based on post data
  let p = await findNewPortfolio(userId)
  let tickerData = p.tickers.map(t => {
    return {symbol: t.symbol, allocation: 0}
  })
  res.send({"tickerData": tickerData})
});

// add allocations to portfolio tickers based on id
router.get('/addAllocations/:id', async (req, res) => {
  let symbols = req.query.symbols.split(',')
  let allocations = req.query.allocations.split(',')
  let userId = req.params.id
  allocationNums = allocations.map(a=>parseInt(a))
  console.log(symbols, "server line 120")
  console.log(allocations, "server line 120")
  console.log(allocationNums)
  // find portfolio by name and update funds based on post data
  let p = await findNewPortfolio(userId)
  let newTickers = symbols.map((t, idx) => {
    return {symbol: t, allocation: 0, desiredAllocation: allocationNums[idx], currValue: 0, units: 0}
  })
  console.log(newTickers)
  await models.Portfolio.updateOne({ _id: p._id },
    { tickers: newTickers })
  // wait until schedule update to allocate
  // // allocate portfolio
  // for (let i = 0; i < p.tickers.length; i++) {
  //   let ticker = p.tickers[i]
  //   await allocate(p._id, ticker.desiredAllocation, ticker.symbol)
  // }
  let finalP = req.context.models.Portfolio.findById(p._id)
  return res.send({"rv":p});
});
// update portfolio based on form
router.put('/update/:userId/:name', async (req, res) => {
    // find portfolio by name and userID
    let userId = req.params.id
    let name = req.params.name
    
    

    return res.send(portfolio);
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