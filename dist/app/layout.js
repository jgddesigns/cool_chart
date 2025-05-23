"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
var jsx_runtime_1 = require("react/jsx-runtime");
var google_1 = require("next/font/google");
require("./globals.css");
var geistSans = (0, google_1.Geist)({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});
var geistMono = (0, google_1.Geist_Mono)({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});
exports.metadata = {
    title: "Group Message Demo",
    description: "",
};
function RootLayout(_a) {
    var children = _a.children;
    return ((0, jsx_runtime_1.jsx)("html", { lang: "en", children: (0, jsx_runtime_1.jsx)("body", { className: "".concat(geistSans.variable, " ").concat(geistMono.variable), children: children }) }));
}
