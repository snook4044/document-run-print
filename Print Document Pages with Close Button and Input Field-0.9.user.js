// ==UserScript==
// @name         Print Document Pages with Close Button and Input Field
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  เปิดหน้าต่างการพิมพ์โดยอัตโนมัติสำหรับหน้าเอกสารและแสดงปุ่มที่กดเพื่อปิดแท็บหลังจากเปิดหน้าต่างการพิมพ์ พร้อมช่องกรอกข้อมูลที่โฟกัสโดยอัตโนมัติ และปิดหน้าเว็บเมื่อกด Enter ในช่องกรอกข้อมูล
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ฟังก์ชันเพื่อตรวจสอบว่าหน้านี้เป็นประเภทเอกสารหรือไม่
    const isDocumentPage = () => {
        // ตรวจสอบว่า `document.contentType` มีอยู่และรวม 'application/pdf'
        const contentType = document.contentType || '';
        console.log('Document contentType:', contentType);
        return contentType.includes('application/pdf');
    };

    // ฟังก์ชันเพื่อเปิดหน้าต่างการพิมพ์และแสดงปุ่มปิดแท็บ
    const openPrintDialog = () => {
        // เรียกหน้าต่างการพิมพ์
        console.log('Opening print dialog...');
        window.print();

        // สร้างปุ่มปิดแท็บ
        const closeButton = document.createElement('button');
        closeButton.textContent = 'คลิก เพื่อปิดแท็บนี้';
        closeButton.style.position = 'fixed';
        closeButton.style.top = '20%';
        closeButton.style.right = '15%';
        closeButton.style.padding = '10px 20px';
        closeButton.style.backgroundColor = '#f44336';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = 1000;
        closeButton.style.fontSize = '16px';
        closeButton.style.outline = 'none';
        closeButton.style.transition = 'background-color 0.3s, transform 0.3s';

        // สร้างช่องกรอกข้อมูล
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'กด Enter เพื่อปิดแท็บนี้';
        inputField.style.position = 'fixed';
        inputField.style.top = '25%';
        inputField.style.right = '13.5%';
        inputField.style.padding = '10px';
        inputField.style.border = '1px solid #ccc';
        inputField.style.borderRadius = '5px';
        inputField.style.fontSize = '16px';
        inputField.style.zIndex = 1000;
        inputField.style.textAlign = 'center';
        inputField.style.backgroundColor = '#f44336';
        inputField.style.color = 'white';

        // เพิ่ม CSS สำหรับ placeholder
        const style = document.createElement('style');
        style.textContent = `
            input::-webkit-input-placeholder {
                color: white; /* Chrome, Safari, Edge */
            }
            input::-moz-placeholder {
                color: white; /* Firefox 19+ */
            }
            input:-ms-input-placeholder {
                color: white; /* Internet Explorer 10-11 */
            }
            input::-ms-input-placeholder {
                color: white; /* Microsoft Edge */
            }
            input::placeholder {
                color: white; /* Modern browsers */
            }
            button:hover {
                background-color: #c62828;
                transform: scale(1.05);
            }
        `;
        document.head.appendChild(style);

        // เพิ่มปุ่มและช่องกรอกข้อมูลลงในหน้าเว็บ
        document.body.appendChild(closeButton);
        document.body.appendChild(inputField);

        // ทำให้ช่องกรอกข้อมูลได้รับโฟกัส
        inputField.focus();

        // เคลียร์ข้อมูลในช่องกรอกข้อมูลทุก 1 วินาที
        setInterval(() => {
            inputField.value = '';
            inputField.focus();
        }, 1000);

        // กำหนดฟังก์ชันสำหรับปุ่มปิดแท็บ
        closeButton.addEventListener('click', () => {
            console.log('Close button clicked.');
            if (window.confirm('คุณแน่ใจหรือว่าต้องการปิดแท็บนี้?')) {
                window.close();
            }
        });

        // ฟังก์ชันตรวจจับการกดปุ่ม Enter บนช่องกรอกข้อมูล
        inputField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                console.log('Enter key pressed in input field.');
                if (window.confirm('คุณแน่ใจหรือว่าต้องการปิดแท็บนี้?')) {
                    window.close();
                }
            }
        });

        // ฟังก์ชันตรวจจับการกดปุ่ม Enter บนปุ่ม
        closeButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                console.log('Enter key pressed on close button.');
                if (window.confirm('คุณแน่ใจหรือว่าต้องการปิดแท็บนี้?')) {
                    window.close();
                }
            }
        });
    };

    // รอให้หน้าเว็บโหลดเสร็จแล้วจึงทำการตรวจสอบและเปิดหน้าต่างการพิมพ์
    window.addEventListener('load', () => {
        if (isDocumentPage()) {
            openPrintDialog();
        }
    });
})();
