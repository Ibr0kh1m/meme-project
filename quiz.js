// ═══════════════════════════════════════════════
//  AUDIO ENGINE
// ═══════════════════════════════════════════════

const BASE = 'https://ibr0kh1m.github.io/meme-project/';

const failFiles = [
    'faaah.mp3',
    'cat-laugh-meme-1.mp3',
    'spongebob-fail.mp3',
    'tuco-get-out.mp3',
    'oh-my-god-bro-oh-hell-nah-man.mp3',
    'movie_1.mp3'
];

const winFiles = [
    'oi-oi-oe-oi-a-eye-eye.mp3',
    'mlg-airhorn.mp3',
    'the-weeknd-rizzz.mp3',
    'yippeeeeeeeeeeeee.mp3',
    'social-credit_751J4TV.mp3',
    'social-credit-music.mp3'
];

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const failBuffers = [];
const winBuffers = [];
let currentSource = null;

async function loadBuffer(filename) {
    try {
        const res = await fetch(BASE + filename);
        const arrayBuf = await res.arrayBuffer();
        return await audioCtx.decodeAudioData(arrayBuf);
    } catch (e) {
        console.warn('Could not load:', filename, e);
        return null;
    }
}

async function preloadAll() {
    const [fails, wins] = await Promise.all([
        Promise.all(failFiles.map(loadBuffer)),
        Promise.all(winFiles.map(loadBuffer))
    ]);
    fails.forEach(b => b && failBuffers.push(b));
    wins.forEach(b => b && winBuffers.push(b));
    console.log('✅ All sounds preloaded!');
}

preloadAll();

function stopCurrent() {
    if (currentSource) {
        try { currentSource.stop(); } catch (e) {}
        currentSource = null;
    }
}

function playBuffer(buffers) {
    if (!buffers.length) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    stopCurrent();
    const buf = buffers[Math.floor(Math.random() * buffers.length)];
    const source = audioCtx.createBufferSource();
    source.buffer = buf;
    source.connect(audioCtx.destination);
    source.start(0);
    currentSource = source;
    source.onended = () => { currentSource = null; };
}

function playFail() { playBuffer(failBuffers); }
function playWin()  { playBuffer(winBuffers); }

// ═══════════════════════════════════════════════
//  SOCIAL CREDIT TOAST
// ═══════════════════════════════════════════════

function showSocialCredit() {
    const toast = document.getElementById('social-credit-toast');
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
}

// ═══════════════════════════════════════════════
//  QUIZ DATA
// ═══════════════════════════════════════════════

const quizData = [
    { q: "What is the primary objective of the 'planning' function in management?", options: ["Supervising daily factory operations", "Setting objectives and developing success strategies", "Calculating annual tax liabilities", "Recruiting entry-level personnel"], a: 1 },
    { q: "Which of the following defines the management task of 'organising'?", options: ["Classifying activities and dividing work into manageable tasks", "Issuing financial bonuses to senior staff", "Promoting products to global markets", "Managing public relations crises"], a: 0 },
    { q: "Under which management category do the social skills of motivation and integration fall?", options: ["Accounting", "Strategy", "Integrating", "Procurement"], a: 2 },
    { q: "In a professional context, what does 'measuring performance' entail?", options: ["Increasing staff compensation automatically", "Verifying if organisational targets are being met", "Separating office departments physically", "Terminating employment contracts"], a: 1 },
    { q: "How is 'innovation' precisely defined within a corporate framework?", options: ["A period of financial decline", "The introduction of a new idea or method", "The existing hierarchy of command", "Standard administrative procedures"], a: 1 },
    { q: "A specific plan formulated to achieve long-term success is termed a...", options: ["Strategy", "Subordinate", "Consultancy", "Dividend"], a: 0 },
    { q: "Which term denotes an individual holding a position of lower rank within an organisation?", options: ["Director", "Consultant", "Executive", "Subordinate"], a: 3 },
    { q: "What constitutes a corporate 'crisis'?", options: ["A trend of increasing profitability", "A situation of significant danger or instability", "A scheduled marketing initiative", "The appointment of a new auditor"], a: 1 },
    { q: "The economic sector directly administered by the state is the...", options: ["Private sector", "Public sector", "Secondary sector", "Retail sector"], a: 1 },
    { q: "What is the primary function of an external 'consultant'?", options: ["Governing daily operations indefinitely", "Providing specialised expert advice", "Managing the staff canteen", "Acquiring majority shareholdings"], a: 1 },
    { q: "The 'allocation of resources' primarily involves managing which two elements?", options: ["Media and branding", "Logistics and shipping", "Personnel and capital", "Legal and compliance"], a: 2 },
    { q: "Why is management often described as a social skill rather than a pure science?", options: ["It depends entirely on luck", "It involves complex human interactions and psychology", "It has no theoretical foundations", "It cannot be evaluated quantitatively"], a: 1 },
    { q: "What does 'Theory X' assume regarding employee motivation?", options: ["Staff are naturally self-driven", "Personnel are inherently disinclined to work and require control", "Work is viewed as a source of fulfilment", "Autonomy is the most effective motivator"], a: 1 },
    { q: "According to 'Theory Y', how do employees perceive their professional duties?", options: ["As a source of misery", "As a purely financial transaction", "As a psychological necessity and a source of satisfaction", "As a task to be avoided at all costs"], a: 2 },
    { q: "How are workers typically managed in a Theory X environment?", options: ["Through total creative freedom", "Through coercion, control, and external incentives", "By eliminating all hierarchical layers", "Through flexible working arrangements"], a: 1 },
    { q: "Theory Y is considered most appropriate for which category of staff?", options: ["Unskilled manual labour", "Knowledge workers and specialists", "Part-time seasonal staff", "Standardised assembly line workers"], a: 1 },
    { q: "In the context of human needs, what are 'physiological' requirements?", options: ["Desires for prestige", "Basic survival needs such as food and shelter", "The need for physical safety", "The pursuit of artistic growth"], a: 1 },
    { q: "The requirement for status and professional recognition is classified as...", options: ["Self-actualisation", "Safety needs", "Physiological needs", "Esteem needs"], a: 3 },
    { q: "The concept of 'self-actualisation' involves which of the following?", options: ["Securing a bank loan", "Realising one's full potential and personal growth", "Obtaining a fixed-term contract", "Building social relationships with peers"], a: 1 },
    { q: "How is a 'hygiene factor' defined in motivational theory?", options: ["A factor that prevents dissatisfaction but does not motivate", "A primary driver of high performance", "A requirement for clinical cleanliness", "The ultimate level of human satisfaction"], a: 0 },
    { q: "Which of these is identified as a 'true motivator' rather than a hygiene factor?", options: ["Challenging and meaningful work", "Statutory sick pay", "Adequate office lighting", "A secure employment contract"], a: 0 },
    { q: "Financial security and pension provisions are categorised as...", options: ["Core motivators", "Hygiene factors", "Aspirational needs", "Redundant variables"], a: 1 },
    { q: "What is the strategic objective of 'job rotation'?", options: ["To reduce labour costs", "To relocate staff to different cities", "To vary tasks and mitigate employee boredom", "To remove the need for supervision"], a: 2 },
    { q: "The collective beliefs and practices of an organisation are its...", options: ["Corporate culture", "Strategic mission", "Vertical command", "Operational hygiene"], a: 0 },
    { q: "'Labour relations' focuses primarily on the interaction between...", options: ["Competing companies", "Management and the workforce", "A firm and its clientele", "The firm and its shareholders"], a: 1 },
    { q: "Additional employment benefits beyond a basic salary are known as...", options: ["Wages", "Dividends", "Perks", "Provisions"], a: 2 },
    { q: "What defines a 'hierarchy' or 'chain of command'?", options: ["A horizontal structure with no authority", "A system of authority with distinct vertical levels", "An external distribution network", "A temporary informal group"], a: 1 },
    { q: "'Line authority' is defined as the power to...", options: ["Directly instruct subordinates in the hierarchy", "Disregard all company regulations", "Advise without the power to act", "Operate without a manager"], a: 0 },
    { q: "To 'delegate' a responsibility means to...", options: ["Perform the task personally", "Assign the decision-making authority to another", "Formalise a resignation", "Ignore a professional obligation"], a: 1 },
    { q: "An 'autonomous' worker is one who is...", options: ["Strictly supervised daily", "Dependent on management for every step", "Able to act and decide independently", "Limited to government projects"], a: 2 },
    { q: "In organisational terms, a 'function' represents...", options: ["A specific area of expertise like Finance or HR", "An annual social gathering", "A decline in quarterly output", "An external contractor"], a: 0 },
    { q: "What is a disadvantage of a functional organisational structure?", options: ["It employs too few people", "Departments may focus on their own goals over the company's", "It causes redundant management layers", "It is legally impossible to sustain"], a: 1 },
    { q: "Why might a firm choose to 'flatten' its organisational structure?", options: ["To accelerate decision-making by removing middle management", "To increase central control", "To add more administrative overhead", "To decrease overall production speed"], a: 0 },
    { q: "What is the primary trait of 'matrix management'?", options: ["Staff work exclusively in isolation", "No management exists", "Employees report to multiple superiors simultaneously", "Decisions are made by AI"], a: 2 },
    { q: "A known complication of a matrix structure is...", options: ["Excessive simplicity", "Lack of any innovation", "Potential for conflicting priorities and complexity", "Absolute job stability"], a: 2 },
    { q: "'Wikinomics' as a concept refers to...", options: ["Top-down authoritarianism", "Mass collaboration and open-source contribution", "Data secrecy", "The removal of digital tools"], a: 1 },
    { q: "'Reporting to' a superior implies...", options: ["Being accountable to and taking direction from them", "Providing monthly updates only", "Being their direct manager", "Sharing the same office space"], a: 0 },
    { q: "Which strategy involves using internal profits to fund growth?", options: ["Venture funding", "Self-financing", "Public debt", "Asset liquidation"], a: 1 },
    { q: "'Glocalisation' is best described as...", options: ["Universal product standardisation", "Local-only commerce", "Adapting global products to specific local cultures", "Exiting international markets"], a: 2 },
    { q: "How does a 'linear-active' culture typically approach work?", options: ["By improvising and disregarding schedules", "By focusing purely on relationships", "By avoiding eye contact", "By planning logically and focusing on one task at a time"], a: 3 },
    { q: "A 'multi-active' culture places a high value on...", options: ["Emotions, relationships, and flexible timing", "Rigid punctuality", "Strict adherence to written contracts", "Silent observation only"], a: 0 },
    { q: "'Reactive' cultures are characterised by which behaviour?", options: ["Frequent interruptions", "Careful listening and the avoidance of direct confrontation", "Aggressive public debating", "Disregard for seniority"], a: 1 },
    { q: "A 'collectivist' society prioritises...", options: ["Individual glory", "Anarchic business models", "The welfare and harmony of the group", "Personal accumulation of wealth"], a: 2 },
    { q: "The cultural concept of 'losing face' involves...", options: ["Making a clerical error", "Being publicly humiliated or shamed", "Changing career paths", "Losing a minor negotiation"], a: 1 },
    { q: "'Universalists' fundamentally believe that...", options: ["Friendship overrides the law", "Rules and contracts must apply to everyone equally", "Hierarchy is the only rule", "Contracts are merely suggestions"], a: 1 },
    { q: "'Particularists' typically believe that...", options: ["Global standards are always correct", "Logic is the only valid tool", "Time is a rigid line", "Specific relationships take precedence over abstract rules"], a: 3 },
    { q: "To 'compromise' in a negotiation involves...", options: ["Refusing any movement", "Direct and hostile confrontation", "Modifying demands to reach a mutual agreement", "Delegating the outcome"], a: 2 },
    { q: "'Intuition' in a business context refers to...", options: ["Data-driven forecasting", "Knowing something without conscious reasoning", "Strict adherence to manuals", "Polling subordinates"], a: 1 },
    { q: "A 'confrontation' in a meeting is defined as...", options: ["A polite greeting", "A face-to-face disagreement", "A written memorandum", "A silent agreement"], a: 1 },
    { q: "'Improvising' within an operational setting means...", options: ["Following a script", "Waiting for senior orders", "Acting without prior planning when necessary", "Archiving a process"], a: 2 }
];

// ═══════════════════════════════════════════════
//  QUIZ LOGIC
// ═══════════════════════════════════════════════

let currentIndex = 0;
let score = 0;

const el = {
    start:      document.getElementById('screen-start'),
    quiz:       document.getElementById('screen-quiz'),
    result:     document.getElementById('screen-result'),
    qText:      document.getElementById('text-question'),
    options:    document.getElementById('options-grid'),
    current:    document.getElementById('counter-current'),
    score:      document.getElementById('counter-score'),
    progress:   document.getElementById('progress-bar'),
    nextBtn:    document.getElementById('control-next'),
    finalScore: document.getElementById('final-score-val'),
    feedback:   document.getElementById('feedback-text'),
    box:        document.getElementById('question-box'),
    wrongFlash: document.getElementById('wrong-flash')
};

function startQuiz() {
    el.start.classList.add('fade-exit');
    setTimeout(() => {
        el.start.classList.add('hidden');
        el.quiz.classList.remove('hidden');
        loadQuestion();
    }, 400);
}

function loadQuestion() {
    const data = quizData[currentIndex];
    el.qText.innerText = data.q;
    el.options.innerHTML = '';
    el.nextBtn.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');

    el.box.classList.remove('fade-enter');
    void el.box.offsetWidth;
    el.box.classList.add('fade-enter');

    data.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = `option-btn stagger-${i} w-full text-left p-5 rounded-2xl border-2 border-gray-100 bg-white/50 hover:bg-white text-gray-700 font-semibold shadow-sm flex items-center gap-4`;
        btn.innerHTML = `
            <div class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-400 flex items-center justify-center text-xs font-black flex-shrink-0">${String.fromCharCode(65 + i)}</div>
            <span>${opt}</span>
        `;
        btn.onclick = () => selectOption(i, btn);
        el.options.appendChild(btn);
    });

    el.current.innerText = currentIndex + 1;
    el.progress.style.width = `${(currentIndex / quizData.length) * 100}%`;
}

function selectOption(idx, btn) {
    const data = quizData[currentIndex];
    const allBtns = el.options.querySelectorAll('button');
    allBtns.forEach(b => b.disabled = true);

    if (idx === data.a) {
        btn.classList.add('border-green-300', 'bg-green-50');
        score++;
        el.score.innerText = score;
        playWin();
        showSocialCredit();
    } else {
        btn.classList.add('border-red-200', 'bg-red-50');
        allBtns[data.a].classList.add('border-green-300', 'bg-green-50');
        playFail();

        el.wrongFlash.classList.remove('flash');
        void el.wrongFlash.offsetWidth;
        el.wrongFlash.classList.add('flash');

        btn.classList.add('shake');
        btn.addEventListener('animationend', () => btn.classList.remove('shake'), { once: true });
    }

    el.nextBtn.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
}

function goToNextQuestion() {
    stopCurrent();
    if (currentIndex < quizData.length - 1) {
        el.box.classList.add('fade-exit');
        setTimeout(() => {
            currentIndex++;
            el.box.classList.remove('fade-exit');
            loadQuestion();
        }, 400);
    } else {
        showFinalResults();
    }
}

function showFinalResults() {
    stopCurrent();
    el.quiz.classList.add('fade-exit');
    setTimeout(() => {
        el.quiz.classList.add('hidden');
        el.result.classList.remove('hidden');
        el.finalScore.innerText = score;

        const ratio = score / quizData.length;
        if      (ratio >= 0.9) el.feedback.innerText = "Exceptional performance. You have attained a comprehensive mastery of the theoretical syllabus.";
        else if (ratio >= 0.7) el.feedback.innerText = "Substantial understanding demonstrated. Most core concepts have been correctly identified.";
        else if (ratio >= 0.5) el.feedback.innerText = "Satisfactory grasp of terminology, though further review of cultural and structural models is recommended.";
        else                   el.feedback.innerText = "Foundational review required to align with the professional requirements of the module.";
    }, 400);
}
