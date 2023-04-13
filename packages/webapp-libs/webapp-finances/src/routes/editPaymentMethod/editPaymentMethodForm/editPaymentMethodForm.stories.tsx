import { SubscriptionPlanName } from '@sb/webapp-api-client/api/subscription/types';
import {
  paymentMethodFactory,
  subscriptionPhaseFactory,
  subscriptionPlanFactory,
} from '@sb/webapp-api-client/tests/factories';
import { action } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import { times } from 'ramda';

import { fillSubscriptionScheduleQueryWithPhases } from '../../../tests/factories';
import { withActiveSubscriptionContext, withProviders } from '../../../utils/storybook';
import { EditPaymentMethodForm, EditPaymentMethodFormProps } from './editPaymentMethodForm.component';

const Template: Story<EditPaymentMethodFormProps> = (args: EditPaymentMethodFormProps) => {
  return <EditPaymentMethodForm {...args} />;
};

export default {
  title: 'Shared/Subscriptions/EditPaymentMethodForm',
  component: EditPaymentMethodForm,
  decorators: [
    withActiveSubscriptionContext,
    withProviders({
      apolloMocks: (defaultMocks) => {
        const paymentMethods = times(() => paymentMethodFactory(), 3);
        return defaultMocks.concat(
          fillSubscriptionScheduleQueryWithPhases(
            [
              subscriptionPhaseFactory({
                item: { price: subscriptionPlanFactory({ product: { name: SubscriptionPlanName.FREE } }) },
              }),
            ],
            paymentMethods
          )
        );
      },
    }),
  ],
};

export const Default = Template.bind({});

Default.args = {
  onSuccess: action('onSuccess'),
};