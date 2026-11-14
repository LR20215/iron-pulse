
/* ==========================================
   IRON PULSE — EXERCICES
   Catalogue, recherche, filtres et fiches
========================================== */

(() => {
    "use strict";

    const exerciseGrid = document.getElementById("exercise-grid");
    const exerciseSearch = document.getElementById("exercise-search");
    const muscleFilter = document.getElementById("muscle-filter");
    const levelFilter = document.getElementById("level-filter");
    const resetButton = document.getElementById("reset-exercises");
    const exerciseCount = document.getElementById("exercise-count");
    const emptyMessage = document.getElementById("exercise-empty");

    const modal = document.getElementById("exercise-modal");
    const modalBody = document.getElementById("exercise-modal-body");

    if (!exerciseGrid) return;

    const exercises = [
        {
            id: 1,
            name: "Développé couché",
            category: "musculation",
            categoryLabel: "Musculation",
            muscle: "pectoraux",
            muscleLabel: "Pectoraux",
            level: "intermediaire",
            levelLabel: "Intermédiaire",
            equipment: "Barre et banc",
            image: "https://images.unsplash.com/photo-1534368270820-9de3d8053204?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice classique pour travailler les muscles de la poitrine, avec l'aide des épaules et des triceps.",
            technique: [
                "Allonge-toi sur un banc, les pieds bien posés au sol.",
                "Place les mains un peu plus larges que les épaules.",
                "Descends la barre lentement vers la poitrine.",
                "Repousse la barre sans verrouiller brutalement les coudes."
            ],
            errors: [
                "Décoller les pieds du sol.",
                "Faire rebondir la barre sur la poitrine.",
                "Descendre trop rapidement.",
                "Utiliser une charge que tu ne contrôles pas."
            ],
            progression: "Commence avec une charge légère et concentre-toi sur le contrôle du mouvement. Demande une supervision adaptée pour apprendre l'exercice.",
            warning: "Utilise un équipement adapté et un encadrement compétent. Ne réalise pas cet exercice seul avec une charge que tu ne peux pas maîtriser."
        },
        {
            id: 2,
            name: "Pompes classiques",
            category: "poids",
            categoryLabel: "Poids du corps",
            muscle: "pectoraux",
            muscleLabel: "Pectoraux",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Aucun",
            image: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&w=900&q=85",
            description: "Un mouvement au poids du corps qui sollicite les pectoraux, les triceps et les épaules.",
            technique: [
                "Place les mains légèrement plus larges que les épaules.",
                "Garde le corps aligné de la tête aux pieds.",
                "Descends en pliant les coudes.",
                "Repousse le sol pour revenir à la position de départ."
            ],
            errors: [
                "Laisser tomber le bassin.",
                "Écarter excessivement les coudes.",
                "Faire des répétitions trop rapides.",
                "Bloquer sa respiration."
            ],
            progression: "Tu peux commencer avec les mains sur un support stable et progressivement diminuer sa hauteur.",
            warning: "Arrête si tu ressens une douleur inhabituelle aux épaules, aux poignets ou au dos."
        },
        {
            id: 3,
            name: "Tirage horizontal",
            category: "musculation",
            categoryLabel: "Musculation",
            muscle: "dos",
            muscleLabel: "Dos",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Machine à poulie",
            image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice de tirage qui sollicite principalement le dos et participe au renforcement du haut du corps.",
            technique: [
                "Assieds-toi face à la machine et place les pieds sur les supports.",
                "Garde le dos dans une position naturelle.",
                "Tire la poignée vers le bas du torse.",
                "Reviens lentement en contrôlant la charge."
            ],
            errors: [
                "Arrondir fortement le dos.",
                "Donner des à-coups avec le buste.",
                "Tirer uniquement avec les bras.",
                "Laisser repartir la charge brutalement."
            ],
            progression: "Apprends d'abord le mouvement avec une résistance légère, puis augmente progressivement uniquement si la technique reste correcte.",
            warning: "Adapte la machine à ta morphologie et demande conseil si tu ne connais pas son fonctionnement."
        },
        {
            id: 4,
            name: "Squat au poids du corps",
            category: "poids",
            categoryLabel: "Poids du corps",
            muscle: "jambes",
            muscleLabel: "Jambes",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Aucun",
            image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=900&q=85",
            description: "Un mouvement fonctionnel qui sollicite les cuisses, les fessiers et les muscles stabilisateurs.",
            technique: [
                "Place les pieds à peu près à la largeur des épaules.",
                "Garde le regard devant toi et le dos stable.",
                "Plie les genoux et les hanches pour descendre.",
                "Pousse dans les pieds pour remonter."
            ],
            errors: [
                "Laisser les genoux s'effondrer vers l'intérieur.",
                "Décoller les talons.",
                "Arrondir excessivement le dos.",
                "Descendre plus bas que ce que ta mobilité permet."
            ],
            progression: "Commence par une amplitude confortable. Tu peux utiliser une chaise derrière toi comme repère.",
            warning: "Le mouvement doit rester confortable. Ne force pas une amplitude qui provoque une douleur."
        },
        {
            id: 5,
            name: "Gainage frontal",
            category: "poids",
            categoryLabel: "Poids du corps",
            muscle: "abdominaux",
            muscleLabel: "Abdominaux",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Tapis",
            image: "https://images.unsplash.com/photo-1566241142559-40e1dab266c6?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice statique qui fait travailler les muscles du tronc et aide à développer la stabilité.",
            technique: [
                "Place les avant-bras au sol.",
                "Étends les jambes derrière toi.",
                "Garde le corps aligné sans creuser le dos.",
                "Respire normalement pendant toute la durée de l'exercice."
            ],
            errors: [
                "Laisser les hanches tomber.",
                "Lever excessivement les fesses.",
                "Retenir sa respiration.",
                "Continuer malgré une douleur."
            ],
            progression: "Commence par des périodes courtes et confortables. La qualité de la position compte davantage que la durée.",
            warning: "Si tu ne peux plus maintenir une position correcte, repose-toi."
        },
        {
            id: 6,
            name: "Développé épaules",
            category: "musculation",
            categoryLabel: "Musculation",
            muscle: "epaules",
            muscleLabel: "Épaules",
            level: "intermediaire",
            levelLabel: "Intermédiaire",
            equipment: "Haltères légers",
            image: "https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?auto=format&fit=crop&w=900&q=85",
            description: "Un mouvement de poussée vertical qui sollicite principalement les épaules.",
            technique: [
                "Place-toi debout ou assis, avec le dos stable.",
                "Tiens les haltères à hauteur des épaules.",
                "Pousse les haltères vers le haut de manière contrôlée.",
                "Redescends lentement à la position de départ."
            ],
            errors: [
                "Cambrer fortement le dos.",
                "Utiliser une charge trop lourde.",
                "Faire des mouvements brusques.",
                "Descendre dans une position inconfortable."
            ],
            progression: "Commence avec une résistance légère et travaille la coordination avant de chercher à augmenter la charge.",
            warning: "Ne force jamais une amplitude qui provoque une gêne aux épaules."
        },
        {
            id: 7,
            name: "Curl biceps",
            category: "musculation",
            categoryLabel: "Musculation",
            muscle: "bras",
            muscleLabel: "Bras",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Haltères",
            image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice d'isolation destiné principalement aux muscles fléchisseurs du coude, dont les biceps.",
            technique: [
                "Tiens un haltère dans chaque main.",
                "Garde les coudes proches du corps.",
                "Plie les bras pour remonter les haltères.",
                "Redescends lentement sans relâcher brutalement."
            ],
            errors: [
                "Balancer le buste.",
                "Donner de l'élan avec les épaules.",
                "Laisser tomber les haltères.",
                "Utiliser une charge trop importante."
            ],
            progression: "Privilégie une résistance qui te permet de contrôler chaque répétition.",
            warning: "Garde les poignets dans une position confortable."
        },
        {
            id: 8,
            name: "Extensions triceps",
            category: "musculation",
            categoryLabel: "Musculation",
            muscle: "bras",
            muscleLabel: "Bras",
            level: "intermediaire",
            levelLabel: "Intermédiaire",
            equipment: "Poulie",
            image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice ciblant les triceps, situés à l'arrière du bras.",
            technique: [
                "Place-toi face à la poulie.",
                "Garde les coudes près du corps.",
                "Pousse la poignée vers le bas.",
                "Reviens lentement à la position initiale."
            ],
            errors: [
                "Écarter les coudes.",
                "Utiliser le poids du corps pour pousser.",
                "Faire des mouvements saccadés.",
                "Choisir une résistance trop élevée."
            ],
            progression: "Commence avec une résistance faible et concentre-toi sur la stabilité des coudes.",
            warning: "Évite toute amplitude qui provoque une douleur au coude."
        },
        {
            id: 9,
            name: "Fentes avant",
            category: "poids",
            categoryLabel: "Poids du corps",
            muscle: "jambes",
            muscleLabel: "Jambes",
            level: "intermediaire",
            levelLabel: "Intermédiaire",
            equipment: "Aucun",
            image: "https://images.unsplash.com/photo-1434596922112-19c563067271?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice unilatéral qui travaille les jambes et l'équilibre.",
            technique: [
                "Tiens-toi debout, les pieds écartés à la largeur du bassin.",
                "Fais un pas vers l'avant.",
                "Plie les deux genoux dans une amplitude confortable.",
                "Repousse le sol pour revenir debout."
            ],
            errors: [
                "Perdre l'équilibre.",
                "Laisser le genou avant partir vers l'intérieur.",
                "Faire un pas trop court.",
                "Descendre trop rapidement."
            ],
            progression: "Commence avec une petite amplitude et utilise un support stable si nécessaire.",
            warning: "Garde une distance suffisante autour de toi pour éviter de trébucher."
        },
        {
            id: 10,
            name: "Mountain climbers",
            category: "cardio",
            categoryLabel: "Cardio",
            muscle: "cardio",
            muscleLabel: "Cardio",
            level: "intermediaire",
            levelLabel: "Intermédiaire",
            equipment: "Tapis",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice dynamique qui combine coordination, stabilité et activité cardiovasculaire.",
            technique: [
                "Place-toi en position de planche haute.",
                "Garde les mains sous les épaules.",
                "Ramène alternativement un genou vers la poitrine.",
                "Adapte la vitesse pour conserver une bonne posture."
            ],
            errors: [
                "Faire bouger excessivement le bassin.",
                "Arrondir le dos.",
                "Accélérer au détriment de la technique.",
                "Oublier de respirer."
            ],
            progression: "Commence lentement, en alternant les jambes sans chercher la vitesse.",
            warning: "Adapte l'intensité à ton niveau et arrête-toi en cas de malaise."
        },
        {
            id: 11,
            name: "Marche rapide",
            category: "cardio",
            categoryLabel: "Cardio",
            muscle: "cardio",
            muscleLabel: "Cardio",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Chaussures adaptées",
            image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=900&q=85",
            description: "Une activité accessible qui permet de développer progressivement son endurance.",
            technique: [
                "Choisis un parcours adapté et sécurisé.",
                "Commence à une allure confortable.",
                "Garde une posture naturelle.",
                "Augmente progressivement l'allure si tu te sens à l'aise."
            ],
            errors: [
                "Partir trop vite.",
                "Porter des chaussures inadaptées.",
                "Ignorer la fatigue ou la douleur.",
                "Oublier de boire suffisamment."
            ],
            progression: "Augmente progressivement la durée de tes sorties selon ton confort et ton niveau.",
            warning: "Privilégie un parcours sûr et adapte ton activité à la météo."
        },
        {
            id: 12,
            name: "Vélo",
            category: "cardio",
            categoryLabel: "Cardio",
            muscle: "cardio",
            muscleLabel: "Cardio",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Vélo",
            image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=85",
            description: "Une activité d'endurance qui sollicite les jambes et le système cardiovasculaire.",
            technique: [
                "Ajuste la hauteur de selle.",
                "Vérifie le bon état du vélo.",
                "Commence à une allure facile.",
                "Garde une cadence régulière et confortable."
            ],
            errors: [
                "Avoir une selle mal réglée.",
                "Pédaler avec une résistance excessive.",
                "Négliger les équipements de sécurité.",
                "Augmenter brutalement la durée."
            ],
            progression: "Commence par des sorties faciles et augmente progressivement la durée si tu récupères bien.",
            warning: "Porte un casque adapté et respecte le code de la route."
        },
        {
            id: 13,
            name: "Jumping jacks",
            category: "cardio",
            categoryLabel: "Cardio",
            muscle: "cardio",
            muscleLabel: "Cardio",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Aucun",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
            description: "Un mouvement dynamique qui sollicite l'ensemble du corps et augmente progressivement le rythme cardiaque.",
            technique: [
                "Tiens-toi debout, les pieds rapprochés.",
                "Écarte les jambes en levant les bras.",
                "Reviens à la position initiale.",
                "Répète à un rythme confortable."
            ],
            errors: [
                "Atterrir trop lourdement.",
                "Aller trop vite dès le départ.",
                "Négliger l'espace autour de soi.",
                "Continuer malgré une gêne."
            ],
            progression: "Tu peux commencer par une version sans saut en écartant alternativement les pieds.",
            warning: "Choisis une surface stable et adapte le mouvement à tes articulations."
        },
        {
            id: 14,
            name: "Bird dog",
            category: "mobilite",
            categoryLabel: "Mobilité",
            muscle: "corps",
            muscleLabel: "Corps entier",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Tapis",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice de stabilité qui sollicite le tronc et demande de la coordination.",
            technique: [
                "Place-toi à quatre pattes.",
                "Garde le dos dans une position naturelle.",
                "Tends doucement un bras et la jambe opposée.",
                "Reviens au centre puis change de côté."
            ],
            errors: [
                "Tourner le bassin.",
                "Creuser le dos.",
                "Lever la jambe trop haut.",
                "Faire le mouvement trop rapidement."
            ],
            progression: "Commence par tendre uniquement un bras ou une jambe avant de combiner les deux.",
            warning: "Le mouvement doit rester lent et confortable."
        },
        {
            id: 15,
            name: "Étirement des épaules",
            category: "mobilite",
            categoryLabel: "Mobilité",
            muscle: "epaules",
            muscleLabel: "Épaules",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Aucun",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
            description: "Un mouvement doux pour entretenir la mobilité de la zone des épaules.",
            technique: [
                "Tiens-toi debout ou assis confortablement.",
                "Amène doucement un bras devant ta poitrine.",
                "Accompagne-le avec l'autre bras sans forcer.",
                "Respire calmement puis change de côté."
            ],
            errors: [
                "Tirer brutalement sur le bras.",
                "Bloquer sa respiration.",
                "Chercher une amplitude douloureuse.",
                "Contracter inutilement les épaules."
            ],
            progression: "Prends le temps de réaliser le mouvement lentement, sans chercher à aller toujours plus loin.",
            warning: "Un étirement ne doit pas provoquer de douleur."
        },
        {
            id: 16,
            name: "Mobilité des hanches",
            category: "mobilite",
            categoryLabel: "Mobilité",
            muscle: "jambes",
            muscleLabel: "Jambes",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Tapis",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
            description: "Une série de mouvements contrôlés pour entretenir la mobilité des hanches.",
            technique: [
                "Place-toi debout avec un support à proximité.",
                "Garde le buste stable.",
                "Effectue lentement des rotations de hanche.",
                "Change de sens puis de jambe."
            ],
            errors: [
                "Faire des rotations trop rapides.",
                "Perdre l'équilibre.",
                "Forcer une amplitude inconfortable.",
                "Compenser avec le dos."
            ],
            progression: "Augmente progressivement l'amplitude uniquement si le mouvement reste confortable.",
            warning: "Utilise un support stable si ton équilibre est incertain."
        },
        {
            id: 17,
            name: "Relevés de genoux",
            category: "cardio",
            categoryLabel: "Cardio",
            muscle: "cardio",
            muscleLabel: "Cardio",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Aucun",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice cardio simple qui mobilise les jambes et demande une coordination régulière.",
            technique: [
                "Tiens-toi debout, le buste droit.",
                "Lève un genou puis l'autre.",
                "Accompagne le mouvement avec les bras.",
                "Garde un rythme adapté à ton niveau."
            ],
            errors: [
                "Se pencher excessivement en arrière.",
                "Accélérer trop rapidement.",
                "Taper fortement les pieds au sol.",
                "Oublier de respirer."
            ],
            progression: "Commence en marchant sur place, puis augmente légèrement le rythme si tu es à l'aise.",
            warning: "Prévois un espace dégagé et une surface stable."
        },
        {
            id: 18,
            name: "Superman",
            category: "poids",
            categoryLabel: "Poids du corps",
            muscle: "dos",
            muscleLabel: "Dos",
            level: "debutant",
            levelLabel: "Débutant",
            equipment: "Tapis",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
            description: "Un exercice au sol qui sollicite les muscles du dos et demande un mouvement contrôlé.",
            technique: [
                "Allonge-toi sur le ventre, les bras devant toi.",
                "Garde la tête dans le prolongement du dos.",
                "Décolle légèrement un bras et la jambe opposée si c'est confortable.",
                "Repose doucement puis alterne les côtés."
            ],
            errors: [
                "Chercher à monter trop haut.",
                "Casser la nuque vers l'arrière.",
                "Faire des mouvements brusques.",
                "Forcer malgré une gêne lombaire."
            ],
            progression: "Commence par lever un seul membre à la fois et garde une amplitude réduite.",
            warning: "Évite ce mouvement si tu ressens une douleur au dos."
        }
    ];

    let activeCategory = "all";

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, character => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[character]);
    }

    function getFilteredExercises() {
        const search = exerciseSearch
            ? exerciseSearch.value.trim().toLowerCase()
            : "";

        const muscle = muscleFilter ? muscleFilter.value : "all";
        const level = levelFilter ? levelFilter.value : "all";

        return exercises.filter(exercise => {
            const matchesCategory =
                activeCategory === "all" ||
                exercise.category === activeCategory;

            const searchableText = [
                exercise.name,
                exercise.description,
                exercise.muscleLabel,
                exercise.categoryLabel,
                exercise.equipment
            ].join(" ").toLowerCase();

            const matchesSearch = searchableText.includes(search);
            const matchesMuscle = muscle === "all" || exercise.muscle === muscle;
            const matchesLevel = level === "all" || exercise.level === level;

            return matchesCategory &&
                matchesSearch &&
                matchesMuscle &&
                matchesLevel;
        });
    }

    function renderExercises() {
        const filteredExercises = getFilteredExercises();

        exerciseGrid.innerHTML = filteredExercises.map(exercise => `
            <article class="exercise-card">
                <div class="exercise-card-image">
                    <img
                        src="${escapeHTML(exercise.image)}"
                        alt="${escapeHTML(exercise.name)}"
                        loading="lazy"
                    >
                    <span class="exercise-card-category">
                        ${escapeHTML(exercise.categoryLabel)}
                    </span>
                </div>

                <div class="exercise-card-body">
                    <div class="exercise-card-meta">
                        <span>${escapeHTML(exercise.muscleLabel)}</span>
                        <span>${escapeHTML(exercise.levelLabel)}</span>
                    </div>

                    <h3>${escapeHTML(exercise.name)}</h3>

                    <p>${escapeHTML(exercise.description)}</p>

                    <button
                        class="exercise-card-link"
                        type="button"
                        data-exercise-id="${exercise.id}"
                    >
                        Voir la technique
                        <span>→</span>
                    </button>
                </div>
            </article>
        `).join("");

        if (exerciseCount) {
            exerciseCount.textContent =
                `${filteredExercises.length} exercice${filteredExercises.length > 1 ? "s" : ""}`;
        }

        if (emptyMessage) {
            emptyMessage.hidden = filteredExercises.length !== 0;
        }

        exerciseGrid.hidden = filteredExercises.length === 0;
    }

    function openExerciseModal(exerciseId) {
        const exercise = exercises.find(item => item.id === exerciseId);

        if (!exercise || !modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="exercise-detail-cover">
                <img
                    src="${escapeHTML(exercise.image)}"
                    alt="${escapeHTML(exercise.name)}"
                >
            </div>

            <div class="exercise-detail-content">
                <span class="exercise-detail-category">
                    ${escapeHTML(exercise.categoryLabel)} · ${escapeHTML(exercise.levelLabel)}
                </span>

                <h2 class="exercise-detail-title">
                    ${escapeHTML(exercise.name)}
                </h2>

                <p class="exercise-detail-description">
                    ${escapeHTML(exercise.description)}
                </p>

                <div class="exercise-detail-section">
                    <h3>Informations</h3>
                    <p><strong>Muscles :</strong> ${escapeHTML(exercise.muscleLabel)}</p>
                    <p><strong>Matériel :</strong> ${escapeHTML(exercise.equipment)}</p>
                    <p><strong>Niveau :</strong> ${escapeHTML(exercise.levelLabel)}</p>
                </div>

                <div class="exercise-detail-section">
                    <h3>Comment réaliser le mouvement</h3>
                    <ol>
                        ${exercise.technique.map(step => `<li>${escapeHTML(step)}</li>`).join("")}
                    </ol>
                </div>

                <div class="exercise-detail-section">
                    <h3>Les erreurs à éviter</h3>
                    <ul>
                        ${exercise.errors.map(error => `<li>${escapeHTML(error)}</li>`).join("")}
                    </ul>
                </div>

                <div class="exercise-detail-section">
                    <h3>Conseil de progression</h3>
                    <p>${escapeHTML(exercise.progression)}</p>
                </div>

                <div class="exercise-detail-section exercise-detail-warning">
                    <h3>Point sécurité</h3>
                    <p>${escapeHTML(exercise.warning)}</p>
                </div>
            </div>
        `;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeExerciseModal() {
        if (!modal) return;

        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    // Recherche
    if (exerciseSearch) {
        exerciseSearch.addEventListener("input", renderExercises);
    }

    // Filtres
    if (muscleFilter) {
        muscleFilter.addEventListener("change", renderExercises);
    }

    if (levelFilter) {
        levelFilter.addEventListener("change", renderExercises);
    }

    // Catégories
    document.querySelectorAll(".exercise-category").forEach(button => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.category || "all";

            document.querySelectorAll(".exercise-category").forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");
            renderExercises();
        });
    });

    // Réinitialisation
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            activeCategory = "all";

            if (exerciseSearch) exerciseSearch.value = "";
            if (muscleFilter) muscleFilter.value = "all";
            if (levelFilter) levelFilter.value = "all";

            document.querySelectorAll(".exercise-category").forEach(button => {
                button.classList.toggle(
                    "active",
                    button.dataset.category === "all"
                );
            });

            renderExercises();
        });
    }

    // Ouverture d'une fiche
    exerciseGrid.addEventListener("click", event => {
        const button = event.target.closest("[data-exercise-id]");

        if (!button) return;

        openExerciseModal(Number(button.dataset.exerciseId));
    });

    // Fermeture de la fenêtre
    if (modal) {
        modal.querySelectorAll("[data-close-modal]").forEach(element => {
            element.addEventListener("click", closeExerciseModal);
        });
    }

    // Fermeture avec Échap
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeExerciseModal();
        }
    });

    // Affichage initial
    renderExercises();

})();
