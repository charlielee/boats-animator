# Contributing to Boats Animator
Thank you for choosing to help improve Boats Animator!

## Setup
1. Make sure [Git](https://git-scm.com/) and [Node.js](https://nodejs.org/) are installed on your computer.
2. Fork this repository by pressing ![Fork](https://camo.githubusercontent.com/07b3944af53da32b0cffe98152c45c46431a82f0/687474703a2f2f6938312e73657276696d672e636f6d2f752f6638312f31362f33332f30362f31312f666f726b6d6531322e706e67) at the top of this page.
3. Clone the fork to your computer using: `git clone https://github.com/YOUR_USERNAME/boats-animator.git` or [GitHub Desktop](https://desktop.github.com/).
4. Run `npm install` in the `boats-animator` directory.

### Running from source code
To preview Boats Animator simply run `npm start` in a terminal window. Note: the first time this is run a copy of NW.js will be downloaded, this is around 50MB.

### Compiling from source code
* To build Linux, Mac and Windows executable files for Boats Animator run: `npm run-script build`.
* To customise which builds are output further run: `node build --help`.

## Live-reloading
If you looking to help develop Boats Animator, you may find live reloading to be useful. This can easily be toggled by either adding the line `utils.setLiveReload(true)` to the code or running it in NW.js' `F12` Developer Tools console. 

## Reporting issues
If you find a bug or want to suggest an improvement:
* First check someone else hasn't already reported it in the [issues](https://github.com/charlielee/boats-animator/issues) section.
* If not, create a [new issue](https://github.com/charlielee/boats-animator/issues/new) for it.
* Please make sure to include a clear **title** and **description** as well as any relevant error messages, code snippets or screenshots.

## Submitting changes
If you're working on an improvement to Boats Animator it is usually good practise to add a comment to the [relevant issue](https://github.com/charlielee/boats-animator/issues). Once you are ready to submit your changes you should:
* Create a [new pull request](https://github.com/charlielee/boats-animator/pull/new/master) with a clear list of what you've done *([read more about pull requests](http://help.github.com/pull-requests/))*.
* The pull request should reference any relevant issues and have a clear title.
* The log messages for any commits should also be clear.
* The coding conventions for Boats Animator should be followed.
* If your pull request brings any visible changes, the Markdown based documentation in the `docs` directory should be updated.

## Coding conventions
The following conventions should be observed in Boats Animator's code:
* HTML5, CSS3 and ES6 JavaScript that is supported by Chromium 71 may be used.
* Features with the `Webkit` prefix may be used if there is no standardised method available.
* Code should use **2 space indentation**.
* Trailing white space should be avoided.
* HTML classes and ids are `spaced-using-dashes`. JavaScript variables and functions are `spacedUsingCamelCase`.
* JavaScript functions should be documented using [JSDoc](http://usejsdoc.org/about-getting-started.html) notation.
