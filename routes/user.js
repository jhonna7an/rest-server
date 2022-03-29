const { Router } = require('express');
const { userGet, userPost, userPut, userDelete } = require('../controllers/user');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campo');
const { esRolValido, emailExiste, existeUserById } = require('../helpers/db-validators');

const router = Router();

router.get('/', userGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    check('mail', 'El correo no es válido').isEmail(),
    check('mail').custom(emailExiste),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(esRolValido),
    validarCampos
], userPost);

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUserById),
    check('role').custom(esRolValido),
    validarCampos
], userPut);

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existeUserById),
    validarCampos
], userDelete);

module.exports = router;