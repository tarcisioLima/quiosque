import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Button,
  Drawer,
  Space,
} from 'antd';
import { useSale } from '~/context/sale';
import PdfViewer from '~/components/PdfViewer';
import generatePDF from '~/utils/orderTemplate';

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
      <PdfViewer dataUriString={generateCurrentPDF} />      
    </Drawer>
  );
};

export default PdfDrawer;
