# Le_Booker-v1

<!-- Exercise 2. Write the non-goals first. Every acceptance criterion must be checkable in under a minute.
     Keep these headings exactly as they are: the self-checks look for them by name.
     The full target is on the course site under Resources → The course project. -->

## Project option
<!-- One line: lab booking, study groups, club events, or the own project the lecturer approved. -->
Lab booking.

## Goals
- A teacher signs in, sees all labs and its capacity.
- A teacher can book the lab when the timeslot is free.

## Non-goals
- No payments: every event is free.
- No email or push notifications: members check the site.
- No mobile app: one web UI that also works on a phone screen.

## Constraints
- Node with Express, PostgreSQL, plain HTML and JavaScript in the UI.
- Passwords are stored only as a hash, never as readable text.

## The model feature
<!-- Which model, which modality, and what it does for a user.
     Name three things or the check fails: the input it receives, the output it produces,
     and what happens when the model is slow, rate-limited or wrong. -->
- Model: Gemini 2.5 Flash, vision, called from `services/poster.js` and nowhere else.
- Input: The labs seating capacity and hardware capacity.
- Output: a suggested type of class most suited for this lab.
- When it fails: no key, a timeout or a 429 all leave the form empty with a note saying to
  type it in. Nothing is ever saved without the teacher pressing save, and a date the
  model returns that does not parse is left blank rather than guessed.

## Auth
<!-- Local sign-in plus at least one provider. Say how an account signing in both ways stays one account. -->
- Local: e-mail and password, stored as a bcrypt hash.
- Provider: Sign in with Google, the authorization-code flow, on the server.
- Linking: matched on Google's account id. An address Google has not marked as verified is never linked to an existing account.

## MCP tools
<!-- At least three tools your own MCP server exposes over this project's data.
     Each tool calls the same service functions the HTTP API calls, so the same rules apply.
     A description shorter than 20 characters is not a description. -->
| Tool | What it does | Who may call it |
| --- | --- | --- |
| `lab_list` | Lists all labs and their specs | anyone |
| `lab_availability` | Lists the available timeslots for the lab | anyone |
| `lab_booking` | Books the lab for a timeslot of 1 hour refusing one that is already booked | the token's owner |

## UI
<!-- Stack, and the three or more screens. The graded checklist lives in docs/UI.md. -->
Astro with plain CSS. Three screens: sign in, the list of all labs, one lab with
its book button. The checklist is in `docs/UI.md`.

## Architecture
<!-- Exercise 3. One request traced through every layer, naming the file for each one,
     plus one place where your own code does not match this layering. -->

## Acceptance criteria
<!-- Every criterion carries an id. A test proves it by naming that id in its title, for example
     test('AC-3 a booking that overlaps another is refused with 409', ...).
     Say who acts, what they see, and what must be true in the database. -->
- [AC-1] A signed-in teacher who opens `/labs` sees only list of all labs.
- [AC-2] A signed-in teacher who books already booked lab sees the message "This lab is already booked" and no new row appears in the `booked` table.
- [AC-3] A signed-in teacher who opens a lab sees the lab's specs and available timeslots.
- [AC-4] A lab that is already booked, but the book button is pressed gets 409 and no new row appears in the 'booked' table.
- [AC-5] The MCP tool `lab_booking` refuses an already booked lab with the same message the API returns.
- [AC-6] Cancelling a booking frees the lab, and the lab accepts a new booking immediately.
- [AC-7] A signed-in teacher who books an available one-hour timeslot sees a confirmation, and one matching row appears in the `booked` table.
- [AC-8] A signed-in teacher who opens a lab sees its seat capacity and whether it has PCs, a projector, a large screen and WiFi, matching the lab's stored specs.
- [AC-9] Signing in with Google using an address that already has a password account signs into that account: no second row appears in `teachers`.

### Slice 1: sign-in and <list screen>
- [AC-10] A user who opens `/labs` without signing in lands on `/login` instead.
- [AC-11] After signing in with a seeded account, `/labs` shows the list of labs, each with its number, specs and available timeslots.
- [AC-12] Deleting a booking row in the database and reloading `/labs` removes that booking the lab.

## Traceability
<!-- Filled in from Exercise 3 onward: each AC id, and the test that names it. -->
| Criterion | Test |
| --- | --- |
| AC-1 |  |

## Spec vs result
<!-- After the agent builds the slice: which criteria passed, which it missed or reinterpreted, and what you changed in this spec because of it. -->
