// Gestion de l'authentification pour le site Blox Fruits Fan Club
// Stockage local des utilisateurs et gestion des sessions

document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userInfo = document.getElementById('userInfo');
    const username = document.getElementById('username');
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    // Formulaires
    const loginFormElement = document.getElementById('login-form');
    const registerFormElement = document.getElementById('register-form');

    // Vérifier si un utilisateur est déjà connecté
    checkLoggedInUser();

    // Ouvrir la fenêtre modale pour la connexion
    loginBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    });

    // Ouvrir la fenêtre modale pour l'inscription
    registerBtn.addEventListener('click', function() {
        modal.style.display = 'block';
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    });

    // Fermer la fenêtre modale
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Fermer la fenêtre modale en cliquant en dehors
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Basculer vers le formulaire d'inscription
    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
        });
    }

    // Basculer vers le formulaire de connexion
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
        });
    }

    // Déconnexion
    logoutBtn.addEventListener('click', function() {
        logout();
    });

    // Soumission du formulaire de connexion
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const loginUsername = document.getElementById('loginUsername').value;
            const loginPassword = document.getElementById('loginPassword').value;
            login(loginUsername, loginPassword);
        });
    }

    // Soumission du formulaire d'inscription
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const registerUsername = document.getElementById('registerUsername').value;
            const registerEmail = document.getElementById('registerEmail').value;
            const registerPassword = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            register(registerUsername, registerEmail, registerPassword, confirmPassword);
        });
    }

    // Bouton de connexion sur la page galerie
    const galleryLoginBtn = document.getElementById('galleryLoginBtn');
    if (galleryLoginBtn) {
        galleryLoginBtn.addEventListener('click', function() {
            modal.style.display = 'block';
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
        });
    }

    /**
     * Vérifier si un utilisateur est déjà connecté
     */
    function checkLoggedInUser() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            loginBtn.style.display = 'none';
            registerBtn.style.display = 'none';
            userInfo.style.display = 'flex';
            username.textContent = user.username;

            // Si nous sommes sur la page galerie, afficher le formulaire d'upload
            const uploadSection = document.getElementById('uploadSection');
            const loginMessage = document.getElementById('loginMessage');
            const uploadForm = document.getElementById('uploadForm');
            
            if (uploadSection && loginMessage && uploadForm) {
                loginMessage.style.display = 'none';
                uploadForm.style.display = 'block';
            }
        } else {
            loginBtn.style.display = 'inline-block';
            registerBtn.style.display = 'inline-block';
            userInfo.style.display = 'none';

            // Si nous sommes sur la page galerie, masquer le formulaire d'upload
            const uploadSection = document.getElementById('uploadSection');
            const loginMessage = document.getElementById('loginMessage');
            const uploadForm = document.getElementById('uploadForm');
            
            if (uploadSection && loginMessage && uploadForm) {
                loginMessage.style.display = 'block';
                uploadForm.style.display = 'none';
            }
        }
    }

    /**
     * Connexion d'un utilisateur
     * @param {string} username - Nom d'utilisateur
     * @param {string} password - Mot de passe
     */
    function login(username, password) {
        // Récupérer les utilisateurs depuis le stockage local
        let users = localStorage.getItem('users');
        if (!users) {
            showNotification('Aucun compte n\'existe. Veuillez vous inscrire.', 'error');
            return;
        }

        users = JSON.parse(users);
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Stocker l'utilisateur connecté
            localStorage.setItem('currentUser', JSON.stringify({
                username: user.username,
                email: user.email
            }));

            // Fermer la fenêtre modale et mettre à jour l'interface
            modal.style.display = 'none';
            checkLoggedInUser();
            showNotification(`Bienvenue ${username} !`, 'success');
        } else {
            showNotification('Nom d\'utilisateur ou mot de passe incorrect.', 'error');
        }
    }

    /**
     * Inscription d'un nouvel utilisateur
     * @param {string} username - Nom d'utilisateur
     * @param {string} email - Email
     * @param {string} password - Mot de passe
     * @param {string} confirmPassword - Confirmation du mot de passe
     */
    function register(username, email, password, confirmPassword) {
        if (password !== confirmPassword) {
            showNotification('Les mots de passe ne correspondent pas.', 'error');
            return;
        }

        // Vérifier si l'utilisateur existe déjà
        let users = localStorage.getItem('users');
        if (users) {
            users = JSON.parse(users);
            const existingUser = users.find(u => u.username === username || u.email === email);
            if (existingUser) {
                showNotification('Cet utilisateur ou cet email existe déjà.', 'error');
                return;
            }
        } else {
            users = [];
        }

        // Ajouter le nouvel utilisateur
        users.push({
            username,
            email,
            password,
            createdAt: new Date().toISOString()
        });

        // Sauvegarder dans le stockage local
        localStorage.setItem('users', JSON.stringify(users));

        // Connecter automatiquement l'utilisateur
        localStorage.setItem('currentUser', JSON.stringify({
            username,
            email
        }));

        // Fermer la fenêtre modale et mettre à jour l'interface
        modal.style.display = 'none';
        checkLoggedInUser();
        showNotification(`Bienvenue ${username} ! Votre compte a été créé avec succès.`, 'success');
    }

    /**
     * Déconnexion de l'utilisateur
     */
    function logout() {
        localStorage.removeItem('currentUser');
        checkLoggedInUser();
        showNotification('Vous avez été déconnecté.', 'info');
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

    // Ajouter du CSS pour les notifications
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 9999;
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.3s, transform 0.3s;
            max-width: 300px;
        }
        .notification.show {
            opacity: 1;
            transform: translateY(0);
        }
        .notification.success {
            background-color: var(--success);
        }
        .notification.error {
            background-color: var(--danger);
        }
        .notification.info {
            background-color: var(--accent-color);
        }
    `;
    document.head.appendChild(notificationStyle);
});