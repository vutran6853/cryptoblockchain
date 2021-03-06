const axios = require('axios');

let getActiveIcos  = (req, res, next) => {

  axios.get(`https://chasing-coins.com/api/v1/icos/active`)
  .then((response) => {
    // console.log(response.data)
    res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });
}

let getUpcomingIcos  = (req, res, next) => {

  axios.get(`https://chasing-coins.com/api/v1/icos/upcoming`)
  .then((response) => {
    // console.log(response.data)
    // res.status(200).send(response.data)
  })
  .catch((error) => {
    console.log(`Danger! Backend errror ${ error }`)
  });
}




module.exports = {
  getActiveIcos,
  getUpcomingIcos,
  
}