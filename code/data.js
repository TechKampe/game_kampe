const USER_ID = 78; // your actual user ID
const API_BASE = "http://localhost:8000";

const PHASE_LABELS = {
  "Fase 1": "Introducción",
  "Fase 2": "Documentación",
  "Fase 3": "Primeros pasos",
  "Fase 4": "Ofertas",
  "Fase 5": "Empleo",
  "Fase 6": "Crecimiento"
};

const PHASE_REWARDS = {
  "Fase 1": [
    { name: "Recompensa 1", description: "Descripción de la recompensa 1", rarity: "Común", image: "res/reward_001.png" },
    { name: "Recompensa 2", description: "Descripción de la recompensa 2", rarity: "Rara", image: "res/reward_002.png" },
    { name: "Recompensa 3", description: "Descripción de la recompensa 3", rarity: "Épica", image: "res/reward_003.png" },
    { name: "Recompensa 4", description: "Descripción de la recompensa 4", rarity: "Ultra", image: "res/reward_004.png" }
  ],
  "Fase 2": [
    { name: "Recompensa 5", description: "Descripción de la recompensa 5", rarity: "Común", image: "res/reward_005.png" },
    { name: "Recompensa 6", description: "Descripción de la recompensa 6", rarity: "Rara", image: "res/reward_006.png" },
    { name: "Recompensa 7", description: "Descripción de la recompensa 7", rarity: "Rara", image: "res/reward_007.png" },
    { name: "Recompensa 8", description: "Descripción de la recompensa 8", rarity: "Ultra", image: "res/reward_008.png" }
  ],
  "Fase 3": [
    { name: "Recompensa 9", description: "Descripción de la recompensa 9", rarity: "Común", image: "res/reward_009.png" },
    { name: "Recompensa 10", description: "Descripción de la recompensa 10", rarity: "Épica", image: "res/reward_010.png" },
    { name: "Recompensa 11", description: "Descripción de la recompensa 11", rarity: "Épica", image: "res/reward_011.png" },
    { name: "Recompensa 12", description: "Descripción de la recompensa 12", rarity: "Ultra", image: "res/reward_012.png" }
  ],
  "Fase 4": [
    { name: "Recompensa 13", description: "Descripción de la recompensa 9", rarity: "Común", image: "res/reward_013.png" },
    { name: "Recompensa 14", description: "Descripción de la recompensa 10", rarity: "Épica", image: "res/reward_014.png" },
    { name: "Recompensa 15", description: "Descripción de la recompensa 11", rarity: "Épica", image: "res/reward_015.png" },
    { name: "Recompensa 16", description: "Descripción de la recompensa 12", rarity: "Ultra", image: "res/reward_016.png" }
  ],
  "Fase 5": [
    { name: "Recompensa 17", description: "Descripción de la recompensa 9", rarity: "Común", image: "res/reward_017.png" },
    { name: "Recompensa 18", description: "Descripción de la recompensa 10", rarity: "Épica", image: "res/reward_018.png" }
  ],
  "Fase 6": [
    { name: "Recompensa 19", description: "Descripción de la recompensa 9", rarity: "Común", image: "res/reward_019.png" },
    { name: "Recompensa 20", description: "Descripción de la recompensa 10", rarity: "Épica", image: "res/reward_020.png" }
  ]
};

async function loadCareerPasses() {
  const [tasksRes, progressRes] = await Promise.all([
    fetch(`${API_BASE}/api/users/${USER_ID}/tasks`),
    fetch(`${API_BASE}/api/phase-progress/${USER_ID}`)
  ]);

  const tasks = await tasksRes.json();
  const progress = await progressRes.json();

  // Group tasks by phase
  const phasesMap = {};

  for (const task of tasks) {
    const phase = task.phase || "Sin fase";
    if (!phasesMap[phase]) phasesMap[phase] = [];

    phasesMap[phase].push({
      title: task.title,
      is_active: !task.completed,
      reward_xp: task.reward_xp || 0,
      reward_stars: task.reward_stars || 0,
    });
  }

  const phases = Object.entries(phasesMap).map(([phase, taskList]) => {
    const progressData = progress.find(p => p.phase === phase) || { completed: 0, total: taskList.length };

    return {
      title: phase,
      description: PHASE_LABELS[phase] || "",
      tasksDone: progressData.completed,
      tasksTotal: progressData.total,
      rewards: PHASE_REWARDS[phase] || [],
      tasks: taskList
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title, 'es', { numeric: true })); // Sort phases by title

  return [
    {
      id: 1,
      title: 'Plan de 100 días para introducirte en el mundo de los oficios',
      image: 'passCard1',
      unlocked: true,
      tasksDone: phases.reduce((acc, p) => acc + p.tasksDone, 0),
      tasksMax: phases.reduce((acc, p) => acc + p.tasksTotal, 0),
      phases
    },
    {
      id: 2,
      title: 'Plan tus primeros 100 días de trabajo',
      image: 'passCard2',
      unlocked: false,
      tasksDone: 0,
      tasksMax: 1000
    },
    {
      id: 3,
      title: 'Plan para ser Oficial de Primera en tu oficio',
      image: 'passCard3',
      unlocked: false,
      tasksDone: 0,
      tasksMax: 1000
    },
    {
      id: 4,
      title: 'Plan para ser Oficial de Segunda en tu oficio',
      image: 'passCard4',
      unlocked: false,
      tasksDone: 0,
      tasksMax: 1000
    }
  ];
}
