// Gestion de la page des épées pour le site Blox Fruits Fan Club
// Affichage et filtrage des épées

document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const swordsGrid = document.getElementById('swordsGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('swordSearch');
    const swordModal = document.getElementById('swordModal');
    const modalClose = document.querySelector('.sword-modal-close');

    // Données des épées (normalement cela viendrait d'une API ou d'une base de données)
    // Dans notre cas, nous créons les données localement pour la démonstration
    const swords = [
        {
            id: 1,
            name: "Yoru",
            rarity: "legendary",
            description: "L'une des douze épées suprêmes du monde. Cette lame noire est connue pour sa capacité à envoyer des coups de vent tranchants à longue distance.",
            damage: 95,
            speed: 75,
            range: 90,
            abilities: [
                "Flying Slash - Envoie une vague d'énergie tranchante à distance",
                "Black Blade - Renforce la lame avec du Haki pour augmenter les dégâts",
                "Eternal Darkness - Une attaque spéciale qui crée un tourbillon d'énergie sombre"
            ],
            location: "Peut être achetée auprès de la Legendary Sword Dealer pour 1,200,000 Beli. Disponible uniquement après le niveau 100.",
            image: "yoru.png"
        },
        {
            id: 2,
            name: "Saber",
            rarity: "common",
            description: "Une épée de base mais fiable pour les débutants. Elle est légère et permet des attaques rapides.",
            damage: 40,
            speed: 80,
            range: 50,
            abilities: [
                "Quick Slash - Une attaque rapide avec un léger boost de vitesse",
                "Triple Cut - Un combo de trois coups rapides"
            ],
            location: "Peut être achetée pour 1,000 Beli dans n'importe quel magasin d'armes de la première île.",
            image: "saber.png"
        },
        {
            id: 3,
            name: "Shisui",
            rarity: "rare",
            description: "Une lame maudite avec une aura sombre. Elle est connue pour drainer l'énergie de ses ennemis.",
            damage: 75,
            speed: 65,
            range: 60,
            abilities: [
                "Soul Drain - Absorbe une partie de la santé de l'ennemi à chaque coup",
                "Dark Aura - Crée une aura qui réduit la défense des ennemis proches",
                "Cursed Slash - Une attaque puissante avec un effet de saignement"
            ],
            location: "Elle peut être obtenue en battant le boss de la Mansion dans la deuxième mer. Taux de drop de 10%.",
            image: "shisui.png"
        },
        {
            id: 4,
            name: "Wando",
            rarity: "rare",
            description: "Une épée élégante avec une lame bleue claire. Elle est connue pour sa précision et sa capacité à couper même les matériaux les plus durs.",
            damage: 70,
            speed: 75,
            range: 65,
            abilities: [
                "Precision Cut - Augmente les chances de coups critiques",
                "Water Slash - Crée une vague d'eau qui ralentit les ennemis",
                "Azure Path - Laisse une traînée bleue qui augmente la vitesse du joueur"
            ],
            location: "Peut être trouvée dans des coffres sous-marins ou achetée pour 750,000 Beli auprès de certains marchands.",
            image: "wando.png"
        },
        {
            id: 5,
            name: "Saddi",
            rarity: "uncommon",
            description: "Une épée robuste avec une large lame. Elle sacrifie la vitesse pour une puissance de coupe supérieure.",
            damage: 65,
            speed: 55,
            range: 60,
            abilities: [
                "Heavy Slash - Une attaque lente mais puissante",
                "Ground Pound - Frappe le sol pour créer une onde de choc"
            ],
            location: "Peut être achetée pour 50,000 Beli auprès des marchands d'armes ou obtenue en battant certains ennemis de niveau moyen.",
            image: "saddi.png"
        },
        {
            id: 6,
            name: "Rengoku",
            rarity: "legendary",
            description: "Une lame aux couleurs de flammes, capable de générer et contrôler le feu. Elle brûle tout ce qu'elle touche.",
            damage: 85,
            speed: 70,
            range: 75,
            abilities: [
                "Flame Slash - Crée des lames de feu qui brûlent les ennemis",
                "Inferno - Enveloppe l'épée de flammes pour des dégâts continus",
                "Blazing Dash - Se propulse vers l'avant avec une explosion de feu"
            ],
            location: "Peut être obtenue en battant le boss de la Forge dans la troisième mer ou pendant des événements spéciaux.",
            image: "rengoku.png"
        },
        {
            id: 7,
            name: "Pole (2nd Form)",
            rarity: "uncommon",
            description: "Un bâton extensible qui peut être utilisé comme une épée. Sa portée est exceptionnelle.",
            damage: 55,
            speed: 70,
            range: 95,
            abilities: [
                "Extend - Allonge le bâton pour attaquer à distance",
                "Sweep - Effectue une attaque circulaire à grande portée",
                "Vault - Utilise le bâton pour se propulser en l'air"
            ],
            location: "Évolution du Pole de base, que l'on peut obtenir en accomplissant la quête du Maître du Bâton dans la première mer.",
            image: "pole.png"
        },
        {
            id: 8,
            name: "Buddy Sword",
            rarity: "legendary",
            description: "Une épée massive qui surpasse toutes les autres en taille. Malgré son poids, elle peut être maniée avec une grande efficacité par les utilisateurs expérimentés.",
            damage: 90,
            speed: 50,
            range: 70,
            abilities: [
                "Giant Slash - Une attaque puissante avec une large zone d'effet",
                "Earth Splitter - Crée une fissure dans le sol qui endommage les ennemis",
                "Colossal Strength - Augmente temporairement la force de l'utilisateur"
            ],
            location: "Peut être obtenue en battant le boss de la Colline du Géant dans la troisième mer. Taux de drop de 5%.",
            image: "buddy_sword.png"
        },
        {
            id: 9,
            name: "Katana",
            rarity: "common",
            description: "Une lame traditionnelle offrant un bon équilibre entre vitesse et puissance. Parfaite pour les combattants de niveau intermédiaire.",
            damage: 45,
            speed: 70,
            range: 55,
            abilities: [
                "Swift Draw - Dégaine rapidement l'épée pour une attaque surprise",
                "Precision Cut - Attaque ciblée avec une chance de coup critique"
            ],
            location: "Peut être achetée pour 3,000 Beli auprès des marchands d'armes dans la première mer.",
            image: "katana.png"
        },
        {
            id: 10,
            name: "True Triple Katana",
            rarity: "mythical",
            description: "Un ensemble légendaire de trois katanas maniés simultanément. Seuls les plus grands maîtres d'épée peuvent utiliser cette technique.",
            damage: 92,
            speed: 85,
            range: 65,
            abilities: [
                "Three Sword Style - Utilise les trois lames pour un combo dévastateur",
                "Dragon Twister - Crée un tourbillon qui aspire et endommage les ennemis",
                "Oni Giri - Une attaque fulgurante qui tranche tout sur son passage",
                "Asura - Invoque une illusion à six bras tenant neuf épées pour une attaque massive"
            ],
            location: "Peut être obtenue en complétant la quête légendaire du Maître des Épées après avoir atteint le niveau 200 et maîtrisé 5 autres épées.",
            image: "triple_katana.png"
        },
        {
            id: 11,
            name: "Pipe",
            rarity: "common",
            description: "Un simple tuyau métallique qui peut être utilisé comme une arme. Pratique mais peu puissant.",
            damage: 30,
            speed: 85,
            range: 45,
            abilities: [
                "Quick Swing - Une attaque rapide avec une courte récupération",
                "Bonk - Une attaque dirigée vers la tête qui peut étourdir"
            ],
            location: "Peut être ramassée gratuitement sur certaines îles de la première mer ou achetée pour 500 Beli.",
            image: "pipe.png"
        },
        {
            id: 12,
            name: "Enma",
            rarity: "mythical",
            description: "Une lame qui extrait le Haki de son utilisateur pour produire des coupes d'une puissance inimaginable. Seuls ceux avec une volonté de fer peuvent la maîtriser.",
            damage: 98,
            speed: 70,
            range: 80,
            abilities: [
                "Haki Drain - Consomme le Haki pour renforcer drastiquement les attaques",
                "Conqueror's Slash - Une coupe si puissante qu'elle peut fendre les montagnes",
                "Spirit Extraction - Extrait une partie de l'esprit des ennemis touchés",
                "Demonic Aura - Génère une aura rouge qui terrifie les ennemis proches"
            ],
            location: "Extrêmement rare. Peut uniquement être obtenue en battant le boss secret de l'Île des Samouraïs dans la troisième mer. Taux de drop inférieur à 1%.",
            image: "enma.png"
        }
    ];

    // Chargement initial des épées
    loadSwords();

    // Événements pour les filtres
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const rarity = this.dataset.rarity;
                filterSwords(rarity);
                
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
            searchSwords(searchTerm);
        });
    }

    // Fermer la fenêtre modale
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            swordModal.style.display = 'none';
        });
    }

    // Fermer la fenêtre modale en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target == swordModal) {
            swordModal.style.display = 'none';
        }
    });

    /**
     * Chargement des épées dans la grille
     * @param {Array} filteredSwords - Liste d'épées à afficher (optionnel)
     */
    function loadSwords(filteredSwords = null) {
        // Vider la grille
        swordsGrid.innerHTML = '';
        
        // Déterminer les épées à afficher
        const swordsToDisplay = filteredSwords || swords;
        
        // Créer les cartes d'épées
        swordsToDisplay.forEach(sword => {
            const swordCard = document.createElement('div');
            swordCard.className = 'sword-card';
            swordCard.dataset.rarity = sword.rarity;
            
            // Utiliser des couleurs basées sur la rareté pour les images
            let bgColor;
            switch(sword.rarity) {
                case 'common': bgColor = '#95a5a6'; break;    // gris
                case 'uncommon': bgColor = '#2ecc71'; break;  // vert
                case 'rare': bgColor = '#3498db'; break;      // bleu
                case 'legendary': bgColor = '#9b59b6'; break; // violet
                case 'mythical': bgColor = '#e74c3c'; break;  // rouge
                default: bgColor = '#34495e'; break;          // gris foncé
            }
            
            swordCard.innerHTML = `
                <div class="sword-image">
                    <div style="background-color: ${bgColor}; width: 100%; height: 150px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border-radius: 5px;">
                        ${sword.name}
                    </div>
                </div>
                <div class="sword-info">
                    <h3>${sword.name}</h3>
                    <div class="sword-details">
                        <span class="sword-rarity rarity-${sword.rarity}">${capitalizeFirstLetter(sword.rarity)}</span>
                    </div>
                </div>
            `;
            
            // Ajouter l'événement pour ouvrir le modal
            swordCard.addEventListener('click', function() {
                openSwordModal(sword);
            });
            
            swordsGrid.appendChild(swordCard);
        });
    }

    /**
     * Filtrer les épées par rareté
     * @param {string} rarity - Rareté des épées à filtrer
     */
    function filterSwords(rarity) {
        if (rarity === 'all') {
            loadSwords();
            return;
        }
        
        const filteredSwords = swords.filter(sword => sword.rarity === rarity);
        loadSwords(filteredSwords);
    }

    /**
     * Rechercher des épées par nom
     * @param {string} term - Terme de recherche
     */
    function searchSwords(term) {
        if (!term) {
            // Si le terme de recherche est vide, afficher toutes les épées
            // mais en respectant le filtre de rareté actif
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const activeRarity = activeFilterBtn ? activeFilterBtn.dataset.rarity : 'all';
            
            if (activeRarity === 'all') {
                loadSwords();
            } else {
                filterSwords(activeRarity);
            }
            return;
        }
        
        // Filtrer les épées par nom
        const filteredSwords = swords.filter(sword => {
            // Vérifier si le terme de recherche correspond au nom de l'épée
            const nameMatch = sword.name.toLowerCase().includes(term);
            
            // Vérifier si un filtre de rareté est actif
            const activeFilterBtn = document.querySelector('.filter-btn.active');
            const activeRarity = activeFilterBtn ? activeFilterBtn.dataset.rarity : 'all';
            
            // Si un filtre de rareté est actif (autre que 'all'), appliquer également ce filtre
            if (activeRarity !== 'all') {
                return nameMatch && sword.rarity === activeRarity;
            }
            
            return nameMatch;
        });
        
        loadSwords(filteredSwords);
    }

    /**
     * Ouvrir la fenêtre modale des détails d'une épée
     * @param {Object} sword - Objet contenant les informations de l'épée
     */
    function openSwordModal(sword) {
        // Mettre à jour les informations dans la fenêtre modale
        document.getElementById('modalSwordName').textContent = sword.name;
        document.getElementById('modalSwordRarity').textContent = capitalizeFirstLetter(sword.rarity);
        document.getElementById('modalSwordRarity').className = `sword-rarity rarity-${sword.rarity}`;
        
        // Utiliser une div colorée au lieu d'une image
        let bgColor;
        switch(sword.rarity) {
            case 'common': bgColor = '#95a5a6'; break;    // gris
            case 'uncommon': bgColor = '#2ecc71'; break;  // vert
            case 'rare': bgColor = '#3498db'; break;      // bleu
            case 'legendary': bgColor = '#9b59b6'; break; // violet
            case 'mythical': bgColor = '#e74c3c'; break;  // rouge
            default: bgColor = '#34495e'; break;          // gris foncé
        }
        
        // Remplacer l'image par une div colorée
        const imageContainer = document.getElementById('modalSwordImageContainer');
        if (imageContainer) {
            imageContainer.innerHTML = `
                <div style="background-color: ${bgColor}; width: 200px; height: 200px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 1.5em; border-radius: 5px; margin: 0 auto;">
                    ${sword.name}
                </div>
            `;
        }
        
        // Description et emplacement
        document.getElementById('modalSwordDescription').textContent = sword.description;
        document.getElementById('modalSwordLocation').textContent = sword.location;
        
        // Statistiques
        document.getElementById('damageStat').style.width = `${sword.damage}%`;
        document.getElementById('speedStat').style.width = `${sword.speed}%`;
        document.getElementById('rangeStat').style.width = `${sword.range}%`;
        
        // Capacités
        const abilitiesList = document.getElementById('modalSwordAbilities');
        abilitiesList.innerHTML = '';
        sword.abilities.forEach(ability => {
            const li = document.createElement('li');
            li.textContent = ability;
            abilitiesList.appendChild(li);
        });
        
        // Afficher la fenêtre modale
        swordModal.style.display = 'block';
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