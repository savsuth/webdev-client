# Kambaz Quizzes: Design and User Guide

**Aasav Suthar**  
CS 5610, Section 1

- **Client:** [webdev-client](https://github.com/savsuth/webdev-client) (`project` branch)
- **Server:** [webdev-server](https://github.com/savsuth/webdev-server) (`project` branch)
- **Live Application:** [Kambaz Quizzes](https://webdev-client-aasavsuthar-git-project-nphuric.vercel.app)

## 1. Project Goals

Kambaz is a learning management system developed as part of CS 5610. It provides functionality for faculty to manage courses, modules, and assignments, while allowing students to browse and enroll in courses. This project extends the existing application by introducing a quiz and assessment system similar to those available in commercial learning management platforms.

The project focuses on four primary goals:

1. **Quiz Creation and Management:** Allow faculty to create quizzes within their courses, configure titles and descriptions, add multiple-choice, true/false, and fill-in-the-blank questions, and manage quiz settings.
2. **Quiz Preview:** Allow faculty to preview quizzes from the student's perspective before publishing them, without recording or storing an attempt.
3. **Student Assessments:** Allow students to take published quizzes, receive automatically graded results upon submission, and review their most recent attempts and scores.
4. **Server-Side Validation:** Enforce quiz restrictions on the server, including availability dates, access codes, and attempt limits. These restrictions must remain effective even when requests are sent directly to the API rather than through the application interface.

## 2. Users and Roles

The application supports different levels of access based on user roles.

- **Faculty:** Faculty members own the courses they create and can create, edit, publish, preview, and delete quizzes within those courses. They can also access all quiz settings through the Details screen.
- **Students:** Students can view and take published quizzes within their courses and review their submitted attempts and results.
- **Teaching Assistants and Administrators:** These roles access the quiz functionality using the same interface and permissions as students.

Visitors who are not signed in can access the landing page, sign-in page, and sign-up page. Access to courses and quizzes requires authentication. New users can select either the Faculty or Student role during registration.

## 3. Application Architecture

The application consists of three primary components: the client, the server, and the database.

**Client:** The frontend is built with Next.js, React, and TypeScript, with Tailwind CSS for styling. It is deployed on Vercel.

**Server:** The backend is developed using Node.js, Express, and TypeScript. It handles authentication, authorization, quiz management, attempt validation, and grading. The server is deployed on Render.

**Database:** MongoDB stores application data. Local development uses a local MongoDB database, while the deployed application uses MongoDB Atlas. Mongoose models handle database operations.

### Client-Server Communication

The client communicates with the server through REST API endpoints using Axios. It does not access the database directly. After authentication, the server establishes a session using `express-session` and stores the session identifier in a browser cookie. Subsequent requests include this cookie, allowing the server to identify the authenticated user and determine their role.

Because the deployed client and server operate on different domains, the session cookie is configured for cross-site requests and marked as secure in production.

### Client Implementation

The quiz-related components are located under:

`app/(kambaz)/courses/[cid]/quizzes/`

Each screen is implemented as a React component and retrieves the required data when opened. During a quiz attempt, student answers are maintained in a Zustand store, allowing students to navigate between questions without losing their responses. Answers are submitted to the server only when the student completes the quiz.

Quiz descriptions and question content support rich-text editing through Tiptap. The application uses a read-only Tiptap view to display formatted content rather than inserting raw HTML into the page.

### Server Implementation

The backend organizes each data resource under the `Kambaz/` directory. Each resource contains four primary files:

- **Schema:** Defines the MongoDB document structure.
- **Model:** Provides the Mongoose model.
- **DAO:** Handles database queries and data operations.
- **Routes:** Defines the HTTP endpoints.

Authorization is handled through two middleware functions in `Kambaz/authorize.ts`. One verifies that a user is authenticated, while the other restricts access to faculty-only operations.

All quiz grading and answer validation are performed on the server.

## 4. Data Model

The quiz functionality introduces two MongoDB collections: `quizzes` and `attempts`. These collections extend the existing application data, which includes `users`, `courses`, `modules`, `assignments`, and `enrollments`.

### Quiz Collection

Each quiz is stored as a single document associated with a course through its `course` field. Questions are embedded within the quiz document because they are managed and retrieved together with their parent quiz.

| Field | Description | Default |
|---|---|---|
| `title`, `description` | Quiz title and rich-text instructions | "Unnamed Quiz", empty |
| `course` | ID of the course associated with the quiz | — |
| `published` | Determines whether the quiz is visible to students | No |
| `quizType` | Graded Quiz, Practice Quiz, Graded Survey, or Ungraded Survey | Graded Quiz |
| `assignmentGroup` | Quizzes, Exams, Assignments, or Project | Quizzes |
| `shuffleAnswers` | Randomizes the order of multiple-choice answers | Yes |
| `timeLimit` | Time limit in minutes (displayed but not enforced) | 20 |
| `multipleAttempts`, `howManyAttempts` | Determines whether retakes are allowed and specifies the maximum number of attempts | No, 1 |
| `showCorrectAnswers` | Controls when correct answers are displayed: Immediately, After due date, or Never | Immediately |
| `accessCode` | Code required before a student can start the quiz | Empty |
| `oneQuestionAtATime` | Displays one question per screen | Yes |
| `webcamRequired`, `lockQuestionsAfterAnswering` | Additional quiz settings (displayed but not enforced) | No |
| `due`, `available`, `until` | Due date, availability start date, and availability end date | Empty |
| `questions` | Embedded list of quiz questions | Empty |

Each embedded question contains the following information:

- `type`: Question type (multiple choice, true/false, or fill in the blank).
- `title`: Question title.
- `points`: Points assigned to the question.
- `question`: Rich-text question content.
- `choices`: Available answer choices for multiple-choice questions.
- `answers`: Accepted correct answers for grading.

For multiple-choice questions, the answers list contains the correct choice. True/false questions accept either "True" or "False", while fill-in-the-blank questions support multiple accepted answers.

The total quiz score is calculated by adding the points assigned to all questions.

### Attempts Collection

Each quiz attempt is stored as a separate document for a specific student and quiz.

| Field | Description |
|---|---|
| `quiz`, `user` | IDs identifying the quiz and the student |
| `attempt` | Attempt number, starting from 1 |
| `score`, `points` | Points earned and total possible points |
| `submitted` | Submission date and time |
| `questions` | Snapshot of the questions at the time of the attempt, including the submitted answer (`given`) and grading result (`correct`) |

Each attempt stores its own copy of the questions and answers. This preserves historical results even when faculty modify the original quiz.

### Date and Time Storage

Dates are stored as strings containing a local date and time, using the format `YYYY-MM-DDTHH:mm`, such as `2026-11-20T13:00`. This matches the value produced by the browser's date-time input.

## 5. HTTP API

All quiz API endpoints require an authenticated user. Access to individual operations is controlled by role-based authorization.

| Method and Endpoint | Access | Description |
|---|---|---|
| `GET /api/courses/:cid/quizzes` | Authenticated users | Retrieves quizzes for a course. Faculty can access all quizzes, while other users receive published quizzes without answer keys or access codes. |
| `POST /api/courses/:cid/quizzes` | Faculty | Creates a quiz with default settings and a default title. |
| `GET /api/quizzes/:qid` | Authenticated users | Retrieves a quiz based on the user's role. Unpublished quizzes are returned as not found for students. |
| `PUT /api/quizzes/:qid` | Faculty | Updates quiz settings, questions, or publication status. |
| `DELETE /api/quizzes/:qid` | Faculty | Deletes a quiz and all associated attempts. |
| `POST /api/quizzes/:qid/access` | Authenticated users | Checks whether the user can start the quiz and returns the reason if access is denied. |
| `POST /api/quizzes/:qid/attempts` | Authenticated users | Grades submitted answers. Faculty receive preview results without storing an attempt, while student submissions are validated, graded, and saved. |
| `GET /api/quizzes/:qid/attempts/last` | Authenticated users | Retrieves the user's most recent attempt, if one exists. |

Deleting a course also removes its associated quizzes and quiz attempts.

## 6. Design Decisions and Implementation Details

### Server-Side Grading

All quiz grading is performed on the server. Students submit their answers, and the server compares them against the stored answer key to calculate the final score.

For fill-in-the-blank questions, answers are compared without considering capitalization or leading and trailing spaces. Unanswered questions are automatically marked incorrect.

Performing grading on the server prevents students from accessing the correct answers through browser-side code or network requests.

After grading, each question displays a green **Correct** label with a checkmark or a red **Incorrect** label with an X.

### Answer Key and Access Code Protection

Correct answers and access codes are never exposed to students before submission.

When a quiz is retrieved by a non-faculty user, the server removes the correct answers from every question and excludes the access code from the response.

After submission, correct answers are included in the attempt results according to the **Show Correct Answers** setting:

- **Immediately:** Correct answers are displayed after submission.
- **After due date:** Correct answers are displayed only after the quiz due date has passed.
- **Never:** Correct answers are never displayed.

### Quiz Availability and Attempt Validation

The server uses a centralized validation function to determine whether a student can start or submit a quiz. It checks the following conditions in order:

1. **Available Date:** Determines whether the quiz has opened.
2. **Until Date:** Determines whether the quiz is still within its availability period.
3. **Attempt Limit:** Checks whether the student has any attempts remaining.
4. **Access Code:** Verifies the code provided by the student, if required.

The quiz-taking screen calls the access endpoint before displaying questions. If access is denied, the application displays the corresponding restriction or requests the required access code.

The server repeats the same validation when a student submits the quiz. This prevents students from bypassing availability restrictions, attempt limits, or access codes by sending requests directly to the API.

Faculty members are exempt from these restrictions so they can preview quizzes at any time.

### Access Code Validation

Access codes are validated on the server and are never included in student quiz responses.

Students enter the access code on the quiz-taking screen, and the server compares it exactly, including capitalization. The submitted code is included with the attempt request for server-side validation.

Students only need to enter the code once during a visit to the quiz-taking screen. Retaking the quiz during the same visit does not require entering the code again, and viewing a previous attempt does not require a code.

### Date and Time Handling

Quiz availability is determined using the server's clock. Dates are stored without an explicit time zone, so the server interprets them using its local time zone when comparing them against the current time.

The deployed server uses the Eastern time zone to align with the course.

The quiz list displays availability based on the configured dates:

- **Not available until:** The current time is before the available date.
- **Available:** The quiz is within its availability period.
- **Closed:** The current time is after the until date.

If no available date is configured, the quiz is immediately available. If no until date is configured, the quiz does not automatically close.

Students can still access their most recent attempt after a quiz closes.

### Preserving Historical Attempts

Each submitted attempt stores a snapshot of the quiz questions, including the student's answers and grading results.

Faculty can modify a quiz after students have completed it. These changes affect future attempts but do not modify previously submitted results.

This approach preserves the original questions and answers associated with each attempt.

### Shuffling Answers

When **Shuffle Answers** is enabled, multiple-choice answer choices are displayed in a randomized order each time the quiz is opened.

True/false answer choices always remain in their original order.

The server grades answers based on their text rather than their displayed position. As a result, answer shuffling does not affect grading. Submitted attempt results display answer choices in the order originally configured by faculty.

### One Question at a Time

When **One Question at a Time** is enabled, the quiz displays a single question per screen.

Students can navigate using the **Previous** and **Next** buttons, while the interface displays their current position (e.g., Question 2 of 3). The **Submit Quiz** button appears on the final question.

Student answers are maintained in the Zustand store, allowing them to navigate between questions without losing their responses.

Unfinished attempts are not persisted. Leaving the quiz screen or reloading the page discards the current answers because nothing is saved until submission. If unanswered questions remain, the application asks students to confirm before submitting.

### Faculty Quiz Preview

The faculty preview uses the same quiz form as the student interface, including answer shuffling and one-question-at-a-time navigation.

Preview submissions use the same server-side grading endpoint as student submissions. However, the server identifies faculty users and returns the graded results without creating or storing an attempt.

Faculty can review the score, incorrect answers, and correct answers immediately.

### Settings Displayed but Not Enforced

Some quiz settings are saved and displayed on the Details screen but are not currently enforced during quiz-taking.

These include:

- **Time Limit:** Displays the configured time limit but does not enforce a countdown or automatically submit the quiz.
- **Webcam Required:** Stores and displays the webcam requirement but does not activate webcam monitoring.
- **Lock Questions After Answering:** Stores and displays the setting but does not prevent students from revisiting answered questions.

## 7. User Guide for Faculty

### Finding Quizzes

1. Sign in using a faculty account.
2. Open **Dashboard**.
3. Select one of the courses you teach.
4. Open **Quizzes** from the course menu.

The quiz list displays each quiz's availability, due date, total points, and number of questions.

The publication icon near the end of each row indicates whether a quiz is published. Selecting the icon allows faculty to publish or unpublish the quiz.

The three-dot menu provides additional actions:

- **Edit:** Opens the quiz editor.
- **Delete:** Removes the quiz and its associated attempts.
- **Publish / Unpublish:** Changes the quiz's publication status.
- **Sort:** Reorders the quiz list by name, due date, or availability date.

### Creating a Quiz

Select **+ Quiz** to create a new quiz.

The application creates an unpublished quiz with the default title "Unnamed Quiz" and opens its Details screen.

Select **Edit** to access the quiz editor.

### Configuring Quiz Details

The Details tab allows faculty to configure the quiz's information and settings.

**Basic Information:**

- Enter the quiz title and description.
- Select the quiz type.
- Choose the assignment group.

**Quiz Options:**

- Enable or disable Shuffle Answers.
- Configure the time limit.
- Enable Multiple Attempts and specify the maximum number of attempts.
- Enable One Question at a Time.
- Configure Webcam Required.
- Configure Lock Questions After Answering.
- Choose when correct answers should be displayed.
- Set an access code if required.
- Configure the due date, available date, and until date.

**Saving Options:**

- **Save:** Saves the changes and returns to the Details screen.
- **Save and Publish:** Saves the changes, publishes the quiz, and returns to the quiz list.
- **Cancel:** Discards unsaved changes.

### Creating and Managing Questions

Open the **Questions** tab and select **New Question**.

For each question:

1. Enter a question title.
2. Specify the points assigned to the question.
3. Select the question type.
4. Enter the question content.

The question editor supports three types:

**Multiple Choice:**
- Enter the available answer choices.
- Mark the correct answer.
- Select **Add Another Answer** to add additional choices.

**True/False:**
- Enter the question.
- Select either True or False as the correct answer.

**Fill in the Blank:**
- Enter the question.
- Provide all accepted answers.
- Capitalization and leading or trailing spaces are ignored during grading.

Select **Save Question** to add the question to the quiz. Existing questions can be modified using **Edit** or removed using **Delete**.

The total quiz points are calculated automatically based on the points assigned to its questions.

Save the quiz after completing the configuration.

### Previewing a Quiz

From the Details screen, select **Preview** to view the quiz from the student's perspective.

Faculty can answer the questions and select **Submit Quiz** to review the graded results, including the score, incorrect answers, and correct answers.

Preview submissions are not stored as student attempts.

Select **Edit Quiz** to return directly to the Questions tab.

## 8. User Guide for Students

### Finding Quizzes

1. Sign in using a student account.
2. Open **Dashboard**.
3. Select a course in which you are enrolled. You can also enroll in a course from the course list.
4. Open **Quizzes** from the course menu.

Only published quizzes are displayed.

Each quiz entry includes its availability, due date, total points, number of questions, and your most recent score, if you have already completed an attempt.

### Starting a Quiz

Select a published quiz to open its Details screen.

The Details screen displays:

- Due date
- Total points
- Number of questions
- Availability dates
- Time limit
- Quiz instructions

Select **Start** to begin the quiz.

If the quiz is not yet available or has already closed, the application displays the corresponding restriction instead of allowing the student to start.

If an access code is required, enter the code provided by your instructor and select **Start Quiz**. An incorrect code is rejected, and the quiz questions remain hidden.

### Taking a Quiz

Answer each question displayed on the quiz screen.

If the quiz is configured for one question at a time, use **Next** and **Previous** to navigate between questions. Previously entered answers are retained while navigating.

Select **Submit Quiz** when you have completed the assessment.

If any questions remain unanswered, the application requests confirmation before submitting. Unanswered questions are graded as incorrect.

**Important:** Unfinished answers are not saved to the server. Leaving the quiz screen or refreshing the page before submission will discard your responses.

### Viewing Quiz Results

After submission, the application displays:

- Your final score.
- Submission date and time.
- Each question and your submitted answer.
- Correct or incorrect status for each question.
- Correct answers, depending on the instructor's quiz settings.

Correct answers are displayed according to the **Show Correct Answers** setting.

If multiple attempts are enabled and the quiz remains available, the **Take the Quiz Again** option allows you to start another attempt. The interface also displays the number of remaining attempts.

### Reviewing Previous Attempts

Students can return to the quiz Details screen and select **View Last Attempt** to review their most recent submission, even after the quiz has closed.

If attempts remain and the quiz is still available, the **Take the Quiz Again** option is also displayed.

The most recent score is additionally available in the course quiz list.

## 9. Limitations and Future Improvements

The current implementation provides the core quiz creation, management, assessment, and grading workflows. However, several features remain limited:

- **Course Membership Validation:** Quiz routes validate authentication and roles but do not verify that a student is enrolled in the course or that a faculty member created it.
- **Unfinished Attempt Persistence:** Answers are stored locally during quiz-taking. Reloading or leaving the page discards unfinished attempts.
- **Time Limit Enforcement:** The configured time limit is displayed but does not enforce a countdown or automatic submission.
- **Webcam Monitoring:** The webcam requirement is stored and displayed but is not enforced.
- **Question Locking:** The lock questions after answering setting is stored but does not prevent students from revisiting previously answered questions.
- **Time Zone Handling:** Dates are stored without explicit time zone information and rely on the server's configured time zone.

Potential future improvements include:

1. Implementing countdown timers and automatic submission when the time limit expires.
2. Persisting unfinished quiz attempts so students can recover their answers after refreshing or leaving the page.
3. Adding course enrollment validation to all quiz-related API routes.
4. Implementing webcam monitoring and question-locking functionality.
5. Providing faculty with an interface to review individual student attempts, scores, and overall quiz performance.
