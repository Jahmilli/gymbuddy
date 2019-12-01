// export enum EXERCISES {
//   // Push
//   BARBELL_BENCH_PRESS = "Barbell Bench Press",
//   BARBELL_OVERHEAD_PRESS = "Barbell Overhead Press",
//   FLAT_DUMBELL_PRESS = "Flat Dumbell Press",
//   DUMBELL_FLYES = "Dumbell Flyes",
//   SIDE_RAISES = "Side Raises",
//   INCLINE_SKULLS = "Incline Skulls",
//   PUSHDOWN = "Pushdown",
//   INCLINE_BARBELL_BENCH_PRESS = "Incline Barbell Bench Press",
//   INCLINE_DUMBELL_PRESS = "Incline Dumbell Press",
//   DUMBELL_SHOULDER_PRESS = "Dumbell Shoulder Press",
//   LOWER_CABLE_FLYES = "Lower Cable Flyes",
//   CABLE_SIDE_RAISES = "Cable Side Raises",
//   WEIGHTED_DIPS = "Weighted Dips",
//   DUMBELL_OVERHEAD_EXTENSIONS = "Dumbell Overhead Extensions",
//   PAUSED_BARBELL_BENCH_PRESS = "Paused Barbell Bench Press",
  
//   // Pull
//   WEIGHTED_PULLUPS = "Weighted Pullups",
//   T_BAR_ROW = "T-Bar Row",
//   ONE_ARM_REVERSE_PULLDOWN = "One Arm Reverse Pulldown",
//   REAR_DELT_FLY = "Rear Delt Fly",
//   BARBELL_SHRUGS = "Barbell Shrugs",
//   BARBELL_CURL = "Barbell Curl",
//   INCLINE_HAMMER_CURL = "Incline Hammer Curl",
//   RACK_PULL = "Rack Pull",
//   BARBELL_ROW = "Barbell Row",
//   PULLDOWN = "Pulldown",
//   ONE_ARM_MACHINE_ROW = "One Arm Machine Row",
//   FACEPULL = "Facepull",
//   PREACHER_CURL = "Preacher Curl",
//   REVERSE_BARBELL_CURL = "Reverse Barbell Curl",

//   // Legs
//   BARBELL_SQUAT = "Barbell Squat",
//   LEG_PRESS = "Leg Press",
//   STIFF_LEGGED_DEADLIFT = "Stiff Legged Deadlift",
//   HAMSTRING_CURL = "Hamstring Curl",
//   STANDING_CALF_RAISES = "Standing Calf Raises",
//   SEATED_CALF_RAISES = "Seated Calf Raises",
//   AB_ROLLER = "Ab Roller",
//   CABLE_CRUNCH = "Cable Crunch",
//   BARBELL_FRONT_SQUAT = "Barbell Front Squat",
//   LUNGES = "Lunges",
//   GLUTE_HAM_RAISES = "Glute Ham Raises",
//   LEG_EXTENSIONS = "Leg Extensions",
//   LEG_RAISES = "Leg Raises",
//   WEIGHTED_CRUNCH = "Weighted Crunch",
//   SIDE_TWIST = "Side Twist"
// }

export enum EXERCISE_TYPES {
  PUSH = "push",
  PULL = "pull",
  LEGS = "legs"
}

export const exerciseTypes = [
  EXERCISE_TYPES.PUSH,
  EXERCISE_TYPES.PULL,
  EXERCISE_TYPES.LEGS
]

export interface ExerciseName {
  name: string;
  description: string;
  type: EXERCISE_TYPES;
}

export const exercises = {
  push: [
    {
      name: "Barbell Bench Press",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Barbell Overhead Press",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Flat Dumbell Press",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Dumbell Flyes",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Side Raises",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Incline Skulls",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Pushdown",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Incline Barbell Bench Press",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Incline Dumbell Press",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Dumbell Shoulder Press",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Lower Cable Flyes",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Cable Side Raises",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Weighted Dips",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Dumbell Overhead Extensions",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
    {
      name: "Paused Barbell Bench Press",
      description: "",
      type: EXERCISE_TYPES.PUSH
    },
  ],
  pull: [
    {
      name: "Weighted Pullups",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "T-Bar Row",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "One Arm Reverse Pulldown",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Rear Delt Fly",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Barbell Shrugs",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Barbell Curl",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Incline Hammer Curl",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Rack Pull",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Barbell Row",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Pulldown",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "One Arm Machine Row",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Facepull",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Preacher Curl",
      description: "",
      type: EXERCISE_TYPES.PULL
    },
    {
      name: "Reverse Barbell Curl",
      description: "",
      type: EXERCISE_TYPES.PULL
    }
  ],
  legs: [
    // Legs
    {
      name: "Barbell Squat",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Leg Press",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Stiff Legged Deadlift",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Hamstring Curl",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Standing Calf Raises",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Seated Calf Raises",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Ab Roller",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Cable Crunch",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Barbell Front Squat",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Lunges",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Glute Ham Raises",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Leg Extensions",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Leg Raises",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Weighted Crunch",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
    {
      name: "Side Twist",
      description: "",
      type: EXERCISE_TYPES.LEGS
    },
  ]
}