const careerPasses = [
  {
    id: 1,
    title: 'Plan de 100 días para introducirte en el mundo de los oficios',
    image: 'passCard1',
    unlocked: true,
    tasksDone: 18,
    tasksMax: 50,
    phases: [
      { title: "Fase 1 Introducción", tasksDone: 12, tasksTotal: 25,
        rewards: [
          { name: "Recompensa 1", description: "Descripción de la recompensa 1", rarity: "Común", image: "res/reward_001.png" },
          { name: "Recompensa 2", description: "Descripción de la recompensa 2", rarity: "Rara", image: "res/reward_002.png" },
          { name: "Recompensa 3", description: "Descripción de la recompensa 3", rarity: "Épica", image: "res/reward_003.png" },
          { name: "Recompensa 4", description: "Descripción de la recompensa 4", rarity: "Ultra", image: "res/reward_004.png" },
        ],
        tasks: [
          {
            title: "Primera sesión con el coach",
            is_active: true,
            reward_stars: 2,
            reward_xp: 10
          },
          {
            title: "Por donde comenzar",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Descripción de los oficios",
            is_active: false,
            reward_stars: 15,
            reward_xp: 0
          },
          {
            title: "Currículum preparado",
            is_active: true,
            reward_stars: 5,
            reward_xp: 0
          },
          {
            title: "Preparación de presentación personal",
            is_active: false,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Videocurrículum grabado",
            is_active: true,
            reward_stars: 5,
            reward_xp: 0
          },
          {
            title: "DNI escaneado",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Cuenta bancaria",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Número Seguridad Social",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Permiso de trabajo",
            is_active: false,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Cursos y títulos",
            is_active: false,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Demanda de empleo",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Garantía juvenil",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Formación adecuada",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "PRLs y básicos",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Curso básico de oficios",
            is_active: true,
            reward_stars: 15,
            reward_xp: 0
          },
          {
            title: "Carnet de conducir",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          },
          {
            title: "Conociendo las ofertas",
            is_active: true,
            reward_stars: 5,
            reward_xp: 5
          }
        ]
      },
      { title: "Fase 2 Documentación", tasksDone: 2, tasksTotal: 5,
        rewards: [
          { name: "Recompensa 5", description: "Descripción de la recompensa 5", rarity: "Común", image: "res/reward_005.png" },
          { name: "Recompensa 6", description: "Descripción de la recompensa 6", rarity: "Rara", image: "res/reward_006.png" },
          { name: "Recompensa 7", description: "Descripción de la recompensa 7", rarity: "Rara", image: "res/reward_007.png" },
          { name: "Recompensa 8", description: "Descripción de la recompensa 8", rarity: "Ultra", image: "res/reward_008.png" },
        ]

      },
      { title: "Fase 3 Primeros pasos", tasksDone: 3, tasksTotal: 10,
        rewards: [
          { name: "Recompensa 9", description: "Descripción de la recompensa 9", rarity: "Común", image: "res/reward_009.png" },
          { name: "Recompensa 10", description: "Descripción de la recompensa 10", rarity: "Épica", image: "res/reward_010.png" },
          { name: "Recompensa 11", description: "Descripción de la recompensa 11", rarity: "Épica", image: "res/reward_011.png" },
          { name: "Recompensa 12", description: "Descripción de la recompensa 12", rarity: "Ultra", image: "res/reward_012.png" },
        ]
      },
    ]
  },
  {
    id: 2,
    title: 'Plan tus primeros 100 días de trabajo',
    image: 'passCard2',
    unlocked: false,
    tasksDone: 0,
    tasksMax: 1000,
  },
  {
    id: 3,
    title: 'Plan para ser Oficial de Primera en tu oficio',
    image: 'passCard3',
    unlocked: false,
    tasksDone: 0,
    tasksMax: 1000,
  },
  {
    id: 4,
    title: 'Plan para ser Oficial de Segunda en tu oficio',
    image: 'passCard4',
    unlocked: false,
    tasksDone: 0,
    tasksMax: 1000,
  }
];
