import { Router } from 'express';
import { createArticle } from '../controllers/Article/create';
import { getOne } from '../controllers/Article/get';
import { getAll } from '../controllers/Article/getAll';
import { updatedArticle } from '../controllers/Article/update';
import { deleteArticle } from '../controllers/Article//delete';
import { newImage } from '../controllers/Article/newImage';
import { validateArticle } from '../helpers/validateArticle';
import { Uploader } from '../helpers/uploader';
import { validRequest } from '../middlewares/validate-request';
import { reqiredUser } from '../middlewares/required-user';

const uploader = new Uploader();

const router = Router();

// Get article
router.get('/api/articles/:id', getOne);

// Get all article
router.get('/api/articles', getAll);

// add new article
router.post('/api/articles', reqiredUser, validateArticle(), validRequest, createArticle);

// add new image
router.post('/api/articles/picture', reqiredUser, uploader.storeSingle('article_icon'), newImage);

// Update existing article
router.put('/api/articles/:id', reqiredUser, validateArticle(), validRequest, updatedArticle);

// Delete existing article
router.delete('/api/articles/:id', reqiredUser, deleteArticle);

export { router as ArticleRouter };
