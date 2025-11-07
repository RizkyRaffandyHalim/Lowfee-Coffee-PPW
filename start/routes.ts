// import ProductsController from '#controllers/products_controller'
// import HomeController from '#controllers/home_controller'
import router from '@adonisjs/core/services/router'
const HomeController =()=>import('#controllers/home_controller')//<- this one is for lazy loading, doesn't matter for our project but better implement this from now for habits building...
const ProductsController=()=>import('#controllers/products_controller')
const WishlistController=()=>import('#controllers/wishlists_controller')

router.get('/', [HomeController, 'index'])
router.on('/about').render('pages/about')//<-kept static cuz, there's nothing that needs interactibility?
router.get('/seed', [ProductsController, 'seed'])
router.get('/products', [ProductsController, 'index'])
router.get('/wishlist', [WishlistController, 'index'])
router.post('/wishlist', [WishlistController, 'store'])