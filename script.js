// Function to handle Navigation between 4 Pages
function navigate(pageId) {
    const sections = document.querySelectorAll('.view-section');
    sections.forEach(section => section.classList.remove('active'));

    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');
    const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(pageId));
    if (activeBtn) activeBtn.classList.add('active');
}

// Core Logic to Evaluate Scholarship
function scanProfile() {
    // Fetch values from all inputs
    const course = document.getElementById('courseName').value;
    const year = document.getElementById('studyYear').value;
    const tenth = parseFloat(document.getElementById('tenthMarks').value);
    const twelfth = parseFloat(document.getElementById('twelfthMarks').value);
    const cgpa = parseFloat(document.getElementById('cgpa').value);
    const income = parseFloat(document.getElementById('familyIncome').value);
    
    const statusBox = document.getElementById('status-box');

    // 1. Check if form is completely filled
    if (!course || !year || isNaN(tenth) || isNaN(twelfth) || isNaN(cgpa) || isNaN(income)) {
        showError("Incomplete Data", "Please fill out all fields including your 10th and 12th percentages, CGPA, course, and year.");
        return;
    }

    // 2. Strict University Rejection Criteria (If basics are not met)
    if (cgpa < 6.5) {
        showError("Not Eligible", "Your current CGPA is below the strict 6.5 threshold required for any financial aid.");
        return;
    }
    if (tenth < 60 || twelfth < 60) {
        showError("Not Eligible", "A minimum of 60% in both 10th and 12th standard is required to apply for scholarships.");
        return;
    }

    // 3. Scholarship Evaluation Rules
    let grantTitle = "";
    let grantAmount = "";
    let message = "";

    // Rule A: The Ultimate Topper (President's Gold)
    if (tenth >= 90 && twelfth >= 90 && cgpa >= 9.0) {
        grantTitle = "President's Gold Medal";
        grantAmount = "₹1,50,000 / Year";
        message = "Outstanding academic record across 10th, 12th, and current degree.";
    } 
    // Rule B: EWS Support (Income based)
    else if (income <= 250000 && cgpa >= 7.5) {
        grantTitle = "EWS Support Scheme";
        grantAmount = "100% Fee Waiver";
        message = "Full tuition waiver approved based on economic background and good CGPA.";
    }
    // Rule C: Medical/MBBS Students
    else if (course === "mbbs" && cgpa >= 8.0) {
        grantTitle = "Medical Pioneers Fund";
        grantAmount = "₹2,00,000 / Year";
        message = "Specialized grant for high-performing MBBS students.";
    }
    // Rule D: Tech & IT (B.Tech, M.Tech, BCA, MCA)
    else if (["btech", "mtech", "bca", "mca"].includes(course) && cgpa >= 8.2) {
        grantTitle = "Tech Excellence Award";
        grantAmount = "₹1,00,000 / Year";
        message = "Awarded for exceptional performance in technology and engineering programs.";
    }
    // Rule E: Business & Management (BBA, MBA)
    else if (["bba", "mba"].includes(course) && cgpa >= 8.0) {
        grantTitle = "Business Leaders Grant";
        grantAmount = "₹75,000 / Year";
        message = "Awarded to future leaders in the management program.";
    }
    // Rule F: Science (B.Sc, M.Sc)
    else if (["bsc", "msc"].includes(course) && cgpa >= 7.8) {
        grantTitle = "Pure Sciences Fellowship";
        grantAmount = "₹60,000 / Year";
        message = "Research support grant for Science students.";
    }
    // Default Rule: General Progress Grant
    else {
        grantTitle = "Academic Progress Grant";
        grantAmount = "₹25,000 / Year";
        message = "Basic scholarship awarded for maintaining continuous academic progress.";
    }

    // Display the specific year in the message
    let yearText = year === "1" ? "1st" : year === "2" ? "2nd" : year === "3" ? "3rd" : year + "th";
    message += `<br><br><em>Status: Active for ${yearText} Year ${course.toUpperCase()} Student.</em>`;

    // Render Success UI
    showSuccess(grantTitle, grantAmount, message);
}

// UI Helpers
function showError(title, msg) {
    const statusBox = document.getElementById('status-box');
    statusBox.className = "status-box";
    statusBox.style.background = "#fef2f2";
    statusBox.style.border = "2px solid #f87171";
    statusBox.innerHTML = `
        <i class="fa-solid fa-circle-xmark" style="color: #ef4444; font-size: 3.5rem;"></i>
        <h3 style="color: #991b1b; margin-top: 15px; font-size: 1.5rem;">${title}</h3>
        <p style="color: #7f1d1d; margin-top: 10px;">${msg}</p>
    `;
}

function showSuccess(title, amount, msg) {
    const statusBox = document.getElementById('status-box');
    statusBox.className = "status-box";
    statusBox.style.background = "#f0fdf4";
    statusBox.style.border = "2px solid #34d399";
    statusBox.innerHTML = `
        <i class="fa-solid fa-trophy" style="color: #10b981; font-size: 3.5rem;"></i>
        <h3 style="color: #065f46; margin-top: 15px; font-size: 1.5rem;">Eligibility Confirmed!</h3>
        <p style="color: #047857; margin-top: 10px; margin-bottom: 20px;">${msg}</p>
        <div style="background: white; padding: 20px; border-radius: 12px; width: 100%; border: 1px solid #a7f3d0; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
            <h4 style="color: #003e6b; font-size: 1.1rem; margin-bottom: 8px;">Approved Grant: ${title}</h4>
            <h2 style="color: #d97706; font-size: 2rem;">${amount}</h2>
        </div>
    `;
}