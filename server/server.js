

require("dotenv").config();
const express = require("express"); //make server
const cors = require("cors");   //middleware to enable CORS
const axios = require("axios"); //send requests to external APIs
const { parse } = require("dotenv");
const mongoose = require("mongoose");
const Subscriber = require("./models/Subscriber");
const sendWelcomeEmail = require("./utils/sendEmail");


const app = express();

app.use(cors()); //enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({extended:true})); //parse URL-encoded bodies

//constant to store API key
const API_KEY = process.env.VITE_GNEWS_API_KEY;


/* 🔹 MONGODB CONNECTION */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

//fetch news function
function fetchNews(url, res) {
  axios.get(url)
  .then(response=>{
    if (response.data.articles && response.data.articles.length > 0) {

        res.json({
            status:200,
            success: true,
            message:"Successfully fetched news articles",
            data: response.data
        });
    }
    else{
        res.json({
            status:200,
            success:true,
            message:"No news articles found",

        })
    }
  }).catch(error=>{
    res.json({
        status:500,
        success:false,
        message:"Failed to fetch news articles",
        error: error.message
    })
  })
}


/*//define routes to get news articles
app.get("/all-news",(req,res)=>{
    let pageSize=parseInt(req.query.pageSize) || 40;
    let page=parseInt(req.query.page) || 1;
    const category = req.query.category || "general";
    
    const categoryKeywords = {
  technology: ["apple", "google", "microsoft", "ai"],
  business: ["market", "economy", "stock", "finance"],
  sports: ["cricket", "football", "fifa"],
  health: ["medical", "hospital", "vaccine"],
  entertainment: ["movie", "netflix", "music"],
  science: ["space", "nasa", "research", "innovation", "discovery"],
  general: ["world", "news", "global", "breaking","headline","international","update","report", "market","economy", "stock","finance"]
};


 const keywords = categoryKeywords[category] || categoryKeywords.general;
 const keyword = keywords[(page - 1) % keywords.length];   //rotation logic


  const url = `https://gnews.io/api/v4/search?q=${keyword}&lang=en&max=${pageSize}&page=${page}&apikey=${API_KEY}`;
  fetchNews(url,res);   //fetch url and respond us
});*/

//define routes to get news articles
app.get("/all-news",(req,res)=>{
    let pageSize=parseInt(req.query.pageSize) || 40;
    let page=parseInt(req.query.page) || 1;
    const categoryKeywords={
      general: ["world", "news", "global", "breaking","headline","international","update","report", "market","economy", "stock","finance"]
};
  const keywords = categoryKeywords["general"];
  const keyword = keywords[(page - 1) % keywords.length];

  const url = `https://gnews.io/api/v4/search?q=${keyword}&lang=en&max=${pageSize}&page=${page}&apikey=${API_KEY}`;
  fetchNews(url,res);   //fetch url and respond us
});

// route for top headlines
app.options("/top-headlines", cors());
app.get("/top-headlines",(req,res)=>{
  let pageSize=parseInt(req.query.pageSize) || 80;
  let page=parseInt(req.query.page) || 1;
  const country = req.query.country || "us";
  const url = `https://gnews.io/api/v4/top-headlines?country=${country}&lang=en&max=${pageSize}&page=${page}&apikey=${API_KEY}`;
  fetchNews(url,res);   //fetch url and respond us
});

// route for country specific news
app.options("/country/:iso", cors());
app.get("/country/:iso",(req,res)=>{
  let pageSize=parseInt(req.query.pageSize) || 80;
  let page=parseInt(req.query.page) || 1;
  const countryISO = req.params.iso || "us";
  const url = `https://gnews.io/api/v4/top-headlines?country=${countryISO}&lang=en&max=${pageSize}&page=${page}&apikey=${API_KEY}`;
  fetchNews(url,res);   //fetch url and respond us
})


/* 🔹 SUBSCRIBE ROUTE (⭐ NEW ⭐) */
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    await Subscriber.create({ email });

    await sendWelcomeEmail(email); // 👈 EMAIL SENT

    res.json({
      success: true,
      message: "Subscribed successfully 🎉 Check your email!!",
    });
  } catch (error) {
    res.status(409).json({
      success: false,
      message: "Already subscribed",
    });
  }
});



// set port
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
