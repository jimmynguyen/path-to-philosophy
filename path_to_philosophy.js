var IS_DEBUG = false;

var cheerio     = require('cheerio');
var file_system = require('fs');
var prompt      = require('prompt');
var request     = require('request');

var visited      = [];
var current_node = null;
var cycles_found = 0;

var ANCHOR_TAG_SEARCH_PATTERN = '<a href="/wiki/';

console_log = console.log;
console.log = function(message) {
	if (IS_DEBUG) {
		console_log(message === undefined ? "" : message);
	}
}

if (IS_DEBUG) {
	get_web_page('Molecule');
} else {
	prompt_user();
}

function prompt_user() {
	prompt.start();
	prompt.get(['title'], function(error, result) {
		if (error)
			return on_error(error);

		get_web_page(result.title);
	});
}

function get_web_page(title) {
	var FORMAT_URL = 'http://en.wikipedia.org/wiki/{subject}';
	var url = FORMAT_URL.replace('{subject}', title);

	request(url, function(error, response, body) {
		if (error)
			return on_error(error);
		else if (response.statusCode !== 200)
			return on_error(response);

		parse_body(body);
	});
}

function parse_body(body) {
	var $              = cheerio.load(body);
	var first_heading  = $('#firstHeading').text();
	var is_title_found = false;
	var html, results, cycle_count = 0;

	console.log(first_heading);
	visited.push(first_heading);
	if (first_heading.toLowerCase() === 'philosophy') {
		console.log("\ncycles found: " + cycles_found.toString() + "\n");
		print_summary();
		return;
	}

	current_node = $('#bodyContent > #mw-content-text > .mw-parser-output > p');

	while (!is_title_found) {
		current_node   = get_content_node(current_node);
		html           = current_node.html();
		results        = { index: 0 };
		log_to_file(html);
		while (!is_title_found
				&& results.index >= 0
				&& results.index < html.length) {
			results = get_title(html, results.index);
			is_title_found = visited.indexOf(results.title) < 0;
			if (!is_title_found) {
				console.log('\n>> cycle: ' + results.title + '\n');
				cycle_count++;
			}
		}
	}

	if (cycle_count > 0) {
		cycles_found += cycle_count;
	}

	get_web_page(results.title);
}

function get_content_node(current_node) {
	while (current_node[0].tagName != 'p' || (current_node[0].tagName === 'p' && current_node.html().indexOf('<a href="/wiki/') < 0)) {
		current_node = current_node.next();
	}
	return current_node;
}

function get_title(html, from_index) {
	var results = {
		'index': -1,
		'title': null
	};

	var anchor_tag_index = html.indexOf(ANCHOR_TAG_SEARCH_PATTERN, from_index);

	while (is_index_between_parentheses(html, anchor_tag_index) && anchor_tag_index >= 0) {
		anchor_tag_index = html.indexOf(ANCHOR_TAG_SEARCH_PATTERN, anchor_tag_index+1);
	}

	if (anchor_tag_index >= 0) {
		var title_start_index = anchor_tag_index + ANCHOR_TAG_SEARCH_PATTERN.length;
		var title_end_index   = html.indexOf('"', title_start_index);

		results.title = html.substring(anchor_tag_index + ANCHOR_TAG_SEARCH_PATTERN.length, title_end_index);
		results.index = title_end_index;
	}

	return results;
}

function is_index_between_parentheses(html, index) {
	var open_parenthesis_index  = html.indexOf('(');
	var close_parenthesis_index = html.indexOf(')', open_parenthesis_index+1);

	while (close_parenthesis_index < index && close_parenthesis_index !== -1) {
		open_parenthesis_index  = html.indexOf('(', open_parenthesis_index+1);
		close_parenthesis_index = open_parenthesis_index !== -1
				? html.indexOf(')', open_parenthesis_index+1)
				: close_parenthesis_index = -1;
	}

	return index > open_parenthesis_index && index < close_parenthesis_index;
}

function print_summary() {
	IS_DEBUG = true;
	console.log();
	console.log("Path");
	console.log("=========================");
	visited.forEach(function(item) {
		console.log(item);
	});
	console.log();
	console.log("Cycle Found? => " + (cycles_found > 0 ? "Yes" : "No"));
	IS_DEBUG = false;
}

function log_to_file(file_content) {
	if (IS_DEBUG) {
		file_content = '\n\n=========================\n\n' + file_content;
		file_system.appendFile('output.log', file_content, function(error) {
			if(error) {
				return on_error(error);
			}
		});
	}
}

function on_error(error) {
	console.log(error);
	return -1;
}
