import { Router } from "express";
import * as userFlotex from '../controllers/user.controller';

const router = Router();

router.get("/", userFlotex.getUser);

router.post('/', userFlotex.createUser );

router.get('/:id', userFlotex.getUserById);

router.delete('/:id', userFlotex.DeleteUserById);

router.put('/:id', userFlotex.updateUserById);




export default router;