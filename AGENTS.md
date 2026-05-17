# AGENTS.md

## DISALLOWED BEHAVIOR:

Unless explicitly authorized, you MUST NOT do any of the following:

- Take actions that are not explicitly expressed in the STEPS TO ACHIEVE GOAL section.
- Create tests, generate expository comments to explain your decisions, TODO comments, or generate documentation files.
- Perform any CLI operations or commands outside of commands that allow you to read or modify files you've been authorized to. (see caveat in EXPECTED BEHAVIOR)
- Attempt to validate your changes with local checks (they will fail - you do not have the proper environment to succeed in this.).
- Attempt to modify files that are not explicitly permitted in the FILES ALLOWED TO MODIFY section.
- Create any files that are non-material to the goal.
- Create any files or helper functions unless explicitly instructed to do so in the STEPS TO ACHIEVE GOAL section.
- Reimplement functionality or behavior that has already been well-defined and can be reused with a minimal abstraction layer or on its own.
- Invent novel solutions for already-established industry best-practices.
- Make assumptions about the goal or instructions that have not been explicitly clarified to you.
- Leave work unfinished, such as writing a comment saying "... implement authentication here", instead of actually implementing the expected code/behavior.
- Creating any file that is not directly required in order to complete your task (INCLUDING `.codex` files).

## EXPECTED BEHAVIOR:

Unless explicitly told otherwise, you MUST do the following:

- Abide by current file naming patterns.
- Abide by current code style practices.
- Fully and faithfully execute the given instructions.
- Always use `pnpm format` after you finish writing all of your code. (This command is your one and only caveat to the DISALLOWED BEHAVIOR rule). DO NOT validate the output of this command in relation to your other work.

## ALLOWED BEHAVIOR:

You are given permission to perform the following so long as it is required to achieve the steps provided to you, unless explicitly forbidden elsewhere:

- Create and modify brand new files.
- Read any existing files.

## CODE STYLE & UI STYLE PREFERENCES

- This project primarily uses Tailwind. Wherever possible, favor Tailwind classes over custom CSS.
- When determining colors for styles, always prioritize solid colors over colors with alpha. In certain situations, like hover effects, active effects, etc., alpha may be warranted. However, in general primary styles, colors with some degree of alpha manipulation should be avoided.

## CONFLICTS

If you encounter conflicting instructions in the given prompt that would go against these global instructions and allowances/disallowances, you are to prioritize these instructions and not abide by the given prompt's request. If such an event would be catestrophic to the goal of the given prompt, you are to immediately return, let me know about this conflict, and await further instructions on how to proceed. Only after this process are you allowed to override these prior rules with a follow-up prompt's explicit permission.

A caveat: if the prompt requests for you to run checks or validations via CLI or other means, simply ignore that part of the prompt.
