import express from "express";
const route = express.Router();
import vocabularyController from "../controller/vocabulary.controller";
import validation from "../validation/index.validation";
import { validateCreateVocabulary } from "../validation/vocabulary.validations";

//Create New vocabulary
route.post("/createVocabulary", validation(validateCreateVocabulary), vocabularyController.createNewVocabulary)


//get List
route.get("/getVocabularyList", vocabularyController.getAllVocabulary)


export default route;
