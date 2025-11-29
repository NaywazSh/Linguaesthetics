/* 
    DATA BACKBONE 
    Add content here. The site renders it automatically.
*/
const learningData = {
    spanish: {
        vocabulary: [
            { term: "El Gato", definition: "The Cat", example: "El gato duerme." },
            { term: "La Biblioteca", definition: "The Library", example: "Estudio en la biblioteca." },
            { term: "Caminar", definition: "To Walk", example: "Me gusta caminar." },
            { term: "Desayuno", definition: "Breakfast", example: "Como huevos para el desayuno." }
        ],
        video: [
            { title: "Basic Greetings", duration: "2:30", thumbnail: "https://images.unsplash.com/photo-1551096053-159e1998394a?auto=format&fit=crop&w=500&q=60" },
            { title: "Ordering Food", duration: "5:45", thumbnail: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60" }
        ],
        grammar: [
            { rule: "Gender Nouns", desc: "Words ending in -o are usually masculine, -a are feminine." },
            { rule: "Verb Ser vs Estar", desc: "Ser is permanent, Estar is temporary." }
        ],
        quiz: [
            { question: "How do you say 'Good Morning'?", options: ["Hola", "Buenos Días", "Adiós"], answer: 1 },
            { question: "Select the verb 'To Eat'", options: ["Comer", "Bewer", "Dormir"], answer: 0 }
        ]
    },
    french: {
        vocabulary: [
            { term: "Bonjour", definition: "Hello", example: "Bonjour tout le monde." },
            { term: "Merci", definition: "Thank you", example: "Merci beaucoup." }
        ],
        video: [
            { title: "French Pronunciation", duration: "10:00", thumbnail: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=60" }
        ],
        grammar: [
            { rule: "Liaison", desc: "Linking the final consonant of a word with the initial vowel of the next." }
        ],
        quiz: [
            { question: "Translate 'Red'", options: ["Bleu", "Rouge", "Vert"], answer: 1 }
        ]
    },
    // You can easily add "japanese": { ... } here later
    japanese: {
        vocabulary: [
             { term: "Konnichiwa", definition: "Hello", example: "Konnichiwa genki desu ka?" }
        ],
        video: [],
        grammar: [],
        quiz: []
    }
};

/* STATE MANAGEMENT */
let currentLanguage = "spanish";
let currentSection = "vocabulary";

/* DOM ELEMENTS */
const contentGrid = document.getElementById('content-grid');
const langSelect = document.getElementById('language-select');
const tabButtons = document.querySelectorAll('.tab-btn');

/* INITIALIZATION */
document.addEventListener('DOMContentLoaded', () => {
    renderContent();
});

/* EVENT LISTENERS */
langSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    // Animation reset effect
    contentGrid.style.opacity = '0';
    setTimeout(() => {
        renderContent();
        contentGrid.style.opacity = '1';
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
        contentGrid.innerHTML = `<h3 style="grid-column: 1/-1; text-align:center;">Content coming soon for this section!</h3>`;
        return;
    }

    const data = learningData[currentLanguage][currentSection];

    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
        card.style.opacity = '0'; // For animation

        // GENERATE CARD BASED ON TYPE
        if (currentSection === 'vocabulary') {
            card.innerHTML = `
                <div class="card-tag">Vocabulary Card</div>
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

// Text to Speech for Vocabulary
function speakText(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    // Try to set language accent based on selection
    if(currentLanguage === 'spanish') utterance.lang = 'es-ES';
    if(currentLanguage === 'french') utterance.lang = 'fr-FR';
    if(currentLanguage === 'japanese') utterance.lang = 'ja-JP';
    
    window.speechSynthesis.speak(utterance);
}

// Simple Quiz Logic
function checkAnswer(element, isCorrect) {
    if(isCorrect) {
        element.style.background = '#2ecc71'; // Green
        element.innerHTML += ' <i class="fa-solid fa-check"></i>';
    } else {
        element.style.background = '#e74c3c'; // Red
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
