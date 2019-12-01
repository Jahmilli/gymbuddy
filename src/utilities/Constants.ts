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

export enum SPLIT_TYPE {
  PUSH = "push",
  PULL = "pull",
  LEGS = "legs"
}

export enum BODY_PART {
  SHOULDERS = "shoulders",
  BICEPS = "biceps",
  TRICEPS = "triceps",
  CHEST = "chest",
  LEGS = "legs",
}

export const splitType = [
  SPLIT_TYPE.PUSH,
  SPLIT_TYPE.PULL,
  SPLIT_TYPE.LEGS
]

export interface ExerciseName {
  name: string;
  description: string;
  splitType: SPLIT_TYPE;
  bodyPart: BODY_PART,
}

export const exercises = [
  {
    name: "Barbell Bench Press",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Barbell Overhead Press",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Flat Dumbell Press",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Dumbell Flyes",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Side Raises",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Incline Skulls",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Pushdown",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Incline Barbell Bench Press",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Incline Dumbell Press",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Dumbell Shoulder Press",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Lower Cable Flyes",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Cable Side Raises",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Weighted Dips",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Dumbell Overhead Extensions",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Paused Barbell Bench Press",
    description: "",
    splitType: SPLIT_TYPE.PUSH,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Weighted Pullups",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "T-Bar Row",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "One Arm Reverse Pulldown",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Rear Delt Fly",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Barbell Shrugs",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Barbell Curl",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Incline Hammer Curl",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Rack Pull",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Barbell Row",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Pulldown",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "One Arm Machine Row",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Facepull",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Preacher Curl",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Reverse Barbell Curl",
    description: "",
    splitType: SPLIT_TYPE.PULL,
    bodyPart: BODY_PART.CHEST,
  },
  // Legs
  {
    name: "Barbell Squat",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Leg Press",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Stiff Legged Deadlift",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Hamstring Curl",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Standing Calf Raises",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Seated Calf Raises",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Ab Roller",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Cable Crunch",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Barbell Front Squat",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Lunges",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Glute Ham Raises",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Leg Extensions",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Leg Raises",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Weighted Crunch",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
  {
    name: "Side Twist",
    description: "",
    splitType: SPLIT_TYPE.LEGS,
    bodyPart: BODY_PART.CHEST,
  },
]