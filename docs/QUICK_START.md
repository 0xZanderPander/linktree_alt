# Quick Start Guide

Get your personal link portal running in under 10 minutes. This guide assumes basic familiarity with the command line (Terminal on Mac, Command Prompt/PowerShell on Windows).

---

## Prerequisites

Before you begin, make sure you have:

1. **Node.js 18+** — [Download here](https://nodejs.org/) (choose the LTS version)
2. **A code editor** — [VS Code](https://code.visualstudio.com/) is recommended for beginners
3. **A GitHub account** — For hosting your site (free)

To verify Node.js is installed, open your terminal and run:
```bash
node --version
```
You should see something like `v20.x.x` or higher.

---

## Step 1: Get the Code

### Option A: Fork on GitHub (Recommended)

1. Go to the [repository on GitHub](https://github.com/yourusername/linktree-alternative)
2. Click the **Fork** button in the top right
3. This creates your own copy of the project
4. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/linktree-alternative.git
   cd linktree-alternative
   ```

### Option B: Download ZIP

1. Click the green **Code** button on GitHub
2. Select **Download ZIP**
3. Extract the folder and open it in your code editor

---

## Step 2: Install Dependencies

In your terminal, navigate to the project folder and run:

```bash
npm install
```

This downloads all the packages the project needs. It may take a minute or two.

---

## Step 3: Start the Development Server

```bash
npm run dev
```

Open your browser and go to **http://localhost:3000**. You should see the template with placeholder content.

> **Tip:** Keep this terminal window open while you work. The site will automatically refresh when you save changes.

---

## Step 4: Customize Your Content

Open `src/config/site.config.ts` in your code editor. This single file controls almost everything on your page.

### Essential Changes

1. **Your Name & Tagline**
   ```typescript
   branding: {
     logoAlt: "Your Name",
     tagline: "Designer. Developer. Creator.",
     email: "hello@yourdomain.com",
     // ...
   }
   ```

2. **Social Links**
   ```typescript
   socialLinks: [
     {
       id: "github",
       platform: "github",
       title: "GitHub",
       handle: "@yourhandle",
       url: "https://github.com/yourhandle",
       icon: "github",
     },
     // Add more...
   ]
   ```

3. **Featured Resources** (your projects/work)
   ```typescript
   resources: [
     {
       id: "project-1",
       title: "My Portfolio",
       description: "A showcase of my design work",
       badge: "live",
       link: "https://yoursite.com",
       // ...
     }
   ]
   ```

Save the file and your browser will automatically update.

---

## Step 5: Add Your Assets

Replace the placeholder files in the `public/` folder:

| What | Where | Recommended Size |
|------|-------|------------------|
| Logo | `public/images/logo-placeholder.svg` | SVG preferred, or 200x200px PNG |
| Favicon | `public/favicon.png` | 32x32px minimum |
| Project images | `public/images/` | 600x400px, JPEG or PNG |
| Tool icons | `public/icons/tech/` | 100x100px PNG |

> **See the [Asset Preparation Guide](ASSETS.md)** for detailed specifications and tips.

---

## Step 6: Build & Deploy

When you're happy with your changes:

```bash
npm run build
```

This creates an optimized version in the `/out` folder.

### Deploy to Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **Import Project** and select your repository
4. Click **Deploy** — that's it!

### Deploy to GitHub Pages

1. Update `basePath` in `next.config.ts`:
   ```javascript
   basePath: "/your-repo-name",
   ```
2. Push to GitHub
3. Go to **Settings → Pages** in your repository
4. Set source to the `gh-pages` branch or `/out` folder

---

## What's Next?

- **[Full Customization Guide](README.md)** — Detailed docs for each section
- **[Asset Preparation](ASSETS.md)** — How to prepare logos, images, and icons
- **[Design Resources](../README.md#design-resources)** — Find components and inspiration

---

## Need Help?

- Check the [Troubleshooting section](../README.md#troubleshooting) in the main README
- Review the section-specific docs (`docs/01-card-nav.md`, etc.)
- Each doc includes AI prompts you can use to make changes

---

Happy building!
