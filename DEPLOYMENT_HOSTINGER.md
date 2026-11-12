# Brandum INC – Hostinger Deployment & Supabase Setup Guide

This comprehensive guide details the exact steps to deploy the **Brandum INC Market Research** Next.js & Supabase application onto Hostinger (Cloud / VPS or Hostinger Node.js Application Hosting).

---

## 1. Supabase Database & Auth Configuration

1. Log into your [Supabase Dashboard](https://supabase.com).
2. Create a new project or select your existing Brandum project.
3. Open the **SQL Editor** in Supabase:
   - Run the full schema script from `supabase/schema.sql` (creates tables: `profiles`, `admin_profiles`, `company_profiles`, `services`, `industries`, `contact_enquiries`, `website_content`, RLS policies, triggers, and indices).
   - Run the seed script from `supabase/seed.sql` (populates all 17 services, all 11 industries, company profile, and website content blocks).
4. In **Project Settings -> API**:
   - Copy `Project URL` (e.g. `https://xyzcompany.supabase.co`)
   - Copy `anon` `public` key
   - Copy `service_role` `secret` key (keep this strictly private)
5. In **Authentication -> URL Configuration**:
   - Set Site URL to your domain: `https://yourbrandumdomain.com` (or `http://localhost:3000` during testing).
   - Add redirect URLs:
     - `https://yourbrandumdomain.com/join/dashboard`
     - `https://yourbrandumdomain.com/admin/dashboard`

---

## 2. Environment Variables Configuration

Create a `.env.production` file on your Hostinger server or set the environment variables in your Hostinger control panel:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-public-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-secret-key"

# Single Super Admin Configuration
SUPER_ADMIN_EMAIL="admin@branduminc.com"
SUPER_ADMIN_DEFAULT_PASSWORD="YourSecureAdminPassword123!"
SUPER_ADMIN_SETUP_KEY="brandum-secure-setup-2026"

# Live Production Site URL
NEXT_PUBLIC_SITE_URL="https://yourbrandumdomain.com"
PORT=3000
NODE_ENV=production
```

---

## 3. Deployment on Hostinger VPS (Recommended Option)

Hostinger VPS provides full Ubuntu Linux environment with Node.js and PM2.

### Step 1: Connect via SSH
```bash
ssh root@your_hostinger_vps_ip
```

### Step 2: Install Node.js (v20+ or v22) & PM2
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs git
sudo npm install -g pm2
```

### Step 3: Clone or Upload the Code
```bash
mkdir -p /var/www/brandum
cd /var/www/brandum
# Upload project files or git clone:
# git clone <your-repo-url> .
```

### Step 4: Install Dependencies & Build Next.js
```bash
npm install
npm run build
```

Next.js is configured with `output: "standalone"` in `next.config.ts`.
Copy the static assets to standalone folder:
```bash
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
```

### Step 5: Start the Application with PM2
```bash
cd /var/www/brandum/.next/standalone
pm2 start server.js --name "brandum-website"
pm2 save
pm2 startup
```

### Step 6: Configure Nginx Reverse Proxy & SSL (Certbot)
Create `/etc/nginx/sites-available/brandum`:
```nginx
server {
    server_name yourbrandumdomain.com www.yourbrandumdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable site and install free Let's Encrypt SSL:
```bash
sudo ln -s /etc/nginx/sites-available/brandum /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d yourbrandumdomain.com -d www.yourbrandumdomain.com
```

---

## 4. Deployment on Hostinger Node.js Application (hPanel)

If using Hostinger Web / Cloud Hosting with the **Node.js Selector** in hPanel:

1. In hPanel, go to **Advanced -> Node.js**.
2. Click **Create Application**:
   - **Node.js Version**: Select 20.x or 22.x.
   - **Application Mode**: Production.
   - **Application Root**: `brandum` (or `public_html`).
   - **Application Startup File**: `server.js` or `npm start`.
3. Upload the project files (via Git, FTP, or File Manager).
4. Run `npm install` and `npm run build` from the hPanel terminal or SSH.
5. In hPanel Environment Variables, add the Supabase and admin variables listed in Section 2.
6. Click **Restart Application**.

---

## 5. Initializing the Single Super Admin Account

1. Navigate to `https://yourbrandumdomain.com/admin/login`.
2. Click **"First-time Setup / Bootstrap Single Admin"**.
3. Enter your setup key (`brandum-secure-setup-2026`) and your chosen secure password.
4. Click **"Create Single Admin Account"**.
5. Once confirmed, log in immediately with:
   - **Email**: `admin@branduminc.com`
   - **Password**: Your configured password.
6. You now have full access to manage:
   - User Accounts (`/admin/users`)
   - Services (`/admin/services`)
   - Industries (`/admin/industries`)
   - Enquiries (`/admin/enquiries`)
   - Company Profile (`/admin/company-profile`)
   - Website Content (`/admin/website-content`)

