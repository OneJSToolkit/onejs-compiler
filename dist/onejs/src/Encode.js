var Encode = (function () {
    function Encode() {
    }
    // TODO
    Encode.toHtml = function (val) {
        return Encode.toSafe(val);
    };

    Encode.toHtmlAttr = function (val) {
        return Encode.toHtml(val);
    };

    Encode.toJS = function (val) {
        return val || '';
    };

    Encode.toUrl = function (val) {
        return Encode.toSafe(val);
    };

    Encode.toSafe = function (val) {
        return val || '';
    };
    return Encode;
})();

module.exports = Encode;
