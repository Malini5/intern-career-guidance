// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2mRzUfzBCYXAguDFK60E3Fvt1Iwc-boI",
    authDomain: "career-guidance-project-4ca3c.firebaseapp.com",
    projectId: "career-guidance-project-4ca3c",
    storageBucket: "career-guidance-project-4ca3c.appspot.com",
    messagingSenderId: "850797431499",
    appId: "1:850797431499:web:a53ceca01c3717d70e694e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// References to UI elements
const signUpForm = document.getElementById('signUpForm');
const loginForm = document.getElementById('loginForm');
const logoutButton = document.getElementById('logoutButton');
const collegeListDiv = document.getElementById('collegeList');
const studentInfoDiv = document.getElementById('studentInfo');

// Sign Up
signUpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = signUpForm['signup-email'].value;
    const password = signUpForm['signup-password'].value;
    const name = signUpForm['signup-name'].value;

    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        // Add student info to Firestore
        return db.collection('students').doc(cred.user.uid).set({
            name: name,
            email: email,
            aptitudeScore: null,
            selectedCollege: null
        });
    }).then(() => {
        signUpForm.reset();
    }).catch((error) => {
        console.error("Error during sign up:", error);
    });
});

// Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then(() => {
        loginForm.reset();
    }).catch((error) => {
        console.error("Error during login:", error);
    });
});

// Logout
logoutButton.addEventListener('click', (e) => {
    auth.signOut().then(() => {
        console.log("User logged out");
    });
});

// Track Auth Status
auth.onAuthStateChanged(user => {
    if (user) {
        console.log("User logged in:", user);
        loadStudentInfo(user.uid);
        loadColleges();
    } else {
        console.log("User logged out");
        studentInfoDiv.innerHTML = '';
        collegeListDiv.innerHTML = '';
    }
});

// Load Student Info
function loadStudentInfo(uid) {
    db.collection('students').doc(uid).get().then(doc => {
        if (doc.exists) {
            const student = doc.data();
            studentInfoDiv.innerHTML = `
                <h3>Welcome, ${student.name}</h3>
                <p>Email: ${student.email}</p>
                <p>Aptitude Score: ${student.aptitudeScore ? student.aptitudeScore : 'Not taken yet'}</p>
                <p>Selected College: ${student.selectedCollege ? student.selectedCollege : 'Not selected yet'}</p>
            `;
        } else {
            console.error("No such document!");
        }
    }).catch(error => {
        console.error("Error getting student info:", error);
    });
}

// Load Colleges
function loadColleges() {
    db.collection('colleges').get().then(snapshot => {
        let html = '';
        snapshot.forEach(doc => {
            const college = doc.data();
            html += `
                <div class="college">
                    <h4>${college.name} (${college.location})</h4>
                    <p>Ranking: ${college.ranking}</p>
                    <p>Fees: ${college.fees}</p>
                    <p>Eligibility Criteria: ${college.eligibilityCriteria}</p>
                    <p>Placement Options: ${college.placementOptions}</p>
                    <p>Scholarship Schemes: ${college.scholarshipSchemes}</p>
                    <p>Housing Facilities: ${college.housingFacilities}</p>
                    <p>Support Services: ${college.supportServices}</p>
                </div>
            `;
        });
        collegeListDiv.innerHTML = html;
    }).catch(error => {
        console.error("Error getting colleges:", error);
    });
}


