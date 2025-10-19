# University Reservation System

## Overview

The **University Reservation System** is a functional **web application prototype** that allows students to easily and visually **book university spaces** (classrooms, labs, or sports courts).  

This project focuses on the **frontend** only (no real backend) and implements **temporary persistence** using a `JSON` file.  
It includes a complete reservation flow (form → visual confirmation), basic input validation, and an **automated test**.

---

## 🎯 Project Objective

To simplify the management of university space reservations through a **modern, accessible, and efficient interface**, following **software engineering principles** and **frontend development best practices**.

---

## Functional Requirements (FR)

| Code | Description |
|------|--------------|
| **FR1** | The user can view a list of available spaces. |
| **FR2** | The user can create a reservation with name, date, time, and space. |
| **FR3** | The system must prevent duplicate reservations (same date and time). |
| **FR4** | The user can cancel an existing reservation. |
| **FR5** | The user can view an image or map of the selected space. |

---

## Non-Functional Requirements (NFR)

| Code | Description |
|------|--------------|
| **NFR1** | The system should respond in less than 3 seconds. |
| **NFR2** | Data should be stored locally (`LocalStorage` or a JSON file). |
| **NFR3** | The interface must be clear, responsive, and accessible. |
| **NFR4** | The project should follow a clean and organized folder structure. |
| **NFR5** | Code must be clean, commented, and have clear commits. |

---

## 👥 User Stories

| Code | Description | Acceptance Criteria (Summary) |
|------|--------------|-------------------------------|
| **US1** | As a student, I want to see a list of available spaces so I can choose which one to reserve. | The list shows name, type, availability, and image. |
| **US2** | As a student, I want to create a reservation with my name, date, time, and space. | Validates empty fields, stores data locally, and shows a confirmation message. |
| **US3** | As a student, I want to avoid duplicate reservations to prevent scheduling conflicts. | Blocks repeated reservations (same space, date, and time). |
| **US4** | As a student, I want to cancel a reservation I no longer need. | Removes reservation from storage and shows confirmation. |
| **US5** | As a student, I want to see an image or map of the selected space. | Displays an image related to the selected space. |

---

## Tech stack

- **Framework:** React.js/Vite  
- **Language:** JavaScript (ES6+)  
- **Styling:** Modular CSS / Tailwind / CSS Modules  
- **Storage:** JSON file  
- **Testing:** Vitest  

---

## Project Structure

```bash
📂 university-reservation-system
├── 📁 src
│   ├── 📁 components
│   ├── 📁 pages
│   ├── 📁 assets
│   ├── 📁 utils
│   ├── App.jsx
│   └── main.jsx
├── 📁 tests
│   └── reservationForm.test.js
├── package.json
├── README.md
└── index.html
```
---

## 🚀 Installation and Execution

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/university-reservation-system.git
   cd university-reservation-system
````

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the project**

   ```bash
   npm run dev
   ```

4. **Open in browser**

   ```
   http://localhost:5173
   ```

---

## Automated Testing

Unit tests are implemented inside the `/tests` directory using **Vitest**.

To run all tests, execute the following command:

```bash
npm run test
```

---

## Development Best Practices

### 🔁 GitHub Flow

* **Branches:**

  * `main` → stable production-ready branch
  * `feature/*` → feature development branches

* **Commit conventions:**

  * `feat:` → new functionality
  * `fix:` → bug fix
  * `refactor:` → code improvements
  * `docs:` → documentation changes

### 💡 Code Guidelines

* Clean, modular, and well-commented code
* Consistent naming conventions (camelCase for JS, kebab-case for files)
* Reusable and self-contained components
* Clear separation between logic and presentation
* Intuitive, accessible, and responsive UI design

---

## ✨ Additional Features

* 🔔 Visual or sound notification when confirming a reservation
* 🔍 Filter by space type (classroom, lab, court)
* ⏰ Validation to prevent booking past dates or times

---

## 🧾 UML Use Case Diagram

![UML Use Case Diagram](/docs/use-case-diagram1.png)

---

```
```