export const es = {
  translation: {
    app: {
      title: "Smart Expense Tracker",
    },
    nav: {
      home: "Inicio",
      viewCode: "Ver código",
      share: "Compartir",
      linkCopied: "¡Enlace copiado!",
      menuAriaLabel: "Abrir menú",
      profileAriaLabel: "Abrir menú de perfil",
      myProfile: "Mi perfil",
      logout: "Cerrar sesión",
    },
    landing: {
      badge: "Portafolio de Joselin Montero",
      heroTitle: "Tus gastos, entendidos — no solo anotados",
      heroSubtitle:
        "Un gestor de finanzas personales que clasifica tus gastos automáticamente, te avisa antes de pasarte del presupuesto y predice cuánto vas a gastar el próximo mes.",
      ctaPrimary: "Empezar gratis",
      ctaDashboard: "Ir al dashboard",
      ctaSecondary: "Ver funcionalidades",
      featuresTitle: "Qué incluye",
      features: [
        {
          title: "Clasificación automática",
          description:
            "Cada gasto se categoriza solo, a partir de la descripción — sin listas interminables de categorías manuales.",
        },
        {
          title: "Alertas de presupuesto",
          description:
            "Te avisa apenas una categoría está por superar el límite que definiste, no al final del mes.",
        },
        {
          title: "Predicción de gasto",
          description: "Estima cuánto vas a gastar el próximo mes según tu historial reciente.",
        },
        {
          title: "Reportes exportables",
          description: "Descarga tus movimientos en PDF o Excel cuando los necesites.",
        },
      ],
    },
    login: {
      back: "← Volver",
      titleLogin: "Inicia sesión",
      titleRegister: "Crea tu cuenta",
      subtitleLogin: "Entra para ver tu dashboard de gastos.",
      subtitleRegister: "Gratis, sin necesidad de tarjeta.",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo",
      emailPlaceholder: "tu@correo.com",
      password: "Contraseña",
      passwordPlaceholder: "••••••••",
      submitLogin: "Entrar",
      submitRegister: "Crear cuenta",
      submitting: "Un momento...",
      toggleToRegister: "¿No tienes cuenta? Regístrate",
      toggleToLogin: "¿Ya tienes cuenta? Inicia sesión",
      errors: {
        invalidEmail: "El correo no es válido.",
        wrongCredentials: "Correo o contraseña incorrectos.",
        emailInUse: "Ya existe una cuenta con ese correo.",
        weakPassword: "La contraseña debe tener al menos 6 caracteres.",
        generic: "Ocurrió un error. Intenta de nuevo.",
      },
    },
    profile: {
      title: "Mi perfil",
      save: "Guardar cambios",
      saved: "Perfil actualizado.",
    },
    dashboard: {
      title: "Dashboard",
      addIncome: "+ Ingreso",
      addExpense: "+ Gasto",
      connectionError: "No se pudo conectar con el backend. ¿Está corriendo en http://localhost:8000?",
      loading: "Cargando...",
      stats: {
        income: "Ingresos",
        expense: "Gastos",
        balance: "Balance",
        balanceHint: "Ingresos − Gastos",
      },
    },
    expenseModal: {
      title: "Agregar gasto",
      amount: "Monto (₡)",
      description: "Descripción (ej. Almuerzo en soda)",
      category: "Categoría (opcional — se clasifica sola)",
      submit: "Agregar gasto",
    },
    incomeModal: {
      title: "Agregar ingreso",
      amount: "Monto (₡)",
      source: "Fuente (ej. Salario, Freelance)",
      submit: "Agregar ingreso",
    },
    transactions: {
      empty: "Todavía no tienes movimientos registrados.",
    },
    categoryChart: {
      title: "Gasto por categoría",
      empty: "Agrega gastos para ver el desglose por categoría.",
    },
    budgets: {
      title: "Presupuestos",
      hint: "El monto gastado se calcula solo, según tus gastos registrados en esa categoría.",
      empty: "No has definido presupuestos todavía.",
      categoryPlaceholder: "Categoría",
      amountPlaceholder: "Límite mensual (₡)",
      submit: "Definir presupuesto",
      spentOfLimit: "Gastado: {{spent}} de {{limit}}",
    },
    prediction: {
      title: "Predicción del próximo mes",
      empty: "Agrega gastos de al menos un mes para estimar.",
      basedOn: "Basado en el promedio de {{months}}",
    },
    reports: {
      title: "Reportes mensuales",
      pdf: "Exportar PDF",
      excel: "Exportar Excel",
    },
    notifications: {
      ariaLabel: "Notificaciones",
      empty: "Sin notificaciones.",
      markRead: "Marcar como leída",
    },
    common: {
      saving: "Guardando...",
      delete: "Eliminar",
    },
    footer: {
      pitch:
        "Un proyecto real de portafolio: gestiona tus gastos personales con clasificación automática y alertas de presupuesto. Código abierto — échele un vistazo y úsela de inspiración para el suyo.",
      emailAriaLabel: "Enviar correo",
      websiteAriaLabel: "Visitar sitio web",
      linkedinAriaLabel: "Visitar LinkedIn",
      rights: "Hecho por Joselin Montero.",
    },
  },
};
