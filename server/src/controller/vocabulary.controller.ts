import { Request, Response } from 'express';
import Vocabulary from '../model/vocabulary.model';



const vocabularyController = {

    async createNewVocabulary(req: Request, res: Response) {
        try {
            const inData = req.validBody;
            let newVocabulary = await Vocabulary.create(inData);
            if (newVocabulary) {
                return res.status(201).json({
                    success: true,
                    message: "New Vocabulary Created Successfully"
                });
            }
        } catch (error: any) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.word === 1) {
                return res.status(400).json({
                    success: false,
                    error: "Duplicate word. This Word Already In List"
                });
            }
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    async getAllVocabulary(req: Request, res: Response) {
        try {
            const data = await Vocabulary.find().sort({ createdAt: -1 }).lean();
            if (!data || data.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No Data Found",
                    count: 0
                });
            } else {
                const count = await Vocabulary.countDocuments();
                return res.status(200).json({
                    success: true,
                    message: "Data Fetched Successfully",
                    count: count,
                    data: data
                });
            }
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }

};



export default vocabularyController;
