"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["Success"] = 200] = "Success";
    HttpStatusCode[HttpStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
