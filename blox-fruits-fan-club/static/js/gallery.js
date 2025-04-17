// Gestion de la galerie d'images pour le site Blox Fruits Fan Club
// Stockage local des images uploadées par les utilisateurs

document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const galleryGrid = document.getElementById('galleryGrid');
    const noImagesMessage = document.getElementById('noImagesMessage');
    const imageUploadForm = document.getElementById('imageUploadForm');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalDate = document.getElementById('modalDate');
    const modalClose = document.querySelector('.image-modal-close');

    // Chargement initial de la galerie
    loadGallery();

    // Événement pour le formulaire d'upload
    if (imageUploadForm) {
        imageUploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            uploadImage();
        });
    }

    // Événements pour les filtres
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.dataset.category;
                filterImages(category);
                
                // Mettre à jour la classe active
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Fermer la fenêtre modale d'image
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            imageModal.style.display = 'none';
        });
    }

    // Fermer la fenêtre modale en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target == imageModal) {
            imageModal.style.display = 'none';
        }
    });

    /**
     * Charger les images depuis le stockage local
     */
    function loadGallery(category = 'all') {
        // Vider la grille
        while (galleryGrid.firstChild && galleryGrid.firstChild !== noImagesMessage) {
            galleryGrid.removeChild(galleryGrid.firstChild);
        }

        // Récupérer les images depuis le stockage local
        let images = localStorage.getItem('galleryImages');
        
        if (!images) {
            noImagesMessage.style.display = 'block';
            return;
        }

        images = JSON.parse(images);

        // Filtrer les images par catégorie si nécessaire
        if (category !== 'all') {
            images = images.filter(image => image.category === category);
        }

        if (images.length === 0) {
            noImagesMessage.style.display = 'block';
            return;
        }

        // Masquer le message "aucune image"
        noImagesMessage.style.display = 'none';

        // Trier les images par date (les plus récentes d'abord)
        images.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Créer les éléments de galerie
        images.forEach(image => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.dataset.category = image.category;
            
            galleryItem.innerHTML = `
                <div class="gallery-image">
                    <img src="${image.dataUrl}" alt="${image.title}">
                </div>
                <div class="gallery-info">
                    <h3>${image.title}</h3>
                    <p>Par ${image.author}</p>
                </div>
            `;
            
            // Ajouter l'événement pour ouvrir l'image en grand
            galleryItem.addEventListener('click', function() {
                openImageModal(image);
            });
            
            galleryGrid.appendChild(galleryItem);
        });
    }

    /**
     * Filtrer les images par catégorie
     * @param {string} category - Catégorie à filtrer
     */
    function filterImages(category) {
        loadGallery(category);
    }

    /**
     * Uploader une nouvelle image
     */
    function uploadImage() {
        // Récupérer les informations de l'utilisateur connecté
        const currentUser = localStorage.getItem('currentUser');
        if (!currentUser) {
            showNotification('Vous devez être connecté pour uploader une image.', 'error');
            return;
        }
        
        const user = JSON.parse(currentUser);
        const imageTitle = document.getElementById('imageTitle').value;
        const imageDescription = document.getElementById('imageDescription').value;
        const imageFile = document.getElementById('imageFile').files[0];
        const imageCategory = document.getElementById('imageCategory').value;
        
        if (!imageFile) {
            showNotification('Veuillez sélectionner une image.', 'error');
            return;
        }
        
        // Vérifier le type de fichier
        if (!imageFile.type.match('image.*')) {
            showNotification('Le fichier sélectionné n\'est pas une image.', 'error');
            return;
        }
        
        // Vérifier la taille de l'image (max 5MB)
        if (imageFile.size > 5 * 1024 * 1024) {
            showNotification('L\'image est trop volumineuse. La taille maximale est de 5MB.', 'error');
            return;
        }
        
        // Convertir l'image en base64
        const reader = new FileReader();
        reader.onload = function(e) {
            // Créer un nouvel objet image
            const newImage = {
                id: Date.now().toString(),
                title: imageTitle,
                description: imageDescription,
                category: imageCategory,
                dataUrl: e.target.result,
                author: user.username,
                date: new Date().toISOString()
            };
            
            // Ajouter l'image au stockage local
            let images = localStorage.getItem('galleryImages');
            if (images) {
                images = JSON.parse(images);
            } else {
                images = [];
            }
            
            images.push(newImage);
            localStorage.setItem('galleryImages', JSON.stringify(images));
            
            // Recharger la galerie
            loadGallery();
            
            // Réinitialiser le formulaire
            imageUploadForm.reset();
            
            showNotification('Image uploadée avec succès!', 'success');
        };
        
        reader.readAsDataURL(imageFile);
    }

    /**
     * Ouvrir l'image en grand dans une fenêtre modale
     * @param {Object} image - Objet contenant les informations de l'image
     */
    function openImageModal(image) {
        modalImage.src = image.dataUrl;
        modalTitle.textContent = image.title;
        modalDescription.textContent = image.description || 'Aucune description';
        modalAuthor.textContent = `Partagé par: ${image.author}`;
        
        // Formater la date
        const date = new Date(image.date);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        modalDate.textContent = `Le ${formattedDate}`;
        
        // Afficher la fenêtre modale
        imageModal.style.display = 'block';
    }

    /**
     * Afficher une notification
     * @param {string} message - Message à afficher
     * @param {string} type - Type de notification (success, error, info)
     */
    function showNotification(message, type = 'info') {
        // Créer l'élément de notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Ajouter la notification au DOM
        document.body.appendChild(notification);

        // Afficher la notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Supprimer la notification après 3 secondes
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});