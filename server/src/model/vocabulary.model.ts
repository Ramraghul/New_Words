import mongoose, { Document } from 'mongoose';

const VocabularySchema = new mongoose.Schema({
    word: {
        type: String,
        require: true,
        unique: true
    },
    meaning: {
        type: String,
        require: true
    }
}, { timestamps: true });

export default mongoose.model('Vocabulary', VocabularySchema, 'Vocabulary');
