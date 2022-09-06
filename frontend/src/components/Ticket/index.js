import React, { useEffect } from "react";
import configs from "~/config/whiteLabel";
import { Button } from "antd";
import style from './styles';
import { PrinterOutlined } from '@ant-design/icons';

const Ticket = ({ data }) => {
    const appendStyle = () => {
        const $style = document.createElement("style");
        document.head.appendChild($style);
        $style.innerHTML = style;
    }

    useEffect(() => {
        console.log('MONTO')
        //appendStyle();
    }, []);

    return (
        <div id="ticketWrapper">
            <Button onClick={() => window.print()} id="btnPrint">IMPRIMIR <PrinterOutlined /></Button>
            
            <div className="ticket">                    
                <p classNameName="centered"><strong className="title">{configs.name}</strong>
                    <div className="subTitle">
                        <br/>{configs.address}
                        <br />{configs.phone}
                    </div>
                </p>
                <table>
                    <thead>
                        <tr>
                            <th className="quantity">Q.</th>
                            <th className="description">Description</th>
                            <th className="price">$$</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="quantity">1.00</td>
                            <td className="description">ARDUINO UNO R3</td>
                            <td className="price">$25.00</td>
                        </tr>
                        <tr>
                            <td className="quantity">2.00</td>
                            <td className="description">JAVASCRIPT BOOK</td>
                            <td className="price">$10.00</td>
                        </tr>
                        <tr>
                            <td className="quantity">1.00</td>
                            <td className="description">STICKER PACK</td>
                            <td className="price">$10.00</td>
                        </tr>
                        <tr>
                            <td className="quantity"></td>
                            <td className="description">TOTAL</td>
                            <td className="price">$55.00</td>
                        </tr>
                    </tbody>
                </table>
                <p className="centered">Obrigado por comprar conosco!
                </p>            
            </div>
        </div>
    )
}


export default Ticket;