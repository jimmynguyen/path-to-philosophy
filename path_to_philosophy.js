var cheerio = require('cheerio');
var prompt  = require('prompt');
var request = require('request');

// prompt_user();

// function prompt_user() {
//     prompt.start();
//     prompt.get(['title'], function (error, result) {
//         if (error)
//             return on_error(error);

//         get_web_page(result.title);
//     });
// }

get_web_page('Information_space');

function get_web_page(title) {
    var FORMAT_URL = 'http://en.wikipedia.org/wiki/{subject}';
    var url = FORMAT_URL.replace('{subject}', title);

    request(url, function (error, response, body) {
        if (error)
            return on_error(error);
        else if (response.statusCode !== 200)
            return on_error(response);

        parse_body(body);
    });
}

function parse_body(body) {
    var $ = cheerio.load(body);
    var first_heading = $('#firstHeading').text();

    console.log(first_heading);
    if (first_heading.toLowerCase() === 'philosophy') {
        return;
    }

    var html = $('#bodyContent > #mw-content-text > .mw-parser-output').html();
    console.log(html);

    // var open_parenthesis_index    = html.indexOf('(');
    // var close_parenthesis_index   = html.indexOf(')');
    // var anchor_tag_search_pattern = '<a href="/wiki/';
    // var anchor_tag_index          = html.indexOf(anchor_tag_search_pattern);

    // while (anchor_tag_index > open_parenthesis_index && anchor_tag_index < close_parenthesis_index) {
    //     anchor_tag_index = html.indexOf(anchor_tag_search_pattern, anchor_tag_index + 1);
    // }

    // var title_start_index = anchor_tag_index + anchor_tag_search_pattern.length;
    // var title_end_index   = html.indexOf('"', title_start_index);

    // var title = html.substring(anchor_tag_index + anchor_tag_search_pattern.length, title_end_index);
    // // console.log(html);
    // // console.log(title);

    // get_web_page(title);
}

function on_error(error) {
    console.log(error);
    return 1;
}
