import router from '@adonisjs/core/services/router'

// const TestController=()=>import('#controllers/tests_controller')
// router.get('/',[TestController,'index'])

// router.on('/').render('pages/home')
const MessagesController=()=>import('#controllers/messages_controller')
router.get('/', [MessagesController, 'index'])
router.post('/messages', [MessagesController, 'store'])
