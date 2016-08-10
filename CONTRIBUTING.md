# Contributing to Boats Animator
Thank you for choosing to help improve Boats Animator!

## Setup
1. First fork this repository by pressing ![Fork](https://camo.githubusercontent.com/07b3944af53da32b0cffe98152c45c46431a82f0/687474703a2f2f6938312e73657276696d672e636f6d2f752f6638312f31362f33332f30362f31312f666f726b6d6531322e706e67)
2. Clone the fork to your computer using: `git clone https://github.com/YOUR_USERNAME/Boats-Animator.git` or [GitHub Desktop](https://desktop.github.com/).
3. Install **version 5+** of [Node.js](https://nodejs.org/en/download/stable/).
4. Run `npm install` in the Boats-Animator directory.

### Compiling from source code
To preview Boats Animator simply run `npm start` in a terminal window. Note: the first time this is run a copy of NW.js will be downloaded, this is around 50MB.

## Reporting issues
If you find a bug or want to suggest an improvement:
* First check someone else hasn't already reported it in the [issues](https://github.com/BoatsAreRockable/Boats-Animator/issues) section.
* If not, create a [new issue](https://github.com/BoatsAreRockable/Boats-Animator/issues/new) for it.
* Please make sure to include a clear **title** and **description** as well as any relevant error messages, code snippets or screenshots.

## Submitting Changes
If you're working on an improvement to Boats Animator it is usually good practise to add a comment to the [relevant issue](https://github.com/BoatsAreRockable/Boats-Animator/issues). Once you are ready to submit your change you should:
* Create a [new pull Request](https://github.com/BoatsAreRockable/Boats-Animator/pull/new/master) with a clear list of what you've done (read more about [pull requests](http://help.github.com/pull-requests/)).
* The pull request should reference any relevant issues and have a clear title.
* The log messages for any commits should also be clear.
* The coding conventions for Boats Animator should be followed.
* If your pull request brings any visible changes, the markdown based documentation in the `docs` directory should be updated.

## Coding conventions
The following conventions should be observed in Boats Animator's code:
* HTML5, CSS3 and ES6 JavaScript that is supported by Chromium 50 may be used.
* Features with the `Webkit` prefix may be used if there is no standardised method available.
* CSS, HTML, JS and JSON should be indented using 2 spaces ([Currently a WIP](https://github.com/BoatsAreRockable/Boats-Animator/issues/140))
* Trailing white space and empty lines with spaces should be avoided.
* HTML classes and ids are `spaced-using-dashes`.
JavaScript variables and functions are `spacedUsingCamelCase`.
* JavaScript functions should be documented using [JSDoc](http://usejsdoc.org/about-getting-started.html).
