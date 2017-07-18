"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_actions_1 = require("redux-actions");
var ActionTypes_1 = require("./constants/ActionTypes");
var login = redux_actions_1.createAction(ActionTypes_1.LOGIN, function (user) { return user; });
exports.login = login;
var logout = redux_actions_1.createAction(ActionTypes_1.LOGOUT, function (user) { return user; });
exports.logout = logout;
var updateColumn = redux_actions_1.createAction(ActionTypes_1.UPDATE_COLUMN, function (column) { return column; });
exports.updateColumn = updateColumn;
//# sourceMappingURL=actions.js.map