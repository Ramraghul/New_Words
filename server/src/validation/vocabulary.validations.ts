import Joi from "joi";


export const validateCreateVocabulary = Joi.object({
    word: Joi.string().required(),
    meaning: Joi.string().required()
});


