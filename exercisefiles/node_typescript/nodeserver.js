"use strict";
// write a nodejs server that will expose a method call "get" that will return the value of the key passed in the query string
// example: http://localhost:3000/get?key=hello
// if the key is not passed, return "key not passed"
// if the key is passed, return "hello" + key
// if the url has other methods, return "method not supported"
// when server is listening, log "server is listening on port 3000"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
const string_decoder_1 = require("string_decoder");
const server = http_1.default.createServer((req, res) => {
    var _a;
    const parsedUrl = url_1.default.parse(req.url || '', true);
    const path = parsedUrl.pathname;
    const trimmedPath = path === null || path === void 0 ? void 0 : path.replace(/^\/+|\/+$/g, '');
    const queryData = parsedUrl.query;
    const method = (_a = req.method) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const headers = req.headers;
    const decoder = new string_decoder_1.StringDecoder('utf-8');
    let buffer = '';
    req.on('data', (data) => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();
        if (trimmedPath === 'get' && method === 'get') {
            res.end('Hello, world!');
        }
        else if (trimmedPath === 'daysbetweendates' && method === 'get') {
            const date1 = queryData.date1;
            const date2 = queryData.date2;
            if (!date1 || !date2) {
                res.end('Both date1 and date2 query parameters are required');
                return;
            }
            const date1_ms = Date.parse(date1);
            const date2_ms = Date.parse(date2);
            if (isNaN(date1_ms) || isNaN(date2_ms)) {
                res.end('Invalid date format');
                return;
            }
            const difference_ms = date2_ms - date1_ms;
            const daysBetween = Math.round(difference_ms / 86400000);
            res.end(`${daysBetween} days`);
        }
        // Receive by querystring a parameter called phoneNumber
        //validate phoneNumber with Spanish format, for example +34666777888
        //if phoneNumber is valid return "valid"
        //if phoneNumber is not valid return "invalid"
        else if (trimmedPath === 'validatephonenumber' && method === 'get') {
            const phoneNumber = queryData.phoneNumber;
            if (!phoneNumber) {
                res.end('phoneNumber query parameter is required');
                return;
            }
            const isValid = /^\+34\d{9}$/.test(phoneNumber);
            if (isValid) {
                res.end('valid');
            }
            else {
                res.end('invalid');
            }
        }
        else {
            res.end('method not supported');
        }
    });
});
server.listen(3000, () => {
    console.log('server is listening on port 3000');
});
exports.default = server;
