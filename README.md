# GDC-Hackathon
Build with Ai hackathon hosted by UBC GDC and UBC Launchpad 

# Project Name

## **Overview**
- **What problem is being solved?**
Many people struggle to reach their weight goals because they don’t know what to eat, how much to spend, or where to buy their groceries at the best prices. This website automates meal planning, budget-friendly grocery shopping, and delivery to ensure users get tailored nutrition without overspending.
  
- **Where is the information from?**
  
- **Why is this interesting?**
    - Personalized: The platform tailors meal plans to each user's goals, restrictions, and budget.
    - Cost-Effective: It finds the most affordable grocery store, helping users save money.
    - Convenient: Automates grocery shopping and delivery so users don’t have to manually buy items.
    - Health-Oriented: Ensures users get proper nutrition to support their weight goals.
  
## **Design Choices**

**What design choices were made and why were these choices made?**

1. User Profile Setup:
Collects essential details (weight, height, dietary preferences) to customize meal plans.
This ensures the recommendations are accurate and user-specific.

2. Goal-Based Meal Planning:
Users select Lose Fat, Gain Muscle, or Maintain Weight, which adjusts their caloric intake & macronutrient breakdown.
Makes it easy for users to follow structured nutrition for their goals.

3. Budget Integration:
Users set a weekly grocery budget, and the system selects the most affordable store based on real-time pricing.
This makes meal planning accessible to all income levels.

4. Grocery Store Price Comparison:
Instead of forcing users to shop at one store, the system analyzes multiple stores to find the best deal.
This saves time and prevents unnecessary overspending.

5. Weekly Grocery Ordering & Delivery:
Orders groceries weekly to prevent spoilage and ensure freshness.
Users don’t have to worry about grocery shopping, making it hassle-free.

## **Problem Solving**
**Describes how the problem was solved.**

1. Meal Plan Generation Algorithm

Takes user profile details and calculates daily calorie & macronutrient needs.
Selects meals that fit the user’s dietary restrictions while staying within their budget.

2. Grocery Store Selection & Cost Calculation

The system pulls data from Walmart, Superstore, and Save-On-Foods.
It totals the grocery cost for each store and selects the one within budget and cheapest overall.

3. Delivery Automation

Once a store is selected, groceries are ordered automatically for weekly delivery.
Users don’t have to manually place orders, making the process seamless.

4. Payment & Address Handling

Users enter payment details once; transactions are automated for weekly orders.
If the address differs from billing, they can specify a separate delivery address.

## **Most Challenging**
**Discusses which part of the project was the most difficult and why.**
1. Grocery Price Retrieval & Store Selection

Walmart, Superstore, and Save-On-Foods do not have public APIs for grocery prices.
The best solution is using Instacart’s API or web scraping, but both come with legal & technical challenges (e.g., rate limits, data freshness).

2. Budget Optimization for Meal Plans

Ensuring meal plans stay within a user’s budget while meeting nutrition goals is complex.
The system needs to dynamically adjust meal selections based on the user’s budget and grocery price fluctuations.

3. Delivery Logistics

While Instacart offers grocery delivery, integrating it with weekly automated orders requires API approval.
If direct integration fails, the alternative is placing orders manually or redirecting users to Instacart’s website.
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/46f8186f-27b1-4dc5-8996-4a3501d82dc3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/46f8186f-27b1-4dc5-8996-4a3501d82dc3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/46f8186f-27b1-4dc5-8996-4a3501d82dc3) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
