# Quiz Platform Documentation 📘

## 🚀 Overview

This is a **frontend-only** quiz platform built with **React, React Router, and IndexedDB**, designed to:
- Allow users to **attempt quizzes**
- Provide **instant feedback** and **track progress**
- Store **quiz history** for review
- Enforce **time limits** per question

## 📂 Project Structure

```
quiz-platform/
│── public/
│── src/
│ ├── components/
│ │ ├── QuizQuestion.jsx
│ │ ├── Scoreboard.jsx
│ │ ├── Timer.jsx
│ │ ├── HistoryList.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── QuizPage.jsx
│ │ ├── HistoryPage.jsx
│ ├── utils/
│ │ ├── indexedDB.js
│ ├── App.jsx
│ ├── main.jsx
│── package.json
│── README.md
```

## 🌟 Features

### 1️⃣ Quiz Creation & Management
- Displays a **list of questions** (from `sample_quiz.pdf`)
- Supports **multiple attempts**
- Enforces **time limits** for each question

### 2️⃣ User Interaction
- Users can **select answers** and get **instant feedback**
- Supports **MCQs** and **integer-type** questions
- Uses **Framer Motion** for smooth animations

### 3️⃣ Progress Tracking
- Shows a **scoreboard** at the end of each quiz
- Saves **quiz history** in IndexedDB
- Allows **history review** on a separate page

## 🔹 Component Breakdown

### 📌 1. `Home.jsx`
- Displays a **welcome page** with a "Start Quiz" button
- Navigates to the **QuizPage**

### 📌 2. `QuizPage.jsx`
- Handles **quiz logic**:
  - Tracks **current question**
  - Manages **selected answers**
  - Displays a **timer** for each question
- Saves quiz **results to IndexedDB**
- Displays **Scoreboard** upon completion

### 📌 3. `QuizQuestion.jsx`
- A reusable **question component** that:
  - Renders **MCQs** and **integer-type** questions
  - Highlights **correct/incorrect** answers

### 📌 4. `Timer.jsx`
- Enforces a **30-second time limit** per question
- Calls `onTimeUp()` if time expires

### 📌 5. `Scoreboard.jsx`
- Displays **final quiz results**
- Shows **score and total questions**
- Allows **navigation to history**

### 📌 6. `HistoryPage.jsx`
- Retrieves **past quiz attempts** from IndexedDB
- Displays **scores and time taken**
- Allows users to **review previous quizzes**

## 🛠️ IndexedDB Integration

Stored using a custom utility file: **`indexedDB.js`**

### ✅ Saving Quiz Attempts
```javascript
export const saveQuizAttempt = async (attempt) => {
    const db = await openDB("QuizDB", 1, {
        upgrade: (db) => db.createObjectStore("history", {
            keyPath: "id",
            autoIncrement: true
        })
    });
    await db.put("history", attempt);
};
```

### ✅ Fetching Quiz History
```javascript
export const getQuizHistory = async () => {
    const db = await openDB("QuizDB", 1);
    return await db.getAll("history");
};
```

## 🎨 Animations with Framer Motion

Enhances UI/UX with smooth transitions:
```javascript
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
>
```

## 🏁 How to Run the Project

1️⃣ Install dependencies:
```sh
npm install
```

2️⃣ Start the app:
```sh
npm run dev
```

3️⃣ Open `http://localhost:5173` in your browser.

## 🚀 Future Improvements

✅ Add **custom difficulty levels**  
✅ Implement **user authentication**  
✅ Allow **custom quiz creation**

## 📝 Conclusion

This project is a **fast, interactive, and user-friendly** quiz platform using React, IndexedDB, and Framer Motion. It ensures a **smooth experience** with animations and stores progress efficiently.
