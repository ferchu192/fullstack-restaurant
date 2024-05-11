// Styled-Components
import styled from 'styled-components';

interface Props {
  type: TypeHeader;
  key: string;
}

interface ChipProps {
  key: string;
  color: string;
  backgroundColor: string;
}

const Chip = styled.span<ChipProps>`
  border-radius: 2rem;
  color: ${(props) => props.color || 'white'};
  background-color: ${(props) => props.backgroundColor || 'gray'};
  padding: 0.2rem;
  padding-inline: 0.5rem;
  font-weight: bold;
`;

const Tag = (props: Props) => {
  const { type, key } = props;

  switch (type) {
    case 'new':
      return <Chip key={`${key}-${type}`} color="white" backgroundColor="#3ff436" >New</Chip>

    case 'celiac':
      return <Chip key={`${key}-${type}`} color="white" backgroundColor="#ffc107" >Celiac</Chip>

    case 'vegan':
      return <Chip key={`${key}-${type}`} color="white" backgroundColor="#009345" >Vegan</Chip>

    default:
      return <></>
  }
};

export enum TypeHeader {
  new = 'new',
  celiac = 'celiac',
  vegan = 'vegan',
  none = '',
}

export default Tag;