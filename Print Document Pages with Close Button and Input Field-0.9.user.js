// ==UserScript==
// @name         Print Document Pages with Close Button and Input Field
// @namespace    http://tampermonkey.net/
// @version      0.9
// @description  เปิดหน้าต่างการพิมพ์โดยอัตโนมัติสำหรับหน้าเอกสารและแสดงปุ่มที่กดเพื่อปิดแท็บหลังจากเปิดหน้าต่างการพิมพ์ พร้อมช่องกรอกข้อมูลที่โฟกัสโดยอัตโนมัติ และปิดหน้าเว็บเมื่อกด Enter ในช่องกรอกข้อมูล
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ฟังก์ชันเพื่อตรวจสอบว่าหน้านี้เป็นประเภทเอกสารหรือไม่
    const isDocumentPage = () => {
        // เพิ่มโลจิกในการตรวจสอบประเภทเอกสาร เช่น:
        return document.contentType && document.contentType.includes('application/pdf');
    };

    // ฟังก์ชันเพื่อเปิดหน้าต่างการพิมพ์และแสดงปุ่มปิดแท็บ
    const openPrintDialog = () => {
        // เรียกหน้าต่างการพิมพ์
        window.print();

        // สร้างปุ่มปิดแท็บ
        const closeButton = document.createElement('button');
        closeButton.textContent = 'คลิก เพื่อปิดแท็บนี้'; // ข้อความที่อัปเดต
        closeButton.style.position = 'fixed';
        closeButton.style.top = '20%'; // ปรับให้ห่างจากขอบบนเป็นเปอร์เซ็นต์
        closeButton.style.right = '15%'; // ปรับให้ห่างจากขอบขวา
        closeButton.style.padding = '10px 20px';
        closeButton.style.backgroundColor = '#f44336';
        closeButton.style.color = 'white';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '5px';
        closeButton.style.cursor = 'pointer';
        closeButton.style.zIndex = 1000;
        closeButton.style.fontSize = '16px';
        closeButton.style.outline = 'none';
        closeButton.style.transition = 'background-color 0.3s, transform 0.3s'; // การเปลี่ยนแปลงลักษณะ

        // สร้างช่องกรอกข้อมูล
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.placeholder = 'กด Enter เพื่อปิดแท็บนี้';
        inputField.style.position = 'fixed';
        inputField.style.top = '25%'; // ปรับให้ห่างจากปุ่มปิดแท็บเป็นเปอร์เซ็นต์
        inputField.style.right = '13.5%'; // ปรับให้ห่างจากขอบขวา
        inputField.style.padding = '10px';
        inputField.style.border = '1px solid #ccc';
        inputField.style.borderRadius = '5px';
        inputField.style.fontSize = '16px';
        inputField.style.zIndex = 1000;
        inputField.style.textAlign = 'center'; // ข้อความอยู่ตรงกลางของช่องกรอก
        inputField.style.backgroundColor = '#f44336'; // พื้นหลังสีแดง
        inputField.style.color = 'white'; // ตัวอักษรสีขาว

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
                background-color: #c62828; /* สีพื้นหลังเมื่อ hover */
                transform: scale(1.05); /* ขยายปุ่มเล็กน้อยเมื่อ hover */
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
            inputField.value = ''; // เคลียร์ข้อมูล
            inputField.focus();
        }, 1000);

        // กำหนดฟังก์ชันสำหรับปุ่มปิดแท็บ
        closeButton.addEventListener('click', () => {
            window.close();
        });

        // ฟังก์ชันตรวจจับการกดปุ่ม Enter บนช่องกรอกข้อมูล
        inputField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // ป้องกันการกระทำอื่นที่เกิดจากการกด Enter
                window.close();
            }
        });

        // ฟังก์ชันตรวจจับการกดปุ่ม Enter บนปุ่ม
        closeButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // ป้องกันการกระทำอื่นที่เกิดจากการกด Enter
                window.close();
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
