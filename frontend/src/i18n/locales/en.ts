export const en = {
  translation: {
    app: {
      title: "Smart Expense Tracker",
    },
    nav: {
      home: "Home",
      viewCode: "View code",
      share: "Share",
      linkCopied: "Link copied!",
      menuAriaLabel: "Open menu",
      profileAriaLabel: "Open profile menu",
      myProfile: "My profile",
      logout: "Log out",
    },
    landing: {
      badge: "Joselin Montero's Portfolio",
      heroTitle: "Your expenses, understood — not just logged",
      heroSubtitle:
        "A personal finance manager that classifies your expenses automatically, warns you before you go over budget, and predicts how much you'll spend next month.",
      ctaPrimary: "Start for free",
      ctaDashboard: "Go to dashboard",
      ctaSecondary: "See features",
      featuresTitle: "What's included",
      features: [
        {
          title: "Automatic classification",
          description:
            "Every expense gets categorized on its own, from the description — no endless manual category lists.",
        },
        {
          title: "Budget alerts",
          description:
            "You get notified as soon as a category is about to go over the limit you set, not at the end of the month.",
        },
        {
          title: "Spend prediction",
          description: "Estimates how much you'll spend next month based on your recent history.",
        },
        {
          title: "Exportable reports",
          description: "Download your transactions as PDF or Excel whenever you need them.",
        },
      ],
    },
    login: {
      back: "← Back",
      titleLogin: "Sign in",
      titleRegister: "Create your account",
      subtitleLogin: "Log in to see your expense dashboard.",
      subtitleRegister: "Free, no card required.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      emailPlaceholder: "you@email.com",
      password: "Password",
      passwordPlaceholder: "••••••••",
      submitLogin: "Sign in",
      submitRegister: "Create account",
      submitting: "One moment...",
      toggleToRegister: "Don't have an account? Sign up",
      toggleToLogin: "Already have an account? Sign in",
      errors: {
        invalidEmail: "That email isn't valid.",
        wrongCredentials: "Wrong email or password.",
        emailInUse: "An account with that email already exists.",
        weakPassword: "Password must be at least 6 characters.",
        generic: "Something went wrong. Please try again.",
      },
    },
    profile: {
      title: "My profile",
      save: "Save changes",
      saved: "Profile updated.",
    },
    dashboard: {
      title: "Dashboard",
      addIncome: "+ Income",
      addExpense: "+ Expense",
      connectionError: "Couldn't connect to the backend. Is it running at http://localhost:8000?",
      loading: "Loading...",
      stats: {
        income: "Income",
        expense: "Expenses",
        balance: "Balance",
        balanceHint: "Income − Expenses",
      },
    },
    expenseModal: {
      title: "Add expense",
      amount: "Amount (₡)",
      description: "Description (e.g. Lunch at a diner)",
      category: "Category (optional — auto-classified)",
      submit: "Add expense",
    },
    incomeModal: {
      title: "Add income",
      amount: "Amount (₡)",
      source: "Source (e.g. Salary, Freelance)",
      submit: "Add income",
    },
    transactions: {
      empty: "You don't have any transactions yet.",
    },
    categoryChart: {
      title: "Spend by category",
      empty: "Add expenses to see the breakdown by category.",
    },
    budgets: {
      title: "Budgets",
      hint: "The amount spent is calculated automatically from your recorded expenses in that category.",
      empty: "You haven't set any budgets yet.",
      categoryPlaceholder: "Category",
      amountPlaceholder: "Monthly limit (₡)",
      submit: "Set budget",
      spentOfLimit: "Spent: {{spent}} of {{limit}}",
    },
    prediction: {
      title: "Next month's prediction",
      empty: "Add at least one month of expenses to get an estimate.",
      basedOn: "Based on the average of {{months}}",
    },
    reports: {
      title: "Monthly reports",
      pdf: "Export PDF",
      excel: "Export Excel",
    },
    notifications: {
      ariaLabel: "Notifications",
      empty: "No notifications.",
      markRead: "Mark as read",
    },
    common: {
      saving: "Saving...",
      delete: "Delete",
    },
    footer: {
      pitch:
        "A real portfolio project: manage your personal expenses with automatic classification and budget alerts. Open source — take a look and use it as inspiration for your own.",
      emailAriaLabel: "Send email",
      websiteAriaLabel: "Visit website",
      linkedinAriaLabel: "Visit LinkedIn",
      rights: "Made by Joselin Montero.",
    },
  },
};
