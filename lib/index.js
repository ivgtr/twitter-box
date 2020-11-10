"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var node_fetch_1 = __importDefault(require("node-fetch"));
var rest_1 = require("@octokit/rest");
var dotenv = __importStar(require("dotenv"));
var dayjs_1 = __importDefault(require("dayjs"));
dotenv.config();
var _a = process.env, gistId = _a.GIST_ID, githubToken = _a.GH_TOKEN, twitterId = _a.TWITTER_ID, twitterToken = _a.TWITTER_TOKEN;
var octokit = new rest_1.Octokit({ auth: "token " + githubToken });
var requestTwitterTimeline = function (totalTimelineData) {
    if (totalTimelineData === void 0) { totalTimelineData = {
        tweetCount: 0,
        rtCount: 0,
        lastId: undefined,
        countOver: false
    }; }
    return __awaiter(void 0, void 0, void 0, function () {
        var headers, options, yesterday, count, url, timelineData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    headers = {
                        Authorization: "Bearer " + twitterToken
                    };
                    options = {
                        method: 'GET',
                        headers: headers
                    };
                    yesterday = dayjs_1["default"]().subtract(1, 'day').format('YYYY-MM-DD');
                    count = 100;
                    url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            url += "?screen_name=" + twitterId + "&count=" + count + "&trim_user=true";
                            if (totalTimelineData.lastId) {
                                url += "&max_id=" + totalTimelineData.lastId;
                            }
                            node_fetch_1["default"](url, options)
                                .then(function (response) { return response.json(); })
                                .then(function (result) {
                                var tweetCount = totalTimelineData.tweetCount;
                                var rtCount = totalTimelineData.rtCount;
                                result.map(function (tweet) {
                                    if (dayjs_1["default"](tweet.created_at).format('YYYY-MM-DD') === yesterday) {
                                        tweetCount += 1;
                                        if (tweet.retweeted_status) {
                                            rtCount += 1;
                                        }
                                    }
                                    return tweet;
                                });
                                var lastData = result.slice(-1)[0];
                                var countOver = dayjs_1["default"](lastData.created_at).format('YYYY-MM-DD') === yesterday;
                                return resolve({
                                    tweetCount: tweetCount,
                                    rtCount: rtCount,
                                    lastId: lastData.id,
                                    countOver: countOver
                                });
                            })["catch"](function (err) {
                                return reject(err);
                            });
                        })];
                case 1:
                    timelineData = _a.sent();
                    if (timelineData.countOver) {
                        return [2 /*return*/, requestTwitterTimeline(timelineData)];
                    }
                    return [2 /*return*/, timelineData];
            }
        });
    });
};
var truncateText = function (str, len) {
    return str.length <= len ? str : str.substr(0, str.length - 3) + "...";
};
var getTweetData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var countData, yesterday, resizeTwitterId, resultText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, requestTwitterTimeline()];
            case 1:
                countData = _a.sent();
                yesterday = dayjs_1["default"]().subtract(1, 'day').format('MM-DD');
                resizeTwitterId = truncateText(twitterId, 19);
                resultText = "@" + resizeTwitterId + " " + yesterday + "\u306E\u30DD\u30B9\u30C8\u6570 : " + countData.tweetCount + " (\u3046\u3061RT : " + countData.rtCount + ")";
                return [2 /*return*/, resultText];
        }
    });
}); };
var updateGist = function (text) { return __awaiter(void 0, void 0, void 0, function () {
    var gist, error_1, filename, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, octokit.gists.get({ gist_id: gistId })];
            case 1:
                gist = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                console.error("Unable to get gist\n" + error_1);
                return [3 /*break*/, 3];
            case 3:
                if (text.length === 0)
                    return [2 /*return*/];
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                filename = Object.keys(gist.data.files)[0];
                return [4 /*yield*/, octokit.gists.update({
                        gist_id: gistId,
                        files: (_a = {},
                            _a[filename] = {
                                filename: "\uD83D\uDCCA Data of yesterday's tweets by @" + twitterId,
                                content: text
                            },
                            _a)
                    })];
            case 5:
                _b.sent();
                return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                console.error("Unable to update gist\n" + error_2);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var resultText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, getTweetData()];
            case 1:
                resultText = _a.sent();
                return [4 /*yield*/, updateGist(resultText)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, main()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
