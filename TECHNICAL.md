# 📚 Documentação Técnica - Bella Massa

## Arquitetura do Sistema

### Stack Tecnológico

```
┌─────────────────────────────────────────┐
│           Frontend (Next.js)            │
│  ┌─────────────────────────────────┐   │
│  │  React 18 + TypeScript          │   │
│  │  Tailwind CSS + Framer Motion   │   │
│  │  Client Components              │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│        API Routes (Next.js)             │
│  ┌─────────────────────────────────┐   │
│  │  /api/products                  │   │
│  │  /api/orders                    │   │
│  │  /api/whatsapp/track            │   │
│  │  /api/payments                  │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│         Prisma ORM                      │
│  ┌─────────────────────────────────┐   │
│  │  Type-safe queries              │   │
│  │  Migrations                     │   │
│  │  Relations                      │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│       PostgreSQL Database               │
│  ┌─────────────────────────────────┐   │
│  │  13 tabelas principais          │   │
│  │  Relacionamentos complexos      │   │
│  │  Índices otimizados             │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

## Estrutura de Diretórios

```
bella-massa-system/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Homepage
│   │   ├── layout.tsx               # Layout principal
│   │   ├── globals.css              # Estilos globais
│   │   ├── cardapio/
│   │   │   └── page.tsx             # Página do cardápio
│   │   ├── carrinho/
│   │   │   └── page.tsx             # Carrinho de compras
│   │   ├── checkout/
│   │   │   └── page.tsx             # Checkout
│   │   ├── admin/
│   │   │   ├── page.tsx             # Dashboard admin
│   │   │   ├── produtos/
│   │   │   ├── pedidos/
│   │   │   └── relatorios/
│   │   └── api/
│   │       ├── products/
│   │       │   └── route.ts         # CRUD produtos
│   │       ├── orders/
│   │       │   └── route.ts         # CRUD pedidos
│   │       ├── whatsapp/
│   │       │   └── track/
│   │       │       └── route.ts     # Track WhatsApp
│   │       └── payments/
│   │           ├── stripe/
│   │           └── mercadopago/
│   ├── components/
│   │   ├── ui/                      # Componentes UI
│   │   ├── products/                # Componentes de produtos
│   │   └── admin/                   # Componentes admin
│   └── lib/
│       ├── prisma.ts                # Prisma Client
│       ├── whatsapp.ts              # Utils WhatsApp
│       ├── orders.ts                # Utils pedidos
│       └── payments.ts              # Utils pagamentos
├── prisma/
│   ├── schema.prisma                # Schema do banco
│   ├── seed.ts                      # Dados de exemplo
│   └── migrations/                  # Histórico de migrations
├── public/
│   ├── images/                      # Imagens públicas
│   └── favicon.ico
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── .env.example
├── README.md
└── INSTALL.md
```

## Modelos de Dados

### User (Administradores)
```typescript
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  password  String   // Bcrypt hash
  role      Role     @default(ADMIN)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Product (Produtos do Cardápio)
```typescript
model Product {
  id          String            @id @default(cuid())
  name        String
  slug        String            @unique
  description String
  image       String?
  category    Category          @relation(fields: [categoryId], references: [id])
  categoryId  String
  active      Boolean           @default(true)
  featured    Boolean           @default(false)
  variations  ProductVariation[]
  orderItems  OrderItem[]
}
```

### ProductVariation (Tamanhos e Preços)
```typescript
model ProductVariation {
  id          String      @id @default(cuid())
  product     Product     @relation(fields: [productId], references: [id])
  productId   String
  name        String      // Pequena, Média, Grande
  price       Decimal     @db.Decimal(10, 2)
  stock       Int         @default(0)
  active      Boolean     @default(true)
  orderItems  OrderItem[]
}
```

### Order (Pedidos)
```typescript
model Order {
  id              String        @id @default(cuid())
  orderNumber     String        @unique  // 240215001
  customer        Customer      @relation(fields: [customerId], references: [id])
  customerId      String
  status          OrderStatus   @default(RECEIVED)
  paymentMethod   PaymentMethod
  paymentStatus   PaymentStatus @default(PENDING)
  subtotal        Decimal       @db.Decimal(10, 2)
  deliveryFee     Decimal       @db.Decimal(10, 2)
  discount        Decimal       @db.Decimal(10, 2)
  total           Decimal       @db.Decimal(10, 2)
  items           OrderItem[]
}
```

## APIs Disponíveis

### Products API

#### GET /api/products
Lista todos os produtos ativos

**Query Parameters:**
- `categoryId` (optional): Filtrar por categoria
- `featured` (optional): Apenas produtos em destaque

**Response:**
```json
[
  {
    "id": "abc123",
    "name": "Pizza Margherita",
    "slug": "pizza-margherita",
    "description": "...",
    "category": { "name": "Pizzas" },
    "variations": [
      {
        "id": "var1",
        "name": "Média (30cm)",
        "price": 45.90,
        "stock": 100
      }
    ]
  }
]
```

#### POST /api/products
Criar novo produto (Auth required)

**Body:**
```json
{
  "name": "Pizza Nova",
  "description": "Descrição",
  "categoryId": "cat123",
  "featured": false,
  "variations": [
    { "name": "Pequena", "price": 35.90, "stock": 100 }
  ]
}
```

#### PUT /api/products
Atualizar produto (Auth required)

#### DELETE /api/products?id=xxx
Deletar produto (Auth required)

### Orders API

#### GET /api/orders
Lista pedidos

**Query Parameters:**
- `status`: RECEIVED | PREPARING | READY | OUT_FOR_DELIVERY | DELIVERED
- `customerId`: Filtrar por cliente
- `limit`: Número máximo de resultados (default: 50)

#### POST /api/orders
Criar novo pedido

**Body:**
```json
{
  "customer": {
    "name": "João Silva",
    "phone": "42999887766",
    "email": "joao@email.com"
  },
  "items": [
    {
      "productId": "prod123",
      "variationId": "var123",
      "quantity": 2,
      "price": 45.90,
      "additionals": ["add1", "add2"]
    }
  ],
  "deliveryType": "DELIVERY",
  "paymentMethod": "CREDIT_CARD",
  "deliveryAddress": "Rua X, 123",
  "notes": "Sem cebola"
}
```

**Response:**
```json
{
  "id": "order123",
  "orderNumber": "240215001",
  "status": "RECEIVED",
  "total": 97.80,
  "customer": { ... },
  "items": [ ... ]
}
```

#### PUT /api/orders
Atualizar status do pedido

**Body:**
```json
{
  "id": "order123",
  "status": "PREPARING",
  "paymentStatus": "PAID"
}
```

### WhatsApp Tracking API

#### POST /api/whatsapp/track
Registrar clique no WhatsApp

**Body:**
```json
{
  "productId": "prod123",
  "orderId": "order123",
  "page": "/cardapio",
  "utmSource": "instagram",
  "utmMedium": "social",
  "utmCampaign": "promo-verao"
}
```

## Integração WhatsApp

### Geração de Link
```typescript
import { generateWhatsAppLink, getWhatsAppMessageForProduct } from '@/lib/whatsapp'

// Produto específico
const message = getWhatsAppMessageForProduct('Pizza Margherita')
const link = generateWhatsAppLink(message, {
  source: 'website',
  medium: 'cardapio',
  campaign: 'destaque'
})

// Link gerado:
// https://wa.me/5542999887766?text=Olá...&utm_source=website&utm_medium=cardapio
```

### Rastreamento
```typescript
// Client-side
const handleWhatsAppClick = async () => {
  // Registrar clique
  await fetch('/api/whatsapp/track', {
    method: 'POST',
    body: JSON.stringify({
      productId: product.id,
      page: window.location.pathname,
      utmSource: new URLSearchParams(window.location.search).get('utm_source'),
    })
  })
  
  // Abrir WhatsApp
  window.open(whatsappLink, '_blank')
}
```

## Sistema de Pagamentos

### Stripe (Cartão)

```typescript
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Criar payment intent
const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(order.total * 100), // centavos
  currency: 'brl',
  metadata: {
    orderId: order.id,
    orderNumber: order.orderNumber,
  },
})

// Client-side
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const stripe = await stripePromise
await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: cardElement,
    billing_details: { name: 'Customer Name' }
  }
})
```

### Mercado Pago (PIX/Boleto)

```typescript
import { MercadoPagoConfig, Payment } from 'mercadopago'

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!
})

const payment = new Payment(client)

// Criar preferência
const preference = await payment.create({
  body: {
    transaction_amount: order.total,
    description: `Pedido #${order.orderNumber}`,
    payment_method_id: 'pix',
    payer: {
      email: customer.email,
    },
    notification_url: `${baseUrl}/api/webhooks/mercadopago`,
  }
})

// QR Code PIX: preference.point_of_interaction.transaction_data.qr_code
```

## Controle de Estoque

### Atualização Automática
```typescript
import { updateProductStock } from '@/lib/orders'

// Ao criar pedido - diminuir estoque
for (const item of order.items) {
  await updateProductStock(
    item.variationId,
    item.quantity,
    'decrease'
  )
}

// Ao cancelar pedido - devolver estoque
await updateProductStock(
  item.variationId,
  item.quantity,
  'increase'
)
```

### Verificação de Estoque
```typescript
const variation = await prisma.productVariation.findUnique({
  where: { id: variationId }
})

if (variation.stock < quantity) {
  throw new Error('Estoque insuficiente')
}
```

## SEO e Performance

### Meta Tags Dinâmicas
```typescript
// app/cardapio/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.slug)
  
  return {
    title: `${product.name} - Bella Massa`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}
```

### Schema.org
```typescript
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Bella Massa",
  "image": "...",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rua Itália, 145",
    "addressLocality": "Ponta Grossa",
    "addressRegion": "PR",
    "postalCode": "84010-120",
    "addressCountry": "BR"
  },
  "telephone": "+5542999887766",
  "servesCuisine": ["Italiana", "Pizza"],
  "priceRange": "$$",
  "openingHours": "Tu-Su 18:00-23:00"
}
```

### Image Optimization
```typescript
import Image from 'next/image'

<Image
  src={product.image}
  alt={product.name}
  width={800}
  height={600}
  quality={85}
  priority={featured}
  placeholder="blur"
/>
```

## Segurança

### Autenticação (NextAuth)
```typescript
// app/api/auth/[...nextauth]/route.ts
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (!user) return null
        
        const valid = await bcrypt.compare(
          credentials.password,
          user.password
        )
        
        if (!valid) return null
        
        return { id: user.id, email: user.email, name: user.name }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: '/admin/login',
  }
}
```

### Proteção de Rotas
```typescript
import { getServerSession } from 'next-auth'

export async function GET(request: NextRequest) {
  const session = await getServerSession()
  
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Continue...
}
```

### Validação de Dados (Zod)
```typescript
import { z } from 'zod'

const createOrderSchema = z.object({
  customer: z.object({
    name: z.string().min(3),
    phone: z.string().regex(/^\d{10,11}$/),
    email: z.string().email().optional(),
  }),
  items: z.array(z.object({
    productId: z.string(),
    variationId: z.string(),
    quantity: z.number().min(1),
  })).min(1),
  deliveryType: z.enum(['DELIVERY', 'PICKUP', 'DINE_IN']),
})

// Uso
const validated = createOrderSchema.parse(body)
```

## Webhooks

### Stripe
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: NextRequest) {
  const sig = request.headers.get('stripe-signature')!
  const body = await request.text()
  
  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )
  
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object
    
    // Atualizar pedido
    await prisma.order.update({
      where: { id: paymentIntent.metadata.orderId },
      data: { paymentStatus: 'PAID' }
    })
  }
  
  return NextResponse.json({ received: true })
}
```

### Mercado Pago
```typescript
// app/api/webhooks/mercadopago/route.ts
export async function POST(request: NextRequest) {
  const body = await request.json()
  
  if (body.type === 'payment') {
    const payment = await mercadopago.payment.get(body.data.id)
    
    if (payment.status === 'approved') {
      await prisma.order.update({
        where: { id: payment.external_reference },
        data: { paymentStatus: 'PAID' }
      })
    }
  }
  
  return NextResponse.json({ success: true })
}
```

## Métricas e Analytics

### Dashboard Queries
```typescript
// Total de vendas hoje
const todayRevenue = await prisma.order.aggregate({
  where: {
    createdAt: {
      gte: new Date(new Date().setHours(0, 0, 0, 0))
    },
    paymentStatus: 'PAID'
  },
  _sum: { total: true }
})

// Ticket médio
const avgTicket = await prisma.order.aggregate({
  where: { paymentStatus: 'PAID' },
  _avg: { total: true }
})

// Produto mais vendido
const topProduct = await prisma.orderItem.groupBy({
  by: ['productId'],
  _sum: { quantity: true },
  orderBy: { _sum: { quantity: 'desc' } },
  take: 1
})

// Cliques WhatsApp hoje
const whatsappClicks = await prisma.whatsAppClick.count({
  where: {
    createdAt: {
      gte: new Date(new Date().setHours(0, 0, 0, 0))
    }
  }
})
```

## Deploy

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Environment Variables (Vercel)
```
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
STRIPE_SECRET_KEY
STRIPE_PUBLISHABLE_KEY
MERCADOPAGO_ACCESS_TOKEN
EMAIL_SERVER
EMAIL_FROM
```

### Database (Supabase)
1. Criar projeto em https://supabase.com
2. Copiar connection string
3. Adicionar no Vercel como `DATABASE_URL`
4. Executar migrations:
```bash
npx prisma migrate deploy
```

## Monitoramento

### Logs
```typescript
// Structured logging
console.log('[ORDER] Criado:', {
  orderId: order.id,
  orderNumber: order.orderNumber,
  total: order.total,
  timestamp: new Date().toISOString()
})
```

### Error Tracking (Sentry)
```typescript
import * as Sentry from '@sentry/nextjs'

try {
  // código
} catch (error) {
  Sentry.captureException(error)
  throw error
}
```

---

**Desenvolvido com ❤️ por MX Sites**
