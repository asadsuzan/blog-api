import express from 'express';
import AuthRoutes from '../modules/auth/auth.route';
import BlogRoutes from '../modules/blog/blog.route';


const router = express.Router();

const routes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/blogs',
    route: BlogRoutes
  },

  
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

const AppRoutes = router;

export default AppRoutes;
