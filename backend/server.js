const app = require('./app');
const { connectDatabase } = require("./config/database")
// const cookieParser = require("cookie-parser");
// const sessions = require('express-session');
// const register = require("./routes/register");
// const login = require("./routes/login");
// const pwdReset = require("./routes/passwordReset");
// const post = require("./routes/post");
// const connection = require("./db");

// const app = express();
// connection()
connectDatabase()
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// if(process.env.NODE_ENV !== "production") {
//   require("dotenv").config
// }

// const oneDay = 1000 * 60 * 60 * 24;
// app.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false 
// }));

// app.use("/", register);
// app.use("/", login);
// app.use("/", pwdReset);
// app.use("/", post);



const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));