# Kambaz Quizzes

Kambaz Quizzes is the CS 5610 final project, extending the Kambaz course application with an integrated quiz and assessment system. Faculty members can create and manage quizzes within their courses, including multiple-choice, true/false, and fill-in-the-blank questions. They can configure quiz settings such as availability dates, due dates, access codes, allowed attempts, and question display preferences before previewing and publishing a quiz.

Students can access published quizzes within their enrolled courses, complete assessments (one question at a time when the quiz is set that way), and review their results and most recent attempt after submission.

This repository contains the client-side application, built with Next.js. The server-side application, developed using Node.js, Express, and MongoDB, is available at [webdev-server](https://github.com/savsuth/webdev-server). The project design and user documentation are available in [docs/design-and-user-guide.md](docs/design-and-user-guide.md).

The project is maintained on the `project` branch. The application opens with a landing page displaying the author's information, course section, and links to both repositories.

## Getting Started

Follow these steps to run the client application locally. The server must be running before starting the client. Refer to the server's README for setup instructions.

### Prerequisites

- Node.js and npm installed
- Kambaz Quizzes server running locally at `http://localhost:4000`

### Installation

Clone the project repository and install its dependencies:

```bash
git clone -b project https://github.com/savsuth/webdev-client.git
cd webdev-client
npm install
```

Create a `.env.development` file in the project root to configure the server URL. This file is excluded from version control.

```env
NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000
```

Start the development server and open `http://localhost:3000` in your browser:

```bash
npm run dev
```

The landing page will appear. Select **Sign in** and use one of the test accounts listed under [Usage](#usage).

## Code Validation and Production Build

Run the following commands to check code quality, validate TypeScript types, and generate a production build:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

For a production build, provide the server URL explicitly:

```bash
NEXT_PUBLIC_HTTP_SERVER=http://localhost:4000 npm run build
npm start
```

## Usage

Use one of the following preconfigured test accounts to sign in:

| Role | Username | Password |
|---|---|---|
| Faculty | `bruce_banner` | `banner123` |
| Student | `iron_man` | `stark123` |

### Faculty

Navigate to **Dashboard**, select a course you teach (e.g., Rocket Propulsion), and open **Quizzes** from the course menu.

- Select **+ Quiz** to create a new quiz.
- Use the **Details** tab to configure quiz settings.
- Use the **Questions** tab to create and manage quiz questions.
- Select **Save and Publish** to make the quiz available to students.
- Use **Preview** to test the quiz without recording an attempt.

### Students

Navigate to an enrolled course and open **Quizzes** from the course menu.

- Select a published quiz to view its details.
- Click **Start** to begin the quiz.
- Answer the questions and submit the completed attempt.
- Review the resulting score and most recent attempt.

For a complete walkthrough of both faculty and student workflows, refer to the [Design and User Guide](docs/design-and-user-guide.md).

## Project Structure

The quiz-related components are located under `app/(kambaz)/courses/[cid]/quizzes/`:

| File / Directory | Description |
|---|---|
| `page.tsx`, `QuizItem.tsx` | Quiz listing with availability, due dates, points, question counts, and students' most recent scores |
| `[qid]/page.tsx` | Quiz details, settings, faculty preview and editing options, and student access |
| `[qid]/editor/` | Quiz editor containing Details and Questions tabs and the three question editors |
| `[qid]/preview/page.tsx` | Faculty quiz preview with grading but without storing the attempt |
| `[qid]/take/page.tsx` | Quiz-taking interface, including availability restrictions, access codes, questions, and results |
| `QuizForm.tsx`, `QuizQuestion.tsx`, `AttemptResult.tsx` | Quiz form, individual question display, and graded attempt results |
| `store.ts` | Zustand store for managing answers during a quiz attempt |
| `client.ts` | Type definitions and HTTP requests to the server |

## Deployment

The `project` branch is deployed on Vercel:

[webdev-client-aasavsuthar-git-project-nphuric.vercel.app](https://webdev-client-aasavsuthar-git-project-nphuric.vercel.app)

Vercel builds the application using `npm run build`, with `NEXT_PUBLIC_HTTP_SERVER` configured to point to the deployed server on Render:

`webdev-server-aasav-project.onrender.com`

## Built Using

- **Next.js 16 and React 19** - Web framework
- **Tailwind CSS 4** - Styling
- **Zustand 5** - State management for quiz attempts
- **Tiptap 3** - Rich-text editing for quiz descriptions and questions
- **Axios** - HTTP communication with the server

## Authors

**Aasav Suthar**  
CS 5610, Section 1  
Design and Implementation
