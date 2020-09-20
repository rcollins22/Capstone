// import { Router } from 'express';
const { Router } = require('express');
const userPerformance = require('../action/user/userPerformance')
 
const router = Router();
 
// fetches a list of users doesn't get any input parameters from the request.
router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get('/addUser', async (req, res) => { 
})

router.get('/name/:id', async (req, res) => {
  const user = await req.context.models.User.findById(req.params.id);
  return res.send({"rv": user.name})
});

router.get('/balance/:userId', async (req, res) => {
  // map through all portfolios, sum up total currentValues, subtract tht from user Totals funds
  // synchronousloy map through portfolios
  let id = req.params.userId
  const user = await req.context.models.User.findById(id)
  var portfoliosValue = 0
  // for (var i = 0; i < user.portfolios.length; i++) {
  //   let pid = user.portfolios[i]
  //   let portfolio = await req.context.models.Portfolio.findById(pid)
  //   let value = portfolio.currentValue
  //   portfoliosValue += value
  // }
  let returnValue = user.usableFunds
  return res.send({"returnValue": returnValue})
})

router.get('/followers/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(req.params.userId)
  res.send(`${user.followers}`)
})

router.get('/leaders', async (req, res) => {
  const users = await req.context.models.User.find()
  const leaders = users.filter(u => u.leader==true)
  let performancePercents = []
  for (var i = 0; i < leaders.length; i++) {
    let allPerformances = await userPerformance(leaders[i]._id, 30)
    let interval = Math.min(allPerformances.length, 30)
    let performancePercent = (allPerformances[0] - allPerformances[interval-1]) / allPerformances[interval-1] * 100
    performancePercents.push(performancePercent)
  }
  let rv = leaders.map((u, idx) => {
    return {name: u.name, email: u.email, followers: u.followers, monthlyPerformance: performancePercents[idx], creationDate: u.createdAt, id: u._id}
  })
  return res.send({"rv": rv})
})
// { name: 'Kevin', chg: -2.41 }
router.get('/follower/leaders', async (req, res) => {
  const users = await req.context.models.User.find()
  const leaders = users.filter(u => u.leader==true)
  let performancePercents = []
  for (var i = 0; i < leaders.length; i++) {
    let allPerformances = await userPerformance(leaders[i]._id, 30)
    let interval = Math.min(allPerformances.length, 30)
    let performancePercent = (allPerformances[0] - allPerformances[interval-1]) / allPerformances[interval-1] * 100
    performancePercents.push(performancePercent)
  }
  let rv = leaders.map((u, idx) => {
    return {name: u.name, chg: performancePercents[idx], id: u._id}
  })
  return res.send({"rv": rv})
})
// [3.8, 43]
// day, value
// for every 
router.get('/follower/leaders/data', async (req, res) => {
  const users = await req.context.models.User.find()
  const leaders = users.filter(u => u.leader==true)
  let allUsersPerformances = []
  for (var i = 0; i < leaders.length; i++) {
    let userPerformances = await userPerformance(leaders[i]._id, 30) // list of all performances for a user
    userPerformances = userPerformances.reverse()
    let result = userPerformances.map((p, idx) => { // map through and add date
      return [idx+1, p]
    })
    allUsersPerformances.push(result) // push this user to the final array
  }
  return res.send({"rv": allUsersPerformances})
})
 
// has access to the user identifier to read the correct user from the MongoDB database.
router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});

router.get('/overall-performance/:userId', async (req, res) => {
  // returns overall percentage of change over specified period of time. /overall-performance?days=2 //
  try {
      const user = await req.context.models.User.findById(req.params.userId) // current user id
      var totalPortfoliosPercentChange = 0; //
      var dayIncreaseOrDecrease = 0

      user.portfolios.forEach(async port => {
          let portfolio = await req.context.models.Portfolio.findById(port._id);
          let days = 2//req.query.days // req query days count
          const range = portfolio.history.length >= days && days != 0 ? days : portfolio.history.length
          let dayRange = portfolio.history.slice(0, range)
          // Calculate differences and sum percentage changed.
          let difference = dayRange[0].value - dayRange.slice(-1)[0].value
          let percent = (difference / dayRange[0].value) * 100 // if its negative - its a increase; if its positive - its a decrease.
          let percentChange = percent < 0 ? Math.abs(percent) : -Math.abs(percent) // invert negative and positive signs. 20% = increase, -20% = decrease
          totalPortfoliosPercentChange+=percentChange // add the percent change to the total percent change.
          dayIncreaseOrDecrease = difference > 0 ? -Math.abs(difference) : Math.abs(difference)
          if (port == user.portfolios.slice(-1)[0]) {
              // last portfolio finished calculating
              // send total percentage changed
              let pChanged2Decimals = Number(totalPortfoliosPercentChange).toFixed(2);
              let vChanged2Decimals = Number(dayIncreaseOrDecrease).toFixed(2);
              return res.json({percent: pChanged2Decimals, value: vChanged2Decimals})
          }
      });
  } catch (err) {
      // user can't be found
      return res.send(err)
  }
})

router.get('/total-balance/:userId', async (req, res)=> {
  try {
      const user = await req.context.models.User.findById(req.params.userId) // current user id
      return res.send(user.totalFunds)
  } catch (err) {
      // user can't be found
      return res.send(err)
  }
})

// will send performance in percentage of any specific portfolio over 'x' amount of days. /213241421?days=2
router.get('/portfolio/:portfolioId', async (req, res) => {
  try {
      let portfolio = await req.context.models.Portfolio.findById(req.params.portfolioId);
      let days = req.query.days // req query days count
      const range = portfolio.history.length >= days && days != 0 ? days : portfolio.history.length
      let dayRange = portfolio.history.slice(0, range)

      // Calculate differences and sum percentage changed.
      let difference = dayRange[0].value - dayRange.slice(-1)[0].value
      let percent = (difference / dayRange[0].value) * 100 // if its negative - its a increase; if its positive - its a decrease.
      let percentChange = percent < 0 ? Math.abs(percent) : -Math.abs(percent) // invert negative and positive signs. 20% = increase, -20% = decrease
      res.send(`${percentChange}`)

  } catch (err) {
      res.send("Can't Find Portfolio")
  }
})
 
// export default router;
// exports.router = router;
module.exports = router