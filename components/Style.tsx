import styled from 'styled-components';

export const Button = styled.button`
    display: block;
    border-radius: 15px;
    border: none;
    color: white;
    font-size: 14px;
    width: 200px;
    height: 30px;
    background-image: linear-gradient(to right, #f54b64, #f78361);

    &:hover {
        cursor: pointer;
    }
`;

export const Block = styled.div`
    box-shadow: 0px 0px 10px #000000;
    margin: 10px;
    border-radius: 5px;
    padding: 10px;
`;

export const TextInput = styled.input`
    display: block;
    border-radius: 15px;
    border: none;
    color: white;
    font-size: 14px;
    width: 200px;
    height: 30px;
    background: rgba(77,77,77, 0.4);
    color: white;
    text-indent: 10px;

    &::placeholder {
        color: white;
    }
`;
