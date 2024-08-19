import express from "express"
import cookieParser from "cookie-parser"
import user from "./routes/user.routes.js"
import forgetpassword from "./routes/forgetpassword.js"
import todo from "./routes/todo.js"
// import
import cors from "cors";
const app = express()

app.use(cors({
  credentials: true,
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200
}));

app.use(express())
app.use(express.json())
app.use(express.urlencoded({extended: false, limit: "16kb"}))
app.use(cookieParser())
app.use(express.static("public"));


app.use("/api", user )
app.use("/api", forgetpassword )
app.use("/api", todo )

// app.use("/api", changepassword )


// app.post("/api/ip", (req, res)=>{
//   const ip = req.header['x-forwarded-for'] || req.ip || req.connection.remoteAddress
//   console.log("request ip is", ip)
//   res.send("request proceed")
// })
export {app}

