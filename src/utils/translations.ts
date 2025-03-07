
export const translations = {
  en: {
    hero: {
      role: "Code Explorer",
      description: "Navigating through web development galaxies, creating digital experiences that transcend earthly boundaries.",
      explore: "Start Exploring",
      projects: "View Projects"
    },
    about: {
      title: "About Me",
      mission: "Mission Overview",
      description: "As a recently graduated developer, I navigate through the vast universe of web development, exploring new technologies and creating innovative digital experiences. My passion for code and insatiable curiosity continuously push me to expand the boundaries of what's possible.",
      origin: "Origin",
      originValue: "Tunisia",
      currentBase: "Current Base",
      currentBaseValue: "Tunisia, Tunis"
    },
    robotWelcomeTitle: "Robot Assistant Activated!",
    robotWelcomeMessage: "Welcome to my portfolio. Your robot assistant is ready to help you navigate through my work and projects.",
    buildRobotTitle: "Build Your Robot",
    buildRobotInstructions: "Drag and drop robot parts to assemble your robot assistant",
    allPartsPlaced: "All parts placed! Your robot is ready.",
    enterPortfolio: "Enter Portfolio",
    entryOptions: {
      title: "Choose Your Path",
      robotBuilder: "Robot Builder",
      robotDescription: "Assemble a robot assistant to help navigate the portfolio",
      codingChallenge: "Coding Challenge",
      codingDescription: "Solve a mini coding puzzle to unlock the portfolio",
      directEntry: "Direct Entry",
      directDescription: "Skip the challenges and explore the portfolio right away",
      footer: "Choose any option to continue. You can always return later."
    },
    codingChallenge: {
      title: "Coding Challenge",
      submit: "Submit Solution",
      skip: "Skip Challenge",
      newChallenge: "New Challenge",
      success: "Success!",
      successMessage: "Your solution is correct!",
      error: "Not quite right",
      errorMessage: "Try again or select another challenge"
    }
  },
  fr: {
    hero: {
      role: "Explorateur du Code",
      description: "Navigateur à travers les galaxies du développement web, créant des expériences numériques qui dépassent les frontières terrestres.",
      explore: "Commencer l'Exploration",
      projects: "Voir les Projets"
    },
    about: {
      title: "À Propos",
      mission: "Aperçu de la Mission",
      description: "En tant que développeur fraîchement diplômé, je navigue à travers le vaste univers du développement web, explorant de nouvelles technologies et créant des expériences numériques innovantes. Ma passion pour le code et ma curiosité insatiable me poussent à repousser constamment les limites de ce qui est possible.",
      origin: "Origine",
      originValue: "Tunisie",
      currentBase: "Base Actuelle",
      currentBaseValue: "Tunisie, Tunis"
    },
    robotWelcomeTitle: "Assistant Robot Activé!",
    robotWelcomeMessage: "Bienvenue sur mon portfolio. Votre assistant robot est prêt à vous aider à naviguer à travers mes travaux et projets.",
    buildRobotTitle: "Construisez Votre Robot",
    buildRobotInstructions: "Glissez et déposez les pièces du robot pour assembler votre assistant robot",
    allPartsPlaced: "Toutes les pièces sont placées! Votre robot est prêt.",
    enterPortfolio: "Entrer dans le Portfolio",
    entryOptions: {
      title: "Choisissez Votre Voie",
      robotBuilder: "Constructeur de Robot",
      robotDescription: "Assemblez un assistant robot pour vous aider à naviguer dans le portfolio",
      codingChallenge: "Défi de Codage",
      codingDescription: "Résolvez un mini puzzle de codage pour débloquer le portfolio",
      directEntry: "Entrée Directe",
      directDescription: "Ignorez les défis et explorez immédiatement le portfolio",
      footer: "Choisissez n'importe quelle option pour continuer. Vous pourrez toujours revenir plus tard."
    },
    codingChallenge: {
      title: "Défi de Codage",
      submit: "Soumettre la Solution",
      skip: "Ignorer le Défi",
      newChallenge: "Nouveau Défi",
      success: "Succès !",
      successMessage: "Votre solution est correcte !",
      error: "Pas tout à fait",
      errorMessage: "Essayez à nouveau ou sélectionnez un autre défi"
    }
  }
};

// Helper function to get translations
export const getTranslation = (language: 'en' | 'fr', key: string) => {
  return language === 'en' ? translations.en[key] : translations.fr[key];
};
