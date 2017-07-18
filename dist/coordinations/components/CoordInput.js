"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var CoorInput = function (props) {
    var coorInputAttrs = { 'rowId': "" + props.Col.RowId, 'router': "" + props.Col.Router, 'colName': "" + props.Col.ColumnName };
    return (React.createElement("input", __assign({ disabled: _this.prop.Col.IsLock }, coorInputAttrs)));
};
CoorInput.propTypes = {
    RowId: React.PropTypes.string.isRequired,
    Router: React.PropTypes.string.isRequired,
    ColumnName: React.PropTypes.string.isRequired
};
exports.default = CoorInput;
//# sourceMappingURL=CoordInput.js.map