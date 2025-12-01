import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

// ====================================================
// 1. DEFINE SCHEMAS (Matches your index.js with fixes)
// ====================================================

// --- Category Schema ---
const categorySchema = new mongoose.Schema({
  label: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  type: { type: String, required: true },
});

// --- Program Schema ---
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
  },
  { timestamps: true } // This ensures createdAt and updatedAt are generated
);

// --- User Schema ---
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["guest", "user", "admin"],
    default: "guest",
  },
  savedPrograms: [
    {
      programId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "programs", // FIXED: Changed from 'Program' to 'programs' to match the model name
      },
      savedAt: { type: Date, default: Date.now },
      status: { type: String, default: "active" },
    },
  ],
  createdProgramCount: { type: Number, default: 0 },
  joinedAt: { type: Date, default: Date.now },
});

// ====================================================
// 2. INITIALIZE MODELS
// ====================================================
const CategoryModel = mongoose.model("categories", categorySchema);
const ProgramModel = mongoose.model("programs", programSchema);
const UserModel = mongoose.model("users", userSchema);

// ====================================================
// 3. SEEDING LOGIC
// ====================================================
const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("🌱 Connected to database...");

    // Clear existing data
    await CategoryModel.deleteMany({});
    await ProgramModel.deleteMany({});
    await UserModel.deleteMany({});
    console.log("🧹 Cleared old data.");

    // ----------------------------
    // Insert Categories
    // ----------------------------
    const categories = [
      { label: 'Strength',          slug: 'strength',        type: 'goal' },
      { label: 'Hypertrophy',       slug: 'hypertrophy',     type: 'goal' },
      { label: 'Conditioning',      slug: 'conditioning',    type: 'goal' },
      { label: 'Mobility',          slug: 'mobility',        type: 'goal' },
      { label: 'Powerlifting',      slug: 'powerlifting',    type: 'goal' },
      { label: 'Powerbuilding',     slug: 'powerbuilding',   type: 'goal' },
      { label: 'Bodybuilding',      slug: 'bodybuilding',    type: 'goal' },
      { label: 'Calisthenics',      slug: 'calisthenics',    type: 'goal' },
      { label: 'General Fitness',   slug: 'general-fitness', type: 'goal' },
      { label: 'Fat Loss',          slug: 'fat-loss',        type: 'goal' },
      { label: 'Minimal Equipment', slug: 'equipment-light', type: 'equipment' },
      { label: 'Busy Schedule',     slug: 'busy-schedule',   type: 'duration' }
    ];
    
    await CategoryModel.insertMany(categories);
    console.log(`✅ Inserted ${categories.length} categories.`);

    // ----------------------------
    // Insert Programs
    // ----------------------------
    const programData = [
      {
        title: 'Morning Cardio Blast',
        shortLabel: 'Cardio',
        summary: 'Start your day with high-energy cardio workouts.',
        description: 'Start your day with high-energy cardio workouts designed to boost metabolism.',
        tags: ['Cardio', 'Morning', 'Metabolism'],
        durationHint: '3-5 days/wk',
        type: 'system',
        isPublic: true,
        authorName: 'System',
        rating: 4.5,
        ratingCount: 120
      },
      {
        title: 'Upper-Lower Split',
        shortLabel: 'Upper / Lower',
        summary: 'Build muscle and strength with this comprehensive program.',
        description: 'Build muscle and strength with this comprehensive program focusing on proper form.',
        tags: ['Strength', 'Simple', 'Repeatable'],
        durationHint: '4 days/wk',
        type: 'system',
        isPublic: true,
        authorName: 'System',
        rating: 4.8,
        ratingCount: 200
      },
      {
        title: 'Full Body',
        shortLabel: 'Total body',
        summary: 'Perfect for beginners, this program introduces fundamental exercises.',
        description: 'Perfect for beginners, this program introduces fundamental exercises and proper technique.',
        tags: ['General Fitness', 'Beginner'],
        durationHint: '2-4 days/wk',
        type: 'system',
        isPublic: true,
        authorName: 'System',
        rating: 4.6,
        ratingCount: 150
      },
      {
        title: '5x5 Strength Program',
        shortLabel: 'Strength core',
        summary: 'Take your strength to the next level with advanced powerlifting techniques.',
        description: 'Take your strength to the next level with advanced powerlifting techniques.',
        tags: ['Powerlifting', 'Compound', 'Progressive'],
        durationHint: '3 days/wk',
        type: 'system',
        isPublic: true,
        authorName: 'System',
        rating: 4.9,
        ratingCount: 220
      },
      {
        title: 'Yoga Flow for Flexibility',
        shortLabel: 'Flexibility',
        summary: 'Improve flexibility and reduce stress with gentle yoga flows.',
        description: 'Improve flexibility and reduce stress with gentle yoga flows suitable for all levels.',
        tags: ['Yoga', 'Flexibility', 'Recovery'],
        durationHint: '3-4 days/wk',
        type: 'community',
        isPublic: true,
        authorName: 'Sarah Johnson',
        rating: 4.2,
        ratingCount: 80
      }
    ];

    // Using insertMany with Mongoose ensures timestamps are created automatically
    const createdPrograms = await ProgramModel.insertMany(programData);
    console.log(`✅ Inserted ${createdPrograms.length} programs.`);

    // ----------------------------
    // Insert Users (With Relations)
    // ----------------------------
    
    // Helper to get ID by index from the created programs
    const getProgId = (index) => createdPrograms[index]._id;

    const userData = [
      {
        username: 'guest1',
        email: 'guest1@example.com',
        role: 'guest',
        createdProgramCount: 0,
        joinedAt: new Date(),
        savedPrograms: [
          {
            programId: getProgId(0), // Morning Cardio
            savedAt: new Date(),
            status: 'active'
          }
        ]
      },
      {
        username: 'johndoe',
        email: 'john@example.com',
        role: 'user',
        createdProgramCount: 2,
        joinedAt: new Date('2023-10-01'),
        savedPrograms: [
          {
            programId: getProgId(1), // Upper-Lower
            savedAt: new Date('2023-10-02'),
            status: 'active'
          },
          {
            programId: getProgId(3), // 5x5 Strength
            savedAt: new Date('2023-11-10'),
            status: 'completed'
          }
        ]
      },
      {
        username: 'admin1',
        email: 'admin@example.com',
        role: 'admin',
        createdProgramCount: 5,
        joinedAt: new Date('2023-01-15'),
        savedPrograms: [
          {
            programId: getProgId(2), // Full Body
            savedAt: new Date('2023-02-01'),
            status: 'active'
          }
        ]
      }
    ];

    await UserModel.insertMany(userData);
    console.log(`✅ Inserted ${userData.length} users.`);

    console.log("✨ Database seeding completed successfully!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();