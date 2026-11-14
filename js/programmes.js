
/* =========================================
   IRON PULSE - PROGRAMMES 2.0
   Filtres + recherche + fiches détaillées
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".program-item");
    const search = document.getElementById("program-search");
    const count = document.getElementById("result-count");
    const noResults = document.getElementById("no-results");
    const reset = document.getElementById("reset-filters");

    const modal = document.getElementById("program-modal");
    const modalContent = modal.querySelector(".modal-content");
    const closeButton = document.getElementById("modal-close");
    const backdrop = document.getElementById("modal-backdrop");

    let discipline = "all";
    let location = "all";
    let level = "all";
    let searchTerm = "";

    /* =====================================
       BASE DE DONNÉES DES PROGRAMMES
    ===================================== */

    const programs = {

        fondamentaux: {
            title: "Les fondamentaux",
            category: "MUSCULATION",
            image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=1200",
            description: "Découvre les bases du renforcement musculaire et apprends à contrôler les mouvements de ton corps. Cette fiche permet de comprendre les principaux exercices avant de chercher à augmenter leur difficulté.",
            level: "Débutant",
            environment: "Maison",
            objective: "Technique et renforcement général",
            equipment: "Un tapis facultatif et un espace dégagé.",
            muscles: "Selon les mouvements : jambes, fessiers, pectoraux, épaules, bras et muscles du tronc.",
            exercises: [
                {
                    name: "Le squat au poids du corps",
                    target: "Cuisses et fessiers",
                    technique: "Place tes pieds à une largeur confortable. Fléchis les genoux en gardant les pieds au sol et le dos dans une position naturelle. Remonte sans mouvement brusque.",
                    mistakes: "Laisser les genoux s'effondrer vers l'intérieur, perdre l'équilibre ou chercher une amplitude inconfortable."
                },
                {
                    name: "Les pompes adaptées",
                    target: "Pectoraux, triceps et épaules",
                    technique: "Place les mains au sol et garde le corps aligné. Tu peux commencer contre un mur ou sur un support stable pour apprendre le mouvement.",
                    mistakes: "Creuser le dos, écarter excessivement les coudes ou descendre plus bas que ce que tu contrôles."
                },
                {
                    name: "Le gainage",
                    target: "Muscles du tronc",
                    technique: "Installe-toi dans une position stable, en gardant le corps aligné et en respirant normalement.",
                    mistakes: "Bloquer sa respiration ou laisser le bassin s'affaisser."
                }
            ],
            progression: "Commence par maîtriser les positions et les mouvements. Augmente progressivement la difficulté uniquement lorsque la technique reste confortable.",
            recovery: "Laisse suffisamment de temps à ton corps pour récupérer. Le sommeil, les repas réguliers et les jours de repos font partie de la progression.",
            warning: "Adapte les exercices à ton âge et à ton expérience. La technique passe avant la performance."
        },

        force: {
            title: "Force et technique",
            category: "MUSCULATION",
            image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200",
            description: "Découvre les principes de la musculation en salle, le fonctionnement des machines et les grandes familles de mouvements.",
            level: "Intermédiaire",
            environment: "Salle",
            objective: "Technique et force",
            equipment: "Machines guidées et équipements de musculation adaptés.",
            muscles: "Cela dépend de la machine : jambes, dos, pectoraux, épaules et bras.",
            exercises: [
                {
                    name: "Le tirage horizontal",
                    target: "Dos et bras",
                    technique: "Assieds-toi face à la machine, stabilise ton buste et ramène les poignées vers toi sans élan.",
                    mistakes: "Tirer avec tout le corps, arrondir excessivement le dos ou utiliser une charge mal adaptée."
                },
                {
                    name: "La presse à jambes",
                    target: "Cuisses et fessiers",
                    technique: "Place les pieds sur la plateforme, garde le bassin stable et effectue un mouvement contrôlé dans une amplitude confortable.",
                    mistakes: "Verrouiller brutalement les genoux ou décoller le bassin du dossier."
                },
                {
                    name: "Le développé guidé",
                    target: "Pectoraux et triceps",
                    technique: "Règle le siège pour que les poignées soient dans une position adaptée. Effectue le mouvement sans à-coups.",
                    mistakes: "Forcer sur les épaules ou laisser les poignées revenir brutalement."
                }
            ],
            progression: "Apprends d'abord les réglages et les mouvements avec un encadrant. La progression doit rester adaptée à ton expérience.",
            recovery: "Respecte les temps de récupération et évite de solliciter intensément les mêmes muscles sans repos.",
            warning: "Demande à un professionnel de la salle de t'expliquer le réglage des machines. Ne cherche pas à tester tes limites seul."
        },

        course: {
            title: "Course à pied",
            category: "CARDIO",
            image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1200",
            description: "Découvre les bases de la course à pied et apprends à gérer ton effort. L'objectif est de développer ton aisance et ton endurance progressivement.",
            level: "Débutant",
            environment: "Extérieur",
            objective: "Endurance cardiovasculaire",
            equipment: "Chaussures adaptées et vêtements confortables.",
            muscles: "Jambes, fessiers et muscles stabilisateurs du tronc.",
            exercises: [
                {
                    name: "La marche d'échauffement",
                    target: "Ensemble du corps",
                    technique: "Commence par marcher tranquillement afin de préparer progressivement ton organisme à l'effort.",
                    mistakes: "Commencer directement à une allure intense sans préparation."
                },
                {
                    name: "La course à allure confortable",
                    target: "Jambes et système cardiovasculaire",
                    technique: "Cours à une allure qui te permet de garder le contrôle de ta respiration et de tes mouvements.",
                    mistakes: "Partir trop vite ou chercher à suivre le rythme d'une autre personne."
                },
                {
                    name: "Le retour au calme",
                    target: "Récupération générale",
                    technique: "Termine en ralentissant progressivement et en marchant quelques instants.",
                    mistakes: "S'arrêter brutalement après un effort intense."
                }
            ],
            progression: "Augmente progressivement ton aisance. Alterner marche et course est une bonne manière de découvrir cette activité.",
            recovery: "Hydrate-toi normalement, dors suffisamment et prévois des périodes sans course.",
            warning: "Choisis un parcours adapté et arrête-toi en cas de douleur inhabituelle, de vertige ou de malaise."
        },

        training: {
            title: "Training complet",
            category: "CROSS TRAINING",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200",
            description: "Découvre le Cross Training : une approche qui combine plusieurs qualités physiques, comme la coordination, la mobilité, l'endurance et le renforcement.",
            level: "Intermédiaire",
            environment: "Salle",
            objective: "Condition physique générale",
            equipment: "Selon les exercices : tapis, matériel léger et équipements adaptés.",
            muscles: "L'ensemble du corps, selon les mouvements choisis.",
            exercises: [
                {
                    name: "Les mouvements fonctionnels",
                    target: "Plusieurs groupes musculaires",
                    technique: "Apprends à réaliser des mouvements naturels comme pousser, tirer, s'accroupir et se déplacer.",
                    mistakes: "Chercher la vitesse avant de maîtriser les mouvements."
                },
                {
                    name: "La coordination",
                    target: "Muscles stabilisateurs et coordination générale",
                    technique: "Réalise des mouvements simples en contrôlant tes appuis et ton équilibre.",
                    mistakes: "Multiplier les mouvements complexes sans avoir appris les bases."
                },
                {
                    name: "Le travail cardiovasculaire",
                    target: "Système cardiovasculaire",
                    technique: "Découvre différentes activités comme le vélo, la marche rapide ou les déplacements adaptés.",
                    mistakes: "Ignorer les signaux de fatigue ou négliger les pauses."
                }
            ],
            progression: "Apprends chaque famille de mouvements séparément avant de les associer dans une séance.",
            recovery: "La récupération est indispensable. Alterne les sollicitations et les activités plus tranquilles.",
            warning: "Les exercices doivent être adaptés à l'expérience et à l'âge de la personne."
        },

        mobilite: {
            title: "Souplesse et mobilité",
            category: "MOBILITÉ",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200",
            description: "Découvre la mobilité articulaire et la souplesse. Ces notions contribuent au confort des mouvements et à la maîtrise corporelle.",
            level: "Débutant",
            environment: "Maison",
            objective: "Mobilité et aisance",
            equipment: "Un tapis facultatif.",
            muscles: "Muscles des hanches, du dos, des épaules et des jambes.",
            exercises: [
                {
                    name: "Mobilité des épaules",
                    target: "Épaules et haut du dos",
                    technique: "Effectue lentement des mouvements circulaires des épaules, sans forcer.",
                    mistakes: "Effectuer des mouvements brusques ou provoquer une douleur."
                },
                {
                    name: "Mobilité des hanches",
                    target: "Hanches et jambes",
                    technique: "Réalise des mouvements contrôlés des jambes dans une amplitude confortable.",
                    mistakes: "Chercher une amplitude maximale en forçant."
                },
                {
                    name: "Mobilité du dos",
                    target: "Dos et tronc",
                    technique: "Découvre des mouvements doux de flexion et d'extension, en respirant normalement.",
                    mistakes: "Faire des mouvements rapides ou forcer sur la colonne vertébrale."
                }
            ],
            progression: "Privilégie la régularité et la qualité des mouvements plutôt que la recherche d'une souplesse extrême.",
            recovery: "Les mouvements doivent rester confortables. Il n'est pas nécessaire de forcer pour progresser.",
            warning: "La mobilité ne doit jamais provoquer de douleur articulaire."
        },

        maison: {
            title: "Entraînement à domicile",
            category: "RENFORCEMENT",
            image: "https://images.unsplash.com/photo-1599058917212-d750089bc07c?w=1200",
            description: "Découvre comment aménager un espace simple et pratiquer une activité physique chez toi avec peu ou pas de matériel.",
            level: "Débutant",
            environment: "Maison",
            objective: "Renforcement général",
            equipment: "Un espace dégagé et un tapis facultatif.",
            muscles: "Selon les mouvements : jambes, bras, dos, épaules et tronc.",
            exercises: [
                {
                    name: "Squat au poids du corps",
                    target: "Cuisses et fessiers",
                    technique: "Effectue une flexion contrôlée des jambes en gardant les pieds stables.",
                    mistakes: "Perdre l'équilibre ou chercher une amplitude inconfortable."
                },
                {
                    name: "Gainage adapté",
                    target: "Muscles du tronc",
                    technique: "Choisis une variante adaptée à ton niveau et garde une respiration normale.",
                    mistakes: "Bloquer la respiration ou laisser le bassin s'affaisser."
                },
                {
                    name: "Exercices d'équilibre",
                    target: "Jambes et muscles stabilisateurs",
                    technique: "Travaille sur une surface stable avec un appui à proximité si nécessaire.",
                    mistakes: "Pratiquer sur une surface glissante ou instable."
                }
            ],
            progression: "Découvre différentes variantes et choisis celles que tu maîtrises correctement.",
            recovery: "Prévois des pauses et varie les activités.",
            warning: "Vérifie que ton espace est dégagé avant de commencer."
        },

        endurance: {
            title: "Endurance aquatique",
            category: "CARDIO",
            image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200",
            description: "Découvre les bases de la natation et les différentes façons de travailler ta coordination et ton aisance dans l'eau.",
            level: "Intermédiaire",
            environment: "Piscine",
            objective: "Aisance aquatique",
            equipment: "Maillot de bain et matériel de piscine adapté.",
            muscles: "Épaules, dos, bras, jambes et muscles du tronc.",
            exercises: [
                {
                    name: "La brasse",
                    target: "Jambes, bras et coordination",
                    technique: "Apprends à coordonner les mouvements des bras, des jambes et la respiration.",
                    mistakes: "Nager trop vite ou désynchroniser les mouvements."
                },
                {
                    name: "Le crawl",
                    target: "Épaules, bras et jambes",
                    technique: "Découvre progressivement la coordination des bras, des battements de jambes et de la respiration.",
                    mistakes: "Tourner excessivement la tête ou retenir sa respiration."
                },
                {
                    name: "Le travail technique",
                    target: "Coordination générale",
                    technique: "Concentre-toi sur un élément technique à la fois avec un encadrant si nécessaire.",
                    mistakes: "Vouloir travailler plusieurs difficultés simultanément."
                }
            ],
            progression: "La technique et l'aisance aquatique sont prioritaires sur la distance parcourue.",
            recovery: "Sors de l'eau si tu es fatigué et prends le temps de récupérer.",
            warning: "Pratique uniquement dans une piscine surveillée. Ne nage jamais seul."
        },

        debuter: {
            title: "Reprendre le sport",
            category: "REMISE EN FORME",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200",
            description: "Un parcours de découverte pour retrouver progressivement le plaisir de bouger, sans pression de performance.",
            level: "Débutant",
            environment: "Maison ou extérieur",
            objective: "Bien-être et activité physique",
            equipment: "Aucun équipement obligatoire.",
            muscles: "Ensemble du corps selon l'activité choisie.",
            exercises: [
                {
                    name: "La marche",
                    target: "Jambes et système cardiovasculaire",
                    technique: "Choisis une allure confortable et un environnement agréable.",
                    mistakes: "Se fixer un objectif trop ambitieux dès le départ."
                },
                {
                    name: "La mobilité douce",
                    target: "Articulations et muscles",
                    technique: "Découvre des mouvements lents et confortables.",
                    mistakes: "Forcer les articulations."
                },
                {
                    name: "Le renforcement léger",
                    target: "Ensemble du corps",
                    technique: "Découvre quelques mouvements simples adaptés à tes capacités.",
                    mistakes: "Comparer tes performances à celles des autres."
                }
            ],
            progression: "Teste différentes activités et conserve celles qui te plaisent. Il n'y a pas de rythme universel.",
            recovery: "Le repos, le sommeil et une alimentation suffisante font partie de l'activité physique.",
            warning: "Le but est de retrouver une activité agréable, pas de chercher à modifier rapidement son apparence."
        },

        equilibre: {
            title: "Équilibre et contrôle",
            category: "MOBILITÉ",
            image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200",
            description: "Développe ta coordination et découvre des exercices pour mieux contrôler tes mouvements.",
            level: "Intermédiaire",
            environment: "Maison",
            objective: "Coordination et stabilité",
            equipment: "Une surface stable et éventuellement un support.",
            muscles: "Jambes, chevilles et muscles stabilisateurs.",
            exercises: [
                {
                    name: "Équilibre sur un pied",
                    target: "Chevilles et jambes",
                    technique: "Tiens-toi sur un pied près d'un support stable et garde le regard devant toi.",
                    mistakes: "Fermer les yeux ou choisir une surface instable trop tôt."
                },
                {
                    name: "Transfert d'appuis",
                    target: "Jambes et coordination",
                    technique: "Transfère doucement ton poids d'un pied à l'autre.",
                    mistakes: "Effectuer des déplacements brusques."
                },
                {
                    name: "Coordination des mouvements",
                    target: "Ensemble du corps",
                    technique: "Associe progressivement des mouvements simples des bras et des jambes.",
                    mistakes: "Accélérer avant de maîtriser la coordination."
                }
            ],
            progression: "Commence avec des appuis stables et augmente progressivement la difficulté.",
            recovery: "Fais des pauses dès que la concentration ou la stabilité diminuent.",
            warning: "Garde toujours un support à proximité si ton équilibre est incertain."
        },

        crossmaison: {
            title: "Fonctionnel à domicile",
            category: "CROSS TRAINING",
            image: "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200",
            description: "Découvre les mouvements fonctionnels et les principes du Cross Training dans un environnement domestique.",
            level: "Débutant",
            environment: "Maison",
            objective: "Condition physique générale",
            equipment: "Espace dégagé et tapis facultatif.",
            muscles: "Ensemble du corps selon les mouvements.",
            exercises: [
                {
                    name: "Déplacements contrôlés",
                    target: "Jambes et coordination",
                    technique: "Découvre des déplacements simples en gardant le contrôle de tes appuis.",
                    mistakes: "Effectuer des changements de direction trop brusques."
                },
                {
                    name: "Mouvements de poussée",
                    target: "Pectoraux, épaules et bras",
                    technique: "Choisis une variante facile à maîtriser et garde le corps stable.",
                    mistakes: "Compenser avec le dos."
                },
                {
                    name: "Coordination générale",
                    target: "Ensemble du corps",
                    technique: "Associe des mouvements simples des bras et des jambes.",
                    mistakes: "Chercher la vitesse au détriment de la technique."
                }
            ],
            progression: "Apprends chaque mouvement séparément avant de les combiner.",
            recovery: "Respecte les pauses et alterne les sollicitations musculaires.",
            warning: "Prévois un espace dégagé et adapte les exercices à tes capacités."
        },

        hypertrophie: {
            title: "Développement musculaire",
            category: "MUSCULATION",
            image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=1200",
            description: "Une fiche pédagogique sur le développement musculaire : fonctionnement des muscles, entraînement en résistance, récupération et alimentation.",
            level: "Avancé",
            environment: "Salle",
            objective: "Comprendre l'adaptation musculaire",
            equipment: "Matériel de musculation adapté et encadrement.",
            muscles: "Les groupes musculaires sollicités dépendent des mouvements pratiqués.",
            exercises: [
                {
                    name: "Mouvements de poussée",
                    target: "Pectoraux, épaules et triceps",
                    technique: "Apprends à stabiliser ton corps et à contrôler le mouvement.",
                    mistakes: "Utiliser une charge inadaptée ou négliger la technique."
                },
                {
                    name: "Mouvements de tirage",
                    target: "Dos et bras",
                    technique: "Effectue le mouvement sans élan et garde une posture stable.",
                    mistakes: "Tirer avec tout le corps."
                },
                {
                    name: "Mouvements pour les jambes",
                    target: "Cuisses et fessiers",
                    technique: "Découvre les mouvements adaptés à ton expérience avec un encadrement approprié.",
                    mistakes: "Forcer sur les articulations ou négliger l'amplitude confortable."
                }
            ],
            progression: "La progression dépend de nombreux facteurs : expérience, technique, récupération et encadrement.",
            recovery: "Le sommeil et une alimentation variée et suffisante sont essentiels à l'adaptation musculaire.",
            warning: "Cette fiche ne constitue pas un plan de prise de masse. Les adolescents ne doivent pas chercher à forcer une prise de poids ou à utiliser des produits pour modifier leur physique."
        },

        marche: {
            title: "Marche active",
            category: "CARDIO",
            image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200",
            description: "Découvre la marche active, une activité accessible pour entretenir tes capacités physiques et profiter de l'extérieur.",
            level: "Débutant",
            environment: "Extérieur",
            objective: "Activité cardiovasculaire",
            equipment: "Chaussures confortables et vêtements adaptés à la météo.",
            muscles: "Jambes, fessiers et muscles stabilisateurs.",
            exercises: [
                {
                    name: "Marche tranquille",
                    target: "Jambes",
                    technique: "Commence à une allure confortable et laisse ton corps s'habituer au mouvement.",
                    mistakes: "Commencer à une allure trop soutenue."
                },
                {
                    name: "Marche active",
                    target: "Jambes et système cardiovasculaire",
                    technique: "Augmente légèrement l'allure si tu te sens à l'aise et peux toujours parler.",
                    mistakes: "Chercher à maintenir une vitesse qui te met en difficulté."
                },
                {
                    name: "Marche de récupération",
                    target: "Récupération générale",
                    technique: "Ralentis progressivement avant de terminer.",
                    mistakes: "Terminer brutalement après un effort soutenu."
                }
            ],
            progression: "Adapte la durée, le terrain et l'allure à ton expérience.",
            recovery: "Prends le temps de récupérer et choisis des chaussures confortables.",
            warning: "Vérifie la météo, le terrain et la sécurité du parcours."
        }

    };


    /* =====================================
       FILTRES
    ===================================== */

    function filterPrograms() {

        let visible = 0;

        cards.forEach(card => {

            const matchesDiscipline =
                discipline === "all" ||
                card.dataset.discipline === discipline;

            const matchesLocation =
                location === "all" ||
                card.dataset.location === location;

            const matchesLevel =
                level === "all" ||
                card.dataset.level === level;

            const text = card.textContent.toLowerCase();

            const matchesSearch = text.includes(searchTerm);

            const show =
                matchesDiscipline &&
                matchesLocation &&
                matchesLevel &&
                matchesSearch;

            card.classList.toggle("hidden", !show);

            if (show) visible++;

        });

        count.textContent = visible +
            (visible > 1 ? " programmes disponibles" : " programme disponible");

        noResults.hidden = visible !== 0;

    }


    function activateFilter(selector, dataName, callback) {

        document.querySelectorAll(selector).forEach(button => {

            button.addEventListener("click", () => {

                document.querySelectorAll(selector).forEach(item =>
                    item.classList.remove("active")
                );

                button.classList.add("active");

                callback(button.dataset[dataName]);

                filterPrograms();

            });

        });

    }


    activateFilter(
        "#discipline-filters .filter-btn",
        "filter",
        value => discipline = value
    );

    activateFilter(
        "#location-filters .filter-btn",
        "location",
        value => location = value
    );

    activateFilter(
        "#level-filters .filter-btn",
        "level",
        value => level = value
    );


    search.addEventListener("input", () => {

        searchTerm = search.value.trim().toLowerCase();

        filterPrograms();

    });


    reset.addEventListener("click", () => {

        discipline = "all";
        location = "all";
        level = "all";
        searchTerm = "";

        search.value = "";

        document.querySelectorAll(".filter-btn").forEach(button =>
            button.classList.remove("active")
        );

        document.querySelector('[data-filter="all"]').classList.add("active");
        document.querySelector('[data-location="all"]').classList.add("active");
        document.querySelector('[data-level="all"]').classList.add("active");

        filterPrograms();

    });


    /* =====================================
       FICHES DÉTAILLÉES
    ===================================== */

    function openProgram(id) {

        const program = programs[id];

        if (!program) return;

        const exerciseHTML = program.exercises.map((exercise, index) => `
            <article class="detail-exercise">
                <div class="detail-exercise-number">
                    EXERCICE 0${index + 1}
                </div>

                <h4>${exercise.name}</h4>

                <p class="exercise-target">
                    <strong>Muscles / zone :</strong> ${exercise.target}
                </p>

                <p>
                    <strong>Technique :</strong> ${exercise.technique}
                </p>

                <p>
                    <strong>À éviter :</strong> ${exercise.mistakes}
                </p>
            </article>
        `).join("");

        const oldExtra = modalContent.querySelector(".program-extra");

        if (oldExtra) oldExtra.remove();

        const extra = document.createElement("div");

        extra.className = "program-extra";

        extra.innerHTML = `
            <div class="detail-cover">
                <img src="${program.image}" alt="Illustration de ${program.title}">
                <span>${program.category} / IRON PULSE</span>
            </div>

            <div class="detail-summary">
                <div>
                    <span>NIVEAU</span>
                    <strong>${program.level}</strong>
                </div>

                <div>
                    <span>ENVIRONNEMENT</span>
                    <strong>${program.environment}</strong>
                </div>

                <div>
                    <span>OBJECTIF</span>
                    <strong>${program.objective}</strong>
                </div>
            </div>

            <section class="detail-section">
                <span class="detail-label">01 / ÉQUIPEMENT</span>
                <h3>MATÉRIEL NÉCESSAIRE</h3>
                <p>${program.equipment}</p>
            </section>

            <section class="detail-section">
                <span class="detail-label">02 / ANATOMIE</span>
                <h3>MUSCLES SOLLICITÉS</h3>
                <p>${program.muscles}</p>
            </section>

            <section class="detail-section">
                <span class="detail-label">03 / APPRENTISSAGE</span>
                <h3>LES EXERCICES</h3>
                <div class="detail-exercises">
                    ${exerciseHTML}
                </div>
            </section>

            <section class="detail-section">
                <span class="detail-label">04 / PROGRESSION</span>
                <h3>COMMENT PROGRESSER ?</h3>
                <p>${program.progression}</p>
            </section>

            <section class="detail-section">
                <span class="detail-label">05 / RÉCUPÉRATION</span>
                <h3>PRENDRE SOIN DE SON CORPS</h3>
                <p>${program.recovery}</p>
            </section>

            <div class="detail-warning">
                <strong>CONSIGNES IMPORTANTES</strong>
                <p>${program.warning}</p>
            </div>

            <p class="detail-disclaimer">
                IRON PULSE propose des informations générales.
                Cette fiche ne remplace pas l'avis d'un professionnel
                de santé ou d'un éducateur sportif qualifié.
            </p>
        `;

        modalContent.appendChild(extra);

        document.getElementById("modal-category").textContent = program.category;
        document.getElementById("modal-title").textContent = program.title;
        document.getElementById("modal-description").textContent = program.description;

        document.getElementById("modal-location").textContent = program.environment;
        document.getElementById("modal-level").textContent = program.level;
        document.getElementById("modal-objective").textContent = program.objective;

        document.getElementById("modal-exercises").innerHTML = "";

        modalContent.querySelector("h3").hidden = true;
        document.getElementById("modal-exercises").hidden = true;
        document.getElementById("modal-warning").hidden = true;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton.focus();

    }


    function closeModal() {

        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

    }


    document.querySelectorAll(".details-btn").forEach(button => {

        button.addEventListener("click", () => {
            openProgram(button.dataset.program);
        });

    });


    closeButton.addEventListener("click", closeModal);
    backdrop.addEventListener("click", closeModal);


    document.addEventListener("keydown", event => {

        if (event.key === "Escape" && modal.classList.contains("active")) {
            closeModal();
        }

    });


    /* =====================================
       LIENS DES OBJECTIFS
    ===================================== */

    document.querySelectorAll("[data-objective]").forEach(link => {

        link.addEventListener("click", () => {

            discipline = link.dataset.objective;

            document.querySelectorAll("#discipline-filters .filter-btn")
                .forEach(button => {

                    button.classList.toggle(
                        "active",
                        button.dataset.filter === discipline
                    );

                });

            filterPrograms();

        });

    });


    /* =====================================
       INITIALISATION
    ===================================== */

    filterPrograms();

    console.log("IRON PULSE - Programmes 2.0 chargé.");

});
