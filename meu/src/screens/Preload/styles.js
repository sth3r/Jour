import styled from "styled-components";
import { Colors } from "../../assets/colors";

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.white};
`;

export const Image = styled.Image`
    width: 150px;
    height: 150px;
`;
