// import { Router } from 'express';
const { Router } = require('express');
const userPerformance = require('../action/user/userPerformance')
 
const router = Router();
 
// fetches a list of users doesn't get any input parameters from the request.
router.get('/', async (req, res) => {
  const users = await req.context.models.User.find();
  return res.send(users);
});

router.get('/balance/:userId', async (req, res) => {
  // map through all portfolios, sum up total currentValues, subtract tht from user Totals funds
  // synchronousloy map through portfolios
  let id = req.params.userId
  const user = await req.context.models.User.findById(id)
  var portfoliosValue = 0
  for (var i = 0; i < user.portfolios.length; i++) {
    let pid = user.portfolios[i]
    let portfolio = await req.context.models.Portfolio.findById(pid)
    let value = portfolio.currentValue
    portfoliosValue += value
  }
  let returnValue = user.totalFunds - portfoliosValue
  return res.send({"returnValue": returnValue})
})

router.get('/leaders', async (req, res) => {
  const users = await req.context.models.User.find()
  let performancePercents = []
  for (var i = 0; i < users.length; i++) {
    let allPerformances = await userPerformance(users[i]._id, 30)
    let interval = Math.min(allPerformances.length, 30)
    let performancePercent = (allPerformances[0] - allPerformances[interval-1]) / allPerformances[interval-1] * 100
    performancePercents.push(performancePercent)
  }
  console.log(performancePercents)
  let rv = users.map((u, idx) => {
    console.log(u.followers.length)
    return {name: u.name, email: u.email, followers: u.followers.length, monthlyPerformance: performancePercents[idx], creationDate: u.createdAt}
  })
  return res.send({"rv": rv})
})
 
// has access to the user identifier to read the correct user from the MongoDB database.
router.get('/:userId', async (req, res) => {
  const user = await req.context.models.User.findById(
    req.params.userId,
  );
  return res.send(user);
});
 
// export default router;
// exports.router = router;
module.exports = router