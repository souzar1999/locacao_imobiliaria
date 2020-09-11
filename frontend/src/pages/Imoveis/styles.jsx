import styled from "styled-components";
import { shade, desaturate } from "polished";

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  max-width: 960px;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 15px 0;
  margin: 45px auto 0;
  @media only screen and (max-width: 768px) {
    padding: 15px;
  }
`;

export const TitleContainer = styled.h1`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Main = styled.main`
  width: 100%;
`;

export const Table = styled.table`
  width: 100%;
  margin-top: 45px;
  border-collapse: collapse;
  th,
  td {
    text-align: left;
    &.actions {
      text-align: center;
    }
  }
  thead {
    border-bottom: 2px solid #e9e9e9;
    tr {
      th {
        padding: 10px 0;
        font-size: 18px;
        color: #a8a8a8;
        &:not(.actions) {
          cursor: pointer;
          &:hover {
            color: ${shade(0.1, "#a8a8a8")};
          }
          i {
            padding-left: 10px;
          }
        }
        button {
          padding: 5px 10px;
          color: #ffffff;
          border: none;
          border-radius: 15px;
          &.add {
            background: #06d755;
            &:hover {
              background: ${shade(0.1, "#06d755")};
            }
            &:disabled {
              background: ${desaturate(0.3, "#06d755")};
            }
          }
          &:disabled {
            cursor: not-allowed;
          }
        }
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid #e9e9e9;
      td {
        padding: 15px 0;
        input {
          padding: 5px 10px;
          margin: 0px 10px;
          border: none;
          box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
          border-radius: 15px;
          &:disabled {
            background: ${desaturate(0.3, "#ddd")};
            cursor: not-allowed;
          }
        }
        button {
          padding: 5px 10px;
          color: #ffffff;
          border: none;
          border-radius: 15px;
          &.edit {
            background: #0dc0f3;
            &:hover {
              background: ${shade(0.1, "#0dc0f3")};
            }
            &:disabled {
              background: ${desaturate(0.3, "#0dc0f3")};
            }
          }
          &.delete {
            background: #ee6c62;
            &:hover {
              background: ${shade(0.1, "#ee6c62")};
            }
            &:disabled {
              background: ${desaturate(0.3, "#ee6c62")};
            }
          }
          &.add {
            background: #06d755;
            &:hover {
              background: ${shade(0.1, "#06d755")};
            }
            &:disabled {
              background: ${desaturate(0.3, "#06d755")};
            }
          }
          &:disabled {
            cursor: not-allowed;
          }
          & + button {
            margin-left: 5px;
          }
        }
      }
    }
  }
`;

export const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 5px;
  padding: 10px;
  min-width: 400px;
  form {
    > div {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      label {
        padding-left: 20px;
        color: #474747;
        font-size: 18px;
        > span {
          color: #ea0531;
        }
      }
      input,
      select,
      textarea {
        margin: 10px;
        padding: 10px;
        background: #fafafa;
        border: 1px solid #cfcfcf;
        border-radius: 5px;
        resize: none;
      }
      > button {
        margin: 5px;
        border: none;
        color: #ffffff;
        padding: 10px;
        font-size: 18px;
        border-radius: 5px;
        width: 100%;
        &.save {
          background: #06d755;
          &:hover {
            background: ${shade(0.1, "#06d755")};
          }
        }
        &.cancel {
          background: #ee6c62;
          &:hover {
            background: ${shade(0.1, "#ee6c62")};
          }
        }
      }
    }
  }
`;
