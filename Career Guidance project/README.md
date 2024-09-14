# Career Guidance Web Application

## Project Overview
The Career Guidance Web Application is designed to assist students in finding the best educational institutions for higher education, both in India and abroad. It provides detailed information on colleges, including tuition fees, housing facilities, eligibility criteria, campus placements, scholarship schemes, and more. The app also features an aptitude test to help students determine their career paths and provides a list of colleges based on various criteria such as entrance exam results, school rankings, and location preferences.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Firebase Firestore (Database), Firebase Authentication
- **Hosting:** Firebase Hosting 

## Project Features
- **User Authentication:** Secure sign-up and login functionality using Firebase Authentication.
- **College Information:** Displays detailed information about colleges and allows users to filter by various criteria (e.g., location, fees, ranking).
- **Aptitude Test:** A test that assesses student abilities in verbal, quantitative, and general knowledge sections.
- **College Recommendations:** Based on test results, provides a list of suitable colleges.
- **Admin Controls:** Admin users can add or remove colleges from the database.

## Project Modules
1. **Student Login Page**
2. **Sign Up Page**
3. **College Sign Up Page (Admin)**
4. **Career Selection Page**
5. **Location Selection Page**
6. **College List Pages**
7. **College Selection Page**
8. **College Registration Page**
9. **Student Details Pages**
10. **Aptitude Test Page**
11. **Test Completion Page**


## Firebase Setup
1. Create a new Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore** and **Authentication** (Email/Password) in  Firebase project.
3. Create the following collections in Firestore:
   - `students`: To store student information.
   - `colleges`: To store information about colleges.

## Firestore Database Structure
### Students Collection
- **Document ID:** Studet1,Student2,Student3
- **Fields:**
  - `name`: String
  - `email`: String
  - `aptitudeScore`: Number (nullable)
  - `selectedCollege`: String (nullable)

### Colleges Collection
- **Document ID:** College1 , College2,College3
- **Fields:**
  - `name`: String
  - `location`: String
  - `ranking`: Number
  - `fees`: Number
  - `eligibilityCriteria`: String
  - `placementOptions`: String
  - `scholarshipSchemes`: String
  - `housingFacilities`: String
  - `supportServices`: String

## Firestore Security Rules
```firestore
service cloud.firestore {
  match /databases/{database}/documents {
    match /students/{studentId} {
      allow read, write: if request.auth != null && request.auth.uid == studentId;
    }
    match /colleges/{collegeId} {
      allow read: if request.auth != null;
      allow write: if request.auth.token.admin == true;
    }
  }
}
Project Structure:
│
├── index.html            # Main landing page
├── signup.html           # Sign up form page
├── login.html            # Login form page
├── colleges.html         # College list and filtering page
├── profile.html          # Student profile page
├── app.js                # Main JavaScript file (handles Firebase interactions)
├── styles.css            # Main CSS file
├── README.md             # Project 

