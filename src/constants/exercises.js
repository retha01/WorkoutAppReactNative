// src/constants/exercises.js
//
// Each exercise: name, default seconds, muscles, and written steps.

export const slug = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const ex = (name, seconds, muscles, steps) => ({
  id: slug(name),
  name,
  seconds,
  muscles,
  steps,
});

const list = [
  // ---------- no equipment ----------
  ex("Bodyweight Squat", 40, ["Quads", "Glutes"], [
    "Stand with feet shoulder-width apart.",
    "Sit your hips back and down, as if into a chair.",
    "Keep your chest up and knees in line with your toes.",
    "Push through your heels to stand.",
  ]),
  ex("Reverse Lunge", 40, ["Quads", "Glutes", "Hamstrings"], [
    "Stand tall with your core braced.",
    "Step one foot back and lower until both knees are about 90 degrees.",
    "Keep your front knee over your ankle.",
    "Push through the front heel to return, then switch legs.",
  ]),
  ex("Push-Up", 30, ["Chest", "Triceps", "Shoulders"], [
    "Place your hands under your shoulders, body in a straight line.",
    "Lower your chest toward the floor, elbows about 45 degrees from your body.",
    "Press back up without letting your hips sag.",
    "Too hard? Do it from your knees.",
  ]),
  ex("Wide Push-Up", 30, ["Chest", "Shoulders"], [
    "Place your hands wider than your shoulders.",
    "Keep your body in one straight line.",
    "Lower your chest toward the floor, then press back up.",
  ]),
  ex("Close-Grip Push-Up", 30, ["Triceps", "Chest"], [
    "Place your hands close together under your chest.",
    "Keep your elbows tucked in toward your ribs.",
    "Lower slowly, then press back up.",
  ]),
  ex("Forearm Plank", 30, ["Core", "Abs"], [
    "Place your elbows under your shoulders.",
    "Form a straight line from head to heels.",
    "Squeeze your abs and glutes, and breathe steadily.",
    "Don't let your hips sag or pike up.",
  ]),
  ex("Mountain Climber", 30, ["Core", "Full body"], [
    "Start in a high plank, hands under shoulders.",
    "Drive one knee toward your chest, then switch quickly.",
    "Keep your hips low and your core tight.",
  ]),
  ex("Crunch", 30, ["Abs"], [
    "Lie on your back with knees bent and feet flat.",
    "Place your hands lightly behind your head.",
    "Lift your shoulders off the floor by squeezing your abs.",
    "Lower slowly, without pulling on your neck.",
  ]),
  ex("Glute Bridge", 40, ["Glutes", "Hamstrings"], [
    "Lie on your back with knees bent and feet flat.",
    "Press through your heels and lift your hips.",
    "Squeeze your glutes at the top so you form a straight line.",
    "Lower slowly.",
  ]),
  ex("Calf Raise", 40, ["Calves"], [
    "Stand tall with feet hip-width apart.",
    "Rise up onto your toes as high as you can.",
    "Pause for a second, then lower slowly.",
  ]),
  ex("Good Morning", 40, ["Hamstrings", "Glutes"], [
    "Stand with feet hip-width apart and a soft bend in your knees.",
    "Push your hips back, keeping your back flat.",
    "Stop when you feel a stretch in your hamstrings.",
    "Squeeze your glutes to stand back up.",
  ]),
  ex("Backpack Curl", 30, ["Biceps"], [
    "Hold a backpack by its handle or straps, arms at your sides.",
    "Curl it toward your shoulders, keeping your elbows still.",
    "Lower slowly.",
  ]),

  // ---------- equipment ----------
  ex("Leg Press", 45, ["Quads", "Glutes", "Hamstrings"], [
    "Sit with your back flat against the pad.",
    "Place your feet shoulder-width apart on the platform.",
    "Push through your heels, stopping just short of locking your knees.",
    "Lower slowly until your knees reach about 90 degrees.",
  ]),
  ex("Leg Extension", 40, ["Quads"], [
    "Adjust the pad so it rests on your lower shins.",
    "Straighten your legs until they are almost fully extended.",
    "Lower slowly with control.",
  ]),
  ex("Leg Curl", 40, ["Hamstrings"], [
    "Adjust the pad so it sits just above your heels.",
    "Curl your heels toward your glutes.",
    "Lower slowly with control.",
  ]),
  ex("Hip Thrust", 45, ["Glutes", "Hamstrings"], [
    "Rest your upper back on a bench with the bar padded over your hips.",
    "Drive your hips up until your body forms a straight line.",
    "Squeeze your glutes at the top, then lower with control.",
  ]),
  ex("Smith Machine Squat", 45, ["Quads", "Glutes"], [
    "Set the bar at shoulder height and the safety stops below your lowest point.",
    "Place your feet slightly forward of the bar, shoulder-width apart.",
    "Lower until your thighs are about parallel, then press up.",
  ]),
  ex("Cable Kickback", 40, ["Glutes"], [
    "Attach the ankle strap and hold the frame for balance.",
    "Kick your leg straight back and squeeze your glute.",
    "Return slowly without swinging.",
  ]),
  ex("Seated Calf Raise", 40, ["Calves"], [
    "Sit with the pad resting on your thighs, balls of your feet on the platform.",
    "Lift your heels as high as you can.",
    "Lower slowly until you feel a stretch.",
  ]),
  ex("Chest Press", 40, ["Chest", "Triceps", "Shoulders"], [
    "Adjust the seat so the handles are at chest height.",
    "Push the handles forward until your arms are almost straight.",
    "Return slowly, keeping your back against the pad.",
  ]),
  ex("Cable Fly", 40, ["Chest"], [
    "Set the pulleys at chest height and step forward with a slight elbow bend.",
    "Bring your hands together in a wide hugging arc.",
    "Open slowly until you feel a stretch across your chest.",
  ]),
  ex("Biceps Curl", 40, ["Biceps"], [
    "Keep your elbows pinned to your sides.",
    "Curl the handle toward your shoulders.",
    "Lower slowly without leaning back.",
  ]),
  ex("Triceps Pushdown", 40, ["Triceps"], [
    "Attach a rope or bar to the high pulley.",
    "Pin your elbows to your sides.",
    "Press down until your arms are straight, then return slowly.",
  ]),
  ex("Cable Crunch", 40, ["Abs"], [
    "Kneel facing the high pulley with the rope by your forehead.",
    "Curl your ribs toward your hips, keeping your hips still.",
    "Return slowly.",
  ]),
  ex("Woodchop", 40, ["Core", "Abs"], [
    "Set the cable high and stand side-on to the machine.",
    "Rotate through your torso, pulling diagonally down across your body.",
    "Keep your arms straight and return with control.",
  ]),
  ex("Row Intervals", 60, ["Back", "Legs", "Core"], [
    "Push with your legs first, then lean back and pull to your lower ribs.",
    "Row hard for 20 seconds, then easy for 40.",
    "Keep your back flat and your movements smooth.",
  ]),
];

const byId = Object.fromEntries(list.map((e) => [e.id, e]));

// id or name -> exercise. Unknown names (for example an equipment suggestion
// like "Brisk walk") get a generic exercise so every card still opens.
export function getExercise(id, name) {
  const found = byId[id] || byId[slug(name || id || "")];
  if (found) return found;
  const label = name || String(id || "Workout").replace(/-/g, " ");
  return {
    id: slug(label),
    name: label,
    seconds: 30,
    muscles: [],
    steps: [
      "Start light, with an easy pace or weight.",
      "Move slowly and with control.",
      "Stop if anything hurts.",
    ],
  };
}

// Starter plan per body part: "<partId>.<mode>" -> exercise names
const plans = {
  "abs.equipment": ["Cable Crunch", "Woodchop", "Forearm Plank"],
  "abs.noEquipment": ["Crunch", "Forearm Plank", "Mountain Climber"],
  "arms.equipment": ["Biceps Curl", "Triceps Pushdown", "Chest Press"],
  "arms.noEquipment": ["Push-Up", "Close-Grip Push-Up", "Backpack Curl"],
  "biceps.equipment": ["Biceps Curl"],
  "biceps.noEquipment": ["Backpack Curl"],
  "triceps.equipment": ["Triceps Pushdown", "Chest Press"],
  "triceps.noEquipment": ["Close-Grip Push-Up", "Push-Up"],
  "chest.equipment": ["Chest Press", "Cable Fly"],
  "chest.noEquipment": ["Push-Up", "Wide Push-Up"],
  "legs.equipment": ["Leg Press", "Leg Extension", "Leg Curl", "Seated Calf Raise"],
  "legs.noEquipment": ["Bodyweight Squat", "Reverse Lunge", "Glute Bridge", "Calf Raise"],
  "quads.equipment": ["Leg Extension", "Leg Press", "Smith Machine Squat"],
  "quads.noEquipment": ["Bodyweight Squat", "Reverse Lunge"],
  "hamstrings.equipment": ["Leg Curl", "Hip Thrust"],
  "hamstrings.noEquipment": ["Good Morning", "Glute Bridge"],
  "glutes.equipment": ["Hip Thrust", "Cable Kickback", "Leg Press"],
  "glutes.noEquipment": ["Glute Bridge", "Bodyweight Squat", "Reverse Lunge"],
  "calves.equipment": ["Seated Calf Raise", "Leg Press"],
  "calves.noEquipment": ["Calf Raise"],
  "full-body.equipment": ["Row Intervals", "Smith Machine Squat", "Chest Press"],
  "full-body.noEquipment": ["Bodyweight Squat", "Push-Up", "Mountain Climber", "Forearm Plank"],
};

export function getPlan(partId, mode = "equipment") {
  return (plans[`${partId}.${mode}`] || []).map((n) => getExercise(slug(n), n));
}