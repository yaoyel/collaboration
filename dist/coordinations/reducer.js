"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var redux_actions_1 = require("redux-actions");
var ActionTypes_1 = require("./constants/ActionTypes");
var initalState = {
    Users: [{}],
    Columns: [{}]
};
var userReducer = redux_actions_1.handleActions((_a = {},
    _a[ActionTypes_1.LOGIN] = function (state, action) {
        return [action.payload].concat(state.Users);
    },
    _a[ActionTypes_1.LOGOUT] = function (state, action) {
        return state.Users.filter(function (user) { return user.id != action.payload.id; });
    },
    _a), initalState.Users);
exports.userReducer = userReducer;
var columnReducer = redux_actions_1.handleActions({
    UPDATE_COLUMN: function (state, action) {
        return state.Columns.map(function (col) { return (col.RowId === action.payload.RowId &&
            col.ColumnName == action.payload.ColumnName && col.Router == action.payload.Router) ?
            lodash_1.assign({}, col, { Text: action.payload.Text }) : col; });
    }
}, initalState.Columns);
exports.columnReducer = columnReducer;
var _a;
//# sourceMappingURL=reducer.js.map