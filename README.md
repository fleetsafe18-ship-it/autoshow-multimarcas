# AutoShow Multimarcas

Site + painel admin da AutoShow Multimarcas (carros e motos seminovos).

## Estrutura

```
backend/     API Express + SQLite (node:sqlite), autenticação do admin, upload de fotos
frontend/    React + Vite + Framer Motion — vitrine pública e painel admin
```

## Como rodar local

Em dois terminais:

```bash
cd backend
npm install
npm run dev
```

```bash
cd frontend
npm install
npm run dev
```

- Vitrine: http://localhost:3002
- Painel admin: http://localhost:3002/admin/login (usuário `admin`, senha em `backend/.env`)
- API: http://localhost:3001

O banco SQLite é criado automaticamente em `backend/data/bsveiculos.sqlite3` na primeira execução — nada para instalar.

## Configuração

Edite `backend/.env` (copiado de `.env.example`) para trocar usuário/senha do admin,
o segredo do token e a porta. `frontend/.env` define `VITE_API_URL` (a URL da API).

## Banco de dados

- `veiculos`: id, tipo (carro/moto/caminhao/outro), marca, modelo, ano, km, combustivel,
  cambio, cor, preco, descricao, detalhes_extras, disponivel
- `veiculo_fotos`: id, veiculo_id, url, ordem — múltiplas fotos por veículo, exibidas na
  ordem do campo `ordem`. A primeira é a capa usada no card da vitrine.

## API

| Rota | Auth | Descrição |
|---|---|---|
| `GET /veiculos?tipo=` | não | Lista veículos disponíveis (filtro opcional por tipo) |
| `GET /veiculos/:id` | não | Um veículo, com fotos |
| `POST /admin/login` | não | `{ usuario, senha }` → `{ token }` |
| `GET /admin/veiculos` | sim | Lista todos os veículos |
| `GET /admin/veiculos/:id` | sim | Um veículo |
| `POST /admin/veiculos` | sim | Cria veículo |
| `PUT /admin/veiculos/:id` | sim | Atualiza campos (ex: `{ disponivel: false }` marca como vendido) |
| `DELETE /admin/veiculos/:id` | sim | Remove veículo, fotos e arquivos |
| `POST /admin/veiculos/:id/fotos` | sim | Multipart, campo `fotos` (múltiplos arquivos) |
| `PUT /admin/veiculos/:id/fotos/ordem` | sim | `{ ordem: [idFoto, ...] }` |
| `DELETE /admin/veiculos/:id/fotos/:fotoId` | sim | Remove uma foto |

Rotas `sim` exigem header `Authorization: Bearer <token>`.

## Identidade visual

Dark mode (`#0B0D12`), acento azul `#0058FF`, Space Grotesk (títulos) + Manrope
(texto), cards e painéis em vidro fosco (glass). Logo em `frontend/public/img/logo-autoshow.png`
(PNG com transparência real) e foto da fachada em `frontend/public/img/fachada-autoshow.jpg`.

### Configuração pendente

`frontend/src/lib/constants.js` centraliza os dados da loja. Os seguintes campos
ainda não foram preenchidos com informações reais da AutoShow Multimarcas — o
site funciona sem eles, mas os botões de WhatsApp e o endereço ficam inativos
até serem configurados:

- `WHATSAPP_NUMBER` / `WHATSAPP_DISPLAY`
- `SITE_LOCATION` / `SITE_ADDRESS`
- `INSTAGRAM_HANDLE` / `INSTAGRAM_URL`
