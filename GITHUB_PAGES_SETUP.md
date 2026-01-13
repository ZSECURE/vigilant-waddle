# GitHub Pages Setup Guide

This guide will walk you through setting up GitHub Pages for the Air Guitar Emporium website.

## Quick Setup Steps

### 1. Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub: `https://github.com/ZSECURE/vigilant-waddle`
2. Click on **Settings** (top navigation)
3. In the left sidebar, click on **Pages**
4. Under **Source**, select **GitHub Actions** from the dropdown
5. Click **Save**

### 2. Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that will:
- Automatically deploy your site when you push to the `main` branch
- Can also be manually triggered from the Actions tab

### 3. Access Your Live Site

Once deployment is complete (usually takes 1-2 minutes):
- Your site will be available at: `https://ZSECURE.github.io/vigilant-waddle/`
- You can check deployment status in the **Actions** tab

## Manual Deployment Trigger

To manually deploy your site:
1. Go to the **Actions** tab in your repository
2. Click on the **Deploy to GitHub Pages** workflow
3. Click **Run workflow** > Select branch `main` > **Run workflow**

## Verifying Deployment

After deployment:
1. Go to the **Actions** tab to see the deployment status
2. Once the workflow completes successfully, visit your GitHub Pages URL
3. You should see the Air Guitar Emporium website live!

## Troubleshooting

### Site Not Loading
- Check that GitHub Pages is enabled in Settings > Pages
- Verify the GitHub Actions workflow completed successfully
- Make sure you're using the correct URL format

### Deployment Failed
- Check the Actions tab for error logs
- Ensure you have the correct permissions (Pages need to be enabled)
- Verify the workflow file syntax is correct

## Stripe Integration Note

⚠️ **Important:** The Stripe API key is currently set to `ABCD-1234-EFGH-5678`. This is not a valid Stripe key format. 

To use real Stripe payments:
1. Sign up at https://stripe.com
2. Get your **publishable key** (starts with `pk_test_` or `pk_live_`)
3. Update the key in `script.js` line 8
4. **Never** use secret keys (sk_*) in client-side code - they must remain on your backend server

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Stripe Documentation](https://stripe.com/docs)
