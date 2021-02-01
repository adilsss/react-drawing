import styled from 'styled-components';

export const Controls = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 125px;
  margin-right: 10px; 
`;

export const ColorInput = styled.input.attrs({type: 'color'})`
  -webkit-appearance: none;
  width: 125px;
  border: none;
  margin-top: 10px;
  margin-bottom: 10px;
  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }
  &::-webkit-color-swatch {
    border: none;
  }
  &:focus {
    outline: none;
  }
`;

export const AppContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const DownloadBtn = styled.a`
  text-decoration: none;
  border: 1px transparent;
  background: #29293a;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const ClearBtn = styled.button`
  background: #29293a;
  color: white;
  outline: 0;
  border: 0;
  &:focus {
    outline: none;
  }
  margin-bottom: 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 100%;
`;

export const UploadBtn = styled.label`
  background: #29293a;
  color: white;
  height: 24px;
  outline: 0;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
  margin-bottom: 10px;
  cursor: pointer;
`;