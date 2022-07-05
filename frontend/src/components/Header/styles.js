import styled from 'styled-components';

export const Container = styled.div`
  background: rgba(255, 255, 255, 1);
  padding: 0 30px;
  border-bottom: 1px solid #1890ff;
`;

export const Content = styled.div`
  height: 64px;

  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      padding-right: 10px;
      border-right: 1px solid #eee;
      filter: invert(1);
    }

    a {
      font-weight: bold;
      text-transform: uppercase;
      color: #1890ff;
      margin-left: 10px;
      font-size: 1.2em;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;
  border-left: 1px solid #eee;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }

    a {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
  img {
    height: 32px;
    width: 32px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
