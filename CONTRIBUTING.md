# Contributing

First and foremost, we appreciate your interest in this project. This document contains essential information, should you want to contribute.

## Development discussion

For bugs, new features or improvements, open a new [issue](https://github.com/tiagojpdias/literacia-financeira-bot/issues/new).

## Which Branch

Pull requests should always be done against the `main` branch.

## Coding Style

This project follows the [AirBnb JS styleguide](https://github.com/airbnb/javascript) coding style guide.

### Javascript ESLint

An [ESLint](https://eslint.org/) script is hooked into the CI pipeline, so you'll be notified of any coding standard issue when pushing code.

#### Check

On each build, the `lint` npm script is executed to make sure the coding standards are followed.

#### Fix

If the build breaks due to coding standards, the following command fixes the issues:

```sh
./node_modules/.bin/eslint --fix <file or directory name>
```

Although is advisable to fix the issues by hand to build awareness for the future. Doing it by hand trains our brain to not commit those kind of issues again.

## Committing to git

Each commit **MUST** have a proper message describing the work that has been done.
This is called [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages).

Here's what a commit message should look like:

```txt
feat(Reddit): implement API call to fetch subreddit data
^--^ ^-----^  ^----------------------------------------^
|    |        |
|    |        +-> Description of the work in the present tense.
|    |
|    +---------------> Scope of the work.
|
+--------------------> Type: chore, docs, feat, fix, hack, refactor, style, or test.
```

## Branching strategy

We will be using the **branch-per-issue** workflow.

This means, that for each open [issue](https://github.com/tiagojpdias/literacia-financeira-bot/issues), we'll create a corresponding **git** branch.

For instance, issue `#123` (new feature) should have a corresponding `feature/BOT-123-ShortTaskDescription` branch, which **MUST** branch off the latest code in `main`.
