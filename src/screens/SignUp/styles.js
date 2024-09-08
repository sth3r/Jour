import styled from 'styled-components/native';
import { Colors } from '../../assets/colors';

export const Body = styled.View`
    flex: 1;
    background-color: ${Colors.primary};
    align-items: center;
`;

export const TextInput = styled.TextInput`
    width: 95%;
    height: 50px;
    border-bottom-color: ${Colors.darkGrey};
    border-bottom-width: 2px;
    font-size: 16px;
    padding-left: 2px;
    padding-bottom: 1px;
    color: ${Colors.darkGrey};
`;

// export const placeholder = styled.placeholder`
//     color: ${Colors.darkGrey},
// `;

// export const container = styled.View`
//     color: ${Colors.darkGrey},
// `;

// export const placeholder = styled.placeholder`
//     color: ${Colors.darkGrey},
// `;

// export const placeholder = styled.placeholder`
//     color: ${Colors.darkGrey},
// `;

// export const placeholder = styled.placeholder`
//     color: ${Colors.darkGrey},
// `;

// export const placeholder = styled.placeholder`
//     color: ${Colors.darkGrey},
// `;

