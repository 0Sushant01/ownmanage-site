# OWNMANAGE — Coming Soon Landing Page

Official static Coming Soon website for **OWNMANAGE** ([ownmanage.in](https://ownmanage.in)), an upcoming SaaS platform for smart attendance, employee management, and payroll/salary management for growing businesses.

Built with pure **HTML5, CSS3, and Vanilla JavaScript**. Designed for 100% compatibility with **GitHub Pages** with zero build steps or external dependencies.

---

## 📁 Repository Structure

```text
ownmanage-site/
│
├── index.html          # Semantic HTML5 markup, SEO meta tags, and structured layout
├── style.css           # Modern SaaS CSS design system with CSS custom properties
├── script.js           # Vanilla JS: config, modals, mobile nav, launch timer
├── CNAME               # GitHub Pages custom domain configuration (ownmanage.in)
│
├── assets/
│   ├── logo.svg        # Official OWNMANAGE vector logo
│   └── favicon.svg     # SVG vector favicon
│
└── README.md           # Documentation & GoDaddy / GitHub Pages DNS deployment guide
```

---

## 🚀 GitHub Pages Setup Guide

This website requires **no build step**, Node.js, or server setup.

### Step-by-Step Deployment:

1. Push this repository to your GitHub account (e.g. `0Sushant01/ownmanage-site`).
2. Go to your repository on GitHub and click **Settings**.
3. In the left navigation, select **Pages**.
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` (or `master`) and folder `/ (root)`.
   - Click **Save**.
5. Under **Custom domain**:
   - Enter: `ownmanage.in`
   - Click **Save**. (GitHub will verify the existing `CNAME` file in the repo).
6. Check **Enforce HTTPS** once your DNS records have verified and GitHub generates the Let's Encrypt certificate.

---

## 🌐 DNS Configuration for GoDaddy

To link your custom domain `ownmanage.in` and `www.ownmanage.in` to GitHub Pages, configure the following DNS records in your **GoDaddy Domain Control Center**:

### 1. Apex Domain A Records (`ownmanage.in`)
Add four `A` records pointing to GitHub Pages official server IP addresses:

| Type | Name / Host | Value / Target | TTL |
|------|-------------|----------------|-----|
| `A`  | `@`         | `185.199.108.153` | 1 Hour / Automatic |
| `A`  | `@`         | `185.199.109.153` | 1 Hour / Automatic |
| `A`  | `@`         | `185.199.110.153` | 1 Hour / Automatic |
| `A`  | `@`         | `185.199.111.153` | 1 Hour / Automatic |

### 2. Subdomain CNAME Record (`www.ownmanage.in`)
Add a `CNAME` record for the `www` subdomain:

| Type    | Name / Host | Value / Target | TTL |
|---------|-------------|----------------|-----|
| `CNAME` | `www`       | `<github-username>.github.io` | 1 Hour / Automatic |

> [!IMPORTANT]
> Replace `<github-username>` with your actual GitHub username or organization name (e.g., `0Sushant01.github.io`).

---

## ⏳ DNS Propagation & HTTPS Activation

- **DNS Propagation Time**: DNS updates across worldwide nameservers typically take between **15 minutes to 48 hours** to fully propagate. During this period, you may experience intermittent access while routers update their caches.
- **HTTPS Enforcement**: Once GitHub finishes checking your DNS configuration, the **Enforce HTTPS** checkbox in GitHub Settings > Pages will become clickable. GitHub automatically issues and manages a free TLS/SSL certificate via Let's Encrypt.
- **Apex & WWW Redirection**: With both the apex `A` records and `www` `CNAME` in place, visitors browsing to either `https://ownmanage.in` or `https://www.ownmanage.in` will cleanly resolve to your site.

### Verifying DNS Configuration

You can verify that your DNS records have propagated using standard terminal tools:

```bash
# Verify A records
dig +noall +answer ownmanage.in A

# Verify CNAME record
dig +noall +answer www.ownmanage.in CNAME
```

Or using an online DNS lookup tool like [whatsmydns.net](https://www.whatsmydns.net/#A/ownmanage.in).

---

## ⚙️ Configuration Options

All site-wide variables can be configured at the top of `script.js`:

```javascript
const CONFIG = {
  // Set to an ISO date string (e.g., "2026-12-01T00:00:00") to show a live countdown,
  // or leave as null to gracefully hide the countdown.
  launchDate: null,

  // Primary contact email address updated across all links & copy buttons
  contactEmail: "contact@ownmanage.in"
};
```

---

## 📄 License & Brand Notice

© 2026 **OWNMANAGE**. All rights reserved.  
Official website: [ownmanage.in](https://ownmanage.in)