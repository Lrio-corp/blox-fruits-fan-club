// Gestion de la page des fruits pour le site Blox Fruits Fan Club
// Affichage et filtrage des fruits du démon

document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const fruitsGrid = document.getElementById('fruitsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('fruitSearch');
    const fruitModal = document.getElementById('fruitModal');
    const modalClose = document.querySelector('.fruit-modal-close');

    // Données des fruits (normalement cela viendrait d'une API ou d'une base de données)
    // Dans notre cas, nous créons les données localement pour la démonstration
    const fruits = [
        {
            id: 1,
            name: "Light Fruit",
            type: "elemental",
            rarity: "legendary",
            description: "Ce fruit donne à l'utilisateur la capacité de contrôler et de devenir de la lumière. Il permet de se déplacer à la vitesse de la lumière et de créer des attaques basées sur la lumière.",
            power: 85,
            defense: 60,
            mobility: 95,
            abilities: [
                "Light Speed Travel - Permet de voyager à la vitesse de la lumière",
                "Light Beam - Tire un rayon de lumière qui inflige des dégâts",
                "Light Kick - Un coup de pied rapide renforcé par la lumière",
                "Light Flight - Permet de voler en utilisant la lumière"
            ],
            location: "Peut être trouvé dans la deuxième mer. Parfois vendu par le mystérieux vendeur de fruits.",
            image: "light_fruit.png"
        },
        {
            id: 2,
            name: "Rumble Fruit",
            type: "elemental",
            rarity: "legendary",
            description: "Ce fruit permet à l'utilisateur de créer, contrôler et se transformer en électricité. Il offre d'excellentes capacités offensives et de mobilité.",
            power: 90,
            defense: 55,
            mobility: 85,
            abilities: [
                "Thunder - Invoque la foudre du ciel pour frapper les ennemis",
                "Electric Dash - Se déplace rapidement sous forme d'électricité",
                "Thunderstorm - Crée une tempête électrique qui inflige des dégâts dans une zone",
                "Lightning Strike - Frappe un ennemi avec un puissant éclair"
            ],
            location: "Peut être trouvé dans la première et la deuxième mer. Parfois disponible dans le stock du vendeur de fruits.",
            image: "rumble_fruit.png"
        },
        {
            id: 3,
            name: "Quake Fruit",
            type: "natural",
            rarity: "mythical",
            description: "L'un des fruits les plus destructeurs, il permet à l'utilisateur de créer des tremblements de terre dévastateurs et des fissures dans l'air et le sol.",
            power: 95,
            defense: 80,
            mobility: 45,
            abilities: [
                "Quake Punch - Un coup de poing qui crée une onde de choc dévastatrice",
                "Tremor - Crée un tremblement de terre qui endommage tous les ennemis dans une large zone",
                "Air Quake - Crée une fissure dans l'air qui se propage et cause des dégâts",
                "Seaquake - Crée un tsunami qui inflige d'énormes dégâts"
            ],
            location: "Extrêmement rare. Principalement trouvé dans la troisième mer ou lors d'événements spéciaux.",
            image: "quake_fruit.png"
        },
        {
            id: 4,
            name: "Flame Fruit",
            type: "elemental",
            rarity: "rare",
            description: "Permet à l'utilisateur de créer, contrôler et devenir du feu. Un fruit populaire pour sa bonne combinaison de puissance offensive et de mobilité.",
            power: 80,
            defense: 60,
            mobility: 75,
            abilities: [
                "Fire Fist - Lance un coup de poing enflammé",
                "Flame Pillar - Crée un pilier de flammes qui brûle les ennemis",
                "Flame Flight - Permet de voler en utilisant des flammes",
                "Fire Storm - Crée une tempête de feu qui inflige des dégâts continus"
            ],
            location: "Peut être trouvé dans toutes les mers. C'est l'un des fruits les plus courants parmi les fruits rares.",
            image: "flame_fruit.png"
        },
        {
            id: 5,
            name: "Ice Fruit",
            type: "elemental",
            rarity: "rare",
            description: "Permet à l'utilisateur de créer, contrôler et devenir de la glace. Excellent pour ralentir les ennemis et infliger des dégâts de zone.",
            power: 75,
            defense: 70,
            mobility: 65,
            abilities: [
                "Ice Age - Gèle une large zone et ralentit les ennemis",
                "Ice Saber - Crée une épée de glace pour des attaques rapprochées",
                "Frozen Road - Crée un chemin de glace pour se déplacer rapidement",
                "Avalanche - Invoque une avalanche qui écrase les ennemis"
            ],
            location: "Peut être trouvé dans la première et la deuxième mer. Apparaît parfois chez les vendeurs.",
            image: "ice_fruit.png"
        },
        {
            id: 6,
            name: "Dragon Fruit",
            type: "beast",
            rarity: "mythical",
            description: "L'un des fruits les plus puissants qui permet à l'utilisateur de se transformer partiellement ou totalement en dragon. Combine force brute et mobilité aérienne.",
            power: 95,
            defense: 85,
            mobility: 80,
            abilities: [
                "Dragon Breath - Crache un souffle de feu dévastateur",
                "Dragon Claw - Attaque avec des griffes tranchantes",
                "Dragon Flight - Déploie des ailes pour voler",
                "Dragon Transformation - Transformation complète en dragon"
            ],
            location: "Extrêmement rare. Principalement trouvé dans la troisième mer ou lors d'événements spéciaux.",
            image: "dragon_fruit.png"
        },
        {
            id: 7,
            name: "Venom Fruit",
            type: "natural",
            rarity: "legendary",
            description: "Permet à l'utilisateur de créer, contrôler et devenir du poison. Excellent pour les dégâts sur la durée et le contrôle de zone.",
            power: 85,
            defense: 70,
            mobility: 65,
            abilities: [
                "Toxic Hydra - Crée des têtes d'hydra empoisonnées qui attaquent les ennemis",
                "Venom Shower - Pluie de poison qui inflige des dégâts dans une zone",
                "Poison Mist - Crée un brouillard toxique qui empoisonne les ennemis",
                "Venom Road - Crée un chemin de poison pour se déplacer rapidement"
            ],
            location: "Rare, principalement trouvé dans la deuxième et troisième mer.",
            image: "venom_fruit.png"
        },
        {
            id: 8,
            name: "Chop Fruit",
            type: "natural",
            rarity: "common",
            description: "Un fruit de niveau débutant qui permet à l'utilisateur de transformer ses bras en lames. Bon pour les combats rapprochés.",
            power: 50,
            defense: 40,
            mobility: 30,
            abilities: [
                "Chop Slash - Transforme le bras en lame pour couper les ennemis",
                "Flying Blade - Envoie une lame d'air qui coupe à distance",
                "Cutting Dash - Un dash rapide qui coupe les ennemis sur le passage"
            ],
            location: "Commun dans la première mer. Souvent disponible chez les vendeurs de fruits.",
            image: "chop_fruit.png"
        },
        {
            id: 9,
            name: "Magma Fruit",
            type: "elemental",
            rarity: "legendary",
            description: "Permet à l'utilisateur de créer, contrôler et devenir du magma. Excellent pour les dégâts élevés et le contrôle de zone.",
            power: 90,
            defense: 75,
            mobility: 55,
            abilities: [
                "Magma Fist - Un puissant coup de poing en magma",
                "Volcanic Eruption - Crée une éruption volcanique qui inflige d'énormes dégâts",
                "Magma Rain - Fait pleuvoir du magma sur une large zone",
                "Magma Pool - Crée une zone de magma qui inflige des dégâts continus"
            ],
            location: "Rare, principalement trouvé dans la deuxième mer.",
            image: "magma_fruit.png"
        },
        {
            id: 10,
            name: "Buddha Fruit",
            type: "mythical",
            rarity: "mythical",
            description: "Un fruit unique qui permet à l'utilisateur de se transformer en statue de Bouddha géante. Excellente défense et portée.",
            power: 75,
            defense: 95,
            mobility: 30,
            abilities: [
                "Buddha Transformation - Se transforme en statue géante",
                "Enlightenment - Augmente temporairement toutes les statistiques",
                "Shock Wave - Crée une onde de choc qui repousse les ennemis",
                "Buddha Palm - Une puissante attaque de paume"
            ],
            location: "Très rare, peut être trouvé dans les trois mers mais avec une très faible probabilité.",
            image: "buddha_fruit.png"
        },
        {
            id: 11,
            name: "Dark Fruit",
            type: "natural",
            rarity: "rare",
            description: "Permet à l'utilisateur de créer, contrôler et devenir des ténèbres. Bon pour immobiliser les ennemis.",
            power: 70,
            defense: 65,
            mobility: 70,
            abilities: [
                "Black Hole - Crée un trou noir qui attire et endommage les ennemis",
                "Dark Matter - Lance une sphère de ténèbres qui inflige des dégâts",
                "Shadow Travel - Permet de voyager rapidement à travers les ombres",
                "Midnight - Plonge une zone dans les ténèbres, aveuglant les ennemis"
            ],
            location: "Peut être trouvé dans la première et la deuxième mer.",
            image: "dark_fruit.png"
        },
        {
            id: 12,
            name: "Smoke Fruit",
            type: "elemental",
            rarity: "uncommon",
            description: "Permet à l'utilisateur de créer, contrôler et devenir de la fumée. Bon pour éviter les attaques et se déplacer.",
            power: 55,
            defense: 60,
            mobility: 80,
            abilities: [
                "Smoke Dash - Se déplace rapidement sous forme de fumée",
                "Smoke Screen - Crée un écran de fumée qui cache le joueur",
                "Smoke Shot - Tire une boule de fumée qui étouffe les ennemis",
                "White Out - Remplit une zone de fumée, réduisant la visibilité des ennemis"
            ],
            location: "Assez commun, peut être trouvé dans toutes les mers.",
            image: "smoke_fruit.png"
        }
    ];

    // Chargement initial des fruits
    loadFruits();

    // Événements pour les filtres
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const type = this.dataset.type;
                filterFruits(type);
                
                // Mettre à jour la classe active
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Événement pour la recherche
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            searchFruits(searchTerm);
        });
    }

    // Fermer la fenêtre modale
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            fruitModal.style.display = 'none';
        });
    }

    // Fermer la fenêtre modale en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target == fruitModal) {
            fruitModal.style.display = 'none';
        }
    });

    /**
     * Chargement des fruits dans la grille
     * @param {Array} filteredFruits - Liste de fruits à afficher (optionnel)
     */
    function loadFruits(filteredFruits = null) {
        // Vider la grille
        fruitsGrid.innerHTML = '';
        
        // Déterminer les fruits à afficher
        const fruitsToDisplay = filteredFruits || fruits;
        
        // Créer les cartes de fruits
        fruitsToDisplay.forEach(fruit => {
            const fruitCard = document.createElement('div');
            fruitCard.className = 'fruit-card';
            fruitCard.dataset.type = fruit.type;
            
            // Utiliser des couleurs basées sur le type pour les images
            let bgColor;
            switch(fruit.type) {
                case 'elemental': bgColor = '#3498db'; break; // bleu
                case 'natural': bgColor = '#2ecc71'; break;   // vert
                case 'beast': bgColor = '#e74c3c'; break;     // rouge
                case 'mythical': bgColor = '#9b59b6'; break;  // violet
                default: bgColor = '#34495e'; break;          // gris foncé
            }
            
            fruitCard.innerHTML = `
                <div class="fruit-image">
                    <div style="background-color: ${bgColor}; width: 100%; height: 150px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border-radius: 5px;">
                        ${fruit.name}
                    </div>
                </div>
                <div class="fruit-info">
                    <h3>${fruit.name}</h3>
                    <div class="fruit-details">
                        <span class="fruit-type">${capitalizeFirstLetter(fruit.type)}</span>
                        <span class="fruit-rarity rarity-${fruit.rarity}">${capitalizeFirstLetter(fruit.rarity)}</span>
                    </div>
                </div>
            `;
            
            // Ajouter l'événement pour ouvrir le modal
            fruitCard.addEventListener('click', function() {
                openFruitModal(fruit);
            });
            
            fruitsGrid.appendChild(fruitCard);
        });
    }

    /**
     * Filtrer les fruits par type
     * @param {string} type - Type de fruit à filtrer
     */
    function filterFruits(type) {
        if (type === 'all') {
            loadFruits();
            return;
        }
        
        const filteredFruits = fruits.filter(fruit => fruit.type === type);
        loadFruits(filteredFruits);
    }

    /**
     * Rechercher des fruits par nom
     * @param {string} term - Terme de recherche
     */
    function searchFruits(term) {
        if (!term) {
            // Si le terme de recherche est vide, afficher tous les fruits
            // mais en respectant le filtre de type actif
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const activeType = activeFilterBtn ? activeFilterBtn.dataset.type : 'all';
            
            if (activeType === 'all') {
                loadFruits();
            } else {
                filterFruits(activeType);
            }
            return;
        }
        
        // Filtrer les fruits par nom
        const filteredFruits = fruits.filter(fruit => {
            // Vérifier si le terme de recherche correspond au nom du fruit
            const nameMatch = fruit.name.toLowerCase().includes(term);
            
            // Vérifier si un filtre de type est actif
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const activeType = activeFilterBtn ? activeFilterBtn.dataset.type : 'all';
            
            // Si un filtre de type est actif (autre que 'all'), appliquer également ce filtre
            if (activeType !== 'all') {
                return nameMatch && fruit.type === activeType;
            }
            
            return nameMatch;
        });
        
        loadFruits(filteredFruits);
    }

    /**
     * Ouvrir la fenêtre modale des détails d'un fruit
     * @param {Object} fruit - Objet contenant les informations du fruit
     */
    function openFruitModal(fruit) {
        // Mettre à jour les informations dans la fenêtre modale
        document.getElementById('modalFruitName').textContent = fruit.name;
        document.getElementById('modalFruitType').textContent = capitalizeFirstLetter(fruit.type);
        document.getElementById('modalFruitType').className = 'fruit-type';
        document.getElementById('modalFruitRarity').textContent = capitalizeFirstLetter(fruit.rarity);
        document.getElementById('modalFruitRarity').className = `fruit-rarity rarity-${fruit.rarity}`;
        
        // Utiliser une div colorée au lieu d'une image
        let bgColor;
        switch(fruit.type) {
            case 'elemental': bgColor = '#3498db'; break; // bleu
            case 'natural': bgColor = '#2ecc71'; break;   // vert
            case 'beast': bgColor = '#e74c3c'; break;     // rouge
            case 'mythical': bgColor = '#9b59b6'; break;  // violet
            default: bgColor = '#34495e'; break;          // gris foncé
        }
        
        // Remplacer l'image par une div colorée
        const imageContainer = document.getElementById('modalFruitImageContainer');
        if (imageContainer) {
            imageContainer.innerHTML = `
                <div style="background-color: ${bgColor}; width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.5em; border-radius: 5px; margin: 0 auto;">
                    ${fruit.name}
                </div>
            `;
        }
        
        // Description et emplacement
        document.getElementById('modalFruitDescription').textContent = fruit.description;
        document.getElementById('modalFruitLocation').textContent = fruit.location;
        
        // Statistiques
        document.getElementById('powerStat').style.width = `${fruit.power}%`;
        document.getElementById('defenseStat').style.width = `${fruit.defense}%`;
        document.getElementById('mobilityStat').style.width = `${fruit.mobility}%`;
        
        // Capacités
        const abilitiesList = document.getElementById('modalFruitAbilities');
        abilitiesList.innerHTML = '';
        fruit.abilities.forEach(ability => {
            const li = document.createElement('li');
            li.textContent = ability;
            abilitiesList.appendChild(li);
        });
        
        // Afficher la fenêtre modale
        fruitModal.style.display = 'block';
    }

    /**
     * Mettre en majuscule la première lettre d'une chaîne
     * @param {string} string - Chaîne à modifier
     * @return {string} Chaîne avec la première lettre en majuscule
     */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});