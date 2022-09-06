const styles = `
    #ticketWrapper {
        #btnPrint {
            margin-bottom: 20px;
        }
        
        * {
        font-size: 12px;
        font-family: 'Times New Roman';
        }

        .title {
            text-transform: uppercase;
        }

        .subTitle {
            font-size: 8px;
        }


        td,
        th,
        tr,
        table {
            border-top: 1px solid black;
            border-collapse: collapse;
        }

        td.description,
        th.description {
            width: 75px;
            max-width: 75px;
        }

        td.quantity,
        th.quantity {
            width: 40px;
            max-width: 40px;
            word-break: break-all;
        }

        td.price,
        th.price {
            width: 40px;
            max-width: 40px;
            word-break: break-all;
        }

        .centered {
            text-align: center;
            align-content: center;
        }

        .ticket {
            width: 155px;
            max-width: 155px;
        }

        img {
            max-width: inherit;
            width: inherit;
        }
    }

    @media print {
        @page { size: auto;  margin: 0mm; }    
        #ticketWrapper {

        #btnPrint { display: none; }


        background: #ffffff;
        padding: 10px;
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
        .hidden-print,
        .hidden-print * {
            display: none !important;
        }
    }
`;

export default styles;