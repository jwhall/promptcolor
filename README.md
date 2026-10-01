# promptcolor

A Claude Code mod that gives your own prompt lines a colored background in the transcript, so they are easy to find while scrolling back through a long session. The default is purple with white text.

## Usage

- `/promptcolor` shows the current color and the available options.
- `/promptcolor teal` switches to a preset.
- `/promptcolor #5b21b6` sets any six-digit hex color.

Presets: purple, blue, indigo, teal, green, burgundy, rust, gold, and gray. Every preset except gray is dark enough to keep white text readable.

## What it does

The mod registers one slash command and one `ui.render` hook, both in `hooks/register.tsx`.

- The hook redraws transcript rows for prompts you typed at the terminal, as `> text` in white on the chosen background. Rows for background-task notifications and messages from other agents or sessions keep the default look, as does the expanded ctrl+o view.
- The hook changes only how a row is drawn. It does not alter the stored message or anything the model reads.
- The chosen color is saved with the plugin's own key-value store (`$.store`) so it persists between sessions.

The mod makes no network requests, reads no files, runs no processes, and sends no data anywhere.

## Install

Install it from the Claude directory once listed, or load it directly for one session with `claude --plugin-dir /path/to/promptcolor`.

## License

MIT. See LICENSE.
