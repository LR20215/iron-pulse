/* =====================================================
   IRON PULSE — NUTRITION
   Bibliothèque : 75 recettes exactement
===================================================== */

(() => {
    "use strict";

    const grid = document.getElementById("recipe-grid");
    const search = document.getElementById("recipe-search");
    const category = document.getElementById("recipe-category");
    const reset = document.getElementById("recipe-reset");
    const count = document.getElementById("recipe-count");
    const empty = document.getElementById("recipe-empty");
    const modal = document.getElementById("recipe-modal");
    const modalBody = document.getElementById("recipe-modal-body");

    if (!grid || !search || !category || !reset || !count || !empty || !modal || !modalBody) {
        console.warn("IRON PULSE Nutrition : éléments du catalogue absents du HTML.");
        return;
    }

    const categoryOrder = [
        "petit-dejeuner",
        "dejeuner",
        "diner",
        "collation",
        "vegetarien"
    ];

    const categoryNames = {
        "petit-dejeuner": "Petit-déjeuner",
        "dejeuner": "Déjeuner",
        "diner": "Dîner",
        "collation": "Collation",
        "vegetarien": "Végétarien"
    };

    const recipes = [
        // PETIT-DÉJEUNER — 15 RECETTES
        {
            name: "Pancakes à la banane", category: "petit-dejeuner", time: "15 min", difficulty: "Facile",
            image: "photo-1528207776546-365bb710ee93",
            description: "Des pancakes moelleux naturellement parfumés à la banane.",
            ingredients: ["1 banane mûre", "2 œufs", "100 g de farine", "100 ml de lait", "1 cuillère à café de levure"],
            steps: ["Écrase la banane dans un saladier.", "Ajoute les œufs et le lait.", "Incorpore la farine et la levure.", "Fais cuire de petites portions dans une poêle légèrement huilée."]
        },
        {
            name: "Porridge aux pommes", category: "petit-dejeuner", time: "10 min", difficulty: "Facile",
            image: "photo-1517673132405-a56a62b18caf",
            description: "Un bol chaud et réconfortant à la cannelle.",
            ingredients: ["50 g de flocons d'avoine", "200 ml de lait", "1 pomme", "Cannelle", "Quelques noix"],
            steps: ["Verse les flocons et le lait dans une casserole.", "Fais chauffer doucement en remuant.", "Coupe la pomme en morceaux.", "Ajoute la pomme, les noix et la cannelle."]
        },
        {
            name: "Tartines avocat et œuf", category: "petit-dejeuner", time: "10 min", difficulty: "Facile",
            image: "photo-1525351484163-7529414344d8",
            description: "Des tartines salées avec avocat et œufs.",
            ingredients: ["2 tranches de pain", "1 avocat", "2 œufs", "Jus de citron", "Poivre"],
            steps: ["Fais griller le pain.", "Écrase l'avocat avec quelques gouttes de citron.", "Prépare les œufs selon ta préférence.", "Dispose le tout sur les tartines."]
        },
        {
            name: "Yaourt et granola maison", category: "petit-dejeuner", time: "5 min", difficulty: "Facile",
            image: "photo-1488477181946-6428a0291777",
            description: "Une association simple de yaourt, fruits et céréales.",
            ingredients: ["1 yaourt nature", "40 g de granola", "1 fruit de saison", "Quelques amandes"],
            steps: ["Verse le yaourt dans un bol.", "Ajoute le granola.", "Découpe le fruit.", "Termine avec les amandes."]
        },
        {
            name: "Omelette aux légumes", category: "petit-dejeuner", time: "12 min", difficulty: "Facile",
            image: "photo-1525351484163-7529414344d8",
            description: "Une omelette colorée et facile à personnaliser.",
            ingredients: ["2 œufs", "1 tomate", "Quelques champignons", "Un peu de fromage", "Herbes aromatiques"],
            steps: ["Découpe les légumes.", "Fais-les revenir quelques minutes.", "Bats les œufs.", "Verse-les dans la poêle et ajoute le fromage."]
        },
        {
            name: "Bol de fromage blanc et poire", category: "petit-dejeuner", time: "5 min", difficulty: "Facile",
            image: "photo-1490645935967-10de6ba17061",
            description: "Un bol frais accompagné de fruits et de céréales.",
            ingredients: ["150 g de fromage blanc", "1 poire", "30 g de flocons d'avoine", "Quelques noisettes", "Un peu de miel"],
            steps: ["Verse le fromage blanc dans un bol.", "Ajoute les flocons.", "Découpe la poire.", "Ajoute les noisettes et le miel."]
        },
        {
            name: "French toast à la cannelle", category: "petit-dejeuner", time: "15 min", difficulty: "Facile",
            image: "photo-1525351484163-7529414344d8",
            description: "Du pain perdu moelleux avec une touche de cannelle.",
            ingredients: ["2 tranches de pain", "1 œuf", "100 ml de lait", "Cannelle", "Un peu de miel"],
            steps: ["Bats l'œuf avec le lait et la cannelle.", "Trempe les tranches de pain dans le mélange.", "Fais-les dorer dans une poêle.", "Sers avec un peu de miel."]
        },
        {
            name: "Muesli aux fruits rouges", category: "petit-dejeuner", time: "5 min", difficulty: "Facile",
            image: "photo-1490645935967-10de6ba17061",
            description: "Un bol frais et fruité avec du muesli.",
            ingredients: ["50 g de muesli", "1 yaourt nature", "Fruits rouges", "Quelques amandes"],
            steps: ["Verse le yaourt dans un bol.", "Ajoute le muesli.", "Dispose les fruits rouges.", "Ajoute les amandes."]
        },
        {
            name: "Pudding de chia à la mangue", category: "petit-dejeuner", time: "5 min + repos", difficulty: "Facile",
            image: "photo-1488477181946-6428a0291777",
            description: "Une préparation fraîche à préparer la veille.",
            ingredients: ["200 ml de lait", "2 cuillères à soupe de graines de chia", "1/2 mangue", "Un peu de vanille"],
            steps: ["Mélange les graines de chia et le lait.", "Remue après quelques minutes.", "Place au réfrigérateur pendant quelques heures.", "Ajoute la mangue coupée avant de servir."]
        },
        {
            name: "Bagel au fromage frais", category: "petit-dejeuner", time: "10 min", difficulty: "Facile",
            image: "photo-1555507036-ab1f4038808a",
            description: "Un bagel garni de fromage frais et de légumes.",
            ingredients: ["1 bagel", "Fromage frais", "Concombre", "Tomate", "Ciboulette"],
            steps: ["Coupe le bagel en deux.", "Fais-le légèrement griller.", "Tartine le fromage frais.", "Ajoute les légumes et la ciboulette."]
        },
        {
            name: "Gaufres maison", category: "petit-dejeuner", time: "20 min", difficulty: "Moyen",
            image: "photo-1484723091739-30a097e8f929",
            description: "Des gaufres dorées à accompagner de fruits.",
            ingredients: ["150 g de farine", "1 œuf", "150 ml de lait", "1 cuillère à café de levure", "Un peu de sucre"],
            steps: ["Mélange la farine et la levure.", "Ajoute l'œuf et le lait.", "Fouette jusqu'à obtenir une pâte homogène.", "Fais cuire dans un gaufrier chaud."]
        },
        {
            name: "Semoule au lait vanillée", category: "petit-dejeuner", time: "12 min", difficulty: "Facile",
            image: "photo-1490645935967-10de6ba17061",
            description: "Une recette douce et réconfortante.",
            ingredients: ["40 g de semoule fine", "250 ml de lait", "Vanille", "1 pomme", "Cannelle"],
            steps: ["Fais chauffer le lait avec la vanille.", "Verse la semoule en remuant.", "Laisse épaissir quelques minutes.", "Ajoute la pomme coupée et la cannelle."]
        },
        {
            name: "Toast ricotta et miel", category: "petit-dejeuner", time: "5 min", difficulty: "Facile",
            image: "photo-1525351484163-7529414344d8",
            description: "Une tartine douce avec de la ricotta.",
            ingredients: ["2 tranches de pain", "Ricotta", "Miel", "Quelques noix", "Fruits frais"],
            steps: ["Fais griller le pain.", "Étale la ricotta.", "Ajoute un filet de miel.", "Termine avec les noix et les fruits."]
        },
        {
            name: "Pancakes aux myrtilles", category: "petit-dejeuner", time: "15 min", difficulty: "Facile",
            image: "photo-1528207776546-365bb710ee93",
            description: "Des pancakes garnis de myrtilles.",
            ingredients: ["100 g de farine", "1 œuf", "100 ml de lait", "Myrtilles", "Levure"],
            steps: ["Mélange la farine et la levure.", "Ajoute l'œuf et le lait.", "Incorpore les myrtilles.", "Fais cuire les pancakes dans une poêle."]
        },
        {
            name: "Sandwich déjeuner à l'œuf", category: "petit-dejeuner", time: "12 min", difficulty: "Facile",
            image: "photo-1525351484163-7529414344d8",
            description: "Un sandwich salé facile à préparer.",
            ingredients: ["2 tranches de pain", "1 œuf", "1 tranche de fromage", "Salade", "Tomate"],
            steps: ["Fais cuire l'œuf.", "Fais griller le pain.", "Ajoute le fromage et les légumes.", "Referme le sandwich et sers chaud."]
        },

        // DÉJEUNER — 15 RECETTES
        {
            name: "Poulet et riz aux légumes", category: "dejeuner", time: "30 min", difficulty: "Facile",
            image: "photo-1512058564366-18510be2db19",
            description: "Un plat facile à adapter selon les légumes disponibles.",
            ingredients: ["120 g de poulet", "100 g de riz cru", "1 courgette", "1 carotte", "Huile d'olive", "Épices"],
            steps: ["Fais cuire le riz.", "Découpe les légumes et le poulet.", "Fais cuire le poulet à cœur dans une poêle.", "Ajoute les légumes et sers avec le riz."]
        },
        {
            name: "Pâtes à la tomate", category: "dejeuner", time: "20 min", difficulty: "Facile",
            image: "photo-1473093295043-cdd812d0e601",
            description: "Un classique avec une sauce tomate parfumée.",
            ingredients: ["120 g de pâtes", "2 tomates", "1 gousse d'ail", "Basilic", "Parmesan"],
            steps: ["Fais cuire les pâtes.", "Coupe les tomates.", "Fais revenir l'ail puis ajoute les tomates.", "Mélange avec les pâtes et le basilic."]
        },
        {
            name: "Wrap au poulet", category: "dejeuner", time: "15 min", difficulty: "Facile",
            image: "photo-1626700051175-6818013e1d4f",
            description: "Un wrap pratique à emporter.",
            ingredients: ["1 tortilla", "100 g de poulet cuit", "Salade", "Tomate", "Yaourt nature", "Citron"],
            steps: ["Prépare une sauce avec le yaourt et le citron.", "Découpe le poulet et les légumes.", "Garnis la tortilla.", "Roule le wrap et coupe-le en deux."]
        },
        {
            name: "Bowl de quinoa", category: "dejeuner", time: "25 min", difficulty: "Facile",
            image: "photo-1512621776951-a57141f2eefd",
            description: "Un bowl coloré avec céréales et légumes.",
            ingredients: ["100 g de quinoa", "1 concombre", "1 tomate", "Pois chiches", "Feta", "Citron"],
            steps: ["Rince et fais cuire le quinoa.", "Coupe les légumes.", "Rince les pois chiches.", "Assemble le tout avec la feta et le citron."]
        },
        {
            name: "Riz sauté aux œufs", category: "dejeuner", time: "15 min", difficulty: "Facile",
            image: "photo-1603133872878-684f208fb84b",
            description: "Une recette pratique pour utiliser du riz déjà cuit.",
            ingredients: ["200 g de riz cuit", "2 œufs", "Petits pois", "Carotte", "Sauce soja"],
            steps: ["Découpe la carotte.", "Fais revenir les légumes.", "Ajoute le riz.", "Incorpore les œufs battus et mélange jusqu'à cuisson complète."]
        },
        {
            name: "Salade de lentilles", category: "dejeuner", time: "20 min", difficulty: "Facile",
            image: "photo-1512621776951-a57141f2eefd",
            description: "Une salade de lentilles pleine de saveurs.",
            ingredients: ["150 g de lentilles cuites", "1 tomate", "1 carotte", "Persil", "Vinaigrette"],
            steps: ["Rince les lentilles si nécessaire.", "Coupe les légumes.", "Mélange les ingrédients.", "Ajoute le persil et la vinaigrette."]
        },
        {
            name: "Poulet sauce moutarde", category: "dejeuner", time: "25 min", difficulty: "Facile",
            image: "photo-1532550907401-a500c9a57435",
            description: "Du poulet accompagné d'une sauce crémeuse à la moutarde.",
            ingredients: ["2 filets de poulet", "1 cuillère de moutarde", "Crème", "Riz", "Haricots verts"],
            steps: ["Fais cuire le riz.", "Découpe et cuis le poulet à cœur.", "Ajoute la moutarde et la crème.", "Sers avec les haricots verts."]
        },
        {
            name: "Salade de pâtes au thon", category: "dejeuner", time: "20 min", difficulty: "Facile",
            image: "photo-1473093295043-cdd812d0e601",
            description: "Une salade pratique à préparer à l'avance.",
            ingredients: ["Pâtes", "Thon", "Tomates cerises", "Maïs", "Concombre", "Vinaigrette"],
            steps: ["Fais cuire les pâtes puis laisse-les refroidir.", "Égoutte le thon.", "Coupe les légumes.", "Mélange le tout avec la vinaigrette."]
        },
        {
            name: "Burrito au poulet", category: "dejeuner", time: "20 min", difficulty: "Facile",
            image: "photo-1626700051175-6818013e1d4f",
            description: "Un burrito généreusement garni.",
            ingredients: ["1 grande tortilla", "Poulet cuit", "Riz", "Haricots rouges", "Tomate", "Fromage"],
            steps: ["Prépare le riz.", "Découpe le poulet et la tomate.", "Garnis la tortilla avec tous les ingrédients.", "Replie les côtés et roule le burrito."]
        },
        {
            name: "Boulettes de bœuf et semoule", category: "dejeuner", time: "30 min", difficulty: "Moyen",
            image: "photo-1547592180-85f173990554",
            description: "Des boulettes accompagnées de semoule et de légumes.",
            ingredients: ["Bœuf haché", "Semoule", "Courgette", "Tomates", "Cumin"],
            steps: ["Forme les boulettes avec la viande et les épices.", "Fais-les cuire complètement à la poêle.", "Prépare la semoule.", "Fais revenir les légumes et assemble le plat."]
        },
        {
            name: "Poulet teriyaki maison", category: "dejeuner", time: "25 min", difficulty: "Facile",
            image: "photo-1512058564366-18510be2db19",
            description: "Un plat inspiré de la cuisine japonaise.",
            ingredients: ["Poulet", "Riz", "Sauce soja", "Miel", "Brocoli", "Graines de sésame"],
            steps: ["Fais cuire le riz.", "Découpe le poulet et cuis-le à cœur.", "Ajoute la sauce soja et le miel.", "Sers avec le brocoli et le sésame."]
        },
        {
            name: "Pita au thon", category: "dejeuner", time: "10 min", difficulty: "Facile",
            image: "photo-1626700051175-6818013e1d4f",
            description: "Un pain pita garni de thon et de crudités.",
            ingredients: ["1 pain pita", "Thon", "Yaourt nature", "Salade", "Concombre", "Citron"],
            steps: ["Mélange le thon avec le yaourt et le citron.", "Coupe les légumes.", "Ouvre le pain pita.", "Garnis-le et sers immédiatement."]
        },
        {
            name: "Lasagnes au poulet", category: "dejeuner", time: "45 min", difficulty: "Moyen",
            image: "photo-1473093295043-cdd812d0e601",
            description: "Des lasagnes fondantes au poulet et à la tomate.",
            ingredients: ["Feuilles de lasagnes", "Poulet cuit", "Sauce tomate", "Béchamel", "Fromage râpé"],
            steps: ["Préchauffe le four.", "Prépare la garniture au poulet et à la tomate.", "Alterne les couches de pâtes, garniture et béchamel.", "Ajoute le fromage et fais cuire au four."]
        },
        {
            name: "Bowl de riz au saumon", category: "dejeuner", time: "25 min", difficulty: "Facile",
            image: "photo-1467003909585-2f8a72700288",
            description: "Un bol composé de riz, saumon et légumes.",
            ingredients: ["Riz", "Saumon bien cuit", "Avocat", "Concombre", "Sauce soja"],
            steps: ["Fais cuire le riz.", "Fais cuire le saumon à cœur.", "Découpe les légumes.", "Dispose les ingrédients dans un bol et ajoute la sauce."]
        },
        {
            name: "Croque-monsieur maison", category: "dejeuner", time: "15 min", difficulty: "Facile",
            image: "photo-1525351484163-7529414344d8",
            description: "Un classique chaud au jambon et au fromage.",
            ingredients: ["4 tranches de pain", "Jambon", "Fromage", "Un peu de beurre", "Salade"],
            steps: ["Garnis le pain avec le jambon et le fromage.", "Referme les sandwichs.", "Fais-les dorer à la poêle ou au four.", "Sers avec une salade."]
        },

                // DÎNER — 15 RECETTES
        {
            name: "Saumon et pommes de terre", category: "diner", time: "30 min", difficulty: "Facile",
            image: "photo-1467003909585-2f8a72700288",
            description: "Un plat de poisson accompagné de pommes de terre.",
            ingredients: ["1 pavé de saumon", "2 pommes de terre", "Haricots verts", "Citron", "Herbes"],
            steps: ["Fais cuire les pommes de terre.", "Prépare les haricots verts.", "Fais cuire le saumon à cœur.", "Ajoute le citron et les herbes."]
        },
        {
            name: "Poulet au four", category: "diner", time: "40 min", difficulty: "Facile",
            image: "photo-1532550907401-a500c9a57435",
            description: "Du poulet accompagné de légumes rôtis.",
            ingredients: ["2 filets de poulet", "1 courgette", "2 carottes", "Huile d'olive", "Thym"],
            steps: ["Préchauffe le four.", "Découpe les légumes.", "Dispose le poulet et les légumes dans un plat.", "Fais cuire jusqu'à ce que le poulet soit bien cuit à cœur."]
        },
        {
            name: "Soupe de légumes", category: "diner", time: "35 min", difficulty: "Facile",
            image: "photo-1547592180-85f173990554",
            description: "Une soupe réconfortante avec des légumes de saison.",
            ingredients: ["2 carottes", "1 poireau", "2 pommes de terre", "1 oignon", "Bouillon"],
            steps: ["Lave et coupe les légumes.", "Fais revenir l'oignon.", "Ajoute les légumes et le bouillon.", "Laisse cuire puis mixe selon la texture souhaitée."]
        },
        {
            name: "Poisson et riz citronné", category: "diner", time: "25 min", difficulty: "Facile",
            image: "photo-1519708227418-c8fd9a32b7a2",
            description: "Du poisson accompagné de riz et de brocoli.",
            ingredients: ["1 filet de poisson", "100 g de riz cru", "1 citron", "Brocoli", "Herbes"],
            steps: ["Fais cuire le riz.", "Prépare le brocoli.", "Fais cuire le poisson à cœur.", "Ajoute le citron et les herbes."]
        },
        {
            name: "Poulet au curry doux", category: "diner", time: "25 min", difficulty: "Facile",
            image: "photo-1512058564366-18510be2db19",
            description: "Un curry doux accompagné de riz.",
            ingredients: ["Poulet", "Riz", "Lait de coco", "Curry doux", "Oignon"],
            steps: ["Fais cuire le riz.", "Fais revenir l'oignon.", "Ajoute le poulet et cuis-le à cœur.", "Ajoute le lait de coco et le curry puis laisse mijoter."]
        },
        {
            name: "Cabillaud en papillote", category: "diner", time: "25 min", difficulty: "Facile",
            image: "photo-1519708227418-c8fd9a32b7a2",
            description: "Du poisson cuit au four avec des légumes.",
            ingredients: ["1 filet de cabillaud", "Courgette", "Tomate", "Citron", "Herbes"],
            steps: ["Préchauffe le four.", "Place le poisson et les légumes sur du papier cuisson.", "Ajoute le citron et les herbes.", "Referme la papillote et fais cuire jusqu'à ce que le poisson soit cuit."]
        },
        {
            name: "Gratin de pâtes au jambon", category: "diner", time: "30 min", difficulty: "Facile",
            image: "photo-1473093295043-cdd812d0e601",
            description: "Un gratin familial facile à préparer.",
            ingredients: ["Pâtes", "Jambon", "Crème", "Fromage râpé", "Poivre"],
            steps: ["Fais cuire les pâtes.", "Découpe le jambon.", "Mélange les pâtes avec la crème et le jambon.", "Ajoute le fromage et fais gratiner au four."]
        },
        {
            name: "Boulettes de dinde et légumes", category: "diner", time: "30 min", difficulty: "Moyen",
            image: "photo-1532550907401-a500c9a57435",
            description: "Des boulettes de dinde servies avec des légumes.",
            ingredients: ["Dinde hachée", "Carotte", "Courgette", "Semoule", "Herbes"],
            steps: ["Forme les boulettes avec la dinde et les herbes.", "Fais-les cuire complètement.", "Prépare la semoule.", "Fais cuire les légumes et sers ensemble."]
        },
        {
            name: "Risotto aux champignons", category: "diner", time: "35 min", difficulty: "Moyen",
            image: "photo-1476124369491-e7addf5db371",
            description: "Un risotto crémeux aux champignons.",
            ingredients: ["Riz à risotto", "Champignons", "Bouillon", "Parmesan", "Oignon"],
            steps: ["Fais revenir l'oignon et les champignons.", "Ajoute le riz.", "Verse le bouillon progressivement en remuant.", "Termine avec le parmesan."]
        },
        {
            name: "Tacos de poisson", category: "diner", time: "25 min", difficulty: "Facile",
            image: "photo-1519708227418-c8fd9a32b7a2",
            description: "Des tortillas garnies de poisson et de crudités.",
            ingredients: ["Filets de poisson", "Petites tortillas", "Chou rouge", "Yaourt", "Citron"],
            steps: ["Fais cuire le poisson à cœur.", "Émince le chou rouge.", "Prépare une sauce au yaourt et au citron.", "Garnis les tortillas."]
        },
        {
            name: "Soupe de lentilles corail", category: "diner", time: "30 min", difficulty: "Facile",
            image: "photo-1547592180-85f173990554",
            description: "Une soupe onctueuse aux lentilles corail.",
            ingredients: ["Lentilles corail", "Carotte", "Tomate", "Oignon", "Bouillon"],
            steps: ["Rince les lentilles.", "Fais revenir l'oignon et la carotte.", "Ajoute les lentilles, la tomate et le bouillon.", "Laisse cuire puis mixe si tu souhaites une soupe veloutée."]
        },
        {
            name: "Poulet citron et thym", category: "diner", time: "30 min", difficulty: "Facile",
            image: "photo-1532550907401-a500c9a57435",
            description: "Du poulet parfumé au citron et au thym.",
            ingredients: ["Filets de poulet", "Citron", "Thym", "Pommes de terre", "Huile d'olive"],
            steps: ["Préchauffe le four.", "Dispose le poulet et les pommes de terre dans un plat.", "Ajoute le citron, le thym et l'huile.", "Fais cuire jusqu'à cuisson complète du poulet."]
        },
        {
            name: "Poêlée de crevettes et riz", category: "diner", time: "20 min", difficulty: "Facile",
            image: "photo-1512058564366-18510be2db19",
            description: "Une poêlée parfumée aux crevettes.",
            ingredients: ["Crevettes décortiquées", "Riz", "Poivron", "Ail", "Citron"],
            steps: ["Fais cuire le riz.", "Découpe le poivron.", "Fais cuire les crevettes jusqu'à ce qu'elles soient bien chaudes.", "Ajoute le poivron et le citron puis sers avec le riz."]
        },
        {
            name: "Hachis parmentier maison", category: "diner", time: "45 min", difficulty: "Moyen",
            image: "photo-1547592180-85f173990554",
            description: "Un plat traditionnel avec une purée maison.",
            ingredients: ["Bœuf haché", "Pommes de terre", "Lait", "Beurre", "Oignon"],
            steps: ["Fais cuire les pommes de terre puis écrase-les avec le lait et le beurre.", "Fais revenir l'oignon.", "Ajoute la viande et cuis-la complètement.", "Dispose dans un plat, recouvre de purée et fais gratiner."]
        },
        {
            name: "Pâtes au saumon et citron", category: "diner", time: "25 min", difficulty: "Facile",
            image: "photo-1473093295043-cdd812d0e601",
            description: "Des pâtes accompagnées d'une sauce citronnée.",
            ingredients: ["Pâtes", "Saumon", "Crème", "Citron", "Aneth"],
            steps: ["Fais cuire les pâtes.", "Fais cuire le saumon à cœur.", "Prépare la sauce avec la crème et le citron.", "Mélange avec les pâtes et ajoute l'aneth."]
        },

        // COLLATION — 15 RECETTES
        {
            name: "Houmous maison", category: "collation", time: "10 min", difficulty: "Facile",
            image: "photo-1547592180-85f173990554",
            description: "Une préparation à base de pois chiches à partager.",
            ingredients: ["200 g de pois chiches cuits", "Tahini", "Citron", "Ail", "Huile d'olive"],
            steps: ["Rince les pois chiches.", "Place tous les ingrédients dans un mixeur.", "Mixe jusqu'à obtenir une texture crémeuse.", "Ajuste le citron et l'assaisonnement."]
        },
        {
            name: "Smoothie banane-fraise", category: "collation", time: "5 min", difficulty: "Facile",
            image: "photo-1505252585461-04db1eb84625",
            description: "Une boisson fruitée à préparer rapidement.",
            ingredients: ["1 banane", "100 g de fraises", "150 ml de lait", "Yaourt nature"],
            steps: ["Lave les fraises.", "Épluche la banane.", "Place les ingrédients dans un blender.", "Mixe jusqu'à obtenir une texture homogène."]
        },
        {
            name: "Energy balls aux dattes", category: "collation", time: "15 min", difficulty: "Facile",
            image: "photo-1490645935967-10de6ba17061",
            description: "De petites bouchées maison à base de fruits secs.",
            ingredients: ["100 g de dattes dénoyautées", "50 g de flocons d'avoine", "30 g de noix", "Cacao non sucré"],
            steps: ["Mixe les dattes et les noix.", "Ajoute les flocons d'avoine.", "Forme de petites boules.", "Roules-les dans le cacao et place-les au frais."]
        },
        {
            name: "Muffins à la pomme", category: "collation", time: "30 min", difficulty: "Facile",
            image: "photo-1517433670267-08bbd4be890f",
            description: "Des muffins maison aux morceaux de pomme.",
            ingredients: ["1 pomme", "150 g de farine", "1 œuf", "100 ml de lait", "Levure", "Cannelle"],
            steps: ["Préchauffe le four.", "Mélange la farine et la levure.", "Ajoute l'œuf et le lait.", "Incorpore la pomme et fais cuire jusqu'à ce que les muffins soient cuits."]
        },
        {
            name: "Tartines de houmous", category: "collation", time: "5 min", difficulty: "Facile",
            image: "photo-1525351484163-7529414344d8",
            description: "Une collation salée simple à composer.",
            ingredients: ["2 tranches de pain", "Houmous", "Concombre", "Graines de sésame"],
            steps: ["Fais griller le pain si tu le souhaites.", "Étale le houmous.", "Ajoute le concombre en rondelles.", "Termine avec quelques graines."]
        },
        {
            name: "Salade de fruits", category: "collation", time: "10 min", difficulty: "Facile",
            image: "photo-1490474418585-ba9bad8fd0ea",
            description: "Un mélange de fruits frais selon la saison.",
            ingredients: ["1 pomme", "1 orange", "1 kiwi", "Quelques raisins", "Jus de citron"],
            steps: ["Lave et épluche les fruits si nécessaire.", "Coupe-les en morceaux.", "Mélange dans un saladier.", "Ajoute un peu de jus de citron."]
        },
        {
            name: "Bowl de yaourt et fruits", category: "collation", time: "5 min", difficulty: "Facile",
            image: "photo-1488477181946-6428a0291777",
            description: "Un bol frais avec des fruits et des céréales.",
            ingredients: ["1 yaourt", "1 banane", "Fruits rouges", "Granola"],
            steps: ["Verse le yaourt dans un bol.", "Ajoute les fruits coupés.", "Ajoute le granola.", "Mélange selon tes envies."]
        },
        {
            name: "Cookies aux flocons d'avoine", category: "collation", time: "25 min", difficulty: "Facile",
            image: "photo-1499636136210-6f4ee915583e",
            description: "Des cookies maison avec une texture légèrement croustillante.",
            ingredients: ["100 g de flocons d'avoine", "1 œuf", "1 banane", "Pépites de chocolat"],
            steps: ["Préchauffe le four.", "Écrase la banane.", "Mélange avec l'œuf, les flocons et les pépites.", "Forme les cookies et fais cuire jusqu'à ce qu'ils soient dorés."]
        },
        {
            name: "Compote pomme-poire", category: "collation", time: "20 min", difficulty: "Facile",
            image: "photo-1490474418585-ba9bad8fd0ea",
            description: "Une compote maison parfumée à la cannelle.",
            ingredients: ["2 pommes", "2 poires", "Un peu d'eau", "Cannelle"],
            steps: ["Épluche et coupe les fruits.", "Place-les dans une casserole avec un peu d'eau.", "Laisse cuire à feu doux.", "Écrase les fruits et ajoute la cannelle."]
        },
        {
            name: "Mini sandwich au fromage", category: "collation", time: "5 min", difficulty: "Facile",
            image: "photo-1525351484163-7529414344d8",
            description: "Un petit sandwich salé facile à emporter.",
            ingredients: ["Pain", "Fromage", "Tomate", "Salade"],
            steps: ["Coupe le pain en deux.", "Ajoute le fromage.", "Ajoute la tomate et la salade.", "Referme le sandwich."]
        },
        {
            name: "Muffins à la banane", category: "collation", time: "30 min", difficulty: "Facile",
            image: "photo-1517433670267-08bbd4be890f",
            description: "Des muffins moelleux à la banane.",
            ingredients: ["2 bananes", "150 g de farine", "1 œuf", "Levure", "100 ml de lait"],
            steps: ["Préchauffe le four.", "Écrase les bananes.", "Mélange avec l'œuf, le lait, la farine et la levure.", "Répartis dans des moules et fais cuire."]
        },
        {
            name: "Pop-corn maison", category: "collation", time: "8 min", difficulty: "Facile",
            image: "photo-1578849278619-e73505e9610f",
            description: "Du pop-corn préparé à la casserole pour une pause cinéma.",
            ingredients: ["Maïs à éclater", "Un peu d'huile", "Une pincée de sel ou de cannelle"],
            steps: ["Verse un peu d'huile dans une casserole avec couvercle.", "Ajoute le maïs en une couche.", "Fais chauffer en secouant régulièrement la casserole.", "Retire du feu lorsque les éclatements deviennent rares."]
        },
        {
            name: "Trempette au yaourt et crudités", category: "collation", time: "10 min", difficulty: "Facile",
            image: "photo-1547592180-85f173990554",
            description: "Une sauce fraîche à accompagner de légumes croquants.",
            ingredients: ["1 yaourt nature", "Concombre", "Carotte", "Jus de citron", "Ciboulette"],
            steps: ["Mélange le yaourt avec le citron et la ciboulette.", "Lave les légumes.", "Coupe-les en bâtonnets.", "Sers les crudités avec la sauce."]
        },
        {
            name: "Crumble aux pommes", category: "collation", time: "35 min", difficulty: "Facile",
            image: "photo-1509440159596-0249088772ff",
            description: "Un dessert maison aux pommes et à la pâte croustillante.",
            ingredients: ["3 pommes", "80 g de farine", "50 g de beurre", "50 g de flocons d'avoine", "Cannelle"],
            steps: ["Préchauffe le four.", "Coupe les pommes et place-les dans un plat.", "Mélange farine, beurre et flocons.", "Répartis sur les pommes et fais cuire jusqu'à obtenir une belle couleur dorée."]
        },
        {
            name: "Brochettes de fruits et chocolat", category: "collation", time: "10 min", difficulty: "Facile",
            image: "photo-1490474418585-ba9bad8fd0ea",
            description: "Des morceaux de fruits avec un filet de chocolat fondu.",
            ingredients: ["Fraises", "Banane", "Raisin", "Quelques carrés de chocolat"],
            steps: ["Lave et prépare les fruits.", "Coupe la banane en rondelles.", "Pique les fruits sur de petites brochettes.", "Fais fondre le chocolat et verse-le délicatement dessus."]
        },

                // VÉGÉTARIEN — 15 RECETTES
        {
            name: "Curry de pois chiches", category: "vegetarien", time: "25 min", difficulty: "Facile",
            image: "photo-1565557623262-b51c2513a641",
            description: "Un plat végétarien parfumé et généreux.",
            ingredients: ["200 g de pois chiches cuits", "200 ml de lait de coco", "Tomates", "Curry", "Riz"],
            steps: ["Fais cuire le riz.", "Fais revenir les tomates avec le curry.", "Ajoute les pois chiches et le lait de coco.", "Laisse mijoter quelques minutes."]
        },
        {
            name: "Chili végétarien", category: "vegetarien", time: "30 min", difficulty: "Facile",
            image: "photo-1512621776951-a57141f2eefd",
            description: "Un chili riche en légumes et légumineuses.",
            ingredients: ["Haricots rouges", "Maïs", "Tomates concassées", "Poivron", "Épices"],
            steps: ["Découpe le poivron.", "Fais-le revenir quelques minutes.", "Ajoute les tomates, le maïs et les haricots.", "Laisse mijoter et ajuste les épices."]
        },
        {
            name: "Pâtes aux champignons", category: "vegetarien", time: "20 min", difficulty: "Facile",
            image: "photo-1473093295043-cdd812d0e601",
            description: "Des pâtes crémeuses aux champignons.",
            ingredients: ["120 g de pâtes", "150 g de champignons", "Crème", "Ail", "Persil"],
            steps: ["Fais cuire les pâtes.", "Émince les champignons.", "Fais-les revenir avec l'ail.", "Ajoute la crème et mélange avec les pâtes."]
        },
        {
            name: "Omelette aux épinards", category: "vegetarien", time: "12 min", difficulty: "Facile",
            image: "photo-1525351484163-7529414344d8",
            description: "Une omelette aux légumes simple et rapide.",
            ingredients: ["2 œufs", "Une poignée d'épinards", "Fromage", "Poivre"],
            steps: ["Lave les épinards.", "Fais-les revenir rapidement.", "Bats les œufs.", "Verse dans la poêle et ajoute le fromage."]
        },
        {
            name: "Gratin de légumes", category: "vegetarien", time: "40 min", difficulty: "Facile",
            image: "photo-1547592180-85f173990554",
            description: "Un gratin familial avec des légumes de saison.",
            ingredients: ["Courgettes", "Pommes de terre", "Crème", "Fromage râpé", "Herbes"],
            steps: ["Préchauffe le four.", "Coupe les légumes en fines rondelles.", "Dispose-les dans un plat avec la crème.", "Ajoute le fromage et fais gratiner."]
        },
        {
            name: "Salade grecque", category: "vegetarien", time: "10 min", difficulty: "Facile",
            image: "photo-1512621776951-a57141f2eefd",
            description: "Une salade fraîche aux saveurs méditerranéennes.",
            ingredients: ["Tomates", "Concombre", "Feta", "Olives", "Oignon rouge", "Huile d'olive"],
            steps: ["Lave les légumes.", "Coupe les tomates et le concombre.", "Ajoute la feta et les olives.", "Assaisonne avec l'huile d'olive."]
        },
        {
            name: "Buddha bowl végétal", category: "vegetarien", time: "25 min", difficulty: "Facile",
            image: "photo-1512621776951-a57141f2eefd",
            description: "Un assemblage coloré de céréales, légumes et légumineuses.",
            ingredients: ["Quinoa", "Pois chiches", "Carotte", "Avocat", "Chou rouge", "Sauce au yaourt"],
            steps: ["Fais cuire le quinoa.", "Prépare les légumes.", "Rince les pois chiches.", "Dispose tous les ingrédients dans un bol et ajoute la sauce."]
        },
        {
            name: "Risotto aux petits pois", category: "vegetarien", time: "30 min", difficulty: "Moyen",
            image: "photo-1476124369491-e7addf5db371",
            description: "Un risotto crémeux avec des petits pois.",
            ingredients: ["Riz à risotto", "Petits pois", "Bouillon de légumes", "Parmesan", "Oignon"],
            steps: ["Fais revenir l'oignon.", "Ajoute le riz et mélange.", "Verse le bouillon progressivement.", "Ajoute les petits pois et le parmesan en fin de cuisson."]
        },
        {
            name: "Aubergines farcies au quinoa", category: "vegetarien", time: "40 min", difficulty: "Moyen",
            image: "photo-1512621776951-a57141f2eefd",
            description: "Des aubergines rôties avec une garniture végétale.",
            ingredients: ["1 aubergine", "Quinoa", "Tomate", "Oignon", "Feta"],
            steps: ["Coupe l'aubergine en deux et évide légèrement sa chair.", "Fais cuire le quinoa.", "Mélange-le avec la tomate, l'oignon et la chair coupée.", "Garnis les aubergines, ajoute la feta et fais cuire au four."]
        },
        {
            name: "Galettes de lentilles", category: "vegetarien", time: "25 min", difficulty: "Facile",
            image: "photo-1547592180-85f173990554",
            description: "Des galettes dorées à base de lentilles.",
            ingredients: ["Lentilles cuites", "1 œuf", "Chapelure", "Persil", "Épices"],
            steps: ["Écrase grossièrement les lentilles.", "Ajoute l'œuf, la chapelure et le persil.", "Forme des galettes.", "Fais-les dorer dans une poêle jusqu'à ce qu'elles soient bien chaudes."]
        },
        {
            name: "Poivrons farcis au riz", category: "vegetarien", time: "40 min", difficulty: "Facile",
            image: "photo-1512621776951-a57141f2eefd",
            description: "Des poivrons colorés garnis de riz et de légumes.",
            ingredients: ["2 poivrons", "Riz cuit", "Tomates", "Maïs", "Fromage râpé"],
            steps: ["Préchauffe le four.", "Coupe les poivrons en deux et retire les graines.", "Mélange le riz avec les tomates et le maïs.", "Garnis les poivrons, ajoute le fromage et enfourne."]
        },
        {
            name: "Couscous aux légumes", category: "vegetarien", time: "30 min", difficulty: "Facile",
            image: "photo-1547592180-85f173990554",
            description: "Une semoule accompagnée de légumes mijotés.",
            ingredients: ["Semoule", "Carottes", "Courgette", "Pois chiches", "Tomates", "Épices douces"],
            steps: ["Découpe les légumes.", "Fais-les mijoter avec les tomates et les épices.", "Ajoute les pois chiches.", "Prépare la semoule et sers avec les légumes."]
        },
        {
            name: "Quesadillas aux haricots rouges", category: "vegetarien", time: "15 min", difficulty: "Facile",
            image: "photo-1626700051175-6818013e1d4f",
            description: "Des tortillas grillées garnies de haricots et de fromage.",
            ingredients: ["2 tortillas", "Haricots rouges", "Maïs", "Fromage râpé", "Tomate"],
            steps: ["Écrase légèrement les haricots.", "Garnis une tortilla avec les haricots, le maïs, la tomate et le fromage.", "Referme avec la deuxième tortilla.", "Fais dorer des deux côtés dans une poêle."]
        },
        {
            name: "Polenta crémeuse aux légumes", category: "vegetarien", time: "25 min", difficulty: "Facile",
            image: "photo-1547592180-85f173990554",
            description: "Une polenta douce servie avec des légumes poêlés.",
            ingredients: ["Polenta", "Lait", "Champignons", "Courgette", "Parmesan"],
            steps: ["Prépare la polenta selon les indications du paquet.", "Fais revenir les champignons et la courgette.", "Ajoute le parmesan à la polenta.", "Sers avec les légumes poêlés."]
        },
        {
            name: "Tarte aux tomates et moutarde", category: "vegetarien", time: "35 min", difficulty: "Facile",
            image: "photo-1512621776951-a57141f2eefd",
            description: "Une tarte salée simple avec des tomates et des herbes.",
            ingredients: ["1 pâte brisée", "Tomates", "Moutarde", "Fromage râpé", "Herbes de Provence"],
            steps: ["Préchauffe le four.", "Étale la pâte dans un moule et pique le fond.", "Étale une fine couche de moutarde puis dispose les tomates.", "Ajoute le fromage et les herbes puis fais cuire."]
        }
    ];

    // Vérification du nombre de recettes.
    const categoryCounts = Object.fromEntries(
        categoryOrder.map(key => [
            key,
            recipes.filter(recipe => recipe.category === key).length
        ])
    );

    const totalRecipes = recipes.length;

    if (
        totalRecipes !== 75 ||
        !categoryOrder.every(key => categoryCounts[key] === 15)
    ) {
        console.error("Le catalogue doit contenir 75 recettes, soit 15 par catégorie.", categoryCounts);
    }

    function imageUrl(id) {
        return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    function getFilteredRecipes() {
        const query = search.value.trim().toLocaleLowerCase("fr");
        const selectedCategory = category.value;

        return recipes.filter(recipe => {
            const matchesCategory =
                selectedCategory === "all" ||
                recipe.category === selectedCategory;

            const searchableText = [
                recipe.name,
                recipe.description,
                categoryNames[recipe.category],
                ...recipe.ingredients
            ].join(" ").toLocaleLowerCase("fr");

            return matchesCategory && searchableText.includes(query);
        });
    }

    function renderRecipes() {
        const results = getFilteredRecipes();

        results.sort((a, b) =>
            categoryOrder.indexOf(a.category) -
            categoryOrder.indexOf(b.category)
        );

        const groups = categoryOrder
            .map(key => ({
                key,
                title: categoryNames[key],
                items: results.filter(recipe => recipe.category === key)
            }))
            .filter(group => group.items.length > 0);

        grid.innerHTML = groups.map(group => `
            <section class="recipe-category-group" data-category-group="${group.key}">
                <div class="recipe-category-heading">
                    <span class="section-label">IRON PULSE — RECETTES</span>
                    <h3>${escapeHTML(group.title)} <span>(${group.items.length})</span></h3>
                </div>

                <div class="recipe-category-grid">
                    ${group.items.map(recipe => {
                        const recipeIndex = recipes.indexOf(recipe);

                        return `
                            <article class="recipe-card">
                                <div class="recipe-card-image">
                                    <img
                                        src="${imageUrl(recipe.image)}"
                                        alt="${escapeHTML(recipe.name)}"
                                        loading="lazy"
                                    >
                                    <span>${escapeHTML(categoryNames[recipe.category])}</span>
                                </div>

                                <div class="recipe-card-content">
                                    <div class="recipe-card-meta">
                                        <span>◷ ${escapeHTML(recipe.time)}</span>
                                        <span>${escapeHTML(recipe.difficulty)}</span>
                                    </div>

                                    <h4>${escapeHTML(recipe.name)}</h4>
                                    <p>${escapeHTML(recipe.description)}</p>

                                    <button
                                        type="button"
                                        class="recipe-open-button"
                                        data-recipe-index="${recipeIndex}"
                                    >
                                        Voir la recette <span>→</span>
                                    </button>
                                </div>
                            </article>
                        `;
                    }).join("")}
                </div>
            </section>
        `).join("");

        count.textContent = `${results.length} / ${totalRecipes} recettes affichées`;
        empty.hidden = results.length !== 0;
        grid.hidden = results.length === 0;
    }

    function openRecipe(index) {
        const recipe = recipes[index];
        if (!recipe) return;

        modalBody.innerHTML = `
            <div class="recipe-detail-image">
                <img src="${imageUrl(recipe.image)}" alt="${escapeHTML(recipe.name)}">
            </div>

            <div class="recipe-detail-content">
                <span class="recipe-detail-category">
                    ${escapeHTML(categoryNames[recipe.category])}
                </span>

                <h2 id="recipe-modal-title">${escapeHTML(recipe.name)}</h2>
                <p>${escapeHTML(recipe.description)}</p>

                <div class="recipe-detail-meta">
                    <span>◷ ${escapeHTML(recipe.time)}</span>
                    <span>${escapeHTML(recipe.difficulty)}</span>
                </div>

                <section class="recipe-detail-section">
                    <h3>Ingrédients</h3>
                    <ul>
                        ${recipe.ingredients.map(item => `<li>${escapeHTML(item)}</li>`).join("")}
                    </ul>
                </section>

                <section class="recipe-detail-section">
                    <h3>Préparation</h3>
                    <ol>
                        ${recipe.steps.map(step => `<li>${escapeHTML(step)}</li>`).join("")}
                    </ol>
                </section>

                <p class="recipe-detail-note">
                    Les quantités sont indicatives et peuvent être adaptées.
                    Pense à vérifier les allergènes et à respecter les consignes
                    de conservation et de cuisson des aliments.
                </p>
            </div>
        `;

        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";

        const closeButton = modal.querySelector(".recipe-modal-close");
        if (closeButton) closeButton.focus();
    }

    function closeRecipe() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    search.addEventListener("input", renderRecipes);
    category.addEventListener("change", renderRecipes);

    reset.addEventListener("click", () => {
        search.value = "";
        category.value = "all";
        renderRecipes();
    });

    grid.addEventListener("click", event => {
        const button = event.target.closest("[data-recipe-index]");
        if (!button) return;

        openRecipe(Number(button.dataset.recipeIndex));
    });

    modal.querySelectorAll("[data-close-recipe]").forEach(button => {
        button.addEventListener("click", closeRecipe);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal.classList.contains("open")) {
            closeRecipe();
        }
    });

    renderRecipes();
})();