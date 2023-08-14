"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAmount = void 0;
const getAmount = (ar) => ar.reduce((acc, cur) => acc + cur.price * cur.count, 0) * 100;
exports.getAmount = getAmount;
