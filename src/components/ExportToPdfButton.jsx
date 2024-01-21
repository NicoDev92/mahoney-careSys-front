import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ExportToPdfButton = ({ title, contentRef, contentRefs }) => {

    const exportToPdf = async () => {

        console.log()
        const clonedRefs = contentRefs.childNodes.cloneNodes(true);

        if (!clonedRefs || clonedRefs.current.length === 0) {
            console.error('Invalid content elements');
            return;
        }

        const pdf = new jsPDF('p', 'mm', 'a4');
        let yOffset = 10;



        for (const clone of clonedRefs.current) {
            const elementoAExcluir = clone.querySelector(".excluded-to-pdf")
            if (elementoAExcluir) {
                elementoAExcluir.remove();
            }

            if (clone) {
                const canvas = await html2canvas(clone);
                const imgData = canvas.toDataURL('image/png');
                const aspectRatio = canvas.width / canvas.height;
                const pdfWidth = 180;
                const pdfHeight = pdfWidth / aspectRatio;

                pdf.addImage(imgData, 'PNG', 10, yOffset, pdfWidth, pdfHeight);
                yOffset += pdfHeight + 10; // Adjust spacing as needed
            }
        }


        /* if (clone) {
            const canvas = await html2canvas(clone);
            const imgData = canvas.toDataURL('image/png');
            const aspectRatio = canvas.width / canvas.height;
            const pdfWidth = 180;
            const pdfHeight = pdfWidth / aspectRatio;

            pdf.addImage(imgData, 'PNG', 10, yOffset, pdfWidth, pdfHeight);
            yOffset += pdfHeight + 10; // Adjust spacing as needed
        }
    } */

        pdf.save(`${title}_data.pdf`);


        /* const exportToPdf = async () => {
            try {
                const contentNode = contentRef.current;
                console.log(contentRef)
                console.log(showElement)
                if (!contentNode) {
                    console.error('Invalid content element');
                    return;
                }
     
                const canvas = await html2canvas(contentNode);
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                pdf.text(title, 10, 10);
                pdf.addImage(imgData, 'PNG', 10, 20, 180, 120);
                pdf.save(`${title}_data.pdf`);
            } catch (error) {
                console.error('Error exporting to PDF:', error);
            }
        }; */

    }
    return (
        <button className="btn btn-success" onClick={exportToPdf}>
            Exportar a PDF
        </button>
    );
}
