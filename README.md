# 🍕 Bella Massa - Sistema Completo de Pizzaria

Sistema web profissional completo para pizzaria artesanal com delivery, desenvolvido com Next.js 14, TypeScript, Prisma e PostgreSQL.

## 🚀 Funcionalidades

### Frontend (Cliente)
- ✅ Página institucional moderna e responsiva
- ✅ Cardápio digital interativo com filtros
- ✅ Sistema de produtos com múltiplas variações (tamanhos)
- ✅ Adicionais configuráveis (bordas, extras)
- ✅ Carrinho de compras
- ✅ Checkout completo
- ✅ Integração inteligente com WhatsApp
- ✅ Rastreamento de leads com UTM
- ✅ Design italiano sofisticado
- ✅ Animações suaves com Framer Motion
- ✅ SEO otimizado

### Backend (Admin)
- ✅ Painel administrativo completo
- ✅ Gerenciamento de produtos
- ✅ Controle de variações e estoque
- ✅ Gestão de pedidos em tempo real
- ✅ Atualização de status de pedidos:
  - Recebido
  - Em preparo
  - Pronto
  - Saiu para entrega
  - Entregue
- ✅ Dashboard com métricas:
  - Total de vendas
  - Ticket médio
  - Produto mais vendido
  - Cliques no WhatsApp
- ✅ Base de clientes
- ✅ Relatórios e análises

### Integrações
- ✅ WhatsApp com mensagens personalizadas
- ✅ Sistema de pagamento (Stripe/Mercado Pago)
- ✅ Email automático após pedido
- ✅ Rastreamento de leads e UTM
- ✅ Atualização automática de estoque

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js
- **Payments**: Stripe, Mercado Pago
- **Email**: Nodemailer
- **Deploy**: Vercel (Frontend) + Supabase (Database)

## 📦 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/bella-massa.git
cd bella-massa
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Copie o arquivo `.env.example` para `.env` e preencha as variáveis:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/bellamassa"

# NextAuth
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN="APP_USR-..."

# Email
EMAIL_SERVER="smtp://user:pass@smtp.gmail.com:587"
EMAIL_FROM="contato@bellamassa.com.br"

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER="5542999887766"
```

### 4. Configure o banco de dados
```bash
# Criar as tabelas
npx prisma migrate dev --name init

# Gerar o Prisma Client
npx prisma generate

# (Opcional) Popular com dados de exemplo
npx prisma db seed
```

### 5. Execute o projeto
```bash
npm run dev
```

Acesse: http://localhost:3000

## 🗄️ Estrutura do Banco de Dados

### Principais Tabelas

- **User**: Usuários admin do sistema
- **Category**: Categorias de produtos (Pizzas, Massas, Bebidas, etc)
- **Product**: Produtos do cardápio
- **ProductVariation**: Variações de tamanho e preço
- **Additional**: Adicionais disponíveis (bordas, extras)
- **Customer**: Clientes
- **Order**: Pedidos
- **OrderItem**: Itens do pedido
- **OrderItemAdditional**: Adicionais dos itens
- **Lead**: Rastreamento de leads
- **WhatsAppClick**: Cliques no WhatsApp
- **Review**: Avaliações
- **SiteConfig**: Configurações do site

## 📱 Integração WhatsApp

O sistema rastreia automaticamente todos os cliques no WhatsApp e cria leads.

### Mensagens Personalizadas

**Produto específico:**
```
Olá, vim pelo site da Bella Massa e gostaria de mais informações sobre Pizza Margherita.
```

**Acompanhamento de pedido:**
```
Olá, finalizei um pedido pelo site (Pedido #240215001) e gostaria de acompanhar.
```

**Geral:**
```
Olá, vim pelo site da Bella Massa e gostaria de fazer um pedido.
```

### Rastreamento
- Todos os cliques são salvos no banco
- Captura UTM parameters
- IP e User Agent
- Página de origem

## 💳 Pagamentos

### Stripe (Cartão de Crédito)
```typescript
// Configuração no checkout
const paymentIntent = await stripe.paymentIntents.create({
  amount: total * 100, // centavos
  currency: 'brl',
  metadata: { orderId }
})
```

### Mercado Pago (PIX/Boleto)
```typescript
// Configuração no checkout
const preference = {
  items: [{
    title: 'Pedido #' + orderNumber,
    unit_price: total,
    quantity: 1,
  }],
  back_urls: {
    success: '/pedido/sucesso',
    failure: '/pedido/erro',
  }
}
```

## 🎨 Identidade Visual

### Cores
- **Vermelho Escuro**: #8B0000 (Principal)
- **Verde Oliva**: #556B2F (Secundária)
- **Dourado**: #C9A227 (Destaque)
- **Preto**: Base escura
- **Branco**: Texto e detalhes

### Tipografia
- **Display**: Playfair Display (Títulos)
- **Body**: Crimson Pro (Corpo de texto)
- **Sans**: Inter (UI)

## 📊 Dashboard Admin

Acesse: `/admin`

### Métricas Disponíveis
- Pedidos hoje
- Faturamento hoje
- Ticket médio
- Pedidos ativos
- Total de pedidos
- Cliques WhatsApp
- Produto mais vendido

### Funcionalidades Admin
- Criar/editar produtos
- Gerenciar variações
- Controlar estoque
- Ver pedidos em tempo real
- Atualizar status
- Base de clientes
- Relatórios detalhados

## 🔐 Autenticação

Sistema de autenticação com NextAuth.js

### Criar primeiro usuário admin:
```bash
npx prisma studio
```

Vá em "User" e crie manualmente:
- email: admin@bellamassa.com.br
- name: Admin
- password: (use bcrypt hash)
- role: ADMIN

Ou use o seed:
```bash
npx prisma db seed
```

## 🚀 Deploy

### Vercel (Frontend)
```bash
# Instale o Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Supabase (Database)
1. Crie um projeto em https://supabase.com
2. Copie a connection string
3. Atualize `DATABASE_URL` no Vercel

### Variáveis de Ambiente no Vercel
Configure todas as variáveis do `.env` nas configurações do projeto.

## 📈 SEO

### Meta Tags
- Título otimizado
- Descrição única
- Open Graph
- Twitter Cards

### Schema.org
```json
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Bella Massa",
  "image": "...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Itália, 145",
    "addressLocality": "Ponta Grossa",
    "addressRegion": "PR",
    "postalCode": "84010-120"
  },
  "telephone": "+5542999887766",
  "servesCuisine": "Italiana",
  "priceRange": "$$"
}
```

## 🧪 Testes

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📝 Licença

© 2026 Bella Massa. Todos os direitos reservados.

Desenvolvido por [MX Sites](https://mxsites.com.br)

## 🆘 Suporte

- Email: contato@bellamassa.com.br
- WhatsApp: (42) 99988-7766
- Endereço: Rua Itália, 145 – Centro – Ponta Grossa – PR

## 🔄 Próximas Features

- [ ] App mobile (React Native)
- [ ] Sistema de fidelidade
- [ ] Programa de cupons
- [ ] Integração com iFood
- [ ] Cardápio digital por QR Code
- [ ] Sistema de reservas
- [ ] Chat interno
- [ ] Notificações push
