const findTagByName = require("xml-utils/find-tag-by-name.js");
const findTagsByName = require("xml-utils/find-tags-by-name.js");

function parse_runs(xml) {
    const RUN_TAGS = ["verid", "sid", "did", "ecid", "rid", "rnum", "rname", "pnum", "bid", "stid", "spid", "sptype", "stime", "etid", "epid", "eptype", "etime", "rson", "rsoff", "pson", "psoff", "rtype", "setype", "eetype", "pname", "dblk", "lgabbr"]
    return findTagsByName(xml, "run").map(function (run) {
        return Object.fromEntries(RUN_TAGS.map(tag => [tag, findTagByName(run.inner, tag).inner]));
    });
}

if (typeof window === "object") {
    window.tsde = {
        parse_runs
    };
}

if (typeof self === "object") {
    self.tsde = {
        parse_runs
    };
}

module.exports = {
    parse_runs
}
