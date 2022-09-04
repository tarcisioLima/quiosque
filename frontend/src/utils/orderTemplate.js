import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import whiteLabelConfig from '~/config/whiteLabel';
import { format, parseISO } from "date-fns";
import formatCash from "./formatCash";

const propsObject = {
    outputType: OutputType.DataUriString,
    returnJsPDFDocObject: true,
    fileName: "nota-compra-quiosque",
    orientationLandscape: false,
    compress: true,
    logo: {
        src: "/images/anchor-black.png",
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 30, //aspect ratio = width/height
        height: 30,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    },
    /* stamp: {
        inAllPages: true, //by default = false, just in the last page
        src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
        type: 'JPG', //optional, when src= data:uri (nodejs case)
        width: 20, //aspect ratio = width/height
        height: 20,
        margin: {
            top: 0, //negative or positive num, from the current position
            left: 0 //negative or positive num, from the current position
        }
    }, */
    business: {
        name: whiteLabelConfig.name,
        address: whiteLabelConfig.address,
        phone: whiteLabelConfig.phone,
        email: whiteLabelConfig.email,
        website: whiteLabelConfig.website
    },
    invoice: {
        label: "Nota #: ",
        num: 0,
        invDate: "Data de Pagamento: 01/01/2021 18:12",
        invGenDate: "Data Emissão da Nota: 02/02/2021 10:17",
        headerBorder: false,
        tableBodyBorder: false,
        header: [
          {
            title: "#", 
            style: { 
              width: 10 
            } 
          }, 
          { 
            title: "Produto",
            style: {
              width: 30
            } 
          }, 
          { title: "Preço unitário"},
          { title: "Quantidade"},
          { title: "Total"}
        ],
        table: Array.from(Array(10), (item, index)=>([
            index + 1,
            "There are many variations ",
            "Lorem Ipsum is simply dummy text dummy text ",
            200.5,
            4.5,
            400.5
        ])),
        additionalRows: [{
            col1: 'Total:',
            col2: '145,250.50',
            col3: 'R$',
            style: {
                fontSize: 14
            }
        },
        {
            col1: 'DESCONTO:',
            col2: '20',
            col3: 'R$',
            style: {
                fontSize: 10
            }
        },
        {
            col1: 'SubTotal:',
            col2: '116,199.90',
            col3: 'R$',
            style: {
                fontSize: 10
            }
        }],
        invDescLabel: "Nota de compra",
       /*  invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.", */
    },
    footer: {
        text: "Esta nota de compra foi criada no computador do quiosque e é válida",
    },
    pageEnable: true,
    pageLabel: "Página",
};

const calcTotalProduts = (_products = [], discount=0) => {
    const d = discount || 0;
    const result = _products.reduce((acc, curr) => acc + curr.sell_price * curr.order_product.quantity, 0);
    return result - d;
}

const generate = (order = null) => {
    if(order){
        const updatedDate = format(parseISO(order.updatedAt), "dd/MM/yyyy HH:mm:ss");
        const total = formatCash(calcTotalProduts(order.products, order.discount_amount));
        const discount = formatCash(order.discount_amount || 0);
        const subTotal = formatCash(calcTotalProduts(order.products));

        /* const table = Array.from(Array(10), (item, index)=>([
            index + 1,
            "AEEE There are many variations ",
            "Lorem Ipsum is simply dummy text dummy text ",
            200.5,
            4.5,
            400.5
        ])); */

        const table = order.products.map((_order) => {
            return (
                [
                    _order.id,
                    _order.name,
                    formatCash(_order.sell_price),
                    _order.order_product.quantity,
                    formatCash(_order.sell_price * _order.order_product.quantity),
                ]);
        });

        const pdfCreated = jsPDFInvoiceTemplate({
            ...propsObject,
            invoice: {
                ...propsObject.invoice,
                label: `Nota #:`,
                invDate: `Data de Pagamento: ${updatedDate}`,
                invGenDate: `Data Emissão da Nota: ${updatedDate}`,
                num: order.id,
                table,
                additionalRows: [{
                    col1: 'Total:',
                    col2: total,
                    col3: 'R$',
                    style: {
                        fontSize: 14
                    }
                },
                {
                    col1: 'DESCONTO:',
                    col2: discount,
                    col3: 'R$',
                    style: {
                        fontSize: 10
                    }
                },
                {
                    col1: 'SubTotal:',
                    col2: subTotal,
                    col3: 'R$',
                    style: {
                        fontSize: 10
                    }
                }],
                
            },
            contact: {
                label: "Nota emitida para:",
                name: order.customer_name,
            },

        });
        return pdfCreated;
    }
    return ''    
}

export default generate;