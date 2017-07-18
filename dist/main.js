"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var coordination_1 = require("./coordinations/components/coordination");
var reducer_1 = require("./main/reducer");
var initalState = {
    Users: null,
    Columns: [{ RowId: "1", Router: "/update", ColumnName: "test" }]
};
var store = redux_1.createStore(reducer_1.default, initalState);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(coordination_1.default, null)), document.getElementById('app'));
//# sourceMappingURL=main.js.map