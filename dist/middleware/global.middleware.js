"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function logger(req, res, next) {
    console.log(`Request...`, req.body);
    next();
}
exports.logger = logger;
;
//# sourceMappingURL=global.middleware.js.map