import {Router} from 'express'

import {index, show, update, store, destroy} from '../controllers/users.js'

const router = Router()

router.route('/users').get(index).post(store)
router.route('/users/:id').get(show).put(update).delete(destroy)



export default router