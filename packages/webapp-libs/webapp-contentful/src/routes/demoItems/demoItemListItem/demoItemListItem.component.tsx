import favoriteIconFilled from '@iconify-icons/ion/star';
import favoriteIconOutlined from '@iconify-icons/ion/star-outline';
import { DemoItemListItemFragmentFragment } from '@sb/webapp-api-client/graphql';
import { Icon } from '@sb/webapp-core/components/icons';
import { useGenerateLocalePath } from '@sb/webapp-core/hooks';
import { useIntl } from 'react-intl';

import { RoutesConfig } from '../../../config/routes';
import { imageProps } from '../../../helpers';
import { useFavoriteDemoItem } from '../../../hooks';
import { Container, FavoriteIcon, Link, Thumbnail, Title } from './demoItemListItem.styles';

export type DemoItemListItemProps = {
  id: string;
  item: DemoItemListItemFragmentFragment;
};

export const DemoItemListItem = ({ id, item }: DemoItemListItemProps) => {
  const intl = useIntl();
  const { setFavorite, isFavorite } = useFavoriteDemoItem(id);
  const generateLocalePath = useGenerateLocalePath();

  return (
    <Container>
      <Link to={generateLocalePath(RoutesConfig.demoItem, { id })}>
        <FavoriteIcon
          role="checkbox"
          aria-checked={isFavorite}
          aria-label={intl.formatMessage({
            defaultMessage: 'Is favorite',
            id: 'Demo Item / Is favorite',
          })}
          onClick={(e) => {
            e.preventDefault();
            setFavorite(!isFavorite);
          }}
        >
          <Icon icon={isFavorite ? favoriteIconFilled : favoriteIconOutlined} />
        </FavoriteIcon>

        {item.image && <Thumbnail {...imageProps(item.image, { size: { height: 50 } })} role="presentation" />}
        <Title>{item.title}</Title>
      </Link>
    </Container>
  );
};