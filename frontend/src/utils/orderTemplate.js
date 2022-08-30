import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template";
import whiteLabelConfig from '~/config/whiteLabel';

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
        num: 19,
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
            title: "Produto`",
            style: {
              width: 30
            } 
          }, 
          { 
            title: "Descrição",
            style: {
              width: 80
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
                fontSize: 14 //optional, default 12
            }
        },
        {
            col1: 'DESCONTO:',
            col2: '20',
            col3: 'R$',
            style: {
                fontSize: 10 //optional, default 12
            }
        },
        {
            col1: 'SubTotal:',
            col2: '116,199.90',
            col3: 'R$',
            style: {
                fontSize: 10 //optional, default 12
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

const generate = (customProps = {}) => {
    const pdfCreated = jsPDFInvoiceTemplate({
        ...propsObject,
        contact: {
            label: "Nota emitida para:",
            name: customProps.customer_name,
        },        
    });

    return pdfCreated;
}

export default generate;