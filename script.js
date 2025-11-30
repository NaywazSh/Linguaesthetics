/* 
    LINGUAESTHETIC BACKBONE
    Structure: Language -> Section -> Level -> Array of Content
*/

const learningData = {
    english: {
        vocabulary: {
            level1: [
                { term: "the", definition: "Definite article", example: "The cat sat" },
  { term: "be", definition: "Exist or occur", example: "To be or not" },
  { term: "to", definition: "Preposition/direction", example: "Go to school" },
  { term: "of", definition: "Possessive relation", example: "King of kings" },
  { term: "and", definition: "Connector", example: "Salt and pepper" },
  { term: "a", definition: "Indefinite article", example: "A dog barked" },
  // ...truncated for brevity...
  { term: "have", definition: "Possess/experience", example: "I have time" },
  { term: "it", definition: "Neuter pronoun", example: "It is raining" },
  { term: "for", definition: "Purpose/beneficiary", example: "Gift for you" },
  { term: "not", definition: "Negation", example: "Do not enter" } 
            ],
            level2: [
                { term: "Serendipity", definition: "Finding something good without looking for it", example: "It was pure serendipity." },
                { term: "Petrichor", definition: "The smell of earth after rain", example: "I love the petrichor." }
            ], 
            level3: [], level4: []
        },
        video: {
            level1: [{ title: "Daily Conversations", duration: "5:00", thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=500&q=60" }],
            level2: [], level3: [], level4: []
        },
        grammar: {
            level1: [{ rule: "Subject-Verb Agreement", desc: "Singular subject takes singular verb." }],
            level2: [], level3: [], level4: []
        },
        quiz: {
            level1: [{ question: "Past tense of 'Go'?", options: ["Goed", "Went", "Gone"], answer: 1 }],
            level2: [], level3: [], level4: []
        }
    },
    spanish: {
        vocabulary: {
            level1: [
                { term: "Hola", definition: "Hello", example: "Hola, ¿cómo estás?" },
                { term: "El Gato", definition: "The Cat", example: "El gato es negro." }
            ],
            level2: [], level3: [], level4: []
        },
        video: {
            level1: [{ title: "Spanish Basics", duration: "4:20", thumbnail: "https://images.unsplash.com/photo-1564564244660-5d73c057f2d2?auto=format&fit=crop&w=500&q=60" }],
            level2: [], level3: [], level4: []
        },
        grammar: {
            level1: [{ rule: "Gender Nouns", desc: "Words ending in -o are usually masculine." }],
            level2: [], level3: [], level4: []
        },
        quiz: {
            level1: [{ question: "Translate 'Blue'", options: ["Rojo", "Azul", "Verde"], answer: 1 }],
            level2: [], level3: [], level4: []
        }
    },
    mandarin: {
        vocabulary: { level1: [{ term: "Nǐ hǎo (你好)", definition: "Hello", example: "Nǐ hǎo ma?" }], level2: [], level3: [], level4: [] },
        video: { level1: [], level2: [], level3: [], level4: [] },
        grammar: { level1: [{ rule: "The 4 Tones", desc: "Mandarin relies on tones for meaning."}], level2: [], level3: [], level4: [] },
        quiz: { level1: [], level2: [], level3: [], level4: [] }
    },
    german: {
        vocabulary: { level1: [{ term: "Hallo", definition: "Hello", example: "Hallo welt." }], level2: [], level3: [], level4: [] },
        video: { level1: [], level2: [], level3: [], level4: [] },
        grammar: { level1: [], level2: [], level3: [], level4: [] },
        quiz: { level1: [], level2: [], level3: [], level4: [] }
    },
    french: {
        vocabulary: { level1: [{ term: "Bonjour", definition: "Hello", example: "Bonjour!" }], level2: [], level3: [], level4: [] },
        video: { level1: [], level2: [], level3: [], level4: [] },
        grammar: { level1: [], level2: [], level3: [], level4: [] },
        quiz: { level1: [], level2: [], level3: [], level4: [] }
    },
    portuguese: {
        vocabulary: { level1: [{ term: "Olá", definition: "Hello", example: "Olá amigos." }], level2: [], level3: [], level4: [] },
        video: { level1: [], level2: [], level3: [], level4: [] },
        grammar: { level1: [], level2: [], level3: [], level4: [] },
        quiz: { level1: [], level2: [], level3: [], level4: [] }
    },
    arabic: {
        vocabulary: { level1: [{ term: "Marhaba", definition: "Hello", example: "Marhaba!" }], level2: [], level3: [], level4: [] },
        video: { level1: [], level2: [], level3: [], level4: [] },
        grammar: { level1: [], level2: [], level3: [], level4: [] },
        quiz: { level1: [], level2: [], level3: [], level4: [] }
    },
    japanese: {
        vocabulary: { level1: [{ term: "Konnichiwa", definition: "Hello", example: "Konnichiwa!" }], level2: [], level3: [], level4: [] },
        video: { level1: [], level2: [], level3: [], level4: [] },
        grammar: { level1: [], level2: [], level3: [], level4: [] },
        quiz: { level1: [], level2: [], level3: [], level4: [] }
    },
    russian: {
        vocabulary: { level1: [{ term: "Privet", definition: "Hi", example: "Privet!" }], level2: [], level3: [], level4: [] },
        video: { level1: [], level2: [], level3: [], level4: [] },
        grammar: { level1: [], level2: [], level3: [], level4: [] },
        quiz: { level1: [], level2: [], level3: [], level4: [] }
    },
    hindi: {
        vocabulary: { level1: [{ term: "Namaste", definition: "Hello", example: "Namaste!" }], level2: [], level3: [], level4: [] },
        video: { level1: [], level2: [], level3: [], level4: [] },
        grammar: { level1: [], level2: [], level3: [], level4: [] },
        quiz: { level1: [], level2: [], level3: [], level4: [] }
    }
};

/* STATE MANAGEMENT */
let currentLanguage = "english";
let currentSection = "vocabulary";
let currentLevel = "level1";

/* DOM ELEMENTS */
const contentGrid = document.getElementById('content-grid');
const levelBar = document.getElementById('level-bar');
const langSelect = document.getElementById('language-select');
const tabButtons = document.querySelectorAll('.tab-btn');

/* INITIALIZATION */
document.addEventListener('DOMContentLoaded', () => {
    langSelect.value = currentLanguage;
    renderLevels(); 
    renderContent();
});

/* EVENT LISTENERS */
langSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    currentLevel = "level1"; // Reset to level 1 on language switch
    animateRefresh();
});

tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSection = btn.getAttribute('data-type');
        currentLevel = "level1"; // Reset to level 1 on section switch
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

/* RENDER LEVELS (LOCK/UNLOCK SYSTEM) */
function renderLevels() {
    levelBar.innerHTML = "";
    
    for (let i = 1; i <= 4; i++) {
        const levelKey = `level${i}`;
        const btn = document.createElement('div');
        btn.className = 'level-btn';
        
        // Active State
        if (currentLevel === levelKey) {
            btn.classList.add('active');
        }

        // Lock Logic: Level 1 is always unlocked. Others locked.
        const isLocked = i > 1; 

        if (isLocked) {
            btn.classList.add('locked');
            btn.innerHTML = `Level ${i} <i class="fa-solid fa-lock" style="font-size:0.8em;"></i>`;
        } else {
            btn.innerHTML = `Level ${i}`;
            btn.onclick = () => {
                currentLevel = levelKey;
                renderLevels();
                renderContent();
            };
        }
        levelBar.appendChild(btn);
    }
}

/* RENDER CONTENT */
function renderContent() {
    contentGrid.innerHTML = ""; 
    
    // Safety Checks
    if(!learningData[currentLanguage] || 
       !learningData[currentLanguage][currentSection] ||
       !learningData[currentLanguage][currentSection][currentLevel]) {
        contentGrid.innerHTML = `<h3 style="grid-column: 1/-1; text-align:center;">Content coming soon.</h3>`;
        return;
    }

    const data = learningData[currentLanguage][currentSection][currentLevel];

    if(data.length === 0) {
        contentGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 2rem;">
            <i class="fa-solid fa-layer-group" style="font-size: 3rem; color: rgba(255,255,255,0.2); margin-bottom: 1rem;"></i>
            <h3 style="opacity: 0.7;">No content added for ${currentLevel} yet.</h3>
        </div>`;
        return;
    }

    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0';

        if (currentSection === 'vocabulary') {
            card.innerHTML = `
                <div class="card-tag">Level ${currentLevel.slice(-1)} Vocab</div>
                <div class="card-content">
                    <h3>${item.term}</h3>
                    <p style="color: var(--secondary-gradient); font-weight:bold;">${item.definition}</p>
                    <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 10px 0;">
                    <p style="font-style: italic; font-size: 0.9rem; color: #ccc;">"${item.example}"</p>
                </div>
                <button class="action-btn" onclick="speakText('${item.term}')"><i class="fa-solid fa-volume-high"></i> Listen</button>
            `;
        } 
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
        else if (currentSection === 'quiz') {
            let optionsHtml = item.options.map((opt, i) => 
                `<div class="quiz-opt" onclick="checkAnswer(this, ${i === item.answer})">${opt}</div>`
            ).join('');

            card.innerHTML = `
                <div class="card-tag">Level ${currentLevel.slice(-1)} Quiz</div>
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
