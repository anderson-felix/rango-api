import schedule from 'node-schedule';
import { AppDataSource } from '../typeorm';
import { Order } from '@modules/order/infra/typeorm/entities/Order';

const CRONTAB_PRODUCTS_RULE = process.env.CRONTAB_RULE || '* * * * *';

const TWO_MINUTES = 1000 * 60 * 2;
const FOUR_MINUTES = 1000 * 60 * 3;
const EIGHT_MINUTES = 1000 * 60 * 8;

const getTime = (v: any) => new Date(v).getTime();

// MAIN FUNCTION SCHEDULER
(() => {
  schedule.scheduleJob(CRONTAB_PRODUCTS_RULE, async () => {
    await updateAllProductsCache();
  });
})();

// AUTOMATIC UPDATE STATUS
const updateAllProductsCache = async () => {
  const ormRepository = AppDataSource.getRepository(Order);

  const orders = await ormRepository.find();

  orders.forEach(order => {
    if (order.status === `pending` && Date.now() - TWO_MINUTES > getTime(order.created_at)) order.status = `preparing`;
    if (order.status === `preparing` && Date.now() - FOUR_MINUTES > getTime(order.created_at)) order.status = `in_delivery`;
    if (order.status === `in_delivery` && Date.now() - EIGHT_MINUTES > getTime(order.created_at)) order.status = `finished`;
  });

  await ormRepository.save(orders);
};
