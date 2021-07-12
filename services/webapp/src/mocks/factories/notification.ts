import * as faker from 'faker';
import { NotificationTypes } from '../../shared/components/notifications/notifications.types';
import { NotificationType } from '../../../graphql/schema/schemaTypes';
import { createFactory } from './factoryCreators';

export const notificationFactory = createFactory<NotificationType>(() => ({
  id: faker.datatype.uuid(),
  type: faker.random.arrayElement(Object.values(NotificationTypes)),
  data: {},
  createdAt: faker.date.past().toISOString(),
  readAt: null,
}));