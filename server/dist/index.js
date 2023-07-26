"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expressApp_1 = __importDefault(require("./expressApp"));
const PORT = 3000;
expressApp_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
