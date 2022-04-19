import styled from "@emotion/styled";
export const Root = styled.div`
  box-sizing: border-box;

  .checkbox {
    opacity: 0;
    position: absolute;
  }

  .checkbox:checked + .label .ball {
    transform: translateX(24px);
  }
`;
export const Label = styled.label`
  cursor: pointer;
  background-color: #000000;
  display: flex;
  height: 26px;
  width: 50px;
  border-radius: 50px;
  position: relative;
  align-items: center;
  justify-content: space-around;

  .fa-moon {
    color: #f1c40f;
  }

  .fa-sun {
    color: #f39c12;
  }

  .ball {
    width: 22px;
    height: 22px;
    background-color: #fff;
    position: absolute;
    top: 2px;
    left: 2px;
    border-radius: 50%;

    transition: transform 0.2s linear;
  }
`;
