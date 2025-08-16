const examForm = document.getElementById("examForm");
const plansContainer = document.getElementById("plansContainer");
const showPlansBtn = document.getElementById("showPlans");
const flowchartContainer = document.getElementById("flowchartContainer");
examForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const exam = {
    name: document.getElementById("examName").value,
    date: document.getElementById("examDate").value,
    topics: document.getElementById("topics").value.split(",").map(t => t.trim()),
    subtopics: document.getElementById("subtopics").value.split(",").map(t => t.trim()),
    topicTime: document.getElementById("topicTime").value,
    subtopicTime: document.getElementById("subtopicTime").value
  };
  let plans = JSON.parse(localStorage.getItem("examPlans")) || [];
  plans.push(exam);
  localStorage.setItem("examPlans", JSON.stringify(plans));
  examForm.reset();
  displayPlans();
});

// Show Previous Plans
showPlansBtn.addEventListener("click", displayPlans);
function displayPlans() {
  plansContainer.innerHTML = "";
  flowchartContainer.innerHTML = "";
  const plans = JSON.parse(localStorage.getItem("examPlans")) || [];
  plans.forEach((plan, index) => {
    const planDiv = document.createElement("div");
    planDiv.className = "plan";
    planDiv.innerHTML = `
      <h3>${plan.name} - ${plan.date}</h3>
      <p><strong>Topics:</strong> ${plan.topics.join(", ")}</p>
      <p><strong>Subtopics:</strong> ${plan.subtopics.join(", ")}</p>
      <p><strong>Time:</strong> ${plan.topicTime} per topic, ${plan.subtopicTime} per subtopic</p>
      <button onclick="deletePlan(${index})">Delete</button>
    `;
    plansContainer.appendChild(planDiv);

    generateFlowchart(plan);
  });
}
function generateFlowchart(plan) {
  flowchartContainer.innerHTML = "";
  const examNode = createNode(`${plan.name} (${plan.date})`);
  flowchartContainer.appendChild(examNode);
  plan.topics.forEach((topic, i) => {
    const topicNode = createNode(`${topic} (${plan.topicTime})`);
    flowchartContainer.appendChild(topicNode);
    if (plan.subtopics[i]) {
      const subNode = createNode(`${plan.subtopics[i]} (${plan.subtopicTime})`);
      flowchartContainer.appendChild(subNode);
    }
  });
}
function createNode(text) {
  const div = document.createElement("div");
  div.className = "flow-node";
  div.textContent = text;
  return div;
}
function deletePlan(index) {
  let plans = JSON.parse(localStorage.getItem("examPlans"));
  plans.splice(index, 1);
  localStorage.setItem("examPlans", JSON.stringify(plans));
  displayPlans();
}
