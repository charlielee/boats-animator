# Contributing to Boats Animator

Thank you for choosing to help improve Boats Animator!

> [!IMPORTANT]
> This project is currently undergoing a complete rewrite to use React, TypeScript and Electron. As a result, some features in the `main` branch are incomplete or broken.

## Running from source code

To run Boats Animator from source code Git and Node.js are required to be installed. [nvm](https://github.com/nvm-sh/nvm) is the reccommended way of installing Node.

The run the following commands in a terminal window:

```bash
git clone git@github.com:charlielee/boats-animator

# Use the version of Node.js in the .nvmrc file
nvm use

npm install
npm start
```

## Building from source code

To build packages for Boats Animator for the current operating system run: `npm run-script build`.

## Reporting issues

If you find a bug or want to suggest an improvement:

- First check someone else hasn't already reported it in the [issues](https://github.com/charlielee/boats-animator/issues) section.
- If not, create a [new issue](https://github.com/charlielee/boats-animator/issues/new) for it.
- Please make sure to include any relevant error messages, code snippets or screenshots.
- You can also report issues and make suggestions in the Boats Animator [Discord Server](http://discord.boatsanimator.com/).

## Submitting changes

If you're working on an improvement to Boats Animator it is usually good practise to add a comment to the [relevant issue](https://github.com/charlielee/boats-animator/issues). Once you are ready to submit your changes you should:

- Create a [new pull request](https://github.com/charlielee/boats-animator/pull/new/main) with a clear list of what you've done _([read more about pull requests](http://help.github.com/pull-requests/))_.
- The pull request should reference any relevant issues and have a clear title.
- The log messages for any commits should also be clear.
- The coding conventions for Boats Animator should be followed.
- If your pull request brings any visible changes, the Markdown based documentation in the `docs` directory should be updated.

## Coding conventions

The following conventions should be observed in Boats Animator's code:

- Code should be formatted with prettier and linted with eslint.
- In the renderer thread, web APIs should be preferred over Electron APIs where possible.
- Features with the `Webkit` prefix may be used if there is no standardised method available.
- Consider writing unit tests with Jest and RTL.
