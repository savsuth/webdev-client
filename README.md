<h3 align="center">Kambaz Quizzes: Client</h3>

<p align="center">The web client of Kambaz Quizzes, a quiz tool added to the Kambaz learning management system.</p>

---

## Table of Contents
- [About](#about)
- [Getting Started](#getting_started)
- [Running the Tests](#tests)
- [Usage](#usage)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [Authors](#authors)
- [Acknowledgements](#acknowledgement)

## About <a name = "about"></a>
Kambaz Quizzes is the CS 5610 final project. It extends the Kambaz course application with
quizzes. Faculty create a quiz in a course, write multiple choice, true/false and fill in the
blank questions, choose settings such as available dates, an access code, multiple attempts and
one question at a time, preview the quiz, and publish it. Students see the published quizzes of
their courses, take them, and see their score and their last attempt.

This repository is the client, a Next.js application. The server, a Node.js and Express API with
MongoDB, is at [github.com/savsuth/webdev-server](https://github.com/savsuth/webdev-server). The
design and user document is [docs/design-and-user-guide.md](docs/design-and-user-guide.md).

The project lives on the `project` branch. The site opens on a landing page with the author,
course section and links to both repositories.

## Getting Started <a name = "getting_started"></a>
These steps run the client on your own computer. It needs the server running first; see the
server's README.

### Prerequisites
- [Node.js](https://nodejs.org/) and npm
- The Kambaz Quizzes server running, locally at `http://localhost:4000`

### Installing
Clone the repository and install the packages:

```bash
git clone -b project https://github.com/savsuth/webdev-client.git
cd webdev-client
npm install
```

Create a file named `.env.development` in the project folder (it is not committed) that tells
the client where the server is:

```bash
NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000
```

Start the development server and open [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

The landing page appears. Choose Sign in and use one of the test accounts under
[Usage](#usage).

## Running the Tests <a name = "tests"></a>
Check the code style and the types, then make a production build:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

A production build does not read `.env.development`, so give it the server address:

```bash
NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000 npm run build
npm start
```

## Usage <a name = "usage"></a>
Sign in with one of the seeded test accounts:

| Role | Username | Password |
| --- | --- | --- |
| Faculty | `bruce_banner` | `banner123` |
| Student | `iron_man` | `stark123` |

As faculty, open Dashboard, choose a course you teach (for example Rocket Propulsion), and open
Quizzes in the course menu. "+ Quiz" creates a quiz and opens it; Edit opens the editor with a
Details tab and a Questions tab; Save and Publish makes the quiz visible to students; Preview
takes the quiz without storing anything. As a student, open the same course, open Quizzes,
choose a quiz, and press Start. The design and user document walks through both in full.

The quiz screens are under `app/(kambaz)/courses/[cid]/quizzes/`:

| File | Screen or role |
| --- | --- |
| `page.tsx`, `QuizItem.tsx` | Quiz list with availability, due date, points, questions and a student's last score |
| `[qid]/page.tsx` | Quiz Details: the settings, Preview and Edit for faculty, Start for students |
| `[qid]/editor/` | Quiz editor: Details and Questions tabs, the three question editors |
| `[qid]/preview/page.tsx` | Faculty preview, graded but not stored |
| `[qid]/take/page.tsx` | Taking a quiz: the reason it is closed, the access code, the form, the result |
| `QuizForm.tsx`, `QuizQuestion.tsx`, `AttemptResult.tsx` | The quiz form, one question, a graded attempt |
| `store.ts` | Zustand store holding the answers while a quiz is being taken |
| `client.ts` | Types and the HTTP calls to the server |

## Deployment <a name = "deployment"></a>
The `project` branch is deployed on Vercel at
[webdev-client-aasavsuthar-git-project-nphuric.vercel.app](https://webdev-client-aasavsuthar-git-project-nphuric.vercel.app).
Vercel builds it with `npm run build`, with `NEXT_PUBLIC_HTTP_SERVER` set to the deployed server,
[webdev-server-aasav-project.onrender.com](https://webdev-server-aasav-project.onrender.com).

## Built Using <a name = "built_using"></a>
- [Next.js 16](https://nextjs.org/) and [React 19](https://react.dev/) - web framework
- [Tailwind CSS 4](https://tailwindcss.com/) - styling
- [Zustand 5](https://zustand.docs.pmnd.rs/) - quiz-taking state
- [Tiptap 3](https://tiptap.dev/) - rich text for quiz descriptions and questions
- [Axios](https://axios-http.com/) - HTTP calls to the server

## Authors <a name = "authors"></a>
- Aasav Suthar, CS 5610, Section 1 - design and implementation

## Acknowledgements <a name = "acknowledgement"></a>
- The Kambaz application and the CS 5610 course material it is built on
- The project requirements at [kambaz.dev/project/quizzes](https://kambaz.dev/project/quizzes)
