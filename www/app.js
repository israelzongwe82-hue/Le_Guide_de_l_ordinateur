// ==========================================
// LE GUIDE DE L'ORDINATEUR
// Navigation principale
// ==========================================

const levels = {
    1: {
        title: "Niveau 1 — Maîtriser l’ordinateur",
        description:
            "Apprenez les bases essentielles pour utiliser correctement un ordinateur.",
        lessons: [
            "Allumer et éteindre correctement un ordinateur",
            "Découvrir le bureau Windows",
            "Utiliser la souris : clic gauche, clic droit et double-clic",
            "Glisser-déposer avec la souris",
            "Utiliser correctement le clavier",
            "Ouvrir et fermer une application",
            "Agrandir, réduire et déplacer une fenêtre",
            "Créer, renommer, déplacer et supprimer un fichier",
            "Créer et organiser des dossiers",
            "Copier, couper et coller",
            "Utiliser une clé USB"
        ]
    },

    2: {
        title: "Niveau 2 — Windows et les fichiers",
        description:
            "Découvrez Windows, l’explorateur de fichiers et la gestion des documents.",
        lessons: [
            "Découvrir l’Explorateur de fichiers",
            "Comprendre le dossier Téléchargements",
            "Installer et désinstaller une application",
            "Rechercher un fichier",
            "Faire une capture d’écran",
            "Découvrir les paramètres de Windows",
            "Se connecter au Wi-Fi",
            "Utiliser un partage de connexion",
            "Comprendre les extensions de fichiers",
            "Reconnaître les fichiers PDF, DOCX, ZIP, PY et APK"
        ]
    },

    3: {
        title: "Niveau 3 — Travail scolaire",
        description:
            "Apprenez à utiliser l’ordinateur pour vos travaux scolaires et vos présentations.",
        lessons: [
            "Découvrir Microsoft Word",
            "Écrire et mettre en forme un document",
            "Enregistrer correctement un travail",
            "Créer une présentation PowerPoint",
            "Créer un tableau avec Excel",
            "Préparer un exposé",
            "Rédiger un rapport",
            "Enregistrer un document au format PDF",
            "Imprimer un document"
        ]
    },

    4: {
        title: "Niveau 4 — Internet et communication",
        description:
            "Apprenez à utiliser Internet efficacement et à communiquer en ligne.",
        lessons: [
            "Découvrir un navigateur Internet",
            "Effectuer une recherche efficace",
            "Télécharger un fichier",
            "Envoyer un fichier",
            "Utiliser une adresse e-mail",
            "Comprendre les sites Internet",
            "Comprendre les liens",
            "Adopter de bonnes pratiques de sécurité"
        ]
    },

    5: {
        title: "Niveau 5 — Informatique et programmation",
        description:
            "Découvrez les bases de la programmation et de la création numérique.",
        lessons: [
            "Découvrir Python",
            "Découvrir HTML",
            "Découvrir CSS",
            "Comprendre GitHub",
            "Créer une petite page Web",
            "Découvrir les applications",
            "Comprendre les systèmes d’exploitation",
            "Découvrir les réseaux informatiques"
        ]
    }
};


// ==========================================
// FONCTION POUR CACHER TOUTES LES PAGES
// ==========================================

function hideAllPages() {
    const pages = [
        "homePage",
        "bookPage",
        "creatorPage",
        "progressPage",
        "levelPage"
    ];

    pages.forEach(id => {
        const page = document.getElementById(id);

        if (page) {
            page.style.display = "none";
        }
    });
}


// ==========================================
// ACCUEIL
// ==========================================

function goHome() {
    hideAllPages();

    document.getElementById("homePage").style.display = "block";

    const header = document.getElementById("homeHeader");

    if (header) {
        header.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// COMMENCER LE LIVRE
// ==========================================

function startBook() {
    hideAllPages();

    document.getElementById("bookPage").style.display = "block";

    // La barre bleue disparaît lorsqu'on commence le livre.
    const header = document.getElementById("homeHeader");

    if (header) {
        header.style.display = "none";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// IDENTITÉ DU CRÉATEUR
// ==========================================

function showCreator() {
    hideAllPages();

    document.getElementById("creatorPage").style.display = "block";

    const header = document.getElementById("homeHeader");

    if (header) {
        header.style.display = "block";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// PROGRESSION
// ==========================================

function showProgress() {
    hideAllPages();

    document.getElementById("progressPage").style.display = "block";

    const header = document.getElementById("homeHeader");

    if (header) {
        header.style.display = "block";
    }

    updateProgress();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// AFFICHER LES NIVEAUX
// ==========================================

function showLevel(levelNumber) {
    const level = levels[levelNumber];

    if (!level) {
        return;
    }

    hideAllPages();

    const title = document.getElementById("levelTitle");
    const description = document.getElementById("levelDescription");
    const content = document.getElementById("levelContent");

    title.textContent = level.title;
    description.textContent = level.description;

    content.innerHTML = "";

    level.lessons.forEach((lesson, index) => {

        const lessonElement = document.createElement("div");

        lessonElement.className = "lesson";

        lessonElement.innerHTML = `
            <h2>Leçon ${index + 1}</h2>

            <h3>${lesson}</h3>

            <p>
                Cette leçon sera développée avec des explications
                détaillées, des étapes pratiques, des illustrations
                et un petit exercice.
            </p>

            <p>
                <strong>Objectif :</strong>
                comprendre cette notion et être capable de l'utiliser
                correctement sur un ordinateur.
            </p>
        `;

        content.appendChild(lessonElement);
    });

    document.getElementById("levelPage").style.display = "block";

    const header = document.getElementById("homeHeader");

    if (header) {
        header.style.display = "none";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// RETOUR AUX NIVEAUX
// ==========================================

function goToBook() {
    startBook();
}


// ==========================================
// QUIZ GÉNÉRAL
// ==========================================

function showGeneralQuiz() {
    hideAllPages();

    const levelPage = document.getElementById("levelPage");
    const title = document.getElementById("levelTitle");
    const description = document.getElementById("levelDescription");
    const content = document.getElementById("levelContent");

    title.textContent = "🧠 Quiz général du livre";

    description.textContent =
        "Le quiz général évaluera les connaissances acquises dans les cinq niveaux.";

    content.innerHTML = `
        <div class="lesson">

            <h2>Quiz général</h2>

            <p>
                Le véritable quiz sera ajouté après la création complète
                des leçons.
            </p>

            <p>
                Il comportera des questions pratiques et des questions
                pièges avec cinq réponses possibles : A, B, C, D et E.
            </p>

        </div>
    `;

    levelPage.style.display = "block";

    const header = document.getElementById("homeHeader");

    if (header) {
        header.style.display = "none";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==========================================
// PROGRESSION
// ==========================================

function updateProgress() {
    const progressContent =
        document.getElementById("progressContent");

    if (!progressContent) {
        return;
    }

    progressContent.innerHTML = "";

    for (let i = 1; i <= 5; i++) {

        const completed =
            localStorage.getItem(`level_${i}_completed`) === "true";

        const paragraph = document.createElement("p");

        paragraph.textContent =
            `Niveau ${i} : ${completed ? "✅ Terminé" : "⬜ Non terminé"}`;

        progressContent.appendChild(paragraph);
    }

    const generalQuizCompleted =
        localStorage.getItem("general_quiz_completed") === "true";

    const quizParagraph = document.createElement("p");

    quizParagraph.textContent =
        `Quiz général : ${
            generalQuizCompleted
                ? "✅ Terminé"
                : "⬜ Non terminé"
        }`;

    progressContent.appendChild(quizParagraph);
}


// ==========================================
// LANCEMENT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log(
        "Le Guide de l’ordinateur est prêt."
    );

    goHome();

});
