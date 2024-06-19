// workbox-config.js
module.exports = {
    globDirectory: '/home/renault/renault_risk/app_home/react/src/', // Diretório onde os arquivos da PWA estão localizados
    globPatterns: ['**/*.{html,js,jsx,css,png,jpg,svg}'], // Padrões de arquivos a serem armazenados em cache
    globIgnores: [
        '**/node_modules/**/*',
        'service-worker.js',
        'workbox-*.js',
    ], // Arquivos a serem ignorados
    swDest: '/home/renault/renault_risk/app_home/react/src/service-worker.js', // Caminho para o arquivo do service worker gerado,
    runtimeCaching: [
        {
            urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst',
            options: {
                cacheName: 'images-cache',
                expiration: {
                    maxEntries: 50,
                    maxAgeSeconds: 7 * 24 * 60 * 60, // Cache expira em 7 dias
                },
            },
        },
        {
            urlPattern: /\.(?:js|jsx|css)$/,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'static-resources',
            },
        },
    ],
};
