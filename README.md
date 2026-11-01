# Atlas

Plataforma de planejamento de viagens (projeto de portfólio Front-End).
React 19 · TypeScript · Vite · Tailwind CSS v4 · React Router 7 · i18next (pt/en/ja) · React Leaflet · Open-Meteo.

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # verificação de tipos + build de produção
npm run preview  # servir o build
```

## Rotas

| Rota | Página |
| --- | --- |
| `/` | Início |
| `/explore` | Explorar (busca, categorias, lista/mapa; filtros na URL) |
| `/destination/:id` | Detalhes, mapa e previsão do tempo |
| `/favorites` | Favoritos |
| `/trips` | Minhas viagens (`?destination=<id>` pré-seleciona o destino) |
| `*` | 404 |

## Dados e persistência

- Favoritos, viagens e idioma ficam no `localStorage` do navegador (sem backend nem login).
- Previsão: Open-Meteo (sem chave). Mapa: OpenStreetMap. Fotos: Wikimedia Commons (créditos na página de cada destino).
- Se uma API externa falhar, o app mostra o erro com botão de nova tentativa; nada é inventado no lugar.

## Publicação

- `index.html` usa `/og-image.png` como imagem de compartilhamento. Para pré-visualizações em redes sociais,
  troque por uma URL absoluta do seu domínio (`og:image`) e adicione `og:url`.
- Como é uma SPA, configure a hospedagem para devolver `index.html` em rotas desconhecidas.
