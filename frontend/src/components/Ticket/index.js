import React, { useEffect, use, useMemo } from "react";
import configs from "~/config/whiteLabel";
import { Button } from "antd";
import style from './styles';
import { PrinterOutlined } from '@ant-design/icons';
import { Divider } from 'antd';
import { format, parseISO } from "date-fns";
import formatCash from "~/utils/formatCash";
import anchor from '~/assets/anchor-black.png';

const Ticket = ({ data }) => {
    const appendStyle = () => {
        const $style = document.createElement("style");
        document.head.appendChild($style);
        $style.innerHTML = style;
    }

    const calcTotalProduts = (_products = [], discount=0) => {
        const d = discount || 0;
        const result = _products.reduce((acc, curr) => acc + curr.sell_price * curr.order_product.quantity, 0);
        return result - d;
    }

    const fixedData = useMemo(() => {
        const updatedDate = format(parseISO(data.updatedAt), "dd/MM/yyyy HH:mm:ss");
        const total = formatCash(calcTotalProduts(data.products, data.discount_amount));
        const discount = formatCash(data.discount_amount || 0);
        const subTotal = formatCash(calcTotalProduts(data.products));
        const paymentType = data.payment_type;
        const name = data.customer_name;

        const table = data.products.map((_order) => {
            return (
                [
                    _order.name,
                    formatCash(_order.sell_price),
                    _order.order_product.quantity,
                    formatCash(_order.sell_price * _order.order_product.quantity),
                ]);
        });


        if(data) {
            return {
                name,
                paymentType,
                updatedDate,
                total,
                subTotal,
                discount,
                table,
            }
        }
        return null;
    }, [data])

    useEffect(() => {
        console.log('MONTO')
        //appendStyle();
    }, []);

    return (
        <div id="ticketWrapper">
            <Button onClick={() => window.print()} id="btnPrint">IMPRIMIR <PrinterOutlined /></Button>
            
            <div className="ticket">     
                <img src={anchor} alt="Quiosque" style={{
                    width: '32px', height: '32px',
                    display: 'block', margin: '0 auto'
                }}/>  
                <Divider></Divider>
                <p classNameName="centered"><strong className="title">{configs.name}</strong>
                    <div className="subTitle">
                        <br/>{configs.address}
                        <br />{configs.phone}
                    </div>
                </p>
               
               
                {fixedData ? 
                <>
                    <Divider></Divider>
                    Data de emissão: {fixedData.updatedDate} <br/>
                    <span style={{fontSize: '11px'}}>
                        {fixedData.name} - {fixedData.paymentType}
                    </span>
                    <Divider></Divider>
                    <table>
                        <thead>
                            <tr>
                                <th className="product">Prod.</th>
                                <th className="price">Preço</th>
                                <th className="price">Qt.</th>
                                <th className="price">Total.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fixedData.table.map((_row, index) => (
                            <tr key={index}>
                                <td className="product">{_row[0]}</td>
                                <td className="price">{_row[1]}</td>
                                <td className="price">{_row[2]}</td>
                                <td className="price">{_row[3]}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className="boxes">
                        <span style={{fontSize: 16}}>Total: <strong style={{fontSize: 16}}>{fixedData.total}</strong></span>
                        <span>Desconto: {fixedData.discount}</span>
                        <span>Sub Total: {fixedData.subTotal}</span>
                    </p>
                </>
                : null
                }
                <p className="centered">Obrigado por comprar conosco!
                </p>            
            </div>
        </div>
    )
}


export default Ticket;