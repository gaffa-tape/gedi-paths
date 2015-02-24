var matchPath = /^\[(?:[^\[\]]|\\.)*\]/;

module.exports = function detectPath(substring){
    var match = substring.match(matchPath);
    return match && match[0];
};