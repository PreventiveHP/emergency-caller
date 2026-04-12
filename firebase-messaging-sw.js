importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Configuración de Firebase (usando tus keys)
firebase.initializeApp({
    apiKey: "AIzaSyDVIQ4S-w4Ag40uYuArW3o7Hw2XQwoQV7U",
    authDomain: "montcode-e02c7.firebaseapp.com",
    databaseURL: "https://montcode-e02c7-default-rtdb.firebaseio.com",
    projectId: "montcode-e02c7",
    storageBucket: "montcode-e02c7.firebasestorage.app",
    messagingSenderId: "988300151844",
    appId: "1:988300151844:web:b1a31275a9555de98a9cb1"
});

const messaging = firebase.messaging();

// Este evento captura la notificación cuando la app está en segundo plano o cerrada
messaging.onBackgroundMessage((payload) => {
    console.log('[sw.js] Alerta de Rescate recibida en segundo plano:', payload);

    const notificationTitle = payload.notification.title || 'ALERTA CRÍTICA SOS';
    const notificationOptions = {
        body: payload.notification.body || 'Se ha detectado una señal de emergencia.',
        icon: 'logo.png.jpg',
        badge: 'logo.png.jpg',
        tag: 'emergency-alert', // Evita que se amontonen, reemplaza la anterior
        renotify: true,
        vibrate: [500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170, 40],
        data: {
            url: window.location.origin // Al tocar la notificación, abre la app
        },
        actions: [
            { action: 'open', title: 'VER UBICACIÓN' }
        ]
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Lógica para abrir la app al hacer clic en la notificación
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
