import { Button, Typography, Divider } from 'antd';

const { Title, Text } = Typography;

const Index = () => {
  return (
    <div>
      <Title style={{ marginBottom: 0 }}>
        Bem-vindo ao <Text mark>sistema quiosque</Text>
      </Title>
      <Divider style={{ margin: '5px 0 15px 0' }} />
      <Text italic>
        Para gestão do quiosque, organize as mesas com os pedidos, emita um
        recibo e veja estatisticas
      </Text>
    </div>
  );
};

export default Index;
