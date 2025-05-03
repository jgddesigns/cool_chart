"use strict";
'use client';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RadarChart;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importStar(require("react"));
var colors_1 = require("./etc/colors");
var RadarChart_module_css_1 = __importDefault(require("./RadarChart.module.css"));
function RadarChart(props) {
    var _a = react_1.default.useState(null), PointsOriginal = _a[0], setPointsOriginal = _a[1];
    var _b = react_1.default.useState(null), PointsAdjusted = _b[0], setPointsAdjusted = _b[1];
    var _c = react_1.default.useState({}), DisplayedRadar = _c[0], setDisplayedRadar = _c[1];
    var _d = react_1.default.useState(""), DisplayedStyle = _d[0], setDisplayedStyle = _d[1];
    var _e = react_1.default.useState(["", "", "", "", "", "", "", ""]), TextValues = _e[0], setTextValues = _e[1];
    var _f = react_1.default.useState(["", "", "", "", "", "", "", ""]), PercentValues = _f[0], setPercentValues = _f[1];
    var _g = react_1.default.useState(null), PointValue = _g[0], setPointValue = _g[1];
    var _h = react_1.default.useState(""), BackgroundColor = _h[0], setBackgroundColor = _h[1];
    var sizes = ["100px", "200px", "300px", "500px"];
    var ending_points = [
        [0, 0],
        [25, 0],
        [50, 0],
        [75, 0],
        [100, 0],
        [87.5, 12.5],
        [100, 25],
        [100, 50],
        [100, 62.5],
        [100, 75],
        [100, 100],
        [75, 100],
        [50, 100],
        [25, 100],
        [0, 62.5],
        [0, 100],
        [0, 75],
        [0, 50],
        [0, 25],
        [12.5, 12.5]
    ];
    var points_array = {
        "3": [2, 10, 15],
        "4": [0, 4, 10, 15],
        "5": [2, 7, 11, 13, 17],
        "6": [1, 3, 7, 11, 13, 17],
        "7": [2, 5, 8, 11, 13, 14, 19],
        "8": [1, 3, 6, 9, 11, 13, 16, 18]
    };
    var hex_letters = ["a", "b", "c", "d", "e", "f"];
    var start_value = "polygon(";
    var end_value = ")";
    (0, react_1.useEffect)(function () {
        is_color() ? setBackgroundColor(props.Color) : setBackgroundColor("#c2c2c2");
        props.Data ? setPointValue(Object.keys(props.Data).length) : null;
    }, []);
    (0, react_1.useEffect)(function () {
        PointValue ? calculate_points(PointValue) : null;
    }, [PointValue]);
    (0, react_1.useEffect)(function () {
        PointsOriginal ? adjust_points(props.Data) : null;
    }, [PointsOriginal]);
    (0, react_1.useEffect)(function () {
        PointsAdjusted ? build_display() : null;
    }, [PointsAdjusted]);
    function is_color() {
        if (colors_1.css_colors.includes(props.Color)) {
            return true;
        }
        if (props.Color && props.Color[0] === "#" && (props.Color.length > 3 && props.Color.length < 8)) {
            for (var i = 1; i < props.Color.length; i++) {
                if (isNaN(props.Color[i])) {
                    if (!hex_letters.includes(props.Color[i].toLowerCase())) {
                        return false;
                    }
                }
                else {
                    if (props.Color[i] > 9) {
                        return false;
                    }
                }
            }

            return true;
        }

        return false;
    }
    function build_values(values) {
        var temp_arr = [];
        for (var i = 0; i < values.length; i++) {
            temp_arr.push(ending_points[values[i]]);
        }

        setPointsOriginal(temp_arr);
        return temp_arr;
    }
    function build_display() {
        var temp_arr = PointsAdjusted;
        var temp_display = start_value;
        var temp_style = "";
        for (var i = 0; i < temp_arr.length; i++) {
            i != temp_arr.length - 1 ? temp_display = temp_display + temp_arr[i][0].toString() + "% " + temp_arr[i][1].toString() + "%, " : temp_display = temp_display + temp_arr[i][0].toString() + "% " + temp_arr[i][1].toString() + "%";
        }
        temp_display = temp_display + end_value;
        setDisplayedRadar(temp_display);
        setDisplayedStyle(get_dimensions());
    }
    function get_dimensions() {
        if (!isNaN(props.Size) && props.Size < 5) {
            return sizes[props.Size - 1];
        }
        return sizes[2];
    }
    function calculate_points(points) {
        build_values(points_array[points]);
        set_text();
    }
    function get_text(place) {
        return Object.keys(props.Data)[place - 1];
    }
    function get_value(place) {
        var value = Math.round(get_percent(props.Data[Object.keys(props.Data)[place - 1]]) * 100) + "%";
        return value;
    }
    function set_text() {
        switch (PointValue) {
            case 3:
                setTextValues(["", get_text(1), "", "", "", "", get_text(2), "", get_text(3), "", "", ""]);
                setPercentValues(["", get_value(1), "", "", "", "", get_value(2), "", get_value(3), "", "", ""]);
                break;
            case 4:
                setTextValues([get_text(1), "", get_text(2), "", "", "", get_text(3), "", get_text(4), "", "", ""]);
                setPercentValues([get_value(1), "", get_value(2), "", "", "", get_value(3), "", get_value(4), "", "", ""]);
                break;
            case 5:
                setTextValues(["", get_text(1), "", "", get_text(2), "", get_text(3), "", get_text(4), "", get_text(5), ""]);
                setPercentValues(["", get_value(1), "", "", get_value(2), "", get_value(3), "", get_value(4), "", get_value(5), ""]);
                break;
            case 6:
                setTextValues([get_text(1), "", get_text(2), "", get_text(3), "", get_text(4), "", get_text(5), "", get_text(6), ""]);
                setPercentValues([get_value(1), "", get_value(2), "", get_value(3), "", get_value(4), "", get_value(5), "", get_value(6), ""]);
                break;
            case 7:
                setTextValues([get_text(1), get_text(2), get_text(3), "", get_text(4), "", get_text(5), "", get_text(6), "", get_text(7), ""]);
                setPercentValues([get_value(1), get_value(2), get_value(3), "", get_value(4), "", get_value(5), "", get_value(6), "", get_value(7), ""]);
                break;
            case 8:
                setTextValues([get_text(1), "", get_text(2), get_text(3), "", get_text(4), get_text(5), "", get_text(6), get_text(7), "", get_text(8)]);
                setPercentValues([get_value(1), "", get_value(2), get_value(3), "", get_value(4), get_value(5), "", get_value(6), get_value(7), "", get_value(8)]);
                break;
        }
    }
    function adjust_points(values) {
        var temp_arr = PointsOriginal;

        for (var i = 0; i < temp_arr.length; i++) {
            temp_arr[i][0] > 1 && temp_arr[i][0] < 50 ? temp_arr[i][0] = temp_arr[i][0] * Math.abs(1 + (1 - get_percent(values[Object.keys(values)[i]]))) : null;
            temp_arr[i][0] > 50 && temp_arr[i][0] < 100 ? temp_arr[i][0] = 50 + (Math.abs(temp_arr[i][0] - 50) * get_percent(values[Object.keys(values)[i]])) : null;
            temp_arr[i][0] == 100 ? temp_arr[i][0] = 50 + 50 * get_percent(values[Object.keys(values)[i]]) : null;
            temp_arr[i][0] == 0 ? temp_arr[i][0] = 0 + 50 * (1 - get_percent(values[Object.keys(values)[i]])) : null;
            temp_arr[i][1] > 1 && temp_arr[i][1] < 50 ? temp_arr[i][1] = temp_arr[i][1] * Math.abs(1 + (1 - get_percent(values[Object.keys(values)[i]]))) : null;
            temp_arr[i][1] == 100 ? temp_arr[i][1] = 50 + 50 * get_percent(values[Object.keys(values)[i]]) : null;
            temp_arr[i][1] == 0 ? temp_arr[i][1] = 50 - (50 * get_percent(values[Object.keys(values)[i]])) : null;
        }
        setPointsAdjusted(temp_arr);
    }
    function get_percent(values) {

        if (!isNaN(values[0])) {
            return values[0] / values[1];
        }

        return values
    }
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.container, children: [(0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.header, children: [(0, jsx_runtime_1.jsx)("div", { className: RadarChart_module_css_1.default.title, children: props.Title ? props.Title : "Radar Chart" }), !props.Data ?
                            (0, jsx_runtime_1.jsx)("div", { className: RadarChart_module_css_1.default.subtitle, style: { whiteSpace: "pre-line" }, children: "\"No Data Initialized. \\n\\nEnsure that a prop called 'Data' is passed and it contains a json object.\"" })
                            : null] }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.row_container, children: [(0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[0] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[0] })] }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[1] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[1] })] }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[2] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[2] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.secondary_row, children: [(0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[11] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[11] })] }), (0, jsx_runtime_1.jsx)("div", { className: RadarChart_module_css_1.default.filler_row }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[3] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[3] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.main_row, children: [(0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[10] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[10] })] }), DisplayedStyle ?
                            (0, jsx_runtime_1.jsx)("div", { style: { clipPath: DisplayedRadar, backgroundColor: BackgroundColor, width: get_dimensions(), height: get_dimensions() } })
                            : null, (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[4] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[4] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.secondary_row, children: [(0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[9] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[9] })] }), (0, jsx_runtime_1.jsx)("div", { className: RadarChart_module_css_1.default.filler_row }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[5] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[5] })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.row_container, children: [(0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[8] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[8] })] }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[7] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[7] })] }), (0, jsx_runtime_1.jsxs)("div", { className: RadarChart_module_css_1.default.column_container, children: [(0, jsx_runtime_1.jsx)("span", { className: RadarChart_module_css_1.default.attribute_text, children: TextValues[6] }), (0, jsx_runtime_1.jsx)("span", { children: PercentValues[6] })] })] })] }) }));
}
