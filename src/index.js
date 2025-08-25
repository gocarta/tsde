const findTagByName = require("xml-utils/find-tag-by-name.js");
const findTagsByName = require("xml-utils/find-tags-by-name.js");

function clean_html(html) {
    return html.replace(/&amp;/g, "&");
}

function parse_line_attributes(xml, options) {
    const LINE_TAGS = ["verid", "lid", "did", "aname", "avalue"];
    return findTagsByName(xml, "lna").map(function (lna) {
        return Object.fromEntries(LINE_TAGS.map(tag => [tag, clean_html(findTagByName(lna.inner, tag).inner)]));
    });
}

function parse_lines(xml) {
    const LINE_TAGS = ["verid", "lid", "sname", "lname", "did", "dname", "cid", "didc"];
    return findTagsByName(xml, "lin").map(function (lin) {
        return Object.fromEntries(LINE_TAGS.map(tag => [tag, clean_html(findTagByName(lin.inner, tag).inner)]));
    });
}

function parse_runs(xml) {
    const RUN_TAGS = ["verid", "sid", "did", "ecid", "rid", "rnum", "rname", "pnum", "bid", "stid", "spid", "sptype", "stime", "etid", "epid", "eptype", "etime", "rson", "rsoff", "pson", "psoff", "rtype", "setype", "eetype", "pname", "dblk", "lgabbr"]
    return findTagsByName(xml, "run").map(function (run) {
        return Object.fromEntries(RUN_TAGS.map(tag => [tag, findTagByName(run.inner, tag).inner]));
    });
}


if (typeof window === "object") {
    window.tsde = {
        parse_lines,
        parse_line_attributes,
        parse_runs
    };
}

if (typeof self === "object") {
    self.tsde = {
        parse_lines,
        parse_line_attributes,
        parse_runs
    };
}

module.exports = {
    parse_lines,
    parse_line_attributes,
    parse_runs
}
