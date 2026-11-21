# Kambaz Quizzes: Design and User Guide

Aasav Suthar, CS 5610, Section 1

Client: [github.com/savsuth/webdev-client](https://github.com/savsuth/webdev-client) (branch
`project`). Server: [github.com/savsuth/webdev-server](https://github.com/savsuth/webdev-server)
(branch `project`). Live site:
[webdev-client-aasavsuthar-git-project-nphuric.vercel.app](https://webdev-client-aasavsuthar-git-project-nphuric.vercel.app).

## 1. Goals

Kambaz is the learning management system built during CS 5610. It already let faculty manage
courses, modules and assignments, and let students browse and enroll in courses. This project adds
quizzes, in the spirit of the quiz tool found in commercial learning management systems.

The project had four goals. The first was to let faculty build a quiz inside a course: give it a
title and a description, write questions of three types (multiple choice, true/false and fill in
the blank), and choose the settings that govern how students take it. The second was to let
faculty check a quiz before students see it, by previewing it exactly as a student would, without
anything being recorded. The third was to let students take published quizzes, have their answers
graded at once, and come back later to see their last attempt and score. The fourth was to make
the rules trustworthy: a student must not be able to see the correct answers before submitting,
take a quiz outside its dates, skip its access code, or take it more often than allowed, even by
sending requests to the server directly instead of using the screens.

## 2. Users and roles

Every account has one role. Faculty own the courses they create and can create, edit, publish,
preview and delete quizzes in them, and see every setting of a quiz on its Details screen. Students take published quizzes in their courses. Teaching
assistants and administrators use the quiz screens the same way students do. A visitor who is not
signed in can open the landing page and the sign-in and sign-up screens; courses and quizzes
require an account, and a new account chooses Faculty or Student when it signs up.

## 3. Architecture

The application has three parts. The client is a Next.js application written in TypeScript with
React, styled with Tailwind CSS, and deployed on Vercel. The server is a Node.js application using
Express, also written in TypeScript, and deployed on Render. The data lives in MongoDB: a local
database during development and a MongoDB Atlas database for the deployed site. The server reads
and writes it through Mongoose models.

The client never touches the database. Every screen loads and saves data by calling the server's
REST API over HTTP with Axios. After signing in, the browser holds a session cookie set by the
server (through express-session), and each request carries it, so the server always knows which
user is asking and what role they have. Because the deployed client and server are on different
sites, the cookie is marked cross-site and secure in production.

Within the client, the quiz screens live under `app/(kambaz)/courses/[cid]/quizzes/`. Each screen
is a React component that fetches what it needs when it opens. The answers a student is typing
while taking a quiz are kept in a small Zustand store, so they survive moving between questions
without being sent anywhere until the student submits. Quiz descriptions and question text are
rich text, edited with Tiptap and displayed through a read-only Tiptap view rather than by
inserting raw HTML into the page.

Within the server, each kind of data has its own folder under `Kambaz/` with four files: a Mongoose
schema, a model, a data access object with the database queries, and the routes. Two small guards
in `Kambaz/authorize.ts` protect the routes: one requires any signed-in user and one requires
faculty. All grading happens on the server.

## 4. Data model

The quiz feature adds two MongoDB collections, `quizzes` and `attempts`, next to the existing
`users`, `courses`, `modules`, `assignments` and `enrollments`.

A quiz is one document. It belongs to one course through its `course` field, and its questions are
embedded in it as a list, because questions are always read and saved together with their quiz.

| Field | Meaning | Default |
| --- | --- | --- |
| `title`, `description` | Name and rich-text instructions | "Unnamed Quiz", empty |
| `course` | Id of the course the quiz belongs to | |
| `published` | Whether students can see it | No |
| `quizType` | Graded Quiz, Practice Quiz, Graded Survey or Ungraded Survey | Graded Quiz |
| `assignmentGroup` | Quizzes, Exams, Assignments or Project | Quizzes |
| `shuffleAnswers` | Show multiple choice answers in a random order | Yes |
| `timeLimit` | Minutes allowed (shown, not enforced) | 20 |
| `multipleAttempts`, `howManyAttempts` | Whether retakes are allowed, and how many attempts in all | No, 1 |
| `showCorrectAnswers` | Immediately, After due date or Never | Immediately |
| `accessCode` | Code a student must type before starting | empty |
| `oneQuestionAtATime` | Show one question per screen | Yes |
| `webcamRequired`, `lockQuestionsAfterAnswering` | Shown, not enforced | No |
| `due`, `available`, `until` | Due date, first moment it can be taken, last moment it can be taken | empty |
| `questions` | The list of questions below | empty |

Each embedded question has a `type` (multiple choice, true/false or fill in the blank), a `title`,
`points`, the rich-text `question`, a list of `choices` (multiple choice only) and a list of
`answers`. For multiple choice the answers list holds the one correct choice, for true/false it
holds "True" or "False", and for fill in the blank it holds every accepted answer. A quiz is worth
the sum of its questions' points.

An attempt is one document per student per try.

| Field | Meaning |
| --- | --- |
| `quiz`, `user` | Which quiz and which student |
| `attempt` | The attempt number, counting from 1 |
| `score`, `points` | Points earned and points possible |
| `submitted` | When it was submitted |
| `questions` | A copy of every question as it was when taken, with the answer given (`given`) and whether it was right (`correct`) |

Dates are stored as text holding a local date and time, such as `2026-11-20T13:00`, which is what a
date-time field in the browser produces.

## 5. HTTP API

The quiz routes are listed below. All of them require a signed-in user.

| Method and path | Who | What it does |
| --- | --- | --- |
| `GET /api/courses/:cid/quizzes` | anyone signed in | Lists the course's quizzes. Faculty get every quiz; everyone else gets published quizzes only, without the answer key and the access code. |
| `POST /api/courses/:cid/quizzes` | faculty | Creates a quiz with the default name and settings. |
| `GET /api/quizzes/:qid` | anyone signed in | Reads one quiz, shaped the same way by role; an unpublished quiz is "not found" for students. |
| `PUT /api/quizzes/:qid` | faculty | Saves settings, questions or the published flag. |
| `DELETE /api/quizzes/:qid` | faculty | Deletes the quiz and every attempt on it. |
| `POST /api/quizzes/:qid/access` | anyone signed in | Answers whether the user may start the quiz now, or gives the reason they may not. |
| `POST /api/quizzes/:qid/attempts` | anyone signed in | Grades the answers. For faculty it returns the result without storing it (the preview); for a student it checks the rules, stores the attempt and returns it. |
| `GET /api/quizzes/:qid/attempts/last` | anyone signed in | Returns the user's last attempt, or nothing. |

Deleting a course also deletes its quizzes and their attempts.

## 6. Design decisions

**The server grades.** Students send only their answers; the server compares them with the answer
key it keeps and computes the score. Fill in the blank answers are compared ignoring capital
letters and spaces at either end, and an unanswered question counts as wrong. Grading in the
browser would have required sending the answer key to the browser, where anyone could read it.

**The answer key and the access code never reach a student before submitting.** When the server
sends a quiz to anyone but faculty, it removes the answers of every question and the access code.
After a student submits, the attempt they receive includes the correct answers only if Show
Correct Answers allows it: always for Immediately, never for Never, and for After due date only
once the due date has passed.

**One rule check, used twice.** Whether a student may take a quiz depends on four things, checked
in this order: the available date, the until date, the number of attempts left, and the access
code. The server has one function that makes this decision and returns the reason when the answer
is no. The take screen asks the server through the access route before showing any question, so
it can explain why a quiz cannot be taken or ask for the access code. Submitting runs the same
check again, so a student cannot get around the dates or the code by sending a submission
directly. Faculty are never checked, so they can preview a quiz at any time.

**The access code is checked on the server.** Because the browser never has the code, the student
types it on the take screen and the server compares it exactly, capitals included. The code the
student typed is then sent along with the submission. A student is asked for it once per visit to
the take screen; a retake during the same visit does not ask again, and looking at a past attempt
never asks.

**Dates follow the server's clock.** Dates are stored without a time zone, so the server reads
them as its own local time and compares them with its own clock. The deployed server is set to
the Eastern time zone, which matches the course. Before the available date the list says "Not
available until" with the date, between the dates it says "Available", and after the until date it
says "Closed". A quiz with no available date is open at once, and one with no until date never
closes. A student who already took a quiz can still look at their last attempt after it closes.

**An attempt keeps its own copy of the questions.** Faculty may edit a quiz after students have
taken it. Each attempt therefore stores the questions as they were, with the answer given, so an
old result never changes when the quiz is edited; edits apply only to later attempts.

**Shuffling happens in the browser.** When Shuffle Answers is on, the take screen puts each
multiple choice question's answers in a new random order every time the quiz is opened. True and
false always stay in that order. Because answers are graded by their text, the order does not
matter to the server, and a graded attempt lists the answers in the order the faculty wrote them.

**One question at a time.** When this setting is on, the take screen shows one question with
Previous and Next buttons and its position ("Question 2 of 3"), and Submit Quiz appears on the
last question. The answers live in the Zustand store, so moving between questions keeps them.
Leaving the screen or reloading the page discards an unfinished attempt; nothing is saved until
Submit. Submitting with unanswered questions asks for confirmation first.

**The preview is the student view.** The faculty preview uses the same quiz form as students,
including shuffling and one question at a time, and posts to the same grading route. The server
recognizes faculty and returns the graded result without storing it. The preview always shows the
correct answers.

**Settings that are shown but not enforced.** The time limit, webcam requirement and lock questions
after answering are saved and displayed on the quiz's Details screen, but the take screen does not
enforce them. In a graded attempt each question carries a green "Correct" label with a checkmark or a
red "Incorrect" label with an X.

## 7. User guide for faculty

**Finding quizzes.** Sign in, open Dashboard, choose one of your courses, and choose Quizzes in the
course menu. The list shows each quiz with its availability, due date, points and number of
questions. The icon near the end of each row shows whether the quiz is published; click it to publish or
unpublish. The three-dot menu of a row offers Edit, Delete, Publish or Unpublish, and Sort by name,
due date or available date, which reorders the whole list.

**Creating a quiz.** Choose "+ Quiz". A new, unpublished quiz named "Unnamed Quiz" is created and
its Details screen opens. Choose Edit to open the editor.

**Details tab.** Enter the title and the description, and choose the quiz type and assignment
group. Under Options choose Shuffle Answers, the time limit, Multiple Attempts and how many
attempts, One Question at a Time, Webcam Required and Lock Questions After Answering. Choose when
correct answers are shown, type an access code if students should need one, and set the due date,
the available date and the until date. Save keeps the changes and returns to the Details screen,
Save and Publish keeps them, publishes the quiz and returns to the list, and Cancel discards them.

**Questions tab.** Choose New Question. Give the question a title and points, choose its type, and
write the question. For multiple choice, write the answers, mark the correct one, and use Add
Another Answer for more. For true/false, mark True or False. For fill in the blank, write every
answer you will accept; capital letters and outer spaces do not matter. Save Question adds it to
the list, where Edit and Delete change it later. The quiz's points are the sum of its questions.
Save the quiz when you are done.

**Previewing.** On the Details screen choose Preview. Answer the questions and choose Submit Quiz
to see the score, which questions were wrong, and the correct answers. Nothing is stored. Edit
Quiz goes straight to the Questions tab.

## 8. User guide for students

**Finding quizzes.** Sign in, open Dashboard, choose a course you are enrolled in (or enroll from
the course list), and choose Quizzes in the course menu. Only published quizzes appear. Each row
shows whether the quiz is available, its due date, points and number of questions, and your last
score once you have taken it.

**Starting.** Choose a quiz to open its Details screen. It shows the due date, points, number of
questions, when the quiz is available and the time limit, followed by the instructions. Choose
Start. If the quiz is not
available yet or is closed, the screen says so instead of offering Start. If the quiz has an
access code, type the code your instructor gave you and choose Start Quiz; a wrong code is refused
and the questions stay hidden.

**Taking the quiz.** Answer each question. If the quiz shows one question at a time, use Next and
Previous to move; your answers are kept. Choose Submit Quiz when you are done. If some questions
are unanswered you are asked to confirm, and unanswered questions count as wrong. Do not leave or
reload the page before submitting, or your answers are lost.

**Results.** After submitting you see your score, when you submitted, and each question with your
answer. Each question is marked with a green "Correct" or a red "Incorrect", and the correct
answers appear if the quiz shows them. If more attempts are allowed and the quiz is still open, "Take the Quiz Again" at the top of
the result starts a new attempt and shows how many are left. Later, the quiz's Details screen
offers View Last Attempt, which shows your most recent attempt even after the quiz has closed, and,
while attempts remain and the quiz is open, Take the Quiz Again next to it. Your score also appears on
the quiz list.

## 9. Limitations and future work

The quiz routes check a user's role but not whether the user belongs to the course. Answers in
progress are not saved, so an accidental reload loses them. The time limit, webcam requirement
and question locking are recorded but not enforced, and dates rely on the server's time zone
setting rather than storing a time zone with each date. Natural next steps are enforcing the time
limit with a countdown, saving answers in progress, checking course membership on every quiz
route, and giving faculty a view of every student's attempts and scores.
