import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';
import { Container } from './styles';
import { Col, Row } from 'antd';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <Col span={12}>
          <Row gutter={16}>
            <Col span={24}>
              <Input name="name" placeholder="Nome completo" />
            </Col>
            <Col span={24}>
              <Input
                name="email"
                type="email"
                placeholder="Seu endereço de e-mail"
              />
            </Col>
            <Col span={24}>
              <Input
                type="password"
                name="oldPassword"
                placeholder="Sua senha atual"
              />
            </Col>
            <Col span={12}>
              <Input type="password" name="password" placeholder="Nova senha" />
            </Col>
            <Col span={12}>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirmação de senha"
              />
            </Col>
          </Row>
          <Col span={24}>
            <button type="submit">Atualizar perfil</button>
          </Col>
        </Col>
      </Form>
      <Row>
        <Col span={12}>
          <button type="button" className="logout" onClick={handleSignOut}>
            Sair do Sistema
          </button>
        </Col>
      </Row>
    </Container>
  );
}
