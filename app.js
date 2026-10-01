/* =========================================================
   LE GUIDE DE L'ORDINATEUR — APPLICATION JAVASCRIPT
   Version complète : langues, niveaux 1-5, quiz, progression,
   paramètres, son, thème, taille du texte, raccourcis et images.
========================================================= */

let currentLanguage = localStorage.getItem("guide_language") || "fr";
let quizAnswers = [];
let generalQuizAnswers = [];
let currentQuizLevel = 0;
let currentQuiz = [];
let settings = {
    theme: localStorage.getItem("guide_theme") || "light",
    fontSize: localStorage.getItem("guide_font_size") || "100",
    soundMuted: localStorage.getItem("guide_sound_muted") === "true",
    volume: Number(localStorage.getItem("guide_volume") || "70")
};

function getPage(id) { return document.getElementById(id); }

function setLanguage(language) {
    currentLanguage = language;
    localStorage.setItem("guide_language", language);
    document.documentElement.lang = language;
    document.querySelectorAll("[data-fr][data-en]").forEach(element => {
        const text = element.getAttribute(`data-${language}`);
        if (text !== null) element.textContent = text;
    });
    updateLanguageButtons();
    refreshSettingsTexts();
}

function updateLanguageButtons() {
    const frButton = getPage("frButton");
    const enButton = getPage("enButton");
    if (frButton) frButton.classList.toggle("active", currentLanguage === "fr");
    if (enButton) enButton.classList.toggle("active", currentLanguage === "en");
}

function hideAllPages() {
    ["homePage", "bookPage", "creatorPage", "progressPage", "levelPage"].forEach(id => {
        const page = getPage(id);
        if (page) page.classList.add("hidden");
    });
}

function goHome() {
    hideAllPages();
    const home = getPage("homePage");
    if (home) home.classList.remove("hidden");
    window.scrollTo(0, 0);
    setLanguage(currentLanguage);
}

function startBook() {
    hideAllPages();
    const book = getPage("bookPage");
    if (book) book.classList.remove("hidden");
    window.scrollTo(0, 0);
    setLanguage(currentLanguage);
}

function showCreator() {
    hideAllPages();
    const creator = getPage("creatorPage");
    if (creator) creator.classList.remove("hidden");
    window.scrollTo(0, 0);
    setLanguage(currentLanguage);
}

function showProgress() {
    hideAllPages();
    const progress = getPage("progressPage");
    if (progress) progress.classList.remove("hidden");
    updateProgress();
    window.scrollTo(0, 0);
    setLanguage(currentLanguage);
}

function goToBook() { startBook(); }

/* =========================================================
   LEÇONS — NIVEAU 1
========================================================= */
const level1Lessons = [
    { title:"1. Allumer et éteindre correctement un ordinateur", titleEn:"1. Turning a computer on and off correctly", image:"images/allumer-ordinateur.png", content:`<p>Pour utiliser un ordinateur correctement, il faut savoir l'allumer et l'éteindre sans interrompre brutalement le système.</p><h3>Pour allumer</h3><ol><li>Vérifiez que l'ordinateur est correctement alimenté.</li><li>Appuyez sur le bouton d'alimentation.</li><li>Attendez le démarrage du système.</li></ol><h3>Pour éteindre</h3><ol><li>Enregistrez votre travail.</li><li>Fermez les applications.</li><li>Ouvrez le menu Démarrer.</li><li>Choisissez l'arrêt de l'ordinateur.</li></ol><p>Évitez de couper directement l'électricité lorsque le système fonctionne.</p>`, contentEn:`<p>Learn to start and shut down a computer safely without interrupting the system.</p><h3>To start</h3><ol><li>Check the power connection.</li><li>Press the power button.</li><li>Wait for the system to start.</li></ol><h3>To shut down</h3><ol><li>Save your work.</li><li>Close applications.</li><li>Open the Start menu.</li><li>Choose the shut down option.</li></ol><p>Avoid cutting the power while the computer is running.</p>`},
    { title:"2. Découvrir le bureau Windows", titleEn:"2. Discovering the Windows desktop", image:"images/bureau-windows.png", content:`<p>Le bureau Windows est l'écran principal affiché après le démarrage.</p><h3>On peut y trouver</h3><ul><li>Les icônes</li><li>La barre des tâches</li><li>Le menu Démarrer</li><li>La zone de notification</li><li>Le fond d'écran</li></ul><p>Il permet d'accéder rapidement aux programmes, fichiers et dossiers.</p>`, contentEn:`<p>The Windows desktop is the main screen displayed after startup.</p><h3>You may find</h3><ul><li>Icons</li><li>The taskbar</li><li>The Start menu</li><li>The notification area</li><li>The wallpaper</li></ul><p>It provides quick access to programs, files and folders.</p>`},
    { title:"3. Utiliser la souris", titleEn:"3. Using the mouse", image:"images/souris.png", content:`<p>La souris permet de déplacer le pointeur et de sélectionner des éléments.</p><h3>Actions principales</h3><ul><li>Clic gauche : sélectionner.</li><li>Double-clic : ouvrir.</li><li>Clic droit : afficher un menu.</li><li>Molette : faire défiler.</li></ul>`, contentEn:`<p>The mouse lets you move the pointer and select items.</p><h3>Main actions</h3><ul><li>Left click: select.</li><li>Double click: open.</li><li>Right click: show a menu.</li><li>Wheel: scroll.</li></ul>`},
    { title:"4. Glisser-déposer avec la souris", titleEn:"4. Dragging and dropping with the mouse", image:"images/glisser-deposer.png", content:`<p>Le glisser-déposer consiste à sélectionner un élément, maintenir le bouton et le déplacer vers un nouvel emplacement.</p><ol><li>Sélectionnez l'élément.</li><li>Maintenez le bouton gauche.</li><li>Déplacez la souris.</li><li>Relâchez à l'endroit voulu.</li></ol>`, contentEn:`<p>Drag and drop means selecting an item, holding the button, moving it and releasing it somewhere else.</p><ol><li>Select the item.</li><li>Hold the left button.</li><li>Move the mouse.</li><li>Release it at the destination.</li></ol>`},
    { title:"5. Utiliser correctement le clavier", titleEn:"5. Using the keyboard correctly", images:["images/clavier.png","images/clavier1.png"], content:`<p>Le clavier sert à écrire et à utiliser de nombreuses commandes.</p><h3>Touches importantes</h3><ul><li>Entrée : valider ou aller à la ligne.</li><li>Espace : créer un espace.</li><li>Retour arrière : supprimer à gauche.</li><li>Maj : écrire une majuscule.</li><li>Ctrl : utiliser des raccourcis.</li></ul><p>Apprendre les touches et les raccourcis permet de travailler plus rapidement.</p>`, contentEn:`<p>The keyboard is used to type and perform many commands.</p><h3>Important keys</h3><ul><li>Enter: confirm or start a new line.</li><li>Space: insert a space.</li><li>Backspace: delete to the left.</li><li>Shift: type uppercase letters.</li><li>Ctrl: use shortcuts.</li></ul><p>Learning keys and shortcuts helps you work faster.</p>`},
    { title:"6. Ouvrir et fermer une application", titleEn:"6. Opening and closing an application", image:"images/application.png", content:`<p>Une application est un programme qui permet d'effectuer une tâche.</p><p>Vous pouvez l'ouvrir depuis le menu Démarrer ou une icône. Pour la fermer, utilisez généralement le bouton X.</p>`, contentEn:`<p>An application is a program used to perform a task.</p><p>You can open it from the Start menu or an icon. To close it, you can usually use the X button.</p>`},
    { title:"7. Agrandir, réduire et déplacer une fenêtre", titleEn:"7. Maximizing, minimizing and moving a window", image:"images/fenetre.png", content:`<p>Une fenêtre peut être déplacée, agrandie ou réduite.</p><ul><li>Réduire : cacher temporairement la fenêtre.</li><li>Agrandir : utiliser davantage d'espace.</li><li>X : fermer la fenêtre.</li></ul><p>Pour déplacer une fenêtre, placez le pointeur sur sa barre de titre et faites-la glisser.</p>`, contentEn:`<p>A window can be moved, maximized or minimized.</p><ul><li>Minimize: temporarily hide the window.</li><li>Maximize: use more screen space.</li><li>X: close the window.</li></ul><p>To move a window, drag its title bar.</p>`},
    { title:"8. Créer, renommer, déplacer et supprimer un fichier", titleEn:"8. Creating, renaming, moving and deleting a file", image:"images/fichier.png", content:`<p>Un fichier contient des informations : document, image, audio ou autre donnée.</p><h3>Opérations</h3><ul><li>Créer un fichier.</li><li>Changer son nom.</li><li>Le déplacer.</li><li>Le supprimer.</li></ul><p>Vérifiez toujours avant de supprimer un fichier important.</p>`, contentEn:`<p>A file contains information such as a document, image, audio or other data.</p><h3>Operations</h3><ul><li>Create a file.</li><li>Rename it.</li><li>Move it.</li><li>Delete it.</li></ul><p>Always check before deleting an important file.</p>`},
    { title:"9. Créer et organiser des dossiers", titleEn:"9. Creating and organizing folders", image:"images/dossiers.png", content:`<p>Un dossier permet de regrouper des fichiers.</p><p>Vous pouvez organiser vos documents par matière, projet, année ou type de fichier. Une bonne organisation facilite la recherche.</p>`, contentEn:`<p>A folder groups files together.</p><p>You can organize documents by subject, project, year or file type. Good organization makes files easier to find.</p>`},
    { title:"10. Copier, couper et coller", titleEn:"10. Copying, cutting and pasting", image:"images/copier-coller.png", content:`<p>Ces commandes permettent de manipuler facilement du texte et des fichiers.</p><ul><li>Copier : garder l'original et créer une copie.</li><li>Couper : préparer un déplacement.</li><li>Coller : placer l'élément à destination.</li></ul><h3>Raccourcis</h3><ul><li>Ctrl + C : copier.</li><li>Ctrl + X : couper.</li><li>Ctrl + V : coller.</li></ul>`, contentEn:`<p>These commands help you work with text and files.</p><ul><li>Copy: keep the original and make a copy.</li><li>Cut: prepare an item to be moved.</li><li>Paste: place the item at the destination.</li></ul><h3>Shortcuts</h3><ul><li>Ctrl + C: copy.</li><li>Ctrl + X: cut.</li><li>Ctrl + V: paste.</li></ul>`},
    { title:"11. Utiliser une clé USB", titleEn:"11. Using a USB flash drive", images:["images/cle-usb.png","images/cle-usb1.png"], content:`<p>Une clé USB permet de stocker et transporter des fichiers.</p><ol><li>Branchez-la.</li><li>Attendez sa détection.</li><li>Ouvrez-la dans l'explorateur.</li><li>Utilisez ou copiez les fichiers nécessaires.</li><li>Éjectez-la correctement avant de la retirer.</li></ol>`, contentEn:`<p>A USB flash drive can store and transport files.</p><ol><li>Connect it.</li><li>Wait for detection.</li><li>Open it in File Explorer.</li><li>Use or copy the needed files.</li><li>Eject it safely before removing it.</li></ol>`}
];

/* =========================================================
   NIVEAU 2 — INTERNET
========================================================= */
const level2Lessons = [
    {title:"1. Découvrir le navigateur Web",titleEn:"1. Discovering the web browser",image:"images/navigateur-web.png",content:`<p>Un navigateur permet d'ouvrir des sites et des services Web.</p><h3>À retenir</h3><ul><li>La barre d'adresse sert à saisir une adresse.</li><li>Les onglets permettent d'ouvrir plusieurs pages.</li><li>Les boutons précédent et suivant servent à naviguer dans l'historique.</li></ul>`,contentEn:`<p>A web browser lets you open websites and online services.</p><h3>Remember</h3><ul><li>The address bar is used to enter a web address.</li><li>Tabs let you open several pages.</li><li>Back and forward buttons navigate through history.</li></ul>`},
    {title:"2. Comprendre une adresse Web",titleEn:"2. Understanding a web address",images:["images/adresse-web.png","images/adresse-web1.png"],content:`<p>Une adresse Web indique où se trouve une page sur Internet.</p><p>Elle peut contenir le protocole, le nom du site et le chemin vers une page. Vérifiez l'adresse avant de saisir des informations personnelles.</p>`,contentEn:`<p>A web address tells the browser where a page is located on the Internet.</p><p>It can contain a protocol, a site name and a path. Check the address before entering personal information.</p>`},
    {title:"3. Effectuer une recherche sur Internet",titleEn:"3. Searching the Internet",image:"images/recherche-internet.png",content:`<p>Pour trouver une information, écrivez des mots-clés précis dans un moteur de recherche.</p><ol><li>Choisissez des mots importants.</li><li>Lisez plusieurs résultats.</li><li>Comparez les informations.</li><li>Vérifiez la source et la date.</li></ol>`,contentEn:`<p>Use precise keywords to find information online.</p><ol><li>Choose important keywords.</li><li>Read several results.</li><li>Compare information.</li><li>Check the source and date.</li></ol>`},
    {title:"4. Ajouter et ouvrir un nouvel onglet",titleEn:"4. Adding and opening a new tab",images:["images/ajouter-onglet.png","images/ouvrir-onglet.png"],content:`<p>Les onglets permettent de consulter plusieurs pages dans la même fenêtre du navigateur.</p><p>Vous pouvez créer un nouvel onglet avec le bouton + ou avec Ctrl + T.</p>`,contentEn:`<p>Tabs let you view several pages in the same browser window.</p><p>You can create a new tab with the + button or Ctrl + T.</p>`},
    {title:"5. Fermer un onglet",titleEn:"5. Closing a tab",images:["images/fermer-onglet.png","images/fermer-onglet1.png"],content:`<p>Pour fermer un onglet, cliquez sur son X ou utilisez Ctrl + W.</p><p>Faites attention à ne pas fermer toute la fenêtre si vous vouliez seulement fermer un onglet.</p>`,contentEn:`<p>Close a tab with its X or with Ctrl + W.</p><p>Be careful not to close the whole browser window when you only want to close one tab.</p>`},
    {title:"6. Télécharger un fichier",titleEn:"6. Downloading a file",image:"images/telecharger-fichier.png",content:`<p>Télécharger signifie copier un fichier depuis Internet vers votre appareil.</p><p>Avant d'ouvrir un téléchargement, vérifiez sa source, son nom et son type. Évitez les fichiers inattendus.</p>`,contentEn:`<p>Downloading means copying a file from the Internet to your device.</p><p>Before opening a download, check its source, name and type. Avoid unexpected files.</p>`},
    {title:"7. Envoyer un fichier",titleEn:"7. Uploading a file",image:"images/envoyer-fichier.png",content:`<p>Envoyer ou téléverser un fichier consiste à copier un fichier de votre appareil vers un service en ligne.</p><ol><li>Choisissez le fichier.</li><li>Vérifiez le bon fichier.</li><li>Attendez la fin du transfert.</li><li>Vérifiez que l'envoi est terminé.</li></ol>`,contentEn:`<p>Uploading means copying a file from your device to an online service.</p><ol><li>Select the file.</li><li>Check that it is the correct file.</li><li>Wait for the transfer.</li><li>Confirm that the upload is complete.</li></ol>`},
    {title:"8. Créer un compte",titleEn:"8. Creating an account",image:"images/creer-compte.png",content:`<p>Un compte permet d'utiliser un service avec des informations personnelles et des réglages propres à l'utilisateur.</p><p>Utilisez uniquement les informations nécessaires et lisez les conditions importantes du service.</p>`,contentEn:`<p>An account lets you use a service with your own information and settings.</p><p>Provide only necessary information and read important service terms.</p>`},
    {title:"9. Créer et protéger un mot de passe",titleEn:"9. Creating and protecting a password",image:"images/mot-de-passe.png",content:`<p>Un mot de passe doit être difficile à deviner et ne doit pas être partagé inutilement.</p><p>Évitez les informations faciles à deviner. Utilisez un mot de passe différent pour les services importants.</p>`,contentEn:`<p>A password should be difficult to guess and should not be shared unnecessarily.</p><p>Avoid easy-to-guess information. Use different passwords for important services.</p>`},
    {title:"10. Sécurité sur Internet",titleEn:"10. Internet safety",image:"images/securite-internet.png",content:`<p>La sécurité sur Internet repose notamment sur la prudence, les mises à jour et la vérification des liens.</p><ul><li>Ne partagez pas vos mots de passe.</li><li>Vérifiez les adresses des sites.</li><li>Méfiez-vous des messages urgents ou suspects.</li><li>Gardez vos logiciels à jour.</li></ul>`,contentEn:`<p>Internet safety includes caution, updates and checking links.</p><ul><li>Do not share your passwords.</li><li>Check website addresses.</li><li>Be careful with urgent or suspicious messages.</li><li>Keep software updated.</li></ul>`}
];

/* =========================================================
   NIVEAU 3 — DOCUMENTS
========================================================= */
const level3Lessons = [
    {title:"1. Écrire un document",titleEn:"1. Writing a document",image:"images/ecrire-document.png",content:`<p>Un traitement de texte permet de créer des documents scolaires, professionnels ou personnels.</p><p>Commencez par écrire un titre clair, puis organisez le contenu en paragraphes.</p>`,contentEn:`<p>A word processor lets you create school, work or personal documents.</p><p>Start with a clear title and organize the content into paragraphs.</p>`},
    {title:"2. Sélectionner du texte",titleEn:"2. Selecting text",image:"images/selectionner-texte.png",content:`<p>Sélectionner du texte permet ensuite de le copier, déplacer, supprimer ou mettre en forme.</p><p>Vous pouvez sélectionner une partie du texte avec la souris ou avec le clavier.</p>`,contentEn:`<p>Selecting text lets you copy, move, delete or format it.</p><p>You can select text with the mouse or keyboard.</p>`},
    {title:"3. Mettre du texte en gras",titleEn:"3. Making text bold",image:"images/texte-gras.png",content:`<p>Le gras sert à faire ressortir une information importante, comme un titre ou un mot-clé.</p><p>Le raccourci courant est Ctrl + B.</p>`,contentEn:`<p>Bold formatting makes important information stand out.</p><p>A common shortcut is Ctrl + B.</p>`},
    {title:"4. Changer la taille du texte",titleEn:"4. Changing text size",image:"images/taille-texte.png",content:`<p>La taille du texte peut être modifiée pour améliorer la lisibilité et créer une hiérarchie entre titres et paragraphes.</p>`,contentEn:`<p>Text size can be changed to improve readability and create a hierarchy between headings and paragraphs.</p>`},
    {title:"5. Aligner du texte",titleEn:"5. Aligning text",image:"images/alignement-texte.png",content:`<p>Un paragraphe peut être aligné à gauche, au centre, à droite ou justifié.</p><ul><li>Gauche : courant pour les paragraphes.</li><li>Centre : utile pour certains titres.</li><li>Droite : utile dans certains documents.</li><li>Justifié : aligne les bords du paragraphe.</li></ul>`,contentEn:`<p>A paragraph can be aligned left, centered, right or justified.</p><ul><li>Left: common for paragraphs.</li><li>Center: useful for some headings.</li><li>Right: useful in some documents.</li><li>Justified: aligns both paragraph edges.</li></ul>`},
    {title:"6. Insérer une image",titleEn:"6. Inserting an image",image:"images/inserer-image.png",content:`<p>Une image peut illustrer et expliquer un document.</p><ol><li>Placez le curseur à l'endroit voulu.</li><li>Choisissez Insérer puis Image.</li><li>Sélectionnez le fichier.</li><li>Redimensionnez l'image si nécessaire.</li></ol>`,contentEn:`<p>An image can illustrate and explain a document.</p><ol><li>Place the cursor where you want the image.</li><li>Choose Insert then Image.</li><li>Select the file.</li><li>Resize it if necessary.</li></ol>`},
    {title:"7. Enregistrer un document",titleEn:"7. Saving a document",image:"images/enregistrer-document.png",content:`<p>Enregistrez régulièrement votre travail pour éviter de le perdre.</p><p>Choisissez un nom clair et un emplacement facile à retrouver.</p>`,contentEn:`<p>Save your work regularly to avoid losing it.</p><p>Use a clear filename and an easy-to-find location.</p>`},
    {title:"8. Ouvrir un document",titleEn:"8. Opening a document",image:"images/ouvrir-document.png",content:`<p>Pour continuer un travail enregistré, ouvrez le fichier depuis le dossier où il se trouve.</p><p>Vérifiez le nom et le type du fichier avant de l'ouvrir.</p>`,contentEn:`<p>To continue saved work, open the file from its folder.</p><p>Check the filename and file type before opening it.</p>`},
    {title:"9. Imprimer un document",titleEn:"9. Printing a document",image:"images/imprimer-document.png",content:`<p>Avant d'imprimer, vérifiez l'aperçu, les pages, l'orientation et l'imprimante sélectionnée.</p><p>Le raccourci courant pour imprimer est Ctrl + P.</p>`,contentEn:`<p>Before printing, check the preview, pages, orientation and selected printer.</p><p>A common printing shortcut is Ctrl + P.</p>`},
    {title:"10. Organiser ses documents",titleEn:"10. Organizing documents",image:"images/organiser-documents.png",content:`<p>Une bonne organisation facilite la recherche et la sauvegarde des documents.</p><ul><li>Utilisez des dossiers clairs.</li><li>Donnez des noms compréhensibles.</li><li>Évitez les doublons inutiles.</li><li>Faites des sauvegardes des documents importants.</li></ul>`,contentEn:`<p>Good organization makes documents easier to find and back up.</p><ul><li>Use clear folders.</li><li>Use understandable names.</li><li>Avoid unnecessary duplicates.</li><li>Back up important documents.</li></ul>`}
];

/* =========================================================
   NIVEAU 4 — FICHIERS ET SÉCURITÉ
========================================================= */
const level4Lessons = [
    {title:"1. Comprendre le disque dur",titleEn:"1. Understanding the hard drive",image:"images/disque-dur.png",content:`<p>Le disque dur ou SSD sert à conserver les données même lorsque l'ordinateur est éteint.</p><p>Le système, les programmes et les fichiers peuvent y être stockés.</p>`,contentEn:`<p>A hard drive or SSD stores data even when the computer is turned off.</p><p>The system, programs and files can be stored there.</p>`},
    {title:"2. Comprendre le stockage",titleEn:"2. Understanding storage",image:"images/stockage.png",content:`<p>La capacité de stockage indique la quantité de données qu'un support peut conserver.</p><p>On rencontre notamment les unités Ko, Mo, Go et To.</p>`,contentEn:`<p>Storage capacity indicates how much data a device can keep.</p><p>Common units include KB, MB, GB and TB.</p>`},
    {title:"3. Utiliser la corbeille",titleEn:"3. Using the Recycle Bin",image:"images/corbeille.png",content:`<p>La corbeille reçoit généralement les fichiers supprimés avant leur suppression définitive.</p><p>Elle peut permettre de récupérer un fichier supprimé par erreur.</p>`,contentEn:`<p>The Recycle Bin usually receives deleted files before permanent deletion.</p><p>It can allow you to recover a file deleted by mistake.</p>`},
    {title:"4. Récupérer un fichier",titleEn:"4. Recovering a file",image:"images/recuperer-fichier.png",content:`<p>Si un fichier se trouve encore dans la corbeille, vous pouvez souvent utiliser l'option Restaurer.</p><p>Le fichier revient alors à son emplacement précédent.</p>`,contentEn:`<p>If a file is still in the Recycle Bin, you can often choose Restore.</p><p>The file returns to its previous location.</p>`},
    {title:"5. Supprimer définitivement",titleEn:"5. Permanently deleting a file",image:"images/supprimer-definitivement.png",content:`<p>La suppression définitive retire un fichier de la corbeille. Cette action doit être faite avec prudence.</p><p>Avant de confirmer, vérifiez que vous n'avez plus besoin du fichier.</p>`,contentEn:`<p>Permanent deletion removes a file from the Recycle Bin. Use this carefully.</p><p>Before confirming, make sure you no longer need the file.</p>`},
    {title:"6. Comprendre l'antivirus",titleEn:"6. Understanding antivirus software",image:"images/antivirus.png",content:`<p>Un antivirus aide à détecter et traiter certains logiciels malveillants.</p><p>Il ne remplace pas la prudence : évitez les fichiers et liens suspects.</p>`,contentEn:`<p>Antivirus software helps detect and handle some malicious software.</p><p>It does not replace caution: avoid suspicious files and links.</p>`},
    {title:"7. Mettre Windows à jour",titleEn:"7. Updating Windows",image:"images/mise-a-jour-windows.png",content:`<p>Les mises à jour peuvent apporter des corrections, améliorations et correctifs de sécurité.</p><p>Lorsque cela est possible, gardez le système à jour.</p>`,contentEn:`<p>Updates can provide fixes, improvements and security patches.</p><p>When possible, keep the system updated.</p>`},
    {title:"8. Faire une sauvegarde",titleEn:"8. Making a backup",image:"images/sauvegarde.png",content:`<p>Une sauvegarde est une copie de données conservée dans un autre emplacement.</p><p>Elle permet de réduire le risque de perdre un travail important en cas de problème.</p>`,contentEn:`<p>A backup is a copy of data kept in another location.</p><p>It reduces the risk of losing important work when something goes wrong.</p>`},
    {title:"9. Créer un mot de passe sécurisé",titleEn:"9. Creating a secure password",image:"images/mot-de-passe-securise.png",content:`<p>Un mot de passe sécurisé doit être difficile à deviner.</p><ul><li>Utilisez une longueur suffisante.</li><li>Mélangez différents types de caractères lorsque le service le demande.</li><li>N'utilisez pas un mot de passe identique partout.</li><li>Ne partagez pas votre mot de passe.</li></ul>`,contentEn:`<p>A secure password should be difficult to guess.</p><ul><li>Use sufficient length.</li><li>Mix character types when required.</li><li>Do not reuse the same password everywhere.</li><li>Do not share your password.</li></ul>`},
    {title:"10. Reconnaître un fichier suspect",titleEn:"10. Recognizing a suspicious file",image:"images/fichier-suspect.png",content:`<p>Un fichier inattendu, provenant d'une source inconnue ou avec un nom inhabituel mérite de la prudence.</p><p>Ne l'ouvrez pas simplement parce qu'un message vous demande d'agir rapidement. Vérifiez sa provenance.</p>`,contentEn:`<p>An unexpected file from an unknown source or with an unusual name requires caution.</p><p>Do not open it just because a message tells you to act quickly. Check where it came from.</p>`}
];

/* =========================================================
   NIVEAU 5 — COMPÉTENCES AVANCÉES
========================================================= */
const level5Lessons = [
    {title:"1. Utiliser les raccourcis clavier",titleEn:"1. Using keyboard shortcuts",image:"images/raccourcis-clavier.png",content:`<p>Les raccourcis permettent d'effectuer rapidement des actions avec le clavier.</p><p>Exemples : Ctrl + C pour copier, Ctrl + V pour coller, Ctrl + S pour enregistrer et Ctrl + Z pour annuler.</p>`,contentEn:`<p>Shortcuts let you perform actions quickly with the keyboard.</p><p>Examples: Ctrl + C to copy, Ctrl + V to paste, Ctrl + S to save and Ctrl + Z to undo.</p>`},
    {title:"2. Rechercher des fichiers",titleEn:"2. Searching for files",image:"images/recherche-fichiers.png",content:`<p>La recherche de fichiers permet de retrouver rapidement un document, une image ou un autre élément.</p><p>Utilisez un nom ou une partie du nom dans la barre de recherche.</p>`,contentEn:`<p>File search helps you quickly find a document, image or other item.</p><p>Use a full name or part of the name in the search box.</p>`},
    {title:"3. Compresser des fichiers en ZIP",titleEn:"3. Compressing files into ZIP",image:"images/compression-zip.png",content:`<p>La compression ZIP regroupe souvent plusieurs fichiers dans une archive afin de faciliter leur transport ou leur partage.</p><p>La compression peut aussi réduire la taille de certains fichiers, selon leur contenu.</p>`,contentEn:`<p>ZIP compression groups files into an archive to make them easier to transport or share.</p><p>It can also reduce the size of some files, depending on their content.</p>`},
    {title:"4. Ouvrir ou décompresser une archive ZIP",titleEn:"4. Opening or extracting a ZIP archive",image:"images/ouvrir-zip.png",content:`<p>Une archive ZIP doit être ouverte ou extraite pour accéder facilement aux fichiers qu'elle contient.</p><p>Après extraction, les fichiers apparaissent dans un dossier normal.</p>`,contentEn:`<p>A ZIP archive can be opened or extracted to access its files.</p><p>After extraction, the files appear in a normal folder.</p>`},
    {title:"5. Faire une capture d'écran",titleEn:"5. Taking a screenshot",image:"images/capture-ecran.png",content:`<p>Une capture d'écran permet d'enregistrer ce qui apparaît à l'écran.</p><p>Dans Windows, le raccourci <strong>Windows + Maj + S</strong> permet de sélectionner une zone de l'écran à capturer.</p>`,contentEn:`<p>A screenshot saves what is displayed on the screen.</p><p>In Windows, <strong>Windows + Shift + S</strong> lets you select an area of the screen to capture.</p>`},
    {title:"6. Installer un programme",titleEn:"6. Installing a program",image:"images/installer-programme.png",content:`<p>Installer un programme ajoute un logiciel à l'ordinateur.</p><ol><li>Utilisez une source fiable.</li><li>Lisez les informations de l'installateur.</li><li>Vérifiez les options proposées.</li><li>Terminez l'installation.</li></ol>`,contentEn:`<p>Installing a program adds software to the computer.</p><ol><li>Use a trusted source.</li><li>Read the installer information.</li><li>Check the available options.</li><li>Finish the installation.</li></ol>`},
    {title:"7. Désinstaller un programme",titleEn:"7. Uninstalling a program",image:"images/dessinstaller-programme.png",content:`<p>Désinstaller supprime généralement un programme du système.</p><p>Utilisez les outils de désinstallation du système plutôt que de supprimer seulement une icône.</p>`,contentEn:`<p>Uninstalling generally removes a program from the system.</p><p>Use the system's uninstall tools rather than only deleting an icon.</p>`},
    {title:"8. Découvrir les paramètres Windows",titleEn:"8. Exploring Windows settings",image:"images/parametres-windows.png",content:`<p>Les paramètres permettent de modifier de nombreuses options du système : affichage, réseau, comptes, périphériques et autres réglages.</p><p>Modifiez les paramètres avec prudence et notez ce que vous changez lorsque c'est important.</p>`,contentEn:`<p>Settings let you change many system options such as display, network, accounts and devices.</p><p>Change settings carefully and remember important changes.</p>`},
    {title:"9. Connecter un périphérique",titleEn:"9. Connecting a device",image:"images/connecter-peripherique.png",content:`<p>Un périphérique peut être connecté par USB, Bluetooth ou une autre méthode compatible.</p><p>Vérifiez que le périphérique est compatible et attendez sa détection avant de l'utiliser.</p>`,contentEn:`<p>A device can be connected through USB, Bluetooth or another compatible method.</p><p>Check compatibility and wait for detection before using it.</p>`},
    {title:"10. Entretenir un ordinateur",titleEn:"10. Maintaining a computer",image:"images/entretien-ordinateur.png",content:`<p>Un bon entretien aide à garder l'ordinateur propre et correctement ventilé.</p><ul><li>Gardez les ouvertures de ventilation dégagées.</li><li>Évitez les liquides près de l'ordinateur.</li><li>Gardez le système et les logiciels importants à jour.</li><li>Faites des sauvegardes.</li><li>Manipulez les câbles et périphériques avec soin.</li></ul>`,contentEn:`<p>Good maintenance helps keep a computer clean and properly ventilated.</p><ul><li>Keep ventilation openings clear.</li><li>Keep liquids away from the computer.</li><li>Keep important software updated.</li><li>Make backups.</li><li>Handle cables and devices carefully.</li></ul>`}
];

/* =========================================================
   QUIZ — 10 QUESTIONS PAR NIVEAU
========================================================= */
const levelQuizzes = {
1:[
 {question:"Quelle action permet d'allumer un ordinateur ?",answers:["Appuyer sur le bouton d'alimentation","Débrancher l'ordinateur","Éteindre l'écran","Retirer la batterie"],correct:0,explanation:"Le bouton d'alimentation lance le démarrage de l'ordinateur."},
 {question:"À quoi sert principalement la souris ?",answers:["Imprimer","Déplacer le pointeur et sélectionner","Alimenter l'ordinateur","Refroidir le processeur"],correct:1,explanation:"La souris sert notamment à déplacer le pointeur et à sélectionner des éléments."},
 {question:"Que fait généralement un double-clic ?",answers:["Éteindre l'ordinateur","Ouvrir un élément","Changer la langue","Débrancher la souris"],correct:1,explanation:"Un double-clic ouvre généralement un fichier, un dossier ou une application."},
 {question:"À quoi sert le clic droit ?",answers:["Afficher un menu contextuel","Écrire une lettre","Brancher une clé USB","Éteindre l'écran"],correct:0,explanation:"Le clic droit affiche souvent un menu avec des actions liées à l'élément sélectionné."},
 {question:"Quelle touche permet généralement de passer à la ligne ?",answers:["Ctrl","Alt","Entrée","Échap"],correct:2,explanation:"La touche Entrée valide souvent une action ou commence une nouvelle ligne."},
 {question:"Quel raccourci permet de copier ?",answers:["Ctrl + V","Ctrl + X","Ctrl + C","Ctrl + Z"],correct:2,explanation:"Ctrl + C est le raccourci courant pour copier."},
 {question:"Quel raccourci permet de couper ?",answers:["Ctrl + C","Ctrl + X","Ctrl + V","Ctrl + P"],correct:1,explanation:"Ctrl + X prépare un élément à être déplacé ou coupé."},
 {question:"Quel raccourci permet de coller ?",answers:["Ctrl + V","Ctrl + C","Ctrl + X","Ctrl + B"],correct:0,explanation:"Ctrl + V colle le contenu copié ou coupé."},
 {question:"À quoi sert principalement un dossier ?",answers:["Refroidir l'ordinateur","Organiser des fichiers","Remplacer la souris","Charger la batterie"],correct:1,explanation:"Un dossier sert à regrouper et organiser des fichiers."},
 {question:"Que faut-il faire avant de retirer une clé USB ?",answers:["La casser","Éteindre l'écran","L'éjecter correctement","Supprimer tous les fichiers"],correct:2,explanation:"L'éjection correcte réduit le risque de problème pendant une opération de stockage."}
],
2:[
 {question:"À quoi sert un navigateur Web ?",answers:["Ouvrir des sites Web","Refroidir le PC","Imprimer sans imprimante","Remplacer le clavier"],correct:0,explanation:"Le navigateur permet d'accéder aux pages et services Web."},
 {question:"Où saisit-on généralement une adresse Web ?",answers:["Dans la barre d'adresse","Dans la corbeille","Dans le clavier","Dans le menu d'arrêt"],correct:0,explanation:"La barre d'adresse sert à saisir une adresse ou une recherche selon le navigateur."},
 {question:"Pourquoi comparer plusieurs résultats de recherche ?",answers:["Pour vérifier l'information","Pour éteindre le PC","Pour changer le clavier","Pour supprimer Internet"],correct:0,explanation:"Comparer les résultats aide à vérifier la qualité et la cohérence des informations."},
 {question:"Quel raccourci ouvre généralement un nouvel onglet ?",answers:["Ctrl + T","Ctrl + W","Ctrl + P","Ctrl + S"],correct:0,explanation:"Ctrl + T crée généralement un nouvel onglet dans un navigateur."},
 {question:"Quel raccourci ferme généralement l'onglet actuel ?",answers:["Ctrl + T","Ctrl + W","Ctrl + C","Ctrl + F"],correct:1,explanation:"Ctrl + W ferme généralement l'onglet actif."},
 {question:"Que signifie télécharger ?",answers:["Copier un fichier vers votre appareil","Supprimer un fichier","Éteindre Internet","Créer un clavier"],correct:0,explanation:"Télécharger consiste à recevoir une donnée depuis un service vers votre appareil."},
 {question:"Que signifie téléverser ou envoyer un fichier ?",answers:["Copier un fichier vers un service en ligne","Éteindre l'ordinateur","Supprimer un dossier","Changer la résolution"],correct:0,explanation:"Le téléversement envoie une donnée depuis votre appareil vers un service."},
 {question:"Pourquoi vérifier l'adresse d'un site ?",answers:["Pour éviter certaines pages trompeuses","Pour augmenter le volume","Pour charger la batterie","Pour changer la souris"],correct:0,explanation:"Une adresse inattendue ou trompeuse peut signaler un risque."},
 {question:"Que faut-il éviter de partager ?",answers:["Un mot de passe","Une information publique","Un sujet scolaire","Un fichier personnel avec autorisation"],correct:0,explanation:"Les mots de passe sont des informations confidentielles."},
 {question:"Que faire face à un message Internet suspect ?",answers:["Vérifier avant d'agir","Cliquer immédiatement","Donner son mot de passe","Télécharger toutes les pièces jointes"],correct:0,explanation:"La prudence consiste à vérifier le message, sa source et le lien avant d'agir."}
],
3:[
 {question:"À quoi sert un traitement de texte ?",answers:["Créer et modifier des documents","Refroidir un ordinateur","Scanner automatiquement Internet","Remplacer la souris"],correct:0,explanation:"Un traitement de texte permet de rédiger et mettre en forme des documents."},
 {question:"Pourquoi sélectionner du texte ?",answers:["Pour le mettre en forme ou le déplacer","Pour éteindre l'écran","Pour charger une clé USB","Pour modifier la batterie"],correct:0,explanation:"La sélection permet d'appliquer une action à une partie du contenu."},
 {question:"Quel raccourci met généralement du texte en gras ?",answers:["Ctrl + B","Ctrl + P","Ctrl + W","Ctrl + T"],correct:0,explanation:"Ctrl + B est le raccourci courant pour le gras dans de nombreux éditeurs."},
 {question:"Pourquoi changer la taille du texte ?",answers:["Pour améliorer la lisibilité et la hiérarchie","Pour augmenter Internet","Pour vider la corbeille","Pour connecter une imprimante"],correct:0,explanation:"La taille aide à distinguer les titres et à rendre le contenu lisible."},
 {question:"Quels alignements sont courants ?",answers:["Gauche, centre, droite et justifié","USB, HDMI et Wi-Fi","Copier, couper et coller","Petit, moyen et batterie"],correct:0,explanation:"Les quatre alignements de paragraphe courants sont gauche, centre, droite et justifié."},
 {question:"Quelle commande sert à ajouter une image ?",answers:["Insérer > Image","Arrêter > Image","Supprimer > Image","Imprimer > Image uniquement"],correct:0,explanation:"Un traitement de texte propose généralement une commande Insérer pour ajouter une image."},
 {question:"Pourquoi enregistrer régulièrement ?",answers:["Pour réduire le risque de perdre le travail","Pour supprimer le document","Pour changer le clavier","Pour fermer Windows"],correct:0,explanation:"L'enregistrement conserve les modifications réalisées."},
 {question:"Quel raccourci ouvre généralement la boîte d'impression ?",answers:["Ctrl + P","Ctrl + V","Ctrl + Z","Ctrl + T"],correct:0,explanation:"Ctrl + P est le raccourci courant pour imprimer."},
 {question:"Pourquoi donner des noms clairs aux documents ?",answers:["Pour les retrouver plus facilement","Pour accélérer le processeur","Pour modifier la batterie","Pour fermer les fenêtres"],correct:0,explanation:"Un nom clair facilite la recherche et l'organisation."},
 {question:"Que faut-il vérifier avant d'imprimer ?",answers:["Aperçu et paramètres d'impression","Le mot de passe Wi-Fi uniquement","La corbeille uniquement","La souris uniquement"],correct:0,explanation:"L'aperçu et les paramètres permettent de vérifier le résultat attendu."}
],
4:[
 {question:"À quoi sert un disque dur ou SSD ?",answers:["Stocker des données","Remplacer l'écran","Imprimer du papier","Créer automatiquement Internet"],correct:0,explanation:"Le stockage conserve le système, les programmes et les fichiers."},
 {question:"Que mesure principalement la capacité de stockage ?",answers:["La quantité de données pouvant être conservée","La luminosité","La vitesse de la souris","Le volume sonore"],correct:0,explanation:"La capacité indique combien de données un support peut stocker."},
 {question:"À quoi sert la corbeille ?",answers:["Conserver temporairement certains fichiers supprimés","Augmenter le volume","Installer Windows","Créer Internet"],correct:0,explanation:"La corbeille permet généralement de récupérer certains éléments supprimés avant leur suppression définitive."},
 {question:"Quelle action peut récupérer un fichier de la corbeille ?",answers:["Restaurer","Formater","Redémarrer","Compresser"],correct:0,explanation:"Restaurer replace généralement le fichier à son emplacement précédent."},
 {question:"Pourquoi faut-il être prudent avec la suppression définitive ?",answers:["Le fichier peut ne plus être récupérable facilement","Cela augmente la RAM","Cela installe un antivirus","Cela ouvre un navigateur"],correct:0,explanation:"Une suppression définitive peut rendre la récupération difficile ou impossible."},
 {question:"Que fait principalement un antivirus ?",answers:["Aide à détecter certains logiciels malveillants","Augmente la taille de l'écran","Remplace Windows","Crée des dossiers"],correct:0,explanation:"Un antivirus est un outil de protection contre certains logiciels malveillants."},
 {question:"Pourquoi installer les mises à jour ?",answers:["Pour recevoir notamment des corrections et correctifs de sécurité","Pour supprimer tous les fichiers","Pour changer la souris","Pour désactiver Internet"],correct:0,explanation:"Les mises à jour peuvent corriger des problèmes et améliorer la sécurité."},
 {question:"Qu'est-ce qu'une sauvegarde ?",answers:["Une copie de données conservée ailleurs","Une fenêtre Windows","Un raccourci clavier","Une corbeille"],correct:0,explanation:"Une sauvegarde est une copie conservée pour pouvoir récupérer les données en cas de problème."},
 {question:"Que faut-il faire avec un mot de passe ?",answers:["Le garder confidentiel","Le publier","Le donner à tout le monde","Le mettre dans un message public"],correct:0,explanation:"Un mot de passe est une information confidentielle."},
 {question:"Que faire avec un fichier suspect ?",answers:["Vérifier sa provenance avant de l'ouvrir","L'ouvrir immédiatement","Le partager","Désactiver la sécurité"],correct:0,explanation:"Vérifier la provenance et le contexte réduit le risque d'ouvrir un fichier dangereux."}
],
5:[
 {question:"Quel raccourci copie généralement une sélection ?",answers:["Ctrl + C","Ctrl + V","Ctrl + X","Ctrl + W"],correct:0,explanation:"Ctrl + C est le raccourci courant pour copier."},
 {question:"Quel raccourci ouvre généralement un nouvel onglet ?",answers:["Ctrl + T","Ctrl + S","Ctrl + P","Ctrl + B"],correct:0,explanation:"Ctrl + T ouvre généralement un nouvel onglet dans un navigateur."},
 {question:"À quoi sert la recherche de fichiers ?",answers:["Retrouver rapidement un fichier","Éteindre le PC","Changer la batterie","Supprimer Internet"],correct:0,explanation:"La recherche permet de retrouver un élément sans parcourir manuellement tous les dossiers."},
 {question:"Que contient généralement une archive ZIP ?",answers:["Un ou plusieurs fichiers regroupés","Uniquement le clavier","Une batterie","Un écran"],correct:0,explanation:"Une archive ZIP peut contenir plusieurs fichiers et dossiers regroupés."},
 {question:"Quel raccourci Windows permet de sélectionner une zone pour une capture ?",answers:["Windows + Maj + S","Ctrl + P","Ctrl + X","Alt + F4"],correct:0,explanation:"Windows + Maj + S ouvre l'outil permettant de sélectionner une zone à capturer."},
 {question:"Pourquoi utiliser une source fiable pour installer un programme ?",answers:["Pour réduire le risque de logiciels indésirables ou malveillants","Pour augmenter la taille de l'écran","Pour vider la corbeille","Pour changer le clavier"],correct:0,explanation:"Une source fiable réduit certains risques liés aux logiciels modifiés ou malveillants."},
 {question:"Comment désinstaller correctement un programme ?",answers:["Utiliser l'outil de désinstallation du système","Supprimer uniquement son icône","Éteindre l'écran","Débrancher le clavier"],correct:0,explanation:"La désinstallation retire généralement le programme avec les outils prévus par le système."},
 {question:"À quoi servent les paramètres Windows ?",answers:["Modifier différentes options du système","Imprimer automatiquement","Créer Internet","Remplacer tous les fichiers"],correct:0,explanation:"Les paramètres donnent accès à de nombreux réglages du système."},
 {question:"Pourquoi vérifier la compatibilité d'un périphérique ?",answers:["Pour s'assurer qu'il peut fonctionner avec l'ordinateur","Pour changer la langue automatiquement","Pour supprimer un dossier","Pour augmenter le volume"],correct:0,explanation:"La compatibilité permet au périphérique et au système de communiquer correctement."},
 {question:"Pourquoi entretenir un ordinateur ?",answers:["Pour aider à le garder propre, ventilé et fonctionnel","Pour supprimer Windows","Pour empêcher toutes les mises à jour","Pour remplacer tous les fichiers"],correct:0,explanation:"Un entretien raisonnable aide à maintenir l'ordinateur dans de bonnes conditions."}
]
};

const generalQuiz = [
 ...levelQuizzes[1].slice(0,2),
 ...levelQuizzes[2].slice(0,2),
 ...levelQuizzes[3].slice(0,2),
 ...levelQuizzes[4].slice(0,2),
 ...levelQuizzes[5].slice(0,2)
];

/* =========================================================
   IMAGES — affichage et agrandissement
========================================================= */
function getLessonImages(lesson) {
    if (Array.isArray(lesson.images)) return lesson.images;
    if (lesson.image) return [lesson.image];
    return [];
}

function imageAlt(lesson, index) {
    const title = currentLanguage === "fr" ? lesson.title : lesson.titleEn;
    return `${title} — image ${index + 1}`;
}

function renderLessonImages(lesson) {
    return getLessonImages(lesson).map((src, index) => `
        <figure class="lesson-image-container">
            <img class="lesson-image guide-clickable-image"
                 src="${src}"
                 alt="${escapeHtml(imageAlt(lesson,index))}"
                 title="${currentLanguage === "fr" ? "Cliquer pour agrandir" : "Click to enlarge"}"
                 loading="lazy"
                 onclick="openImageModal('${src}', this.alt)">
        </figure>
    `).join("");
}

function renderLessonStudyHelp(levelNumber, index) {
    const fr = [
        "Prenez le temps de refaire l'action sur un ordinateur. Lire l'explication est utile, mais la pratique vous aide à mémoriser les étapes.",
        "Observez attentivement les images : elles servent de repère visuel. Si plusieurs images sont présentes, comparez-les pour comprendre les différentes étapes.",
        "Conseil : ne cherchez pas seulement à mémoriser les mots. Essayez de comprendre pourquoi chaque action est réalisée et dans quel ordre.",
        "Petite vérification : après la leçon, essayez de refaire l'opération sans regarder le texte. Si vous bloquez, revenez à la partie concernée puis réessayez.",
        "À retenir : une bonne utilisation de l'ordinateur repose sur la méthode, l'organisation et la prudence. Les erreurs normales font partie de l'apprentissage."
    ];
    const en = [
        "Take time to repeat the action on a computer. Reading the explanation helps, but practice makes the steps easier to remember.",
        "Look carefully at the images: they provide a visual guide. When several images are shown, compare them to understand the different steps.",
        "Tip: do not only memorize the words. Try to understand why each action is done and in what order.",
        "Quick check: after the lesson, try to repeat the operation without looking at the text. If you get stuck, review the relevant part and try again.",
        "Remember: good computer use depends on method, organization and caution. Normal mistakes are part of learning."
    ];
    return `<div class="lesson-study-help"><h3>📌 ${currentLanguage === "fr" ? "Pour bien apprendre" : "Study tip"}</h3><p>${fr[index % fr.length] && currentLanguage === "fr" ? fr[index % fr.length] : en[index % en.length]}</p><p>${currentLanguage === "fr" ? `Exercice pratique : essayez de refaire cette leçon sur votre ordinateur, puis vérifiez chaque étape.` : `Practice: repeat this lesson on your computer, then check each step.`}</p></div>`;
}

function escapeHtml(text) {
    return String(text).replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;","\"":"&quot;"}[char]));
}

function openImageModal(src, alt) {
    const modal = getPage("imageModal");
    const image = getPage("imageModalImage");
    const label = getPage("imageModalLabel");
    if (!modal || !image) return;
    image.src = src;
    image.alt = alt || "";
    if (label) label.textContent = currentLanguage === "fr" ? "Cliquez sur × pour fermer" : "Click × to close";
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
}

function closeImageModal() {
    const modal = getPage("imageModal");
    if (modal) modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
}

/* =========================================================
   AUDIO / SON
========================================================= */
function applyAudioSettings() {
    document.querySelectorAll("audio").forEach(audio => {
        audio.volume = Math.max(0, Math.min(1, settings.volume / 100));
        audio.muted = settings.soundMuted;
    });
}

function playSound(file) {
    if (settings.soundMuted || settings.volume <= 0) return;
    const audio = new Audio(file);
    audio.volume = Math.max(0, Math.min(1, settings.volume / 100));
    audio.play().catch(() => {});
}

function createAudioPlayer(audioFile, title = "🔊 Audio") {
    return `<div class="audio-player"><p>${title}</p><audio controls preload="none" src="${audioFile}"></audio></div>`;
}

/* =========================================================
   PARAMÈTRES + RACCOURCIS
========================================================= */
const shortcuts = [
    ["Ctrl + C","Copier"],["Ctrl + X","Couper"],["Ctrl + V","Coller"],["Ctrl + Z","Annuler"],["Ctrl + Y","Rétablir"],
    ["Ctrl + A","Tout sélectionner"],["Ctrl + S","Enregistrer"],["Ctrl + P","Imprimer"],["Ctrl + F","Rechercher"],["Ctrl + N","Nouveau"],
    ["Ctrl + O","Ouvrir"],["Ctrl + W","Fermer un onglet ou une fenêtre selon l'application"],["Ctrl + T","Nouvel onglet"],["Ctrl + Shift + T","Rouvrir un onglet fermé"],
    ["Ctrl + R / F5","Actualiser"],["Ctrl + L","Sélectionner la barre d'adresse"],["Ctrl + D","Ajouter la page aux favoris dans de nombreux navigateurs"],
    ["Ctrl + H","Historique dans de nombreux navigateurs"],["Ctrl + J","Téléchargements dans de nombreux navigateurs"],["Ctrl + +","Agrandir l'affichage"],
    ["Ctrl + -","Réduire l'affichage"],["Ctrl + 0","Réinitialiser l'affichage"],["Alt + Tab","Changer de fenêtre"],["Alt + F4","Fermer la fenêtre active"],
    ["Alt + F","Ouvrir le menu Fichier dans certaines applications"],["Windows","Ouvrir le menu Démarrer"],["Windows + D","Afficher/masquer le bureau"],
    ["Windows + E","Ouvrir l'Explorateur de fichiers"],["Windows + I","Ouvrir les Paramètres"],["Windows + L","Verrouiller la session"],
    ["Windows + R","Ouvrir Exécuter"],["Windows + S","Ouvrir la recherche Windows"],["Windows + Tab","Vue des tâches"],["Windows + M","Réduire les fenêtres"],
    ["Windows + Shift + M","Restaurer les fenêtres réduites"],["Windows + A","Panneau des réglages rapides selon la version de Windows"],
    ["Windows + Shift + S","Capture d'une zone de l'écran"],["Windows + PrtScn","Capture de l'écran dans les versions compatibles"],
    ["PrtScn","Copier une capture de l'écran dans les versions compatibles"],["Alt + PrtScn","Capturer la fenêtre active dans les versions compatibles"],
    ["F1","Aide dans de nombreuses applications"],["F2","Renommer un élément sélectionné dans Windows"],["F5","Actualiser"],["F11","Plein écran dans de nombreuses applications"],
    ["Esc / Échap","Annuler ou fermer certains menus"],["Delete / Suppr","Supprimer l'élément sélectionné"],["Shift + Delete","Supprimer directement dans certaines situations Windows"],
    ["Home / Début","Aller au début d'une ligne ou d'une zone"],["End / Fin","Aller à la fin d'une ligne ou d'une zone"],
    ["Ctrl + Home","Aller au début d'un document dans de nombreuses applications"],["Ctrl + End","Aller à la fin d'un document dans de nombreuses applications"],
    ["Shift + flèches","Sélectionner progressivement du texte"],["Ctrl + flèches","Se déplacer plus rapidement entre les mots ou éléments"],
    ["Tab","Passer au champ ou élément suivant"],["Shift + Tab","Revenir au champ ou élément précédent"]
];

function injectApplicationStyles() {
    if (getPage("guideDynamicStyles")) return;
    const style = document.createElement("style");
    style.id = "guideDynamicStyles";
    style.textContent = `
        #homeHeader{position:relative;}
        #settingsButton{position:absolute;left:10px;top:10px;z-index:20;border:0;border-radius:10px;padding:9px 12px;cursor:pointer;font-size:18px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.15)}
        #settingsModal,#imageModal{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.72);display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box}
        #settingsModal.hidden,#imageModal.hidden{display:none}
        .guide-modal-card{background:#fff;color:#111;width:min(720px,100%);max-height:90vh;overflow:auto;border-radius:18px;padding:20px;box-sizing:border-box;position:relative}
        .guide-modal-close{position:absolute;right:12px;top:8px;border:0;background:transparent;font-size:32px;cursor:pointer}
        .guide-setting-group{margin:16px 0;padding:14px;border-radius:14px;background:#f3f6fa}
        .guide-setting-group label{display:block;font-weight:700;margin-bottom:8px}
        .guide-setting-buttons{display:flex;flex-wrap:wrap;gap:8px}
        .guide-setting-buttons button,.guide-shortcuts-button{border:0;border-radius:10px;padding:10px 13px;cursor:pointer;background:#e1e8f0}
        .guide-setting-buttons button.active{outline:3px solid #1565c0}
        #shortcutsPanel{display:none;margin-top:12px}
        #shortcutsPanel.open{display:block}
        .shortcut-table{width:100%;border-collapse:collapse}
        .shortcut-table th,.shortcut-table td{border:1px solid #ccd5df;padding:8px;text-align:left}
        .shortcut-table th{background:#e7edf4}
        .lesson-image-container{margin:18px auto;text-align:center}
        .lesson-image{display:block;width:100%;max-width:700px;height:auto;margin:auto;border-radius:14px;cursor:zoom-in;box-shadow:0 3px 12px rgba(0,0,0,.12)}
        #imageModalImage{max-width:95vw;max-height:78vh;object-fit:contain;border-radius:12px}
        #imageModalLabel{text-align:center;color:#fff;margin-top:8px}
        body.modal-open{overflow:hidden}
        body.guide-dark,body.guide-dark .guide-modal-card{background:#121820;color:#edf3f8}
        body.guide-dark .guide-setting-group{background:#1e2935}
        body.guide-dark .guide-setting-buttons button,body.guide-dark .guide-shortcuts-button{background:#2d3b4a;color:#fff}
        body.guide-dark .shortcut-table th{background:#263442}
        body.guide-dark .shortcut-table th,body.guide-dark .shortcut-table td{border-color:#4b5b6b}
        body.guide-dark #settingsButton{background:#253241;color:#fff}
        body.guide-font-120 p,body.guide-font-120 li,body.guide-font-120 button,body.guide-font-120 label,body.guide-font-120 select,body.guide-font-120 input{font-size:120% !important}
        body.guide-font-140 p,body.guide-font-140 li,body.guide-font-140 button,body.guide-font-140 label,body.guide-font-140 select,body.guide-font-140 input{font-size:140% !important}
        body.guide-font-80 p,body.guide-font-80 li,body.guide-font-80 button,body.guide-font-80 label,body.guide-font-80 select,body.guide-font-80 input{font-size:80% !important}
        @media(max-width:600px){#settingsButton{font-size:16px;padding:8px}.guide-modal-card{padding:16px}.shortcut-table{font-size:13px}}
    `;
    document.head.appendChild(style);
}

function ensureSettingsUI() {
    injectApplicationStyles();
    const header = getPage("homeHeader");
    if (header && !getPage("settingsButton")) {
        const button = document.createElement("button");
        button.id = "settingsButton";
        button.type = "button";
        button.textContent = "⚙️";
        button.title = currentLanguage === "fr" ? "Paramètres" : "Settings";
        button.onclick = openSettings;
        header.prepend(button);
    }
    if (!getPage("settingsModal")) {
        const modal = document.createElement("div");
        modal.id = "settingsModal";
        modal.className = "hidden";
        modal.innerHTML = `
            <div class="guide-modal-card">
                <button class="guide-modal-close" onclick="closeSettings()" aria-label="Close">×</button>
                <h2 id="settingsTitle">⚙️ Paramètres</h2>
                <div class="guide-setting-group">
                    <label id="fontLabel">Taille du texte</label>
                    <div class="guide-setting-buttons">
                        <button onclick="setFontSize(80)">80%</button>
                        <button onclick="setFontSize(100)">100%</button>
                        <button onclick="setFontSize(120)">120%</button>
                        <button onclick="setFontSize(140)">140%</button>
                    </div>
                </div>
                <div class="guide-setting-group">
                    <label id="themeLabel">Affichage</label>
                    <div class="guide-setting-buttons">
                        <button id="lightThemeButton" onclick="setTheme('light')">☀️ Clair</button>
                        <button id="darkThemeButton" onclick="setTheme('dark')">🌙 Sombre</button>
                    </div>
                </div>
                <div class="guide-setting-group">
                    <label id="soundLabel">Son</label>
                    <div class="guide-setting-buttons">
                        <button id="soundToggleButton" onclick="toggleSound()">🔊 Son activé</button>
                    </div>
                    <input id="volumeSlider" type="range" min="0" max="100" step="1" style="width:100%" oninput="setVolume(this.value)">
                    <p id="volumeValue">70%</p>
                </div>
                <div class="guide-setting-group">
                    <button class="guide-shortcuts-button" onclick="toggleShortcuts()" id="shortcutsButton">⌨️ Raccourcis clavier</button>
                    <div id="shortcutsPanel"></div>
                </div>
            </div>`;
        modal.addEventListener("click", event => { if (event.target === modal) closeSettings(); });
        document.body.appendChild(modal);
    }
    if (!getPage("imageModal")) {
        const modal = document.createElement("div");
        modal.id = "imageModal";
        modal.className = "hidden";
        modal.innerHTML = `<div style="width:100%;text-align:center;position:relative"><button class="guide-modal-close" style="color:#fff" onclick="closeImageModal()">×</button><img id="imageModalImage" src="" alt=""><p id="imageModalLabel"></p></div>`;
        modal.addEventListener("click", event => { if (event.target === modal) closeImageModal(); });
        document.body.appendChild(modal);
    }
    applySettings();
    refreshSettingsTexts();
}

function openSettings() {
    ensureSettingsUI();
    getPage("settingsModal").classList.remove("hidden");
}

function closeSettings() {
    const modal = getPage("settingsModal");
    if (modal) modal.classList.add("hidden");
}

function setTheme(theme) {
    settings.theme = theme;
    localStorage.setItem("guide_theme", theme);
    applySettings();
}

function setFontSize(size) {
    settings.fontSize = String(size);
    localStorage.setItem("guide_font_size", String(size));
    applySettings();
}

function toggleSound() {
    settings.soundMuted = !settings.soundMuted;
    localStorage.setItem("guide_sound_muted", String(settings.soundMuted));
    applySettings();
    if (!settings.soundMuted) playSound("audio/click.mp3");
}

function setVolume(value) {
    settings.volume = Number(value);
    localStorage.setItem("guide_volume", String(settings.volume));
    applyAudioSettings();
    const valueElement = getPage("volumeValue");
    if (valueElement) valueElement.textContent = `${settings.volume}%`;
}

function applySettings() {
    document.body.classList.toggle("guide-dark", settings.theme === "dark");
    ["guide-font-80","guide-font-120","guide-font-140"].forEach(c => document.body.classList.remove(c));
    if (settings.fontSize === "80") document.body.classList.add("guide-font-80");
    if (settings.fontSize === "120") document.body.classList.add("guide-font-120");
    if (settings.fontSize === "140") document.body.classList.add("guide-font-140");
    applyAudioSettings();
    const slider = getPage("volumeSlider");
    if (slider) slider.value = settings.volume;
    const valueElement = getPage("volumeValue");
    if (valueElement) valueElement.textContent = `${settings.volume}%`;
    const soundButton = getPage("soundToggleButton");
    if (soundButton) soundButton.textContent = settings.soundMuted ? (currentLanguage === "fr" ? "🔇 Son coupé" : "🔇 Sound off") : (currentLanguage === "fr" ? "🔊 Son activé" : "🔊 Sound on");
    const light = getPage("lightThemeButton");
    const dark = getPage("darkThemeButton");
    if (light) light.classList.toggle("active", settings.theme === "light");
    if (dark) dark.classList.toggle("active", settings.theme === "dark");
}

function toggleShortcuts() {
    const panel = getPage("shortcutsPanel");
    if (!panel) return;
    if (!panel.innerHTML) {
        panel.innerHTML = `<p>${currentLanguage === "fr" ? "Cette liste regroupe de nombreux raccourcis Windows, texte et navigateur. Les logiciels peuvent avoir leurs propres raccourcis supplémentaires." : "This list contains many Windows, text and browser shortcuts. Software may have additional shortcuts."}</p><table class="shortcut-table"><thead><tr><th>${currentLanguage === "fr" ? "Raccourci" : "Shortcut"}</th><th>${currentLanguage === "fr" ? "Action" : "Action"}</th></tr></thead><tbody>${shortcuts.map(([key,action]) => `<tr><td><strong>${escapeHtml(key)}</strong></td><td>${escapeHtml(action)}</td></tr>`).join("")}</tbody></table>`;
    }
    panel.classList.toggle("open");
}

function refreshSettingsTexts() {
    const title = getPage("settingsTitle");
    const font = getPage("fontLabel");
    const theme = getPage("themeLabel");
    const sound = getPage("soundLabel");
    const shortcutsButton = getPage("shortcutsButton");
    if (title) title.textContent = currentLanguage === "fr" ? "⚙️ Paramètres" : "⚙️ Settings";
    if (font) font.textContent = currentLanguage === "fr" ? "Taille du texte" : "Text size";
    if (theme) theme.textContent = currentLanguage === "fr" ? "Affichage" : "Display";
    if (sound) sound.textContent = currentLanguage === "fr" ? "Son" : "Sound";
    if (shortcutsButton) shortcutsButton.textContent = currentLanguage === "fr" ? "⌨️ Raccourcis clavier" : "⌨️ Keyboard shortcuts";
    const light = getPage("lightThemeButton");
    const dark = getPage("darkThemeButton");
    if (light) light.textContent = currentLanguage === "fr" ? "☀️ Clair" : "☀️ Light";
    if (dark) dark.textContent = currentLanguage === "fr" ? "🌙 Sombre" : "🌙 Dark";
    applySettings();
}

/* =========================================================
   AFFICHER UN NIVEAU
========================================================= */
function showLevel(levelNumber) {
    hideAllPages();
    const levelPage = getPage("levelPage");
    if (!levelPage) return;
    levelPage.classList.remove("hidden");
    const title = getPage("levelTitle");
    const description = getPage("levelDescription");
    const content = getPage("levelContent");
    const lessonsByLevel = {1:level1Lessons,2:level2Lessons,3:level3Lessons,4:level4Lessons,5:level5Lessons};
    const lessons = lessonsByLevel[levelNumber];
    if (!lessons) return;
    localStorage.setItem(`level_${levelNumber}_started`, "true");
    localStorage.setItem(`level_${levelNumber}_lesson_count`, String(lessons.length));
    const titles = {
        1:["🟢 Niveau 1 — Découvrir l'ordinateur","🟢 Level 1 — Discovering the computer"],
        2:["🔵 Niveau 2 — Internet et navigation","🔵 Level 2 — Internet and browsing"],
        3:["🟡 Niveau 3 — Documents et bureautique","🟡 Level 3 — Documents and office tools"],
        4:["🟠 Niveau 4 — Gestion des fichiers et sécurité","🟠 Level 4 — Files and security"],
        5:["🔴 Niveau 5 — Compétences avancées","🔴 Level 5 — Advanced skills"]
    };
    const descriptions = {
        1:["Apprenez progressivement les bases de l'utilisation d'un ordinateur.","Learn the basics of using a computer step by step."],
        2:["Apprenez à naviguer, rechercher et utiliser Internet avec prudence.","Learn to browse, search and use the Internet safely."],
        3:["Apprenez à créer, modifier, enregistrer et organiser des documents.","Learn to create, edit, save and organize documents."],
        4:["Apprenez à gérer les fichiers, le stockage et les principales règles de sécurité.","Learn about files, storage and essential security practices."],
        5:["Développez vos compétences avancées avec les raccourcis, ZIP, captures et paramètres.","Develop advanced skills with shortcuts, ZIP files, screenshots and settings."]
    };
    title.textContent = titles[levelNumber][currentLanguage === "fr" ? 0 : 1];
    description.textContent = descriptions[levelNumber][currentLanguage === "fr" ? 0 : 1];
    let html = `<div class="lesson-intro"><p>${currentLanguage === "fr" ? `Ce niveau contient ${lessons.length} leçons détaillées. Prenez le temps de lire les explications et d'observer les images.` : `This level contains ${lessons.length} detailed lessons. Take time to read the explanations and observe the images.`}</p></div>`;
    lessons.forEach((lesson,index) => {
        const lessonTitle = currentLanguage === "fr" ? lesson.title : lesson.titleEn;
        const lessonContent = currentLanguage === "fr" ? lesson.content : lesson.contentEn;
        html += `<article class="lesson"><h2>${escapeHtml(lessonTitle)}</h2>${renderLessonImages(lesson)}${lessonContent}${renderLessonStudyHelp(levelNumber, index)}</article>`;
    });
    html += `<div class="lesson"><h2>🧠 ${currentLanguage === "fr" ? "Quiz du niveau" : "Level quiz"}</h2><p>${currentLanguage === "fr" ? "Après les leçons, testez vos connaissances avec 10 questions et une explication après chaque réponse." : "After the lessons, test your knowledge with 10 questions and an explanation after each answer."}</p><button class="quiz-button" onclick="showLevelQuiz(${levelNumber})">🧠 ${currentLanguage === "fr" ? "Commencer le quiz" : "Start quiz"}</button></div>`;
    content.innerHTML = html;
    window.scrollTo(0,0);
    setLanguage(currentLanguage);
}

/* =========================================================
   QUIZ DES NIVEAUX
========================================================= */
function showLevelQuiz(levelNumber) {
    currentQuizLevel = levelNumber;
    currentQuiz = levelQuizzes[levelNumber] || [];
    quizAnswers = new Array(currentQuiz.length).fill(null);
    renderQuizPage();
}

function renderQuizPage() {
    hideAllPages();
    const page = getPage("levelPage");
    const title = getPage("levelTitle");
    const description = getPage("levelDescription");
    const content = getPage("levelContent");
    if (!page || !content) return;
    page.classList.remove("hidden");
    title.textContent = currentLanguage === "fr" ? `🧠 Quiz du Niveau ${currentQuizLevel}` : `🧠 Level ${currentQuizLevel} Quiz`;
    description.textContent = currentLanguage === "fr" ? "Choisissez une réponse pour chaque question." : "Choose one answer for each question.";
    content.innerHTML = `<div class="quiz-container">${currentQuiz.map((q,i) => `<div class="quiz-question"><h3>${i+1}. ${escapeHtml(currentLanguage === "fr" ? q.question : translateQuizQuestion(q.question))}</h3><div>${q.answers.map((answer,j) => `<button class="quiz-answer" data-q="${i}" data-a="${j}" onclick="answerQuiz(${i},${j})">${escapeHtml(answer)}</button>`).join("")}</div><div id="explanation-${i}" class="quiz-explanation"></div></div>`).join("")}<button class="quiz-button" onclick="finishLevelQuiz()">🏆 ${currentLanguage === "fr" ? "Terminer le quiz" : "Finish quiz"}</button><button class="quiz-button" onclick="showLevel(${currentQuizLevel})">📖 ${currentLanguage === "fr" ? "Retour aux leçons" : "Back to lessons"}</button></div>`;
    window.scrollTo(0,0);
}

function translateQuizQuestion(text) { return text; }

function answerQuiz(questionIndex, answerIndex) {
    quizAnswers[questionIndex] = answerIndex;
    document.querySelectorAll(`.quiz-answer[data-q="${questionIndex}"]`).forEach(button => button.classList.remove("selected"));
    const selected = document.querySelector(`.quiz-answer[data-q="${questionIndex}"][data-a="${answerIndex}"]`);
    if (selected) selected.classList.add("selected");
    const question = currentQuiz[questionIndex];
    const explanation = getPage(`explanation-${questionIndex}`);
    if (explanation) {
        const correct = answerIndex === question.correct;
        explanation.innerHTML = correct ? `✅ ${currentLanguage === "fr" ? "Bonne réponse !" : "Correct!"} ${escapeHtml(question.explanation)}` : `❌ ${currentLanguage === "fr" ? "Pas tout à fait." : "Not quite."} ${escapeHtml(question.explanation)}`;
        explanation.className = `quiz-explanation ${correct ? "correct" : "wrong"}`;
        playSound(correct ? "audio/correct.mp3" : "audio/wrong.mp3");
    }
}

function finishLevelQuiz() {
    if (quizAnswers.some(answer => answer === null)) {
        alert(currentLanguage === "fr" ? "Veuillez répondre à toutes les questions." : "Please answer all questions.");
        return;
    }
    let score = 0;
    currentQuiz.forEach((q,i) => { if (quizAnswers[i] === q.correct) score++; });
    const percentage = Math.round((score / currentQuiz.length) * 100);
    localStorage.setItem(`level_${currentQuizLevel}_score`, String(percentage));
    localStorage.setItem(`level_${currentQuizLevel}_completed`, "true");
    if (percentage >= 70) playSound("audio/victory.mp3"); else playSound("audio/correct.mp3");
    const content = getPage("levelContent");
    content.innerHTML = `<div class="result-card"><h2>🏆 ${currentLanguage === "fr" ? "Quiz terminé" : "Quiz completed"}</h2><p><strong>${score} / ${currentQuiz.length}</strong></p><p>${percentage}%</p><p>${percentage >= 70 ? (currentLanguage === "fr" ? "Bravo ! Continuez à apprendre." : "Well done! Keep learning.") : (currentLanguage === "fr" ? "Relisez les leçons et réessayez." : "Review the lessons and try again.")}</p><button class="quiz-button" onclick="showLevelQuiz(${currentQuizLevel})">🔄 ${currentLanguage === "fr" ? "Recommencer" : "Try again"}</button><button class="quiz-button" onclick="showLevel(${currentQuizLevel})">📖 ${currentLanguage === "fr" ? "Retour aux leçons" : "Back to lessons"}</button></div>`;
    updateProgress();
}

function showLevel1Quiz() { showLevelQuiz(1); }

/* =========================================================
   QUIZ GÉNÉRAL
========================================================= */
function showGeneralQuiz() {
    currentQuizLevel = 0;
    generalQuizAnswers = new Array(generalQuiz.length).fill(null);
    hideAllPages();
    const page = getPage("levelPage");
    const title = getPage("levelTitle");
    const description = getPage("levelDescription");
    const content = getPage("levelContent");
    if (!page || !content) return;
    page.classList.remove("hidden");
    title.textContent = currentLanguage === "fr" ? "🧠 Quiz général" : "🧠 General quiz";
    description.textContent = currentLanguage === "fr" ? "Un quiz récapitulatif sur plusieurs niveaux." : "A review quiz covering several levels.";
    content.innerHTML = `<div class="quiz-container">${generalQuiz.map((q,i) => `<div class="quiz-question"><h3>${i+1}. ${escapeHtml(q.question)}</h3>${q.answers.map((a,j)=>`<button class="quiz-answer" data-gq="${i}" data-a="${j}" onclick="answerGeneralQuiz(${i},${j})">${escapeHtml(a)}</button>`).join("")}<div id="general-explanation-${i}" class="quiz-explanation"></div></div>`).join("")}<button class="quiz-button" onclick="finishGeneralQuiz()">🏆 ${currentLanguage === "fr" ? "Terminer" : "Finish"}</button><button class="quiz-button" onclick="startBook()">📖 ${currentLanguage === "fr" ? "Retour aux niveaux" : "Back to levels"}</button></div>`;
    window.scrollTo(0,0);
}

function answerGeneralQuiz(questionIndex, answerIndex) {
    generalQuizAnswers[questionIndex] = answerIndex;
    document.querySelectorAll(`.quiz-answer[data-gq="${questionIndex}"]`).forEach(button => button.classList.remove("selected"));
    const selected = document.querySelector(`.quiz-answer[data-gq="${questionIndex}"][data-a="${answerIndex}"]`);
    if (selected) selected.classList.add("selected");
    const q = generalQuiz[questionIndex];
    const explanation = getPage(`general-explanation-${questionIndex}`);
    if (explanation) {
        const correct = answerIndex === q.correct;
        explanation.innerHTML = correct ? `✅ ${q.explanation}` : `❌ ${q.explanation}`;
        explanation.className = `quiz-explanation ${correct ? "correct" : "wrong"}`;
        playSound(correct ? "audio/correct.mp3" : "audio/wrong.mp3");
    }
}

function finishGeneralQuiz() {
    if (generalQuizAnswers.some(answer => answer === null)) {
        alert(currentLanguage === "fr" ? "Veuillez répondre à toutes les questions." : "Please answer all questions.");
        return;
    }
    let score = 0;
    generalQuiz.forEach((q,i) => { if (generalQuizAnswers[i] === q.correct) score++; });
    const percentage = Math.round((score / generalQuiz.length) * 100);
    localStorage.setItem("general_quiz_score", String(percentage));
    localStorage.setItem("general_quiz_completed", "true");
    playSound(percentage >= 70 ? "audio/victory.mp3" : "audio/correct.mp3");
    const content = getPage("levelContent");
    content.innerHTML = `<div class="result-card"><h2>🏆 ${currentLanguage === "fr" ? "Quiz général terminé" : "General quiz completed"}</h2><p><strong>${score} / ${generalQuiz.length}</strong></p><p>${percentage}%</p><button class="quiz-button" onclick="showGeneralQuiz()">🔄 ${currentLanguage === "fr" ? "Recommencer" : "Try again"}</button><button class="quiz-button" onclick="startBook()">📖 ${currentLanguage === "fr" ? "Retour aux niveaux" : "Back to levels"}</button></div>`;
    updateProgress();
}

/* =========================================================
   PROGRESSION
========================================================= */
function updateProgress() {
    const container = getPage("progressContent");
    if (!container) return;
    const levelNames = {
        1:["🟢 Niveau 1","🟢 Level 1"],2:["🔵 Niveau 2","🔵 Level 2"],3:["🟡 Niveau 3","🟡 Level 3"],4:["🟠 Niveau 4","🟠 Level 4"],5:["🔴 Niveau 5","🔴 Level 5"]
    };
    let html = "";
    for(let level=1;level<=5;level++){
        const completed = localStorage.getItem(`level_${level}_completed`) === "true";
        const started = localStorage.getItem(`level_${level}_started`) === "true";
        const score = localStorage.getItem(`level_${level}_score`) || 0;
        const status = completed ? (currentLanguage === "fr" ? "Niveau terminé" : "Level completed") : started ? (currentLanguage === "fr" ? "En cours" : "In progress") : (currentLanguage === "fr" ? "Pas encore commencé" : "Not started yet");
        html += `<div class="progress-card"><h2>${levelNames[level][currentLanguage === "fr" ? 0 : 1]}</h2><p>${completed ? "✅" : started ? "📖" : "⏳"} ${status}</p><p>${currentLanguage === "fr" ? "Score du quiz" : "Quiz score"} : <strong>${score}%</strong></p><div class="progress-bar"><div class="progress-fill" style="width:${score}%"></div></div></div>`;
    }
    const generalCompleted = localStorage.getItem("general_quiz_completed") === "true";
    const generalScore = localStorage.getItem("general_quiz_score") || 0;
    html += `<div class="progress-card"><h2>🧠 ${currentLanguage === "fr" ? "Quiz général" : "General quiz"}</h2><p>${generalCompleted ? "✅" : "⏳"} ${generalCompleted ? (currentLanguage === "fr" ? "Quiz terminé" : "Quiz completed") : (currentLanguage === "fr" ? "Pas encore terminé" : "Not completed yet")}</p><p>${currentLanguage === "fr" ? "Dernier score" : "Last score"} : <strong>${generalScore}%</strong></p></div>`;
    container.innerHTML = html;
}

/* =========================================================
   DÉMARRAGE
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    ensureSettingsUI();
    quizAnswers = [];
    generalQuizAnswers = [];
    setLanguage(currentLanguage);
    applySettings();
    goHome();
    document.addEventListener("click", event => {
        const button = event.target.closest("button");
        if (!button) return;
        if (button.classList.contains("quiz-answer") || button.classList.contains("guide-modal-close")) return;
        playSound("audio/click.mp3");
    }, true);
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeImageModal();
            closeSettings();
        }
    });
});
