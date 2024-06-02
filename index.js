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

app.post("/fetchgfg", async (req, res) => {
    const username = String(req.body.username);
    const response = await axios.get(
        `https://www.geeksforgeeks.org/user/${username}/`
    );
    res.json(response.data);
});

app.post("/fetchleetcode", async (req, res) => {
    const username = String(req.body.username);
    const response = await axios.get(
        `https://leetcode.com/graphql?query=query%20{%20userContestRanking(username:%20%20%22${username}%22)%20{%20attendedContestsCount%20rating%20topPercentage%20}%20recentAcSubmissionList(username:%20%22${username}%22,%20limit:%2025)%20{%20id%20title%20titleSlug%20timestamp%20}%20matchedUser(username:%20%22${username}%22)%20{%20username%20userCalendar(year:%202024)%20{%20activeYears%20streak%20totalActiveDays%20dccBadges%20{%20timestamp%20badge%20{%20name%20icon%20}%20}%20submissionCalendar%20}%20activeBadge%20{%20displayName%20icon%20}%20submitStats:%20submitStatsGlobal%20{%20acSubmissionNum%20{%20difficulty%20count%20submissions%20}%20}%20languageProblemCount%20{%20languageName%20problemsSolved%20}%20problemsSolvedBeatsStats%20{%20difficulty%20percentage%20}%20}%20}`
    );
    res.json(response.data);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
