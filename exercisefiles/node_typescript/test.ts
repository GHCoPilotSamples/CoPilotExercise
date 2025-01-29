//write npm command line to install mocha
//command to run this test file
//mocha test.js

import * as assert from "assert"
import * as http from "http"
const server = require("./nodeserver")

describe("Node Server", () => {
  it('should return "key not passed" if key is not passed', (done) => {
    http.get("http://localhost:3000/Get", (res: http.IncomingMessage) => {
      let data = ""
      res.on("data", (chunk: string) => {
        data += chunk
      })
      res.on("end", () => {
        assert.strictEqual(data, "key not passed")
        done()
      })
    })
  })

  it("should return the value of the key if key is found", (done) => {
    http.get("http://localhost:3000/Get?key=world", (res: http.IncomingMessage) => {
      let data = ""
      res.on("data", (chunk: string) => {
        data += chunk
      })
      res.on("end", () => {
        assert.strictEqual(data, "hello world")
        done()
      })
    })
  })

  //write test for Validatephonenumber

  it('should return "valid" if phoneNumber is valid', (done) => {
    http.get("http://localhost:3000/Validatephonenumber?phoneNumber=34666666666", (res: http.IncomingMessage) => {
      let data = ""
      res.on("data", (chunk: string) => {
        data += chunk
      })
      res.on("end", () => {
        assert.strictEqual(data, "valid")
        done()
      })
    })
  })

     //write test for daysBetweenDates

  it('should return "1 days" if dates are 2020-01-01 and 2020-01-02', (done) => {
    http.get("http://localhost:3000/DaysBetweenDates?date1=2020-01-01&date2=2020-01-02", (res: http.IncomingMessage) => {
      let data = ""
      res.on("data", (chunk: string) => {
        data += chunk
      })
      res.on("end", () => {
        assert.strictEqual(data, "1 days")
        done()
      })
    })
  })
})

    //add test to check get when key is equal to world

   
    //write test to validate validateSpanishDNI
   

    //write test for returnColorCode red should return code #FF0000







