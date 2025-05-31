const API_BASE = import.meta.env.VITE_API_URL;

export async function loadCareerPasses(token) {
  const res = await fetch(`${API_BASE}/api/plans_for_user/?token=${token}`);
  let data = await res.json();

  if (!Array.isArray(data)) 
    data = [];

  // Add 3 extra placeholder plans
  const additionalPlans = [
    {
      id: 2,
      title: 'Plan tus primeros 100 días de trabajo',
      image: 'passCard2',
      unlocked: false,
      tasksDone: 0,
      tasksMax: 0
    },
    {
      id: 3,
      title: 'Plan para ser Oficial de Primera en tu oficio',
      image: 'passCard3',
      unlocked: false,
      tasksDone: 0,
      tasksMax: 0
    },
    {
      id: 4,
      title: 'Plan para ser Oficial de Segunda en tu oficio',
      image: 'passCard4',
      unlocked: false,
      tasksDone: 0,
      tasksMax: 0
    }
  ];

  return [...data, ...additionalPlans];
}
