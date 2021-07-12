import styled, { css } from 'styled-components';
import { horizontalPadding, sizeUnits, verticalPadding } from '../../../../theme/size';
import { label, labelBold, microlabel } from '../../../../theme/typography';
import { color, transition } from '../../../../theme';
import { Button } from '../../button';
import { RelativeDate as RelativeDateBase } from '../../relativeDate';
import { NotificationThemeProps } from './notification.types';

const readColor = color.greyScale.get(55);

export const Container = styled.li<NotificationThemeProps>`
  display: grid;
  grid-template-areas:
    'avatar time markAsRead'
    'avatar title markAsRead'
    'avatar content content'
    '. actions actions';
  grid-template-columns: ${sizeUnits(3)} 1fr ${sizeUnits(3)};
  grid-column-gap: ${sizeUnits(1)};
  transition: background-color ${transition.primary};
  color: ${(props) => (props.theme.isRead ? readColor : 'inherit')};
  ${verticalPadding(sizeUnits(2))}
  ${horizontalPadding(sizeUnits(2))}


  &:hover, &:focus {
    background-color: ${color.skyBlueScale.get(95)};
    cursor: pointer;
  }

  &:active {
    background-color: ${color.skyBlueScale.get(90)};
  }
`;

export const Avatar = styled.img`
  margin-top: ${sizeUnits(0.5)};
  grid-area: avatar;
  border-radius: 100%;
`;

export const RelativeDate = styled(RelativeDateBase)`
  grid-area: time;
  ${microlabel};
`;

export const Title = styled.h6`
  grid-area: title;
  ${labelBold};
`;

export const Content = styled.p`
  grid-area: content;
  margin-top: ${sizeUnits(0.25)};
  ${label};
`;

export const MarkAsReadButton = styled(Button)<NotificationThemeProps>`
  grid-area: markAsRead;
  width: ${sizeUnits(3)};
  height: ${sizeUnits(3)};
  padding: ${sizeUnits(0.5)};
  position: relative;
  top: -${sizeUnits(0.5)};

  ${(props) =>
    props.theme.isRead &&
    css`
      &,
      :focus,
      :active {
        color: ${readColor};
      }

      &:not(:disabled):hover {
        color: ${color.greyScale.get(75)};
      }
    `}
`;

export const Actions = styled.footer`
  grid-area: actions;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-top: ${sizeUnits(1)};
  margin: -${sizeUnits(0.5)};

  > * {
    margin: ${sizeUnits(0.25)};
  }
`;