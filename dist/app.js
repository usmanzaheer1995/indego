"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var app = express_1.default();
exports.default = app;
