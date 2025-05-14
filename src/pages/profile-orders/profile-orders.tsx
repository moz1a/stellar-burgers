import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrders } from '../../services/slices/ordersSlice';
import { TOrder } from '@utils-types';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const { isLoading } = useSelector((state) => state.orders);

  if (isLoading) {
    return <p>Загрузка заказов...</p>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
