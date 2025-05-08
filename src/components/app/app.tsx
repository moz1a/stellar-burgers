import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const App = () => (
  <div className={styles.app}>
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title='Номер' onClose={() => window.history.back()}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Ингредиенты' onClose={() => window.history.back()}>
              <IngredientDetails />
            </Modal>
          }
        />

        {/* Маршруты для неавторизованных пользователей */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        {/* Защищённые маршруты */}
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        >
          <Route path='orders' element={<ProfileOrders />}>
            <Route
              path=':number'
              element={
                <Modal
                  title='Номер заказа'
                  onClose={() => window.history.back()}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          </Route>
        </Route>

        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
