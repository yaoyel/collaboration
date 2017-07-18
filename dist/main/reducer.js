"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var coordinations_1 = require("../coordinations");
var rootReducer = redux_1.combineReducers({
    userReducer: coordinations_1.userReducer,
    columnReducer: coordinations_1.columnReducer
});
exports.default = rootReducer;
//# sourceMappingURL=reducer.js.map