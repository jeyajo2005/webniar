import mongoose from 'mongoose';
import { memoryStore } from './store.js';

const LessonSchema = new mongoose.Schema({
  _id: { type: String, default: () => 'les_' + Date.now() + Math.random().toString(36).substring(2, 6) },
  title: { type: String, required: true },
  duration: { type: String, default: '15 min' },
  durationSec: { type: Number, default: 900 },
  videoUrl: { type: String, required: true },
  isFreePreview: { type: Boolean, default: false },
  summary: { type: String }
});

const ModuleSchema = new mongoose.Schema({
  _id: { type: String, default: () => 'mod_' + Date.now() + Math.random().toString(36).substring(2, 6) },
  title: { type: String, required: true },
  lessons: [LessonSchema]
});

const CourseSchema = new mongoose.Schema({
  _id: { type: String, default: () => 'course_' + Date.now() + Math.random().toString(36).substring(2, 6) },
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['AI & Agents', 'Full-Stack Development', 'Cloud & DevOps', 'UI/UX Design', 'Data Science', 'Cyber Security', 'Business'],
    default: 'AI & Agents' 
  },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'], default: 'All Levels' },
  language: { type: String, default: 'English' },
  price: { type: Number, required: true, default: 499 },
  originalPrice: { type: Number, default: 2999 },
  currency: { type: String, default: 'INR' },
  thumbnail: { type: String, required: true },
  previewVideoUrl: { type: String, default: '/videos/gemini_generated_video_323b2790.mp4' },
  badge: { type: String, default: 'Bestseller' },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 1240 },
  studentsCount: { type: Number, default: 14200 },
  durationHours: { type: Number, default: 16 },
  lecturesCount: { type: Number, default: 24 },
  certificateAvailable: { type: Boolean, default: true },
  published: { type: Boolean, default: true },
  instructor: {
    name: { type: String, required: true },
    title: { type: String },
    avatar: { type: String },
    bio: { type: String },
    rating: { type: String, default: '4.9 Instructor Rating' },
    studentsCount: { type: Number, default: 45000 }
  },
  whatYouWillLearn: [{ type: String }],
  requirements: [{ type: String }],
  faqs: [{ question: String, answer: String }],
  modules: [ModuleSchema]
}, { timestamps: true });

let MongooseCourse;
try {
  MongooseCourse = mongoose.model('Course', CourseSchema);
} catch (e) {
  MongooseCourse = mongoose.model('Course');
}

const matchesQuery = (doc, query) => {
  if (!query || Object.keys(query).length === 0) return true;
  for (const k of Object.keys(query)) {
    if (k === 'category' && query[k]) {
      if (doc.category !== query[k]) return false;
    } else if (k === 'search' && query[k]) {
      const q = query[k].toLowerCase();
      const match = (doc.title && doc.title.toLowerCase().includes(q)) ||
                    (doc.subtitle && doc.subtitle.toLowerCase().includes(q)) ||
                    (doc.instructor?.name && doc.instructor.name.toLowerCase().includes(q));
      if (!match) return false;
    } else if (doc[k] !== query[k]) {
      return false;
    }
  }
  return true;
};

export const CourseModel = {
  find: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      const mongoQuery = {};
      if (query.category) mongoQuery.category = query.category;
      if (query.published !== undefined) mongoQuery.published = query.published;
      if (query.search) {
        mongoQuery.$or = [
          { title: { $regex: query.search, $options: 'i' } },
          { subtitle: { $regex: query.search, $options: 'i' } }
        ];
      }
      let results = await MongooseCourse.find(mongoQuery).sort({ rating: -1, createdAt: -1 });
      if (results.length === 0 && (await MongooseCourse.countDocuments()) === 0 && memoryStore.courses?.length) {
        try {
          await MongooseCourse.insertMany(memoryStore.courses);
          results = await MongooseCourse.find(mongoQuery).sort({ rating: -1, createdAt: -1 });
        } catch (e) {
          console.warn('[Course Seed Warning]:', e.message);
          return (memoryStore.courses || []).filter(c => matchesQuery(c, query));
        }
      }
      return results;
    }
    return (memoryStore.courses || []).filter(c => matchesQuery(c, query));
  },
  findOne: async (query = {}) => {
    if (mongoose.connection.readyState === 1) {
      const doc = await MongooseCourse.findOne(query);
      if (doc) return doc;
    }
    return (memoryStore.courses || []).find(c => matchesQuery(c, query)) || null;
  },
  findById: async (id) => {
    if (mongoose.connection.readyState === 1) {
      const doc = await MongooseCourse.findOne({ $or: [{ _id: id }, { slug: id }] });
      if (doc) return doc;
    }
    return (memoryStore.courses || []).find(c => c._id === id || c.slug === id) || null;
  },
  create: async (data) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseCourse.create(data);
    }
    const newDoc = {
      _id: 'course_' + Date.now(),
      ...data,
      createdAt: new Date().toISOString()
    };
    if (!memoryStore.courses) memoryStore.courses = [];
    memoryStore.courses.push(newDoc);
    return newDoc;
  },
  findByIdAndUpdate: async (id, update) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseCourse.findOneAndUpdate({ $or: [{ _id: id }, { slug: id }] }, update, { new: true });
    }
    const index = (memoryStore.courses || []).findIndex(c => c._id === id || c.slug === id);
    if (index !== -1) {
      memoryStore.courses[index] = { ...memoryStore.courses[index], ...update };
      return memoryStore.courses[index];
    }
    return null;
  },
  findByIdAndDelete: async (id) => {
    if (mongoose.connection.readyState === 1) {
      return await MongooseCourse.findOneAndDelete({ $or: [{ _id: id }, { slug: id }] });
    }
    const index = (memoryStore.courses || []).findIndex(c => c._id === id);
    if (index !== -1) {
      return memoryStore.courses.splice(index, 1)[0];
    }
    return null;
  }
};

export default CourseModel;
