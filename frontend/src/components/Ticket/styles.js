const styles = `
    #ticketWrapper {
        #btnPrint {
            margin-bottom: 20px;
        }
        
        * {
        font-size: 12px;
        font-family: 'Arial';
        text-transform: uppercase;
        font-weight: 700;
        color: #000000;
        }

        .title {
            text-transform: uppercase;
            display: block;
            font-size: 16px;
            line-height: 16px;
            text-align: center;
        }

        .subTitle {
            font-size: 12px;
            line-height: 12px;
            text-align: center;
        }

        .ant-divider {
            margin: 5px;
            border-top: 1px solid black;
        }


        td,
        th,
        tr,
        table {
            border-top: 1px solid black;
            border-collapse: collapse;
        }


        td.product,
        th.product {
            width: 100px;
            max-width: 100px;
            word-break: break-all;
        }

        td.product {
            font-size: 10px;
        }

        td.price,
        th.price {
            width: 70px;
            max-width: 70px;
            word-break: break-all;
        }

        .centered {
            text-align: center;
            align-content: center;
        }

        .ticket {
            width: 310px;
            max-width: 310px;
        }

        img {
            max-width: inherit;
            width: inherit;
        }
    }

    .boxes {
        text-align: right;
        margin-top: 15px;
        line-height: 14px;
        
        span {
            display: block;
        }
    }

    @media print {
        @page { size: auto;  margin: 0mm; }    
        * { box-shadow: none; }
        .ant-drawer-mask {
            display: none;
        }
        .ant-drawer-content-wrapper {
            heigth: 100%;
        }
        #ticketWrapper {

            #btnPrint { display: none; }

            background: #ffffff;
            padding: 10px;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: block;
            width: 100%;
            height: 100%;
            z-index: 9999;
            .hidden-print,
            .hidden-print * {
                display: none !important;
            }
    }
`;

export default styles;