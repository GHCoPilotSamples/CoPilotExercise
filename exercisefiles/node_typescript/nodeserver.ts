import http from "http"
import url from "url"
import fs from "fs"
import zlib from "zlib"
import readline from "readline"

const server = http.createServer((req, res) => {
  if (!req.url) {
    res.end("Invalid request")
    return
  }

  const parsedUrl = url.parse(req.url, true)
  const queryData = parsedUrl.query

 // Calculate days between two dates
 //receive by query string 2 parameters date1 and date 2, and calculate the days between those two dates.

  if (req.url.startsWith("/DaysBetweenDates")) {
    const date1 = queryData.date1 as string
    const date2 = queryData.date2 as string

    const date1_ms = Date.parse(date1)
    const date2_ms = Date.parse(date2)

    const difference_ms = date2_ms - date1_ms

    res.end(Math.round(difference_ms / 86400000) + " days")
  } 
  
  //Receive by querystring a parameter called phoneNumber
  //validate phoneNumber with Spanish format, for example +34666777888
  //if phoneNumber is valid return "valid"
  //if phoneNumber is not valid return "invalid"

  else if (req.url.startsWith("/Validatephonenumber")) {
    const phoneNumber = queryData.phoneNumber as string

    const regex = /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}$/

    if (regex.test(phoneNumber)) {
      res.end("valid")
    } else {
      res.end("invalid")
    }
  } 
  
  //Return a hello world message
  else if (req.url.startsWith("/Get")) {
    const key = queryData.key as string

    if (!key) {
      res.end("key not passed")
    } else {
      res.end("hello " + escape(key))
    }
  } else {
    res.end("Called method not found")
  }
})

server.listen(3000, () => {
  console.log("server is listening on port 3000")
})
