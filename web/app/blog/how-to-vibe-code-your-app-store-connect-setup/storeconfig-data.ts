export const starterStoreConfigJson = {
  schemaVersion: "1.0.0",
  appId: "6757076667",
  versionString: "1.0",
  availableTerritories: [],
  inAppPurchases: [],
  subscriptionGroups: [],
  primaryLocale: "en-US",
  localizations: [
    {
      locale: "en-US",
      name: "Vibe Coded Calorie Tracker",
    },
  ],
};

export const endStoreConfigJson = {
  schemaVersion: "1.0.0",
  appId: "6757076667",
  versionString: "1.0",
  pricing: {
    baseTerritory: "USA",
    prices: [
      {
        price: "0",
        territory: "USA",
      },
    ],
  },
  availableTerritories: "worldwide",
  inAppPurchases: [
    {
      productId: "dev.semihcihan.caltracker.lifetime",
      type: "NON_CONSUMABLE",
      referenceName: "Lifetime Access",
      familySharable: false,
      pricing: {
        baseTerritory: "USA",
        prices: [
          {
            price: "99.99",
            territory: "USA",
          },
        ],
      },
      availability: {
        availableInNewTerritories: true,
        availableTerritories: "worldwide",
      },
      localizations: [
        {
          locale: "en-US",
          name: "Lifetime Access",
          description: "Unlock all premium features forever with one purchase.",
        },
        {
          locale: "es-ES",
          name: "Acceso de por vida",
          description: "Desbloquea todas las funciones premium para siempre.",
        },
        {
          locale: "fr-FR",
          name: "Accès à vie",
          description: "Débloquez toutes les fonctionnalités premium à vie.",
        },
        {
          locale: "tr",
          name: "Ömür Boyu Erişim",
          description: "Tek seferlik satın alma ile tüm premium özellikler.",
        },
      ],
    },
  ],
  subscriptionGroups: [
    {
      referenceName: "Premium Subscriptions",
      localizations: [
        {
          locale: "en-US",
          name: "Premium Subscriptions",
          customName: null,
        },
        {
          locale: "es-ES",
          name: "Suscripciones Premium",
          customName: null,
        },
        {
          locale: "fr-FR",
          name: "Abonnements Premium",
          customName: null,
        },
        {
          locale: "tr",
          name: "Premium Abonelikler",
          customName: null,
        },
      ],
      subscriptions: [
        {
          productId: "dev.semihcihan.caltracker.weekly",
          referenceName: "Weekly Subscription",
          groupLevel: 1,
          subscriptionPeriod: "ONE_WEEK",
          familySharable: false,
          pricing: {
            baseTerritory: "USA",
            prices: [
              {
                price: "2.99",
                territory: "USA",
              },
            ],
          },
          availability: {
            availableInNewTerritories: true,
            availableTerritories: "worldwide",
          },
          localizations: [
            {
              locale: "en-US",
              name: "Weekly Premium",
              description: "Full access to all premium features weekly.",
            },
            {
              locale: "es-ES",
              name: "Premium Semanal",
              description:
                "Acceso completo a todas las funciones premium semanal.",
            },
            {
              locale: "fr-FR",
              name: "Premium Hebdomadaire",
              description:
                "Accès complet à toutes les fonctionnalités premium.",
            },
            {
              locale: "tr",
              name: "Haftalık Premium",
              description: "Tüm premium özelliklere haftalık tam erişim.",
            },
          ],
        },
        {
          productId: "dev.semihcihan.caltracker.yearly",
          referenceName: "Yearly Subscription",
          groupLevel: 1,
          subscriptionPeriod: "ONE_YEAR",
          familySharable: false,
          pricing: {
            baseTerritory: "USA",
            prices: [
              {
                price: "49.99",
                territory: "USA",
              },
            ],
          },
          introductoryOffers: [
            {
              type: "FREE_TRIAL",
              duration: "ONE_WEEK",
              availableTerritories: "worldwide",
            },
          ],
          availability: {
            availableInNewTerritories: true,
            availableTerritories: "worldwide",
          },
          localizations: [
            {
              locale: "en-US",
              name: "Yearly Premium",
              description:
                "Best value! Full access to premium features for a year.",
            },
            {
              locale: "es-ES",
              name: "Premium Anual",
              description:
                "¡Mejor precio! Acceso completo a funciones premium.",
            },
            {
              locale: "fr-FR",
              name: "Premium Annuel",
              description:
                "Meilleure valeur! Accès complet aux fonctionnalités.",
            },
            {
              locale: "tr",
              name: "Yıllık Premium",
              description:
                "En iyi değer! Tüm premium özelliklere yıllık erişim.",
            },
          ],
        },
      ],
    },
  ],
  primaryLocale: "en-US",
  copyright: "© 2025 Semih Cihan",
  localizations: [
    {
      locale: "en-US",
      name: "Vibe Coded AI Calorie Tracker",
      subtitle: "Smart nutrition tracking",
      description:
        "Transform your health journey with our AI-powered calorie tracking app. Experience intelligent meal logging that learns from your preferences and provides personalized recommendations to help you achieve your fitness goals.\n\nOur advanced AI technology analyzes your eating patterns, suggests optimal meal combinations, and tracks your nutritional intake with precision. Whether you're looking to lose weight, build muscle, or maintain a healthy lifestyle, our app adapts to your unique needs.\n\nKey features include real-time calorie counting, comprehensive food database with thousands of items, barcode scanning for instant logging, detailed nutritional breakdowns, progress tracking with insightful charts and graphs, and personalized meal plans tailored to your dietary preferences and goals.\n\nStay motivated with daily insights, weekly progress reports, and achievement badges. Connect with a supportive community of health enthusiasts and share your journey. Our intuitive interface makes tracking effortless, so you can focus on what matters most - your health and wellbeing.",
      keywords:
        "health,fitness,meal,exercise,monitor,log,diet,weight,loss,wellness",
      promotionalText:
        "Start your health transformation today with AI-powered calorie tracking",
      whatsNew:
        "Welcome to AI Calorie Tracker! Experience intelligent nutrition tracking powered by advanced AI technology.",
    },
    {
      locale: "es-ES",
      name: "Vibe Coded Calorías",
      subtitle: "Nutrición inteligente",
      description:
        "Transforma tu viaje de salud con nuestra aplicación de seguimiento de calorías alimentada por IA. Experimenta un registro inteligente de comidas que aprende de tus preferencias y proporciona recomendaciones personalizadas para ayudarte a alcanzar tus objetivos de fitness.\n\nNuestra tecnología avanzada de IA analiza tus patrones alimentarios, sugiere combinaciones de comidas óptimas y rastrea tu ingesta nutricional con precisión. Ya sea que busques perder peso, ganar músculo o mantener un estilo de vida saludable, nuestra aplicación se adapta a tus necesidades únicas.\n\nLas características clave incluyen conteo de calorías en tiempo real, base de datos completa de alimentos con miles de elementos, escaneo de código de barras para registro instantáneo, desgloses nutricionales detallados, seguimiento del progreso con gráficos y tablas perspicaces, y planes de comidas personalizados adaptados a tus preferencias dietéticas y objetivos.\n\nMantente motivado con información diaria, informes de progreso semanales y insignias de logros. Conéctate con una comunidad solidaria de entusiastas de la salud y comparte tu viaje. Nuestra interfaz intuitiva hace que el seguimiento sea sin esfuerzo, para que puedas concentrarte en lo que más importa: tu salud y bienestar.",
      keywords:
        "seguimiento,salud,fitness,comida,ejercicio,registro,dieta,peso,pérdida",
    },
    {
      locale: "fr-FR",
      name: "Vibe Coded Suivi Calories IA",
      subtitle: "Suivi nutritionnel intelligent",
      description:
        "Transformez votre parcours de santé avec notre application de suivi des calories alimentée par l'IA. Découvrez un enregistrement intelligent des repas qui apprend de vos préférences et fournit des recommandations personnalisées pour vous aider à atteindre vos objectifs de remise en forme.\n\nNotre technologie IA avancée analyse vos habitudes alimentaires, suggère des combinaisons de repas optimales et suit votre apport nutritionnel avec précision. Que vous cherchiez à perdre du poids, à développer vos muscles ou à maintenir un mode de vie sain, notre application s'adapte à vos besoins uniques.\n\nLes fonctionnalités clés incluent le comptage de calories en temps réel, une base de données complète d'aliments avec des milliers d'articles, le scan de codes-barres pour un enregistrement instantané, des analyses nutritionnelles détaillées, le suivi des progrès avec des graphiques et tableaux perspicaces, et des plans de repas personnalisés adaptés à vos préférences alimentaires et objectifs.\n\nRestez motivé avec des informations quotidiennes, des rapports de progression hebdomadaires et des badges de réussite. Connectez-vous avec une communauté solidaire d'enthousiastes de la santé et partagez votre parcours. Notre interface intuitive rend le suivi sans effort, afin que vous puissiez vous concentrer sur ce qui compte le plus - votre santé et votre bien-être.",
      keywords:
        "santé,fitness,repas,exercice,moniteur,registre,régime,poids,perte",
    },
    {
      locale: "tr",
      name: "Vibe Coded AI Kalori Takipçisi",
      subtitle: "Akıllı beslenme takibi",
      description:
        "AI destekli kalori takip uygulamamızla sağlık yolculuğunuzu dönüştürün. Tercihlerinizden öğrenen ve fitness hedeflerinize ulaşmanıza yardımcı olmak için kişiselleştirilmiş öneriler sunan akıllı öğün kaydını deneyimleyin.\n\nGelişmiş AI teknolojimiz yeme alışkanlıklarınızı analiz eder, optimal öğün kombinasyonları önerir ve beslenme alımınızı hassasiyetle takip eder. Kilo vermek, kas yapmak veya sağlıklı bir yaşam tarzı sürdürmek istiyorsanız, uygulamamız benzersiz ihtiyaçlarınıza uyum sağlar.\n\nTemel özellikler arasında gerçek zamanlı kalori sayımı, binlerce öğe içeren kapsamlı gıda veritabanı, anında kayıt için barkod tarama, detaylı beslenme analizleri, içgörülü grafikler ve tablolarla ilerleme takibi ve diyet tercihlerinize ve hedeflerinize göre özelleştirilmiş yemek planları bulunur.\n\nGünlük içgörüler, haftalık ilerleme raporları ve başarı rozetleriyle motive kalın. Sağlık meraklılarından oluşan destekleyici bir toplulukla bağlantı kurun ve yolculuğunuzu paylaşın. Sezgisel arayüzümüz takibi zahmetsiz hale getirir, böylece en önemli olana odaklanabilirsiniz - sağlığınız ve esenliğiniz.",
      keywords: "sağlık,fitness,öğün,egzersiz,izleme,kayıt,diyet,kilo,kayıp",
    },
  ],
};
