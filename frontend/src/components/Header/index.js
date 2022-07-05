import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from '~/components/Logo';
import { UserOutlined } from '@ant-design/icons';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector((state) => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          <Logo dark style={{ width: 60 }} disableText={true} />
          <Link to="/dashboard">Painel Administrativo</Link>
        </nav>
        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <UserOutlined style={{ fontSize: 32, color: '#999' }} />
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
