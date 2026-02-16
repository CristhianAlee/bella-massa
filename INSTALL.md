# 🚀 Guia de Instalação Rápida - Bella Massa

## Pré-requisitos
- Node.js 18+ 
- PostgreSQL 14+
- npm ou yarn

## Instalação em 5 minutos

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar banco de dados

#### Opção A: PostgreSQL Local
```bash
# Criar banco
createdb bellamassa

# Configurar .env
DATABASE_URL="postgresql://seu_usuario:sua_senha@localhost:5432/bellamassa"
```

#### Opção B: Supabase (Recomendado)
1. Acesse https://supabase.com
2. Crie um projeto
3. Copie a "Connection String"
4. Cole no .env:
```env
DATABASE_URL="postgresql://..."
```

### 3. Executar migrations
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Criar primeiro admin
```bash
# Abrir Prisma Studio
npx prisma studio

# Ir em "User" e criar:
# - email: admin@bellamassa.com.br
# - name: Admin
# - password: $2b$10$... (use: https://bcrypt-generator.com/)
# - role: ADMIN
```

### 5. Popular dados de exemplo (opcional)
```bash
npx prisma db seed
```

### 6. Iniciar servidor
```bash
npm run dev
```

Acesse: http://localhost:3000

## Configurações Essenciais

### .env mínimo para funcionar:
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="gere-com-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_WHATSAPP_NUMBER="5542999887766"
```

### Adicione depois:
```env
# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN="APP_USR-..."

# Email
EMAIL_SERVER="smtp://..."
EMAIL_FROM="contato@bellamassa.com.br"
```

## Testes Rápidos

### 1. Testar Frontend
- Acesse http://localhost:3000
- Navegue pelo cardápio
- Adicione item ao carrinho
- Teste WhatsApp

### 2. Testar Admin
- Acesse http://localhost:3000/admin
- Login com credenciais criadas
- Adicione um produto
- Crie um pedido de teste

### 3. Testar APIs
```bash
# Listar produtos
curl http://localhost:3000/api/products

# Listar pedidos
curl http://localhost:3000/api/orders
```

## Problemas Comuns

### Erro de conexão com banco
```bash
# Verificar se PostgreSQL está rodando
pg_isready

# Testar conexão
psql -U seu_usuario -d bellamassa
```

### Erro no Prisma
```bash
# Resetar e recriar
npx prisma migrate reset
npx prisma migrate dev
npx prisma generate
```

### Erro de módulos
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install
```

## Deploy Rápido

### Vercel (1 clique)
1. Push código para GitHub
2. Acesse https://vercel.com
3. Importe repositório
4. Adicione variáveis de ambiente
5. Deploy!

### Banco de dados
Use Supabase (grátis): https://supabase.com

## Próximos Passos

1. ✅ Personalizar cores no `tailwind.config.js`
2. ✅ Adicionar produtos reais via admin
3. ✅ Configurar pagamentos (Stripe/MP)
4. ✅ Configurar email (Gmail SMTP)
5. ✅ Testar pedido completo
6. ✅ Deploy em produção

## Suporte

- 📧 Email: suporte@mxsites.com.br
- 💬 WhatsApp: (42) 99988-7766
- 🌐 Site: https://mxsites.com.br

---

**Desenvolvido com ❤️ por MX Sites**
