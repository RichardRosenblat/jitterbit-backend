export default {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Jitterbit Backend API',
            version: '1.0.0',
            description: 'Api para gerenciamento de pedidos de uma loja virtual fictícia, desenvolvida para o desafio técnico da Jitterbit.',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor local de desenvolvimento',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};
