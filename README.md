# path-to-philosophy

Implementation of the [Hard Challenge #320 "Path to Philosophy"](https://www.reddit.com/r/dailyprogrammer/comments/6j7k3x/20170624_challenge_320_hard_path_to_philosophy/) from [/r/dailyprogrammer/](https://www.reddit.com/r/dailyprogrammer/)

For solutions to other challenges, go [here](https://github.com/jimmynguyen/daily-programmer).

## Requirements

* [Node.js](https://nodejs.org/en/)
* [npm (Node Package Manager)](https://www.npmjs.com/)

## Setting up the application

1. Clone the repository

```shell
git clone https://github.com/jimmynguyen/path-to-philosophy.git
```

2. Install npm packages

```shell
npm install
```

## Running the program

1. Call the following command

```shell
node path_to_philosophy.js
```

or

```shell
npm start
```

2. Enter the *title* when you are prompted

![running_the_program.png](https://raw.githubusercontent.com/jimmynguyen/path-to-philosophy/master/running_the_program.png)

## Debugging the program

1. Open the file `path_to_philosophy.js`

2. Change the value of the `IS_DEBUG` variable at the top of the file to `true`

```javascript
var IS_DEBUG = false;
```

3. Change the value of the `TITLE` variable at the top of the file to a specific subject so that it is easier to debug. Otherwise, you will have to keep typing it when you are prompted.

```javascript
var TITLE = null;
```

4. Call the following command

```shell
node path_to_philosophy.js
```

or

```shell
npm start
```

## Challenge

### Description

Clicking on the first link in the main text of a Wikipedia article not in parentheses, and then repeating the process for subsequent articles, usually eventually gets you to the Philosophy article. As of May 26, 2011, 94.52% of all articles in Wikipedia lead eventually to the article Philosophy. The rest lead to an article with no wikilinks or with links to pages that do not exist, or get stuck in loops. [Here's a youtube video demonstrating this phenomenon.](https://www.youtube.com/watch?v=vehDe2lSptU)

Your goal is to write a program that will find the path from a given article to the Philosophy article by following the first link (not in parentheses) in the main text of the given article.

### Formal Inputs and Outputs

#### Input Description

The program should take in a string containing a valid title of a Wikipedia article.

#### Output Description

Your program must print out each article in the path from the given article to [Philosophy](http://en.wikipedia.org/wiki/Philosophy)

#### Sample Inputs & Outputs

##### Input

```
Molecule
```

#### Output

```
Molecule
Atom
Matter
Invariant mass
Energy
Kinetic energy
Physics
Natural philosophy
Philosophy
```

#### Challenge Input

```
Telephone
```

#### Solution to Challenge Input

```
Telephone
Telecommunication
Transmission (telecommunications)
Analog signal
Continuous function
Mathematics
Quantity
Property (philosophy)
Logic
Reason
Consciousness
Subjectivity
Subject (philosophy)
Philosophy
```

### Notes/Hints

To start you can go to the url `http://en.wikipedia.org/wiki/{subject}`.

The title of the page that you are on can be found in the element `firstHeading` and the content of the page can be found in `bodyContent`.

### Bonus 1

Cycle detection: Detect when you visit an already visited page.

### Bonus 2

Shortest path detection: Visit, preferably in parallel, all the links in the content to find the shortest path to Philosophy
