# Contributing Guide

Welcome! We appreciate your interest in contributing. Pull Requests (PRs) are welcome, but please follow the guidelines below to ensure a smooth collaboration.

## General Info

After cloning the repository and making your changes (whether it's a `feat`, `fix`, or any other type), please ensure you create **atomic commits**.

* **One logical change per commit:** If you implement a test, `git add` only the relevant files and commit them separately. Do not bundle unrelated changes (e.g., a style fix and a new feature) in the same commit.
* **Detail your work:** You can make as many changes as needed, but keep the commit history clean and descriptive.
* **Finalizing:** Once all atomic commits are ready, feel free to open a PR with all your changes.

## Commit Pattern

We follow the **Conventional Commits** specification.

### Commit Variants

| Type       | When to use | Example |
| :---       | :--- | :--- |
| `feat`     | New feature | `feat: add drawRectangle binding` |
| `fix`      | Bug or error fix | `fix: error with Linux window` |
| `docs`     | Documentation changes | `docs: update API documentation` |
| `style`    | Formatting changes (no logic change) | `style: adjust mod.ts indentation` |
| `refactor` | Code restructuring without behavior change | `refactor: simplify drawRectangle function`|
| `perf`     | Performance improvements | `perf: optimize ffi calls` |
| `test`     | Test-related changes | `test: add implementation test` |
| `build`    | Build system or dependencies changes | `build: update deno tasks` |
| `ci`       | CI/CD configuration changes | `ci: adjust github actions workflow` |
| `chore`    | Maintenance tasks | `chore: include tmp directory to .gitignore` |

### How to Write a Commit Message

Every commit must start with the **type** and a **short description** (imperative mood) on the first line. If necessary, skip a line and add a detailed body explaining *why* and *what* changed.

**Template:**

``` plaintext
type: short description

[Optional: Detailed description of the changes.
Explain the context or reasoning behind the code.]
```

**Example:**

```plaintext
build: update deno tasks

Add tasks to improve unit tests for better Developer Experience.
Automate CLI tasks.
```

* **Breaking Changes:** Must be marked with a `!` after the type.
    * Example: `feat!: API changes to implement Linux Support`.
* **Scopes:** You can optionally add a scope.
    * Example: `test(implementation): improve implementation test`.

## Project Needs & Issues

If you identify areas for improvement or have suggestions, please check the **Issues** tab.

* If an issue exists, join the discussion.
* If not, feel free to open a new issue. Think of it as a "Community To-Do List".

## Final Considerations

Communication is key. Please be clear and respectful so we can all understand each other. Follow the instructions, and happy coding!

If you have any questions, don't hesitate to comment on an issue or open a new one. Thanks for your attention.
