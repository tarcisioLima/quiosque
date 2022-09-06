import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Button,
  Col,
  Drawer,
  Row,
  Space,
  Typography,
  Divider,
  Tabs,
} from 'antd';
import { useSale } from '~/context/sale';
import PdfViewer from '~/components/PdfViewer';
import generatePDF from '~/utils/orderTemplate';
import Ticket from '~/components/Ticket';

const { Title } = Typography;

const PdfDrawer = () => {
  const {    
    openPdfOrder, 
    setOpenPdfOrder,
    current,
  } = useSale();

  const generateCurrentPDF = useMemo(() => {
    if(current && openPdfOrder) {
      return generatePDF(current).dataUriString
    }
    return generatePDF();
  }, [current]);
  

  return (
    <Drawer
      title="Nota de compra"
      onClose={() => setOpenPdfOrder(false)}
      visible={openPdfOrder}
      height={'98%'}
      placement={'bottom'}
      bodyStyle={{ paddingBottom: 0}}
      extra={
        <Space>
          <Button onClick={() => setOpenPdfOrder(false)}>Fechar</Button>
        </Space>
      }
    >
      <div className='impress-options-box'>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="Impressão Térmica" key="1">
            { current && openPdfOrder ? <Ticket data={current} /> : null }
          </Tabs.TabPane>
          <Tabs.TabPane tab="Impressão PDF" key="2">
            <PdfViewer dataUriString={generateCurrentPDF} />   
          </Tabs.TabPane>
        </Tabs>
      </div>   
    </Drawer>
  );
};

export default PdfDrawer;
