"use strict";
exports.__esModule = true;
exports.metadata = void 0;
var Logo_1 = require("@/components/Logo/Logo");
require("./globals.css");
var google_1 = require("next/font/google");
var link_1 = require("next/link");
var main_1 = require("@/context/main");
var inter = google_1.Inter({ subsets: ['latin'] });
exports.metadata = {
    title: 'Quiz APP',
    description: 'Vamos ver se tu é da T.I. mesmo'
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: inter.className },
            React.createElement(main_1.GlobalContextProvider, null,
                React.createElement(link_1["default"], { href: "/" },
                    React.createElement(Logo_1["default"], null)),
                children))));
}
exports["default"] = RootLayout;
