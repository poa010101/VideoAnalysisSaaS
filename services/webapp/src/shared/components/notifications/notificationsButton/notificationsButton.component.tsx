import { Suspense } from 'react';
import mailOutlineIcon from '@iconify-icons/ion/mail-outline';
import mailUnreadOutlineIcon from '@iconify-icons/ion/mail-unread-outline';
import { PreloadedQuery, useFragment, usePreloadedQuery } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { ButtonProps, ButtonVariant } from '../../button';
import { Icon } from '../../icon';
import NotificationsButtonQuery, {
  notificationsListQuery,
  notificationsListQueryResponse,
} from '../../../../__generated__/notificationsListQuery.graphql';
import { notificationsButtonContent$key } from '../../../../__generated__/notificationsButtonContent.graphql';
import { Button } from './notificationsButton.styles';

export type NotificationsButtonProps = Omit<ButtonProps, 'children' | 'variant'> & {
  listQueryRef: PreloadedQuery<notificationsListQuery>;
};

export const NotificationsButton = ({ listQueryRef, ...props }: NotificationsButtonProps) => {
  const queryResponse = usePreloadedQuery(NotificationsButtonQuery, listQueryRef);

  return (
    <Suspense fallback={<Content hasUnreadNotifications={false} {...props} />}>
      <Wrapper queryResponse={queryResponse} {...props} />
    </Suspense>
  );
};

type WrapperProps = Omit<NotificationsButtonProps, 'listQueryRef'> & {
  queryResponse: notificationsListQueryResponse;
};

export const Wrapper = ({ queryResponse, ...props }: WrapperProps) => {
  const data = useFragment<notificationsButtonContent$key>(
    graphql`
      fragment notificationsButtonContent on ApiQuery {
        hasUnreadNotifications
      }
    `,
    queryResponse
  );

  return <Content hasUnreadNotifications={data.hasUnreadNotifications ?? false} {...props} />;
};

type ContentProps = Omit<NotificationsButtonProps, 'listQueryRef'> & {
  hasUnreadNotifications: boolean;
};

const Content = ({ hasUnreadNotifications, ...props }: ContentProps) => {
  return (
    <Button variant={ButtonVariant.ROUND} hasUnreadNotifications={hasUnreadNotifications} {...props}>
      <Icon icon={hasUnreadNotifications ? mailUnreadOutlineIcon : mailOutlineIcon} />
    </Button>
  );
};