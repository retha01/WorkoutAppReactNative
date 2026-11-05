 
export const sliderImages = [
  require("../../assets/images/pic1.jpg"),
  require("../../assets/images/picture2.png"),
  require("../../assets/images/picture3.png"),
  require("../../assets/images/picture4.png"),
  require("../../assets/images/picture5.png"),
];
 
// ---------------------------------------------------------------------------
// GYM EQUIPMENT
// Answers the 3 core questions: how do I use it, what does it target,
// which workouts go with it.
// highlightFor = who sees it FIRST. It never hides anything.
// ---------------------------------------------------------------------------
export const gymEquipment = [
  {
    id: "treadmill",
    name: "Treadmill",
    video: "https://youtu.be/kxSls61A3WI?si=uLHgHKdTDDn6L5DZ",
    category: "Cardio",
    image: require("../../assets/images/treadmill.jpg"),
    targets: ["Quads", "Hamstrings", "Calves", "Glutes"],
    benefit:
      "Builds cardio fitness and leg endurance with walking, jogging or running.",
    howToUse: [
      "Clip the safety key to your clothing before you start.",
      "Straddle the belt and start at a slow walk before stepping on.",
      "Increase speed or incline a little at a time.",
      "Use the handrails for balance only, don't lean on them.",
      "Finish with 3 to 5 minutes at a slow walk before stepping off.",
    ],
    workouts: ["Brisk walk", "Incline walk", "Steady jog", "Jog/walk intervals"],
    highlightFor: ["man", "woman"],
  },
  {
    id: "elliptical",
    name: "Elliptical",
    video: "https://youtu.be/RakIFxUmSpA?si=Xf8K3cGeIy8xlY_a",
    category: "Cardio",
    image: require("../../assets/images/elliptical.jpg"),
    targets: ["Quads", "Glutes", "Hamstrings", "Calves", "Arms"],
    benefit:
      "Low-impact cardio that is easy on the joints and works legs and arms together.",
    howToUse: [
      "Step onto the pedals and hold the moving handles.",
      "Stand tall with your shoulders back and your core lightly braced.",
      "Push and pull the handles in rhythm with your legs.",
      "Keep your heels down and add resistance gradually.",
      "Pedal backwards for a minute or two to shift the work to hamstrings and glutes.",
    ],
    workouts: ["Steady 20 minutes", "Resistance intervals", "Reverse stride"],
    highlightFor: ["man", "woman"],
  },
  {
    id: "stationary-bike",
    name: "Stationary Bike",
    video: "https://youtu.be/NwwDBARCGgo?si=c-trevApzb3j9XMu",
    category: "Cardio",
    image: require("../../assets/images/stationary_bike.jpg"),
    targets: ["Quads", "Hamstrings", "Glutes", "Calves"],
    benefit:
      "Gentle on the joints, great for building leg endurance and a warm-up for leg day.",
    howToUse: [
      "Set the seat so your knee has a slight bend at the bottom of the pedal stroke.",
      "Place your feet flat on the pedals, or secure them in the straps.",
      "Sit tall with a relaxed grip on the handlebars.",
      "Start with low resistance and a smooth, steady pace.",
      "Increase resistance only when you can keep a comfortable rhythm.",
    ],
    workouts: ["Easy warm-up spin", "Steady ride", "Sprint intervals", "Hill ride"],
    highlightFor: ["man", "woman"],
  },
  {
    id: "rowing-machine",
    name: "Rowing Machine",
    video: "https://youtu.be/4zWu1yuJ0_g?si=zHISawjjrSku46NB",
    category: "Cardio",
    image: require("../../assets/images/rowing_machine.jpg"),
    targets: ["Back", "Legs", "Core", "Biceps"],
    benefit:
      "A full-body cardio machine that works your back, legs and core in one smooth movement.",
    howToUse: [
      "Sit, strap your feet in and grip the handle with straight arms.",
      "Drive: push with your legs first.",
      "Then lean back slightly and pull the handle to your lower ribs.",
      "Recover in reverse order: arms out, lean forward, then bend your knees.",
      "Keep your back flat and move smoothly, never yank the handle.",
    ],
    workouts: ["10 minute steady row", "500m intervals", "Pyramid row"],
    highlightFor: ["man"],
  },
  {
    id: "stair-climber",
    name: "Stair Climber",
    video: "https://youtu.be/GMc8fUksKpY?si=C3l9P_MxrE7zZDVB",
    category: "Cardio",
    image: require("../../assets/images/stair_climber.jpg"),
    targets: ["Glutes", "Quads", "Calves", "Hamstrings"],
    benefit:
      "Tough lower-body cardio that works your glutes and legs hard.",
    howToUse: [
      "Step on and rest your hands lightly on the rails for balance.",
      "Stand tall, don't hunch over or lean your weight on the handles.",
      "Press through your whole foot on every step.",
      "Start slow for the first few minutes, then build up.",
    ],
    workouts: ["Steady 10 to 15 minutes", "30s fast / 60s slow intervals"],
    highlightFor: ["woman"],
  },
  {
    id: "strength-machines",
    name: "Strength Training Machines",
    video: "https://youtu.be/ogSfK4fPCwk?si=Ndk3qgphiMuwBdtV",
    category: "Strength",
    image: require("../../assets/images/strength_training_machine.jpg"),
    targets: ["Chest", "Back", "Shoulders", "Quads", "Hamstrings"],
    benefit:
      "Guided machines that are the safest place for a beginner to learn strength training.",
    howToUse: [
      "Read the diagram on the machine to see which muscles it works.",
      "Adjust the seat and pads so your joints line up with the machine's pivot.",
      "Move the pin to a light weight first.",
      "Move slowly through the full range, breathing out as you push or pull.",
      "Aim for 2 to 3 sets of 8 to 12 reps.",
    ],
    workouts: [
      "Chest Press",
      "Lat Pulldown",
      "Seated Row",
      "Shoulder Press",
      "Leg Press",
      "Leg Curl",
    ],
    highlightFor: ["man", "woman"],
  },
  {
    id: "cable-machine",
    name: "Cable Machines",
    video: "https://youtu.be/22AFyTaVs5g?si=XalydfNaynuR6qkw",
    category: "Strength",
    image: require("../../assets/images/cable_machine.jpg"),
    targets: ["Arms", "Shoulders", "Back", "Chest", "Core", "Glutes"],
    benefit:
      "Constant tension and adjustable height make it one machine for dozens of exercises.",
    howToUse: [
      "Set the pulley height for the exercise and clip on the handle or rope.",
      "Pick a light weight to start.",
      "Stand in a stable stance and brace your core.",
      "Control the weight in both directions, don't let the stack slam down.",
    ],
    workouts: [
      "Triceps Pushdown",
      "Cable Row",
      "Face Pull",
      "Biceps Curl",
      "Cable Kickback",
      "Woodchop",
    ],
    highlightFor: ["man", "woman"],
  },
  {
    id: "smith-machine",
    name: "Smith Machine",
    video: "https://youtu.be/HPXa3HdJQnc?si=PQju9poDiyiYAs7G",
    category: "Strength",
    image: require("../../assets/images/smith_machine.jpg"),
    targets: ["Quads", "Glutes", "Chest", "Shoulders"],
    benefit:
      "A barbell fixed on rails, so it's a more stable way to learn squats and presses.",
    howToUse: [
      "Set the bar to a height that suits the exercise.",
      "Set the safety stops just below the lowest point of your lift.",
      "Load the plates evenly on both sides.",
      "Twist the bar to unhook it, lift with control, then twist to re-hook it.",
    ],
    workouts: ["Squat", "Split Squat", "Hip Thrust", "Incline Press", "Shoulder Press"],
    highlightFor: ["man", "woman"],
  },
];
 
// ---------------------------------------------------------------------------
// BODY PARTS
// images[gender][mode]  ->  gender: "man" | "woman" | "any"
//                           mode:   "equipment" | "noEquipment"
// Missing combos are left out on purpose. getBodyPartImage() below falls back
// to the closest image, and listImageGaps() tells you what to add.
// ---------------------------------------------------------------------------
export const bodyParts = [
  {
    id: "abs",
    name: "Abs",
    images: {
      man: {
        equipment: require("../../assets/images/abs_equipment_man.jpg"),
        noEquipment: require("../../assets/images/abs_no_equipment_man.jpg"),
      },
      woman: {
        equipment: require("../../assets/images/abs_equipment_woman.jpg"),
        noEquipment: require("../../assets/images/abs_no_equipment_woman.jpg"),
      },
    },
  },
  {
    id: "arms",
    name: "Arms",
    images: {
      woman: {
        equipment: require("../../assets/images/arm_workout_woman_equipment.jpg"),
        noEquipment: require("../../assets/images/arm_workout_woman_no_equipment.jpg"),
      },
    },
  },
  {
    id: "biceps",
    name: "Biceps",
    images: {
      man: {
        equipment: require("../../assets/images/biceps_equipment_man.jpg"),
        noEquipment: require("../../assets/images/biceps_no_equipment_man.jpg"),
      },
    },
  },
  {
    id: "triceps",
    name: "Triceps",
    images: {
      man: {
        equipment: require("../../assets/images/triceps_equipment_man.jpg"),
        noEquipment: require("../../assets/images/triceps_no_equipment_man.jpg"),
      },
    },
  },
  {
    id: "chest",
    name: "Chest",
    images: {
      woman: {
        equipment: require("../../assets/images/chest_workout_woman_equipment.jpg"),
        noEquipment: require("../../assets/images/chest_workout_woman_no_equipment.jpg"),
      },
    },
  },
  {
    id: "legs",
    name: "Legs",
    images: {
      woman: {
        equipment: require("../../assets/images/leg_workout_woman_equipment.jpg"),
      },
      any: {
        noEquipment: require("../../assets/images/leg_workout_no_equipment.jpg"),
      },
    },
  },
  {
    id: "quads",
    name: "Quads",
    images: {
      man: {
        equipment: require("../../assets/images/quads_equipment_man.jpg"),
        noEquipment: require("../../assets/images/quads_no_equipment_man.jpg"),
      },
      woman: {
        equipment: require("../../assets/images/quads_equipment_woman.jpg"),
        noEquipment: require("../../assets/images/quads_no_equipment_woman.jpg"),
      },
    },
  },
  {
    id: "hamstrings",
    name: "Hamstrings",
    images: {
      man: {
        equipment: require("../../assets/images/hamstring_equipment_man.jpg"),
      },
      woman: {
        equipment: require("../../assets/images/hamstring_equipment_woman.jpg"),
        noEquipment: require("../../assets/images/hamstring_no_equipment_woman.jpeg"),
      },
    },
  },
  {
    id: "glutes",
    name: "Glutes",
    images: {
      woman: {
        equipment: require("../../assets/images/glutes_equipment_woman.jpg"),
        noEquipment: require("../../assets/images/glutes_no_equipment_woman.jpg"),
      },
    },
  },
  {
    id: "calves",
    name: "Calves",
    images: {
      man: {
        equipment: require("../../assets/images/calves_equipment_man.jpg"),
        noEquipment: require("../../assets/images/calves_no_equipment_man.jpg"),
      },
      woman: {
        equipment: require("../../assets/images/calves_equipment_woman.jpg"),
        noEquipment: require("../../assets/images/calves_no_equipment_woman.jpg"),
      },
    },
  },
  {
    id: "full-body",
    name: "Full Body",
    images: {
      woman: {
        noEquipment: require("../../assets/images/fullbody_woman_workout_no_equipment.jpg"),
      },
    },
  },
];
 
// ---------------------------------------------------------------------------
// HELPERS
// gender: "man" | "woman" | "all"
// ---------------------------------------------------------------------------
 
// Equipment list with the gender's highlighted items first (nothing is hidden).
export function getEquipment(gender = "all") {
  if (gender === "all") return gymEquipment;
  return [...gymEquipment].sort(
    (a, b) =>
      Number(b.highlightFor.includes(gender)) -
      Number(a.highlightFor.includes(gender))
  );
}
 
// All body parts, with the ones that have images for this gender first.
export function getBodyParts(gender = "all") {
  if (gender === "all") return bodyParts;
  return [...bodyParts].sort(
    (a, b) => Number(Boolean(b.images[gender])) - Number(Boolean(a.images[gender]))
  );
}
 
// Best available image: tries the chosen gender, then "any", then the other
// gender; same mode first, then the other mode. Returns null if nothing exists.
export function getBodyPartImage(part, gender = "woman", mode = "equipment") {
  const otherMode = mode === "equipment" ? "noEquipment" : "equipment";
  const order =
    gender === "man" ? ["man", "any", "woman"] : ["woman", "any", "man"];
 
  for (const m of [mode, otherMode]) {
    for (const g of order) {
      const img = part.images[g]?.[m];
      if (img) return img;
    }
  }
  return null;
}
 
// Dev helper: console.log(listImageGaps()) to see which images to still add.
export function listImageGaps() {
  const gaps = [];
  for (const part of bodyParts) {
    for (const g of ["man", "woman"]) {
      for (const m of ["equipment", "noEquipment"]) {
        if (!part.images[g]?.[m] && !part.images.any?.[m]) {
          gaps.push(`${part.name} / ${g} / ${m}`);
        }
      }
    }
  }
  return gaps;
}
