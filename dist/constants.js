"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.START_DATE = exports.STATICCONTENT = exports.NUMBER = exports.TOTAL_PERMISSIONS = exports.S3_FILE_PATH = exports.ISACTIVE = exports.STATUS = exports.ROLE_ENUM = exports.OPEN_API_PATH = void 0;
exports.OPEN_API_PATH = ["/auth/adminLogin", '/staticcontent/:id'];
exports.ROLE_ENUM = {
    admin: 1,
    subAdmin: 2,
};
exports.STATUS = {
    active: 1,
    inactive: 2,
    delete: 3
};
exports.ISACTIVE = {
    true: 1,
    false: 0
};
exports.S3_FILE_PATH = {
    pdfFile: "static_content",
    userProfile: "user_profile",
};
var TOTAL_PERMISSIONS;
(function (TOTAL_PERMISSIONS) {
    TOTAL_PERMISSIONS[TOTAL_PERMISSIONS["total_subadmin_permissions"] = 3] = "total_subadmin_permissions";
})(TOTAL_PERMISSIONS = exports.TOTAL_PERMISSIONS || (exports.TOTAL_PERMISSIONS = {}));
exports.NUMBER = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    oneday: 86400000,
};
exports.STATICCONTENT = {
    TermsAndCondtion: 1,
    PrivacyPolicy: 2,
    AboutUs: 3,
    ContactUs: 4
};
exports.START_DATE = '2021-01-01 00:00:00';
//# sourceMappingURL=constants.js.map