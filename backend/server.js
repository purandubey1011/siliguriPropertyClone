require("dotenv").config({path:"../.env"}); 
const connectdb = require("./src/db/db.js")
const app = require("./src/app.js");

app.listen(process.env.PORT, async () => {
    await connectdb();
    console.log(`Server is running on port ${process.env.PORT}`);
})
