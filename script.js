// Initialize EmailJS Engine with your credentials
const PUBLIC_KEY = "P-y_YbuTh-AhUdku1";
const SERVICE_ID = "service_1010"; // ⚙️ Fixed: Kept uniform with your current active dashboard service
const TEMPLATE_ID = "template_1010";
const AutoTemplate_ID = "template_autoreply";

(function () {
  if (PUBLIC_KEY !== "YOUR_PUBLIC_KEY") {
    emailjs.init(PUBLIC_KEY);
  }
})();

// --- 1. SEQUENTIAL TYPEWRITER CONTROLLER ---
const nameText = "Jafar Sareef.";
const titleText = "Front-End Developer";

function runTypewriter(elementId, text, speed, callback) {
  let index = 0;
  const element = document.getElementById(elementId);
  if (!element) return;
  element.classList.add("typewriter-caret");

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else {
      if (callback) {
        element.classList.remove("typewriter-caret");
        callback();
      }
    }
  }
  type();
}

document.addEventListener("DOMContentLoaded", () => {
  runTypewriter("typewriter-name", nameText, 100, () => {
    setTimeout(() => {
      runTypewriter("typewriter-title", titleText, 80, null);
    }, 400);
  });
  initTechCanvas();
});

// --- 2. MULTI-SYSTEM RESPONSIVE LOG BACKGROUND CANVAS ---
function initTechCanvas() {
  const canvas = document.getElementById("tech-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let fontSize = 11;
  let columns = 0;
  let drops = [];
  let assignedWords = [];

  const techPool = [
    "ERROR: Code-404",
    "SYS_HALT",
    "SQL_QUERY_OK",
    "POWER_BI_DASHBOARD",
    "TABLEAU_ENGINE",
    "PYTHON_SCRIPT_EXEC",
    "DEVOPS_PIPELINE_INIT",
    "DOCKER_CONTAINER_UP",
    "GIT_COMMIT_MAIN",
    "RESOLVING_DEPENDENCIES...",
    "01010101",
    "11001010",
    "STATUS_200",
    "DEBUG: Line 552",
  ];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columnWidth = window.innerWidth < 640 ? 90 : 140;
    columns = Math.floor(canvas.width / columnWidth);

    drops = Array(columns)
      .fill(0)
      .map(() => Math.random() * -100);
    assignedWords = Array(columns)
      .fill("")
      .map(() => techPool[Math.floor(Math.random() * techPool.length)]);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function draw() {
    ctx.fillStyle = "rgba(248, 250, 252, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = window.innerWidth < 640 ? "9px monospace" : "10px monospace";

    for (let i = 0; i < columns; i++) {
      const text = assignedWords[i] || "";
      const spacingX = window.innerWidth < 640 ? 95 : 140;
      const x = i * spacingX + 10;
      const y = drops[i] * fontSize;

      if (
        text.includes("ERROR") ||
        text.includes("404") ||
        text.includes("HALT")
      ) {
        ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
      } else if (
        text.includes("SQL") ||
        text.includes("PYTHON") ||
        text.includes("DEVOPS") ||
        text.includes("BI")
      ) {
        ctx.fillStyle = "rgba(100, 116, 139, 0.14)";
      } else {
        ctx.fillStyle = "rgba(16, 185, 129, 0.18)";
      }

      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.97) {
        drops[i] = 0;
        assignedWords[i] =
          techPool[Math.floor(Math.random() * techPool.length)];
      }
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

// --- 3. EMAILJS FORM HANDLING ---
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const btn = document.getElementById("submit-btn");
    const statusBox = document.getElementById("form-status");

    if (PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
      statusBox.classList.remove("hidden", "text-green-600");
      statusBox.classList.add("text-red-500");
      statusBox.innerText =
        "✕ Error: Configure your EmailJS Keys inside script.js.";
      return;
    }

    btn.innerText = "Sending...";
    btn.disabled = true;

    const userName = document.getElementById("user_name").value;
    const userEmail = document.getElementById("user_email").value;
    const messageSummary = document.getElementById("message_summary").value;

    const now = new Date();
    const currentDate = now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const currentTime = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(userName)}`;

    let emailIconUrl = "https://cdn-icons-png.flaticon.com/512/561/561127.png";
    if (userEmail.includes("@gmail.com")) {
      emailIconUrl = "https://cdn-icons-png.flaticon.com/512/732/732200.png";
    } else if (userEmail.includes("@yahoo")) {
      emailIconUrl = "https://cdn-icons-png.flaticon.com/512/732/732257.png";
    } else if (
      userEmail.includes("@outlook") ||
      userEmail.includes("@hotmail")
    ) {
      emailIconUrl = "https://cdn-icons-png.flaticon.com/512/732/732225.png";
    }

    const templateParams = {
      user_name: userName,
      user_email: userEmail,
      message_summary: messageSummary,
      current_date: currentDate,
      current_time: currentTime,
      avatar_url: avatarUrl,
      email_icon_url: emailIconUrl,
    };

    // Step 1: Send Notification Alert to Jafar
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log(
          "✓ Main Notification Sent:",
          response.status,
          response.text,
        );

        // Step 2: Send Auto-Reply Receipt back to User
        return emailjs.send(SERVICE_ID, AutoTemplate_ID, templateParams);
      })
      .then((autoReplyResponse) => {
        console.log(
          "✓ Auto-Reply Sent:",
          autoReplyResponse.status,
          autoReplyResponse.text,
        );

        // UI Success Handling
        btn.innerText = "Submit Message";
        btn.disabled = false;
        statusBox.classList.remove("hidden", "text-red-500");
        statusBox.classList.add("text-green-600");
        statusBox.innerText =
          "✓ Awesome! Your message was sent successfully to Jafar.";
        contactForm.reset();
      })
      .catch((err) => {
        btn.innerText = "Submit Message";
        btn.disabled = false;
        statusBox.classList.remove("hidden", "text-green-600");
        statusBox.classList.add("text-red-500");

        // Advanced explicit message decoding from EmailJS server
        const errorDetails = err?.text || err?.message || JSON.stringify(err);
        statusBox.innerText = `✕ Oops! Server Rejected Request (${errorDetails}).`;
        console.error("Detailed EmailJS Fault Stream:", err);
      });
  });
}

// --- 4. DYNAMIC CERTIFICATIONS & WORKSHOPS DATA ARRAY ---
const verifiedCertificates = [
  {
    title: "Data Analytics Certification",
    issuer: "LinkedIn Learning",
    image: "images/Data Analytics Linkedin Learning.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Data%20Analytics%20Linkedin%20Learning.pdf",
    summary:
      "Mastered the fundamental phases of data analysis, including data cleansing, visual pattern discovery, and insight generation using Excel and Power BI.",
  },
  {
    title: "Database Management System ",
    issuer: "NPTEL",
    image: "images/Database Management System NPTEL.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Databasse%20Management%20System%20NPTEL.pdf",
    summary:
      "Established rigorous academic foundations in structural IT paradigms, displaying individual initiative in technical problem-solving tracks.",
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "Deloitte (Forage)",
    image: "images/Deloitte Data Analytics Job Simulation.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Deloitte%20Data%20Analytics%20Job%20Simulation.pdf",
    summary:
      "Executed mock corporate enterprise analytic workflows: constructed visual dashboards, performed data forensics, and structured professional business presentations.",
  },
  {
    title: "HTML Fundamentals",
    issuer: "Coddy.Tech",
    image: "images/HTML Fundamentals Coddy.Tech.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/HTML%20Fundamentals%20Coddy.Tech.pdf",
    summary:
      "Developed applied fluency in HTML structural trees, semantic markup, tag hierarchies, and mobile-responsive layout mechanics.",
  },
  {
    title: "Introduction to CSS",
    issuer: "Coddy.Tech",
    image: "images/Introducction to CSS Coddy.Tech.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Introducction%20to%20CCS%20Coddy.Tech.pdf",
    summary:
      "Explored advanced layout styling patterns: mastery over cascading selectors, element spacing properties, and responsive layout architectures.",
  },
  {
    title: "Data Analytics Projects",
    issuer: "Simplilearn",
    image: "images/Simplilearn Data Analytics projects.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Simplilearn%20Data%20Analytics%20projects.pdf",
    summary:
      "Engineered isolated data pipeline simulations focused on extracting clean datasets, generating statistical visualizations, and drafting analytical conclusions.",
  },
  {
    title: "SmartHire AI (2nd Prize)",
    issuer: "National Conference / Final Year Project",
    image: "images/Conference.jpeg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Conference.jpeg",
    summary:
      "Presented an AI-powered interview simulator featuring JWT security, automated resume parsers, and sentiment analysis. Earned 2nd prize recognition.",
  },
  {
    title: "Full Stack Development Master Class",
    issuer: "Novitech",
    image: "images/Full_Stack_Developement_MasterClass_NoviTech.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Full_Stack_Developement_MasterClass_NoviTech.pdf",
    summary:
      "Completed comprehensive technical training across frontend UI frameworks (React) and backend infrastructure management (Node.js, SQL).",
  },
  {
    title: "Data Analytics Master Class",
    issuer: "Novitech",
    image: "images/Data_Analytics_MasterClass_NoviTech.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Data_Analytics_MasterClass_NoviTech.pdf",
    summary:
      "Accelerated technical proficiency with analytical software packages (Power BI, Tableau, Excel, SQL) to transform raw data pools into business dashboards.",
  },
  {
    title: "Artificial Intelligence Internship",
    issuer: "Novitech",
    image: "images/AI_Internship_NoviTech.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/raw/main/Artificial_Intelligence_Internship_NoviTech.pdf",
    summary:
      "Acquired real-world experience building baseline predictive engines, evaluating machine intelligence layers, and exploring data architectures.",
  },
  {
    title: "Machine Learning Internship",
    issuer: "Novitech",
    image: "images/Machine_Learning_Internship_NoviTech.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Machine_Learning_Internship_NoviTech.pdf",
    summary:
      "Practiced designing, training, and optimizing supervised and unsupervised statistical learning models to unlock strategic business insights.",
  },
  {
    title: "Data Analytics Field Internship",
    issuer: "Novitech",
    image: "images/Data_Analytics_Internship_NoviTech.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Data_Analytics_Internship_NoviTech.pdf",
    summary:
      "Refined hands-on data cleaning operations, targeted multi-source data mapping, and custom visual reporting matrices using SQL and BI engines.",
  },
];

const workshopAccolades = [
  {
    title: "Generative AI Application Lab",
    tag: "OutSkill Workshop",
    image: "images/OutSkill Gen AI.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/OutSkill%20Gen%20AI.pdf",
    summary:
      "Investigated modern generative platform nodes, prompt engineering workflows, and system integration strategies for automated workflows.",
  },
  {
    title: "Power BI Analytics Micro-Course",
    tag: "Scalar Academy Workshop",
    image: "images/Skill Course Power BI Micro Course.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Skill%20Course%20Power%20BI%20Micro%20Course.pdf",
    summary:
      "Developed specialized functional knowledge in relational data modeling, custom metric calculation, and fluid dashboard designs.",
  },
  {
    title: "Advanced Tableau Data Visualization",
    tag: "Scaler Master Class",
    image: "images/Scaler Masterclass Tableau.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/Scaler%20Masterclass%20Tableau.pdf",
    summary:
      "Studied technical presentation patterns: building complex data visualizations, unified dashboards, and impact-driven visual data stories.",
  },
  {
    title: "Enterprise Power BI Performance Lab",
    tag: "Office Master Workshop",
    image: "images/OfficeMaster PowerBI Workshop.jpg",
    link: "https://github.com/JafarSareef/Verified_Certificates/blob/main/OfficeMaster%20PowerBI%20Workshop.pdf",
    summary:
      "Participated in rigorous dashboard build-outs, formatting analytical structures, and mapping practical data optimization frameworks.",
  },
];

// --- 5. DOM INJECTION LOOP FOR CAROUSELS ---
document.addEventListener("DOMContentLoaded", () => {
  const verifiedContainer = document.getElementById(
    "verified-credentials-container",
  );
  const workshopContainer = document.getElementById(
    "workshop-accolades-container",
  );

  if (verifiedContainer) {
    verifiedContainer.innerHTML = verifiedCertificates
      .map(
        (cert) => `
        <div class="w-full max-w-xl flex-shrink-0 snap-start bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300">
            <div class="space-y-4">
                <div class="w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-inner group">
                    <img src="${cert.image}" alt="${cert.title}" class="w-full h-auto object-contain max-h-[400px] mx-auto group-hover:scale-[1.02] transition-transform duration-500">
                </div>
                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <h4 class="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">${cert.title}</h4>
                    <p class="text-[11px] font-bold text-blue-600 uppercase tracking-wider mt-1">${cert.issuer}</p>
                    <p class="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium border-t border-slate-50 pt-2">${cert.summary}</p>
                </div>
            </div>
            <div class="mt-6 pt-3 border-t border-slate-200/60 flex justify-end">
                <a href="${cert.link}" target="_blank" class="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-full transition-colors">
                    <span>Verify Credentials</span> <i class="fas fa-external-link-alt text-[10px]"></i>
                </a>
            </div>
        </div>
      `,
      )
      .join("");
  }

  if (workshopContainer) {
    workshopContainer.innerHTML = workshopAccolades
      .map(
        (work) => `
        <div class="w-full max-w-xl flex-shrink-0 snap-start bg-slate-50 border border-slate-100 p-6 rounded-3xl flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300">
            <div class="space-y-4">
                <div class="w-full rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-inner group">
                    <img src="${work.image}" alt="${work.title}" class="w-full h-auto object-contain max-h-[400px] mx-auto group-hover:scale-[1.02] transition-transform duration-500">
                </div>
                <div class="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                    <h4 class="font-extrabold text-base sm:text-lg text-slate-900 leading-snug">${work.title}</h4>
                    <p class="text-[11px] font-bold text-amber-600 uppercase tracking-wider mt-1">${work.tag}</p>
                    <p class="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-medium border-t border-slate-50 pt-2">${work.summary}</p>
                </div>
            </div>
            <div class="mt-6 pt-3 border-t border-slate-200/60 flex justify-end">
                <a href="${work.link}" target="_blank" class="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-4 py-2 rounded-full transition-colors">
                    <span>View Credentials</span> <i class="fas fa-external-link-alt text-[10px]"></i>
                </a>
            </div>
        </div>
      `,
      )
      .join("");
  }
});

// --- 6. DYNAMIC PROJECTS INVENTORY CONFIGURATION ---
const myProjects = [
  {
    title: "SmartHire: AI-Powered Virtual Job Interview Simulator",
    category: "Artificial Intelligence & Front-End",
    image: "SmartHire Project.png",
    summary:
      "Awarded 2nd prize at the National Conference. Engineered a smart simulation engine powered by Python, Node.js, and Google AI Studio APIs. Features automated PDF document extraction via PyPDF, real-time Speech-to-Text conversion modules, and an optimized, fully structured React JS user interface context layout.",
    githubLink: "https://github.com/JafarSareef/SmartHire-AI-Interview---FYP",
    liveLink:
      "https://github.com/JafarSareef/SmartHire-AI-Interview---FYP/blob/main/Demo%20Video.mp4",
    tools: [
      { type: "icon", class: "fab fa-react text-cyan-500", title: "React JS" },
      {
        type: "icon",
        class: "fab fa-node-js text-green-500",
        title: "Node.js",
      },
      {
        type: "icon",
        class: "fab fa-js-square text-yellow-500",
        title: "JavaScript",
      },
      { type: "svg", name: "python", title: "Python" },
      { type: "badge", label: "Google AI Studio API" },
      { type: "badge", label: "PyPDF" },
      { type: "badge", label: "Speech-to-AI" },
    ],
  },
  {
    title: "Data Analytics Dashboard Projects",
    category: "Data Analytics & Operations",
    image: "Data Analytics Projects.png",
    summary:
      "Transformed unstructured legacy corporate datasets into automated interactive intelligence charts. Structured extensive data modeling rules to extract granular seasonal trends and operational KPIs.",
    githubLink:
      "https://github.com/JafarSareef/Simplilearn-Data-Analystics-Projects",
    liveLink:
      "https://www.linkedin.com/posts/jafarsareef_dataanalytics-powerbi-tableau-ugcPost-7427112753091411969-upxX?utm_source=share&utm_medium=member_desktop&rcm=ACoAADxCrWsBLBf0eBw16KDjd0Eysh0Z9SO1acs",
    tools: [
      { type: "svg", name: "powerbi", title: "Power BI" },
      { type: "svg", name: "tableau", title: "Tableau" },
      { type: "svg", name: "excel", title: "Excel" },
    ],
  },
  {
    title: "Personal Portfolio & Digital Ecosystem",
    category: "Front-End Engineering",
    image: "Portfolio.png",
    summary:
      "Architected and engineered a fully responsive, semantic digital portfolio platform. Features high-performance dynamic components parsed entirely through modern vanilla JavaScript engines, integrated structural component mapping layouts, and clean utility styling overrides using Tailwind CSS canvas parameters.",
    githubLink: "https://github.com/JafarSareef/Portfolio-2026",
    liveLink: "https://jafarsareef.github.io/Portfolio-2026/",
    tools: [
      { type: "icon", class: "fab fa-html5 text-orange-500", title: "HTML5" },
      { type: "icon", class: "fab fa-css3-alt text-blue-500", title: "CSS3" },
      {
        type: "icon",
        class: "fab fa-js-square text-yellow-500",
        title: "JavaScript",
      },
      { type: "badge", label: "Tailwind CSS v4" },
    ],
  },
];

// Projects Engine Injection Loop
document.addEventListener("DOMContentLoaded", () => {
  const projectsContainer = document.getElementById("projects-mesh-container");
  if (!projectsContainer) return;

  projectsContainer.innerHTML = myProjects
    .map((project) => {
      const techStackIcons = Array.isArray(project.tools)
        ? project.tools
            .map((tool) => {
              if (tool.type === "icon") {
                return `<i class="${tool.class} transition-transform hover:scale-110" title="${tool.title}"></i>`;
              }
              if (tool.type === "badge") {
                return `<span class="text-[10px] font-bold font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200 transition-colors hover:bg-slate-200/60">${tool.label}</span>`;
              }
              if (tool.type === "svg") {
                if (tool.name === "python") {
                  return `<div class="text-slate-400 hover:text-blue-500 transition-colors flex items-center" title="Python"><svg class="w-5 h-5 fill-current" viewBox="0 0 448 512"><path d="M439.4 153.8c0-83.2-68.7-142-151.8-142H160.3C77.2 11.8 8.5 70.6 8.5 153.8v78.2c0 26.5 21.5 48 48 48h48v32h-48c-26.5 0-48 21.5-48 48v78.2c0 83.2 68.7 142 151.8 142h127.3c83.2 0 151.8-58.8 151.8-142v-78.2c0-26.5-21.5-48-48-48h-48v-32h48c26.5 0 48-21.5 48-48v-78.2zm-279.4-46c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm208 288c-13.3 0-24-10.7-24-24s-10.7-24 24-24 24 10.7 24 24-10.7 24-24 24z"/></svg></div>`;
                }
                if (tool.name === "powerbi") {
                  return `<div class="text-slate-400 hover:text-yellow-500 transition-colors flex items-center" title="Power BI"><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M10.125 0H6.75v24h3.375zM16.875 6.75H13.5V24h3.375zM23.625 12.375H20.25V24h3.375zM3.375 15.75H0V24h3.375z"/></svg></div>`;
                }
                if (tool.name === "tableau") {
                  return `<div class="text-slate-400 hover:text-indigo-500 transition-colors flex items-center" title="Tableau"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 2v20M2 12h20M12 6v12M6 12h12M12 9v6M9 12h6" /></svg></div>`;
                }
                if (tool.name === "excel") {
                  return `<div class="text-slate-400 hover:text-green-600 transition-colors flex items-center" title="Microsoft Excel"><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23 1.5l-9 2v17l9 2v-21zm-10.5 4h8v2h-8v-2zm0 3.5h8v2h-8v-2zm0 3.5h8v2h-8v-2zm0 3.5h8v2h-8v-2zM1 5.5l10-2v17l-10-2v-13zm3.5 9.5l2-3 2 3h1.5l-2.75-4 2.75-4h-1.5l-2 3-2-3h-1.5l2.75 4-2.75 4h1.5z"/></svg></div>`;
                }
              }
              return "";
            })
            .join("")
        : "";

      return `
        <div class="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
            <div>
                <div class="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 mb-6 relative">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                </div>
                <span class="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">${project.category}</span>
                <h3 class="font-extrabold text-lg text-slate-900 tracking-tight mt-3 mb-2 leading-snug group-hover:text-blue-600 transition-colors">${project.title}</h3>
                <p class="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">${project.summary}</p>
            </div>
            <div>
                <div class="flex flex-wrap items-center gap-3 mb-6 text-slate-400 text-xl">
                    ${techStackIcons}
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-slate-100">
                    <a href="${project.githubLink}" target="_blank" class="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center space-x-1.5 transition-colors">
                        <i class="fab fa-github text-sm"></i> <span>Repository</span>
                    </a>
                    <a href="${project.liveLink}" target="_blank" class="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                        <span>Live Prototype</span> <i class="fas fa-arrow-right text-[10px]"></i>
                    </a>
                </div>
            </div>
        </div>
      `;
    })
    .join("");
});

// --- 7. MOBILE MENU TOGGLE LOGIC ---
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const menuIcon = document.getElementById("menu-icon");
const mobileLinks = document.querySelectorAll(".mobile-link");
let isMenuOpen = false;

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      mobileMenu.classList.remove(
        "-translate-y-full",
        "opacity-0",
        "pointer-events-none",
      );
      mobileMenu.classList.add(
        "translate-y-0",
        "opacity-100",
        "pointer-events-auto",
      );
      menuIcon.setAttribute("d", "M6 18L18 6M6 6l12 12");
    } else {
      mobileMenu.classList.remove(
        "translate-y-0",
        "opacity-100",
        "pointer-events-auto",
      );
      mobileMenu.classList.add(
        "-translate-y-full",
        "opacity-0",
        "pointer-events-none",
      );
      menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      isMenuOpen = false;
      mobileMenu.classList.remove(
        "translate-y-0",
        "opacity-100",
        "pointer-events-auto",
      );
      mobileMenu.classList.add(
        "-translate-y-full",
        "opacity-0",
        "pointer-events-none",
      );
      menuIcon.setAttribute("d", "M4 6h16M4 12h16M4 18h16");
    });
  });
}

// --- 8. GLOBAL ANCHOR INTERCEPTOR FOR EXTERNAL LINKS ---
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link && link.href) {
    const isExternal = link.hostname !== window.location.hostname;
    if (isExternal) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  }
});
