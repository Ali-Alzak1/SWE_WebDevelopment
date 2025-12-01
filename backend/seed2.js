import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

// ====================================================
// 1. DEFINE SCHEMAS (aligned with backend/index.js)
// ====================================================

// --- Program Info (days / exercises / sets) ---
const setSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    weight: { type: String, default: "" },
    reps: { type: String, default: "" },
  },
  { _id: false }
);

const exerciseSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    muscle: { type: String, required: true },
    unit: { type: String, default: "KG" },
    sets: { type: [setSchema], default: [] },
    notes: { type: String, default: "" },
  },
  { _id: false }
);

const daySchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    exercises: { type: [exerciseSchema], default: [] },
  },
  { _id: false }
);

const programInfoSchema = new mongoose.Schema(
  {
    days: { type: [daySchema], default: [] },
  },
  { _id: false }
);

// --- Program Schema (matches backend/index.js, plus programInfo) ---
const programSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortLabel: { type: String },
    summary: { type: String },
    description: { type: String },
    tags: [{ type: String }],
    durationHint: { type: String },
    type: {
      type: String,
      enum: ["system", "community"],
      default: "community",
    },
    isPublic: { type: Boolean, default: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    authorName: { type: String },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },

    // Detailed program information
    programInfo: {
      type: programInfoSchema,
      default: () => ({ days: [] }),
    },
  },
  { timestamps: true }
);

const ProgramModel = mongoose.model("programsInfo", programSchema);

// ====================================================
// 2. TEMPLATE DATA (inspired by App.jsx templates)
// ====================================================

const templatePrograms = [
  {
    // Push-Pull-Legs (PPL)
    title: "Push-Pull-Legs (PPL)",
    shortLabel: "3-day rotation",
    summary: "A beginner-friendly split with clear upper-body focus days that is easy to customize.",
    description:
      "A beginner-friendly split with clear upper-body focus days that is easy to customize.",
    tags: ["Strength", "Hypertrophy", "Split"],
    durationHint: "4-6 days/wk",
    type: "system",
    isPublic: true,
    authorName: "System",
    rating: 4.6,
    ratingCount: 150,
    programInfo: {
      days: [
        {
          id: 1,
          exercises: [
            {
              id: 1,
              name: "Bench Press",
              muscle: "Chest",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 2,
              name: "Overhead Press",
              muscle: "Shoulders",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 3,
              name: "Tricep Dips",
              muscle: "Triceps",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
          ],
        },
        {
          id: 2,
          exercises: [
            {
              id: 4,
              name: "Deadlift",
              muscle: "Back",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 5,
              name: "Barbell Row",
              muscle: "Back",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 6,
              name: "Barbell Curl",
              muscle: "Biceps",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
          ],
        },
        {
          id: 3,
          exercises: [
            {
              id: 7,
              name: "Squat",
              muscle: "Legs",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 8,
              name: "Leg Press",
              muscle: "Legs",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 9,
              name: "Calf Raise",
              muscle: "Legs",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
          ],
        },
      ],
    },
  },
  {
    // Upper-Lower Split
    title: "Upper-Lower Split",
    shortLabel: "Upper / Lower",
    summary: "Build muscle and strength with this comprehensive program.",
    description:
      "Build muscle and strength with this comprehensive program focusing on proper form.",
    tags: ["Strength", "Simple", "Repeatable"],
    durationHint: "4 days/wk",
    type: "system",
    isPublic: true,
    authorName: "System",
    rating: 4.8,
    ratingCount: 200,
    programInfo: {
      days: [
        {
          id: 1,
          exercises: [
            {
              id: 1,
              name: "Bench Press",
              muscle: "Chest",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 2,
              name: "Barbell Row",
              muscle: "Back",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 3,
              name: "Overhead Press",
              muscle: "Shoulders",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
          ],
        },
        {
          id: 2,
          exercises: [
            {
              id: 4,
              name: "Squat",
              muscle: "Legs",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 5,
              name: "Romanian Deadlift",
              muscle: "Legs",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 6,
              name: "Leg Curl",
              muscle: "Legs",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
          ],
        },
      ],
    },
  },
  {
    // Full Body
    title: "Full Body",
    shortLabel: "Total body",
    summary: "Perfect for beginners, this program introduces fundamental exercises.",
    description:
      "Perfect for beginners, this program introduces fundamental exercises and proper technique.",
    tags: ["General Fitness", "Beginner"],
    durationHint: "2-4 days/wk",
    type: "system",
    isPublic: true,
    authorName: "System",
    rating: 4.6,
    ratingCount: 150,
    programInfo: {
      days: [
        {
          id: 1,
          exercises: [
            {
              id: 1,
              name: "Squat",
              muscle: "Legs",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 2,
              name: "Bench Press",
              muscle: "Chest",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
            {
              id: 3,
              name: "Barbell Row",
              muscle: "Back",
              unit: "KG",
              sets: [
                { id: 1, weight: "", reps: "" },
                { id: 2, weight: "", reps: "" },
                { id: 3, weight: "", reps: "" },
              ],
              notes: "",
            },
          ],
        },
      ],
    },
  },
];

// ====================================================
// 3. SEEDING LOGIC (upsert programInfo for programs)
// ====================================================

const seedProgramInfo = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("🌱 Connected to database (seed2)...");

    let upsertedCount = 0;

    for (const tpl of templatePrograms) {
      const result = await ProgramModel.findOneAndUpdate(
        { title: tpl.title },
        {
          $set: {
            shortLabel: tpl.shortLabel,
            summary: tpl.summary,
            description: tpl.description,
            tags: tpl.tags,
            durationHint: tpl.durationHint,
            type: tpl.type,
            isPublic: tpl.isPublic,
            authorName: tpl.authorName,
            rating: tpl.rating,
            ratingCount: tpl.ratingCount,
            programInfo: tpl.programInfo,
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );

      console.log(`✅ Upserted program: ${result.title}`);
      upsertedCount += 1;
    }

    console.log(`✨ seed2 complete. Upserted ${upsertedCount} programs with programInfo.`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error running seed2:", error);
    process.exit(1);
  }
};

seedProgramInfo();


