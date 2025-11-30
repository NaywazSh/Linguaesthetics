/* 
    DATA BACKBONE 
    The keys here match the 'value' attributes in your HTML dropdown.
*/
const learningData = {
    english: {
        vocabulary: [
            { term: "Serendipity", definition: "Finding something good without looking for it", example: "It was pure serendipity that we met." },
            { term: "Petrichor", definition: "The smell of earth after rain", example: "I love the petrichor in the morning." }
        ],
        video: [
            { title: "English Conversation", duration: "5:00", thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=60" }
        ],
        grammar: [{ rule: "Subject-Verb Agreement", desc: "He walks (singular) vs They walk (plural)." }],
        quiz: [{ question: "Past tense of 'Run'?", options: ["Runned", "Ran", "Running"], answer: 1 }]
    },
    mandarin: {
        vocabulary: [
            { term: "Nǐ hǎo (你好)", definition: "Hello", example: "Nǐ hǎo, ma?" },
            { term: "Xièxiè (谢谢)", definition: "Thank You", example: "Xièxiè nǐ de bāngzhù." }
        ],
        video: [],
        grammar: [{ rule: "The 4 Tones", desc: "Mandarin relies on tones to distinguish meaning." }],
        quiz: [{ question: "What is 'Thank You'?", options: ["Ni Hao", "Xiexie", "Zaijian"], answer: 1 }]
    },
    spanish: {
        vocabulary: [
            { term: "El Gato", definition: "The Cat", example: "El gato duerme en el sofá." },
            { term: "La Biblioteca", definition: "The Library", example: "Estudio en la biblioteca." }
        ],
        video: [
             { title: "Spanish Basics", duration: "4:20", thumbnail: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?auto=format&fit=crop&w=500&q=60" }
        ],
        grammar: [{ rule: "Gender Nouns", desc: "Words ending in -o are usually masculine, -a are feminine." }],
        quiz: [{ question: "Translate 'Red'", options: ["Azul", "Rojo", "Verde"], answer: 1 }]
    },
    german: {
        vocabulary: [
            { term: "Der Hund", definition: "The Dog", example: "Der Hund bellt." },
            { term: "Guten Morgen", definition: "Good Morning", example: "Guten Morgen, wie geht's?" }
        ],
        video: [],
        grammar: [{ rule: "Capitalization", desc: "All nouns in German are capitalized." }],
        quiz: [{ question: "Means 'Yes'", options: ["Nein", "Ja", "Doch"], answer: 1 }]
    },
    french: {
        vocabulary: [
            { term: "L'Amour", definition: "Love", example: "C'est l'amour de ma vie." },
            { term: "Pomme", definition: "Apple", example: "Je mange une pomme." }
        ],
        video: [],
        grammar: [{ rule: "Liaison", desc: "Linking final consonants to initial vowels." }],
        quiz: [{ question: "Translate 'Cat'", options: ["Chien", "Chat", "Cheval"], answer: 1 }]
    },
    portuguese: {
        vocabulary: [
            { term: "Obrigado", definition: "Thank you (male)", example: "Obrigado pelo presente." },
            { term: "A Praia", definition: "The Beach", example: "Eu amo a praia." }
        ],
        video: [],
        grammar: [{ rule: "Ser vs Estar", desc: "Similar to Spanish, denoting permanent vs temporary states." }],
        quiz: [{ question: "Good Night", options: ["Bom dia", "Boa noite", "Tarde"], answer: 1 }]
    },
    arabic: {
        vocabulary: [
            { term: "Marhaba (مرحبا)", definition: "Hello", example: "Marhaba, kayfa halak?" },
            { term: "Shukran (شكرا)", definition: "Thank you", example: "Shukran jazeelan." }
        ],
        video: [],
        grammar: [{ rule: "Right to Left", desc: "Arabic script is written from right to left." }],
        quiz: [{ question: "Translate 'Peace'", options: ["Salam", "Harb", "Kitab"], answer: 0 }]
    },
    japanese: {
        vocabulary: [
            { term: "Konnichiwa (こんにちは)", definition: "Hello/Good Afternoon", example: "Konnichiwa genki desu ka?" },
            { term: "Arigatou (ありがとう)", definition: "Thank you", example: "Arigatou gozaimasu." }
        ],
        video: [],
        grammar: [{ rule: "SOV Structure", desc: "Subject - Object - Verb word order." }],
        quiz: [{ question: "Translate 'Water'", options: ["Mizu", "Hi", "Tsuchi"], answer: 0 }]
    },
    russian: {
        vocabulary: [
            { term: "Privet (Привет)", definition: "Hi (Informal)", example: "Privet, kak dela?" },
            { term: "Spasibo (Спасибо)", definition: "Thank you", example: "Bolshoe spasibo." }
        ],
        video: [],
        grammar: [{ rule: "Cyrillic Alphabet", desc: "Russian uses the Cyrillic script." }],
        quiz: [{ question: "Translate 'No'", options: ["Da", "Net", "Mozhet"], answer: 1 }]
    },
    hindi: {
        vocabulary: [
            { term: "Namaste (नमस्ते)", definition: "Hello/Greetings", example: "Namaste, aap kaise hain?" },
            { term: "Dhanyavaad (धन्यवाद)", definition: "Thank you", example: "Aapka dhanyavaad." }
        ],
        video: [],
        grammar: [{ rule: "Gendered Verbs", desc: "Verb endings often change based on gender." }],
        quiz: [{ question: "Translate 'Tea'", options: ["Paani", "Chai", "Doodh"], answer: 1 }]
    }
};

/* STATE MANAGEMENT */
let currentLanguage = "english"; // Default
let currentSection = "vocabulary";

/* DOM ELEMENTS */
const contentGrid = document.getElementById('content-grid');
const langSelect = document.getElementById('language-select');
const tabButtons = document.querySelectorAll('.tab-btn');

/* INITIALIZATION */
document.addEventListener('DOMContentLoaded', () => {
    // Sync Select with Default
    langSelect.value = currentLanguage; 
    renderContent();
});

/* EVENT LISTENERS */
langSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    
    // Smooth Transition Effect
    contentGrid.style.opacity = '0';
    contentGrid.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        renderContent();
        contentGrid.style.opacity = '1';
        contentGrid.style.transform = 'translateY(0)';
    }, 300);
});

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update Active Class
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update State
        currentSection = btn.getAttribute('data-type');
        renderContent();
    });
});

/* RENDERING ENGINE */
function renderContent() {
    contentGrid.innerHTML = ""; // Clear existing
    
    // Safety check if language data exists
    if(!learningData[currentLanguage] || !learningData[currentLanguage][currentSection]) {
        contentGrid.innerHTML = `<h3 style="grid-column: 1/-1; text-align:center; color: #fff;">Content coming soon for ${currentLanguage}!</h3>`;
        return;
    }

    const data = learningData[currentLanguage][currentSection];

    if(data.length === 0) {
        contentGrid.innerHTML = `<h3 style="grid-column: 1/-1; text-align:center; opacity: 0.7;">No content added yet for this section.</h3>`;
        return;
    }

    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        // Staggered animation
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';

        // GENERATE CARD BASED ON TYPE
        if (currentSection === 'vocabulary') {
            card.innerHTML = `
                <div class="card-tag">Vocabulary</div>
                <div class="card-content">
                    <h3>${item.term}</h3>
                    <p style="color: var(--secondary)">${item.definition}</p>
                    <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;">
                    <p style="font-style: italic; font-size: 0.9rem;">"${item.example}"</p>
                </div>
                <button class="action-btn" onclick="speakText('${item.term}')"><i class="fa-solid fa-volume-high"></i> Listen</button>
            `;
        } 
        else if (currentSection === 'video') {
            card.innerHTML = `
                <div class="card-tag">Video Lesson</div>
                <div class="video-frame" style="background-image: url('${item.thumbnail}'); background-size: cover;">
                    <i class="fa-solid fa-play-circle play-btn"></i>
                </div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p><i class="fa-regular fa-clock"></i> ${item.duration} Mins</p>
                </div>
                <button class="action-btn">Watch Now</button>
            `;
        }
        else if (currentSection === 'grammar') {
            card.innerHTML = `
                <div class="card-tag">Grammar Rule</div>
                <div class="card-content">
                    <h3 style="color: #f5af19">${item.rule}</h3>
                    <p>${item.desc}</p>
                </div>
                <button class="action-btn">View Examples</button>
            `;
        }
        else if (currentSection === 'quiz') {
            let optionsHtml = item.options.map((opt, i) => 
                `<div class="quiz-opt" onclick="checkAnswer(this, ${i === item.answer})">${opt}</div>`
            ).join('');

            card.innerHTML = `
                <div class="card-tag">Quick Quiz</div>
                <div class="card-content">
                    <h3>${item.question}</h3>
                    <div class="quiz-options">
                        ${optionsHtml}
                    </div>
                </div>
            `;
        }

        contentGrid.appendChild(card);
    });
}

/* HELPER FUNCTIONS */

// Text to Speech with Accent Selection
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Logic to select accent based on currentLanguage
    const locales = {
        english: 'en-US',
        mandarin: 'zh-CN',
        spanish: 'es-ES',
        german: 'de-DE',
        french: 'fr-FR',
        portuguese: 'pt-PT', // or pt-BR
        arabic: 'ar-SA',
        japanese: 'ja-JP',
        russian: 'ru-RU',
        hindi: 'hi-IN'
    };

    if(locales[currentLanguage]) {
        utterance.lang = locales[currentLanguage];
    }

    window.speechSynthesis.speak(utterance);
}

// Simple Quiz Logic
function checkAnswer(element, isCorrect) {
    if(isCorrect) {
        element.style.background = '#2ecc71'; // Green
        element.style.color = '#fff';
        element.innerHTML += ' <i class="fa-solid fa-check"></i>';
    } else {
        element.style.background = '#e74c3c'; // Red
        element.style.color = '#fff';
        element.innerHTML += ' <i class="fa-solid fa-xmark"></i>';
    }
    // Disable further clicks in this card
    const parent = element.parentElement;
    Array.from(parent.children).forEach(child => child.style.pointerEvents = 'none');
}

/* GLOBAL CSS ANIMATION INJECT */
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
`;
document.head.appendChild(styleSheet);
/* 
    DATA BACKBONE - LEVEL BASED STRUCTURE
    Structure: Language -> Section -> Level -> Array of Content
*/
const learningData = {
    english: {
        vocabulary: {
            level1: [
                { term: "Serendipity", definition: "Finding good things without looking", example: "It was pure serendipity." },
                { term: "Petrichor", definition: "Smell of earth after rain", example: "I love the petrichor." }
            ],
            level2: [], level3: [], level4: []
        },
        video: {
            level1: [{ title: "Basic Greetings", duration: "2:00", thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644" }],
            level2: [], level3: [], level4: []
        },
        grammar: {
            level1: [{ rule: "Subject-Verb", desc: "He walks vs They walk." }],
            level2: [], level3: [], level4: []
        },
        quiz: {
            level1: [{ question: "Past of 'Run'?", options: ["Runned", "Ran", "Running"], answer: 1 }],
            level2: [], level3: [], level4: []
        }
    },
    spanish: {
        vocabulary: {
            level1: [
                { term: "Hola", definition: "Hello", example: "Hola, amigo." },
                { term: "Adios", definition: "Goodbye", example: "Adios, hasta luego." }
            ],
            level2: [
                { term: "Desarrollador", definition: "Developer", example: "Soy desarrollador web." }
            ],
            level3: [], level4: []
        },
        video: {
            level1: [{ title: "Spanish Alphabet", duration: "4:20", thumbnail: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2" }],
            level2: [], level3: [], level4: []
        },
        grammar: {
            level1: [{ rule: "Gender Nouns", desc: "-o is masculine, -a is feminine." }],
            level2: [], level3: [], level4: []
        },
        quiz: {
            level1: [{ question: "Red in Spanish?", options: ["Azul", "Rojo", "Verde"], answer: 1 }],
            level2: [], level3: [], level4: []
        }
    },
    // ... Fill in the other languages (Mandarin, Hindi, etc.) with the same structure:
    // mandarin: { vocabulary: { level1: [], level2: [], level3: [], level4: [] }, video: { ... }, ... }
    mandarin: { vocabulary: { level1: [], level2: [], level3: [], level4: [] }, video: { level1: [], level2: [], level3: [], level4: [] }, grammar: { level1: [], level2: [], level3: [], level4: [] }, quiz: { level1: [], level2: [], level3: [], level4: [] } },
    german: { vocabulary: { level1: [], level2: [], level3: [], level4: [] }, video: { level1: [], level2: [], level3: [], level4: [] }, grammar: { level1: [], level2: [], level3: [], level4: [] }, quiz: { level1: [], level2: [], level3: [], level4: [] } },
    french: { vocabulary: { level1: [], level2: [], level3: [], level4: [] }, video: { level1: [], level2: [], level3: [], level4: [] }, grammar: { level1: [], level2: [], level3: [], level4: [] }, quiz: { level1: [], level2: [], level3: [], level4: [] } },
    portuguese: { vocabulary: { level1: [], level2: [], level3: [], level4: [] }, video: { level1: [], level2: [], level3: [], level4: [] }, grammar: { level1: [], level2: [], level3: [], level4: [] }, quiz: { level1: [], level2: [], level3: [], level4: [] } },
    arabic: { vocabulary: { level1: [], level2: [], level3: [], level4: [] }, video: { level1: [], level2: [], level3: [], level4: [] }, grammar: { level1: [], level2: [], level3: [], level4: [] }, quiz: { level1: [], level2: [], level3: [], level4: [] } },
    japanese: { vocabulary: { level1: [], level2: [], level3: [], level4: [] }, video: { level1: [], level2: [], level3: [], level4: [] }, grammar: { level1: [], level2: [], level3: [], level4: [] }, quiz: { level1: [], level2: [], level3: [], level4: [] } },
    russian: { vocabulary: { level1: [], level2: [], level3: [], level4: [] }, video: { level1: [], level2: [], level3: [], level4: [] }, grammar: { level1: [], level2: [], level3: [], level4: [] }, quiz: { level1: [], level2: [], level3: [], level4: [] } },
    hindi: { vocabulary: { level1: [], level2: [], level3: [], level4: [] }, video: { level1: [], level2: [], level3: [], level4: [] }, grammar: { level1: [], level2: [], level3: [], level4: [] }, quiz: { level1: [], level2: [], level3: [], level4: [] } }
};

/* STATE MANAGEMENT */
let currentLanguage = "english";
let currentSection = "vocabulary";
let currentLevel = "level1"; // Default level

/* DOM ELEMENTS */
const contentGrid = document.getElementById('content-grid');
const levelBar = document.getElementById('level-bar');
const langSelect = document.getElementById('language-select');
const tabButtons = document.querySelectorAll('.tab-btn');

/* INITIALIZATION */
document.addEventListener('DOMContentLoaded', () => {
    langSelect.value = currentLanguage;
    renderLevels(); // Draw levels first
    renderContent();
});

/* EVENT LISTENERS */
langSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    currentLevel = "level1"; // Reset to Level 1 on lang switch
    animateRefresh();
});

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSection = btn.getAttribute('data-type');
        currentLevel = "level1"; // Reset to Level 1 on section switch
        animateRefresh();
    });
});

function animateRefresh() {
    contentGrid.style.opacity = '0';
    contentGrid.style.transform = 'translateY(10px)';
    setTimeout(() => {
        renderLevels();
        renderContent();
        contentGrid.style.opacity = '1';
        contentGrid.style.transform = 'translateY(0)';
    }, 300);
}

/* LEVEL RENDERING SYSTEM */
function renderLevels() {
    levelBar.innerHTML = "";
    
    // We create 4 buttons
    for (let i = 1; i <= 4; i++) {
        const levelKey = `level${i}`;
        const btn = document.createElement('div');
        
        // Base classes
        btn.className = 'level-btn';
        
        // Active Logic
        if (currentLevel === levelKey) {
            btn.classList.add('active');
        }

        // Lock Logic: If it's NOT level 1, it's locked (Hardcoded for now)
        // You can change this logic later to unlock based on quiz scores
        const isLocked = i > 1; 

        if (isLocked) {
            btn.classList.add('locked');
            btn.innerHTML = `Level ${i} <i class="fa-solid fa-lock"></i>`;
        } else {
            btn.innerHTML = `Level ${i}`;
            btn.onclick = () => {
                currentLevel = levelKey;
                renderLevels(); // Re-render buttons to update active state
                renderContent(); // Re-render cards
            };
        }

        levelBar.appendChild(btn);
    }
}

/* CONTENT RENDERING ENGINE */
function renderContent() {
    contentGrid.innerHTML = ""; 
    
    // Deep Safety Check: Lang -> Section -> Level
    if(!learningData[currentLanguage] || 
       !learningData[currentLanguage][currentSection] ||
       !learningData[currentLanguage][currentSection][currentLevel]) {
        contentGrid.innerHTML = `<h3 style="grid-column: 1/-1; text-align:center; opacity: 0.7;">Content coming soon.</h3>`;
        return;
    }

    const data = learningData[currentLanguage][currentSection][currentLevel];

    if(data.length === 0) {
        contentGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 2rem;">
            <i class="fa-solid fa-layer-group" style="font-size: 3rem; color: rgba(255,255,255,0.2); margin-bottom: 1rem;"></i>
            <h3 style="opacity: 0.7;">No content in ${currentLevel} yet.</h3>
        </div>`;
        return;
    }

    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';

        // --- VOCABULARY CARD ---
        if (currentSection === 'vocabulary') {
            card.innerHTML = `
                <div class="card-tag">Level ${currentLevel.slice(-1)} Vocab</div>
                <div class="card-content">
                    <h3>${item.term}</h3>
                    <p style="color: var(--secondary)">${item.definition}</p>
                    <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;">
                    <p style="font-style: italic; font-size: 0.9rem;">"${item.example}"</p>
                </div>
                <button class="action-btn" onclick="speakText('${item.term}')"><i class="fa-solid fa-volume-high"></i> Listen</button>
            `;
        } 
        // --- VIDEO CARD ---
        else if (currentSection === 'video') {
            card.innerHTML = `
                <div class="card-tag">Level ${currentLevel.slice(-1)} Video</div>
                <div class="video-frame" style="background-image: url('${item.thumbnail}'); background-size: cover;">
                    <i class="fa-solid fa-play-circle play-btn"></i>
                </div>
                <div class="card-content">
                    <h3>${item.title}</h3>
                    <p><i class="fa-regular fa-clock"></i> ${item.duration} Mins</p>
                </div>
                <button class="action-btn">Watch Now</button>
            `;
        }
        // --- GRAMMAR CARD ---
        else if (currentSection === 'grammar') {
            card.innerHTML = `
                <div class="card-tag">Level ${currentLevel.slice(-1)} Grammar</div>
                <div class="card-content">
                    <h3 style="color: #f5af19">${item.rule}</h3>
                    <p>${item.desc}</p>
                </div>
                <button class="action-btn">View Examples</button>
            `;
        }
        // --- QUIZ CARD ---
        else if (currentSection === 'quiz') {
            let optionsHtml = item.options.map((opt, i) => 
                `<div class="quiz-opt" onclick="checkAnswer(this, ${i === item.answer})">${opt}</div>`
            ).join('');

            card.innerHTML = `
                <div class="card-tag">Level ${currentLevel.slice(-1)} Challenge</div>
                <div class="card-content">
                    <h3>${item.question}</h3>
                    <div class="quiz-options">
                        ${optionsHtml}
                    </div>
                </div>
            `;
        }

        contentGrid.appendChild(card);
    });
}

// ... (Keep the Helper Functions checkAnswer/speakText same as before)
// Text to Speech
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    const locales = {
        english: 'en-US', mandarin: 'zh-CN', spanish: 'es-ES', german: 'de-DE',
        french: 'fr-FR', portuguese: 'pt-PT', arabic: 'ar-SA', japanese: 'ja-JP',
        russian: 'ru-RU', hindi: 'hi-IN'
    };
    if(locales[currentLanguage]) utterance.lang = locales[currentLanguage];
    window.speechSynthesis.speak(utterance);
}

// Check Answer
function checkAnswer(element, isCorrect) {
    if(isCorrect) {
        element.style.background = '#2ecc71'; element.style.color = '#fff';
        element.innerHTML += ' <i class="fa-solid fa-check"></i>';
    } else {
        element.style.background = '#e74c3c'; element.style.color = '#fff';
        element.innerHTML += ' <i class="fa-solid fa-xmark"></i>';
    }
    const parent = element.parentElement;
    Array.from(parent.children).forEach(child => child.style.pointerEvents = 'none');
}
