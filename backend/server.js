const app = require('./app');
const { connectDatabase } = require("./config/database")

connectDatabase()

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));