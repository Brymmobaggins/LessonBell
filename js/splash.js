/** @format */

const loadingBar = document.getElementById("loadingBar");
const loadingText = document.getElementById("loadingText");

let progress = 0;

const loadingInterval = setInterval(() => {
  progress = Math.min(progress + 2, 100);

  loadingBar.style.width = `${progress}%`;
  loadingText.textContent = `loading....${progress}%`;

  if (progress >= 100) {
    clearInterval(loadingInterval);
    loadingText.textContent = "Ready";

    showScreen("welcomeScreen");
  }
}, 150);

function showScreen(screenId) {
  document.querySelectorAll("main > section").forEach((screen) => {
    screen.classList.add("hidden");
    screen.classList.remove("flex");
  });

  const activeScreen = document.getElementById(screenId);
  activeScreen.classList.remove("hidden");
  activeScreen.classList.add("flex");
}

const getStartedBtn = document.getElementById("getStartedBtn");
if (getStartedBtn) {
  getStartedBtn.addEventListener("click", () => {
    showScreen("teacherSetupScreen");
  });
}

const teacherSetupForm = document.getElementById("teacherSetupForm");

if (teacherSetupForm) {
  teacherSetupForm.addEventListener("submit", () => {
    const teacherName = document.getElementById("teacherName").value.trim();
    const schoolName = document.getElementById("schoolName").value.trim();

    if (!teacherName || !schoolName) {
      return alert("Helllooo");
    }

    const teacherRecord = {
      name: teacherName,
      school: schoolName
    }
  

    localStorage.setItem("TEACHER_STORAGE_KEY", JSON.stringify(teacherRecord))

   console.log(teacherRecord)


  });
}
