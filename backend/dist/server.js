"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const environment_1 = require("./environments/environment");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const settings_routes_1 = __importDefault(require("./routes/settings.routes"));
const realestate_routes_1 = __importDefault(require("./routes/realestate.routes"));
const offers_routes_1 = __importDefault(require("./routes/offers.routes"));
const app = express_1.default();
const assetsDir = path_1.default.join(__dirname, "assets");
console.log("assetsDir: " + assetsDir);
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use("/assets", express_1.default.static(assetsDir));
app.use(express_fileupload_1.default({
    createParentPath: true
}));
mongoose_1.default.connect("mongodb://localhost:27017/realestate");
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("Connected to the database.");
});
const router = express_1.default.Router();
router.use('/auth', auth_routes_1.default);
router.use('/user', user_routes_1.default);
router.use('/settings', settings_routes_1.default);
router.use('/real-estate', realestate_routes_1.default);
router.use('/offers', offers_routes_1.default);
app.use('/', router);
app.listen(environment_1.environment.port, () => console.log(`Express server running on port ${environment_1.environment.port}`));
//# sourceMappingURL=server.js.map