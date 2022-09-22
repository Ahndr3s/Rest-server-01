const {Router} = require('express')
const { check } = require('express-validator')
const router = Router()
const { usersGet, userPut, userPost, userDelete, userPatch } = require('../controllers/users')
const { isValidRole, doesEmailExists, doesUserByIdExists } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validate-fields')


// CONSULT EXISTING RECORDS
router.get('/', usersGet)

// UPDATE SPECIFIC RECORD VIA ID
router.put('/:id', [
    // VALIDATION MIDDLWARES
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(doesUserByIdExists),
    check('role').custom( isValidRole ),
    validateFields
],userPut)

// ADD A NEW RECORD
router.post('/', [
    // VALIDATION MIDDLWARES
    check('name', 'You must enter a name!!').not().isEmpty(),
    check('password', 'Password must cointain 6 characters minimun!!').isLength({min: 6}),
    check('email').custom(doesEmailExists),
    check('role').custom( isValidRole ),
    
    // check('email', 'Invalid email!!').isEmail(),
    // check('role', 'Invalid role!!').isIn(['ADMIN_ROLE', 'USER_ROLE']),

    validateFields
]
,userPost)

// DELETE A RECORD VIA ID
router.delete('/:id', [
    // VALIDATION MIDDLWARES
    check('id', 'Is not a valid id').isMongoId(),
    check('id').custom(doesUserByIdExists),
    validateFields
], userDelete)

router.patch('/',  userPatch)

module.exports = router