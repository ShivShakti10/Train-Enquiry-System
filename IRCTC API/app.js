const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.urlencoded({extended:false}));
app.set("view engine","ejs");

app.get("/", (req, res) =>{
    res.send("😁");
})



app.get("/search", async(req ,res) =>{
    const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v1/searchTrain',
        params: {query: '190'},
        headers: {
          'X-RapidAPI-Key': 'e628deded2msh8a9d7e3e1616966p19aa99jsnc1c43a2edda4',
          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
    res.send("😀")
});

app.get("/trains-between-stations", (req, res) =>{
    res.render("tbs")
})

app.post("/trains-between-stations",async(req, res)=>{
    try {
        let fromStationCode,toStationCode,dateOfJourney = req.body;

    let date = JSON.stringify(dateOfJourney);
    // console.log(fromStationCode,toStationCode,dateOfJourney);
    const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v3/trainBetweenStations',
        params: {
          fromStationCode:`${fromStationCode}`,
          toStationCode: `${toStationCode}`,
          dateOfJourney: `${date}`
        },
        headers: {
          'X-RapidAPI-Key': 'e628deded2msh8a9d7e3e1616966p19aa99jsnc1c43a2edda4',
          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
      };
      
      
          const response = await axios.request(options);
          console.log("Response",response);
      } catch (error) {
          console.error(error.message);
      }
});

app.get("/train-schedule" , (req, res) =>{
    res.render("ts")
});

app.post("/train-schedule" , async(req, res) =>{
    let trainNo = req.body;
    let trainNumber = JSON.stringify(trainNo);
    console.log(trainNumber);

    const options = {
        method: 'GET',
        url: 'https://irctc1.p.rapidapi.com/api/v1/getTrainSchedule',
        params: {trainNo: `${trainNumber}`},
        headers: {
          'X-RapidAPI-Key': 'e628deded2msh8a9d7e3e1616966p19aa99jsnc1c43a2edda4',
          'X-RapidAPI-Host': 'irctc1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }

    
})




app.listen(8001, ()=>{
    console.log(`Server running on port 8001`)
})