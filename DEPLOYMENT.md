# Deployment Guide

This guide will help you deploy the Nyuchi Learning website to Vercel.

## Quick Deploy to Vercel

### Option 1: Deploy from GitHub (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push -u origin main
   ```

2. **Visit Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in (you can use GitHub authentication)

3. **Import Project**:
   - Click "Add New..." > "Project"
   - Select "Import Git Repository"
   - Authorize Vercel to access your GitHub account
   - Select the `learning` repository

4. **Configure Project**:
   - Vercel will automatically detect that this is an Astro project
   - Framework Preset: **Astro** (should be auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `dist` (default)
   - Install Command: `npm install` (default)

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll get a URL like `https://learning-xyz.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   # From the project root
   vercel

   # Follow the prompts:
   # - Set up and deploy? Yes
   # - Which scope? (select your account)
   # - Link to existing project? No
   # - What's your project's name? nyuchi-learning
   # - In which directory is your code located? ./
   ```

4. **Production Deploy**:
   ```bash
   vercel --prod
   ```

## Environment Configuration

The site is fully static and doesn't require environment variables. However, if you need to add any in the future:

1. In Vercel Dashboard > Your Project > Settings > Environment Variables
2. Add variables as needed
3. Redeploy for changes to take effect

## Custom Domain

To use a custom domain like `learning.nyuchi.com`:

1. **In Vercel Dashboard**:
   - Go to your project
   - Settings > Domains
   - Click "Add Domain"
   - Enter your domain name

2. **Update DNS Settings**:
   - In your domain registrar (e.g., Namecheap, GoDaddy):
   - Add a CNAME record pointing to `cname.vercel-dns.com`
   - Or add A records provided by Vercel

3. **Wait for DNS Propagation**:
   - Can take up to 48 hours
   - Vercel will automatically provision SSL certificate

## Automatic Deployments

Once connected to GitHub:

- **Production**: Pushes to `main` branch automatically deploy to production
- **Preview**: Pushes to other branches create preview deployments
- Each pull request gets its own preview URL

## Build Settings

The `vercel.json` file configures:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

## Performance Optimizations

Vercel automatically provides:
- **Global CDN**: Content served from edge locations worldwide
- **Automatic HTTPS**: SSL certificates provisioned automatically
- **Image Optimization**: Automatic image format conversion and optimization
- **Compression**: Gzip/Brotli compression for all assets

## Monitoring & Analytics

### Vercel Analytics

Enable analytics in Vercel Dashboard:
1. Go to your project
2. Analytics tab
3. Enable Web Analytics (free tier available)

Track:
- Page views
- User sessions
- Performance metrics
- Geographic data

### Google Analytics

The site includes Google Analytics (G-BNHM29F8W5) configured in `BaseLayout.astro`. To use your own:

1. Create a Google Analytics 4 property
2. Update the measurement ID in `src/layouts/BaseLayout.astro`

## Troubleshooting

### Build Fails

**Error**: "Command failed: npm run build"
- **Solution**: Make sure all dependencies are in `package.json`
- Run `npm install` and `npm run build` locally to test

**Error**: "Module not found"
- **Solution**: Check import paths are correct
- Ensure all required files are committed to git

**Error**: TypeScript errors
- **Solution**: Run `npm run build` locally and fix any type errors
- Check that all component props are properly typed

### Site Not Updating

- **Clear cache**: Settings > Clear Build Cache
- **Redeploy**: Deployments > Click on latest > Redeploy

### Styling Issues

- **Check**: Ensure Tailwind CSS is properly configured in `postcss.config.mjs`
- **Verify**: Design tokens defined in `src/styles/global.css` (@theme directive)
- **Verify**: CSS variables defined in `src/styles/global.css` (@layer base)
- **Test**: Run `npm run preview` locally after building

## Cost

Vercel offers a generous free tier that includes:
- Unlimited deployments
- Automatic HTTPS
- 100GB bandwidth/month
- Unlimited team members

This is more than sufficient for educational websites.

## Alternative Deployment Platforms

### Netlify

1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Cloudflare Pages

1. Connect GitHub repository
2. Framework preset: Astro
3. Build command: `npm run build`
4. Build output: `dist`

### GitHub Pages

1. Build locally: `npm run build`
2. Deploy `dist` folder to `gh-pages` branch
3. Or use GitHub Actions for automated deployment

## Support

For deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Astro on Vercel Guide](https://docs.astro.build/en/guides/deploy/vercel/)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

## Next Steps After Deployment

1. **Verify the site** loads correctly at your URL
2. **Set up custom domain** if desired
3. **Enable analytics** to track usage
4. **Create preview branches** for testing changes
5. **Set up notifications** for deployment status

---

**Production URL**: [learning.nyuchi.com](https://learning.nyuchi.com)

**Last Updated**: February 2026
