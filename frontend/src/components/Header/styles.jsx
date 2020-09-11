import styled from "styled-components";

export const Header = styled.header`
  padding: 15px;
  background: #00bfa6;
`;

export const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 960px;
  margin: 0 auto;
  div.image {
    width: 90px;
    height: 90px;
    border-radius: 100%;
    background: #fff;
    img {
      width: 80px;
    }
  }
  div {
    display: flex;
    align-items: center;
    > a {
      text-decoration: none;
      font-size: 18px;
      color: #fff;
      & + a {
        margin-left: 10px;
      }
    }
    hr {
      width: 1px;
      height: 30px;
      background: #fff;
      margin: 0 30px;
      border: none;
      display: inline-block;
      color: #fff;
    }
  }
  @media only screen and (max-width: 670px) {
    display: grid;
    grid-template-areas: "MENU";
    place-content: center;
    div.image {
      display: none;
    }
    div {
      &.menu {
        grid-area: MENU;
        width: 100%;
        place-content: center;
      }
      > a {
        text-decoration: none;
        font-size: 12px;
        color: #fff;
        & + a {
          margin-left: 5px;
        }
      }
      hr {
        width: 1px;
        height: 30px;
        background: #fff;
        margin: 0 10px;
        border: none;
        display: inline-block;
        color: #fff;
      }
    }
  }
`;
