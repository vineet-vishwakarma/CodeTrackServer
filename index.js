const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express.json());

// Use CORS middleware
app.use(
    cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
        optionsSuccessStatus: 204,
    })
);

app.post("/fetchusername", async (req, res) => {
    try {
        const url = String(req.body.url);
        const response = await axios.get(url);
        res.json(response.data);
        console.log(res.statusCode);
    } catch (error) {
        // console.log(error);
        res.json(error);
    }
});

app.post("/fetchgfg", async (req, res) => {
    try {
        const username = String(req.body.username);
        const response = await axios.get(
            `https://www.geeksforgeeks.org/user/${username}/`
        );
        res.json(response.data);
    } catch (error) {
        res.json(error);
    }
});

app.post("/fetchleetcode", async (req, res) => {
    try {
        const username = String(req.body.username);
        console.log(username);
        const response = await axios.get(
            `https://leetcode.com/graphql?query=query%20{%20userContestRanking(username:%20%20%22${username}%22)%20{%20attendedContestsCount%20rating%20topPercentage%20}%20recentAcSubmissionList(username:%20%22${username}%22,%20limit:%2025)%20{%20id%20title%20titleSlug%20timestamp%20}%20matchedUser(username:%20%22${username}%22)%20{%20username%20badges%20{%20id%20name%20shortName%20displayName%20icon%20hoverText%20medal%20{%20slug%20config%20{%20iconGif%20iconGifBackground%20}%20}%20creationDate%20category%20}userCalendar(year:%202024)%20{%20activeYears%20streak%20totalActiveDays%20dccBadges%20{%20timestamp%20badge%20{%20name%20icon%20}%20}%20submissionCalendar%20}%20activeBadge%20{%20displayName%20icon%20}%20submitStats:%20submitStatsGlobal%20{%20acSubmissionNum%20{%20difficulty%20count%20submissions%20}%20}%20languageProblemCount%20{%20languageName%20problemsSolved%20}%20problemsSolvedBeatsStats%20{%20difficulty%20percentage%20}%20}%20}`
        );
        res.json(response.data);
    } catch (error) {
        res.json(error);
    }
});

app.post("/complexity", async (req, res) => {
    // console.log(req);
    try {
        console.log(`res.body h ye ${req.body.url}`);
        const url = String(req.body.url);
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.json(error);
    }
});

app.get("/", (req, res) => {
    res.send("Server is live");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
