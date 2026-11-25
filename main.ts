import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The entry word: "Doomscroll".
//
// Why this word, in my own reasoning:
// - It is a blend of "doom" and "scroll": the grim, heavy feeling of bad
//   news colliding with the most mundane gesture on earth, dragging a
//   finger down a screen. That collision is funny on its own.
// - It is true of the whole internet, not one app: every feed, every
//   platform, every news site runs on the same endless scroll, and the
//   same compulsion to keep scrolling through grim content shows up
//   everywhere.
// - It surprises: the obvious guesses are "chaos", "addictive" or
//   "endless", while "doomscroll" is specific and vivid, and it paints a
//   picture instantly.
// - It is short: 10 letters, correctly spelled, readable in one beat.
const WORD = "Doomscroll";

// The gate the scorer applies to /output/entry.txt: UTF-8 text of 1 to 30
// characters, not only white space.
const OUT_PATH = "/output/entry.txt";
const MIN_LENGTH = 1;
const MAX_LENGTH = 30;

// A single word has no white space anywhere in it, and for this entry
// the word is plain letters only: no digits, punctuation or control
// characters, so nothing in it can read as a second token.
function isSingleWord(text: string): boolean {
  return text.length > 0 && !/\s/.test(text) && /^[A-Za-z]+$/.test(text);
}

// Length is counted in characters (code points), matching the gate.
function isValidWord(text: string): boolean {
  const length = [...text].length;
  return (
    length >= MIN_LENGTH && length <= MAX_LENGTH && isSingleWord(text)
  );
}

function main(): void {
  if (!isValidWord(WORD)) {
    throw new Error(`Invalid entry word: ${JSON.stringify(WORD)}`);
  }
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  // Write the word alone: no trailing newline, so the file holds exactly
  // the entry and nothing else.
  writeFileSync(OUT_PATH, WORD, { encoding: "utf8" });
}

main();
