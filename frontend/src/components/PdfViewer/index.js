import React from 'react';

const PdfViewer = ({dataUriString}) => {
    return (
        <embed width='100%' height='100%' src={dataUriString}></embed>
    )
}

export default PdfViewer;