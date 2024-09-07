// ==UserScript==
// @name         Print Document Pages with Close Button and Input Field
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  เปิดหน้าต่างการพิมพ์โดยอัตโนมัติสำหรับหน้าเอกสารและแสดงปุ่มที่กดเพื่อปิดแท็บหลังจากเปิดหน้าต่างการพิมพ์ พร้อมช่องกรอกข้อมูลที่โฟกัสโดยอัตโนมัติ และปิดหน้าเว็บเมื่อกด Enter ในช่องกรอกข้อมูล
// @author       Your Name
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ฟังก์ชันเพื่อตรวจสอบว่าหน้านี้เป็นประเภทเอกสารหรือไม่
    const isDocumentPage = () => {
        const contentType = document.contentType || '';
        console.log('ประเภทเอกสาร:', contentType);
        return contentType.includes('application/pdf');
    };

    // ฟังก์ชันเพื่อเปิดหน้าต่างการพิมพ์และแสดงปุ่มปิดแท็บ
    const openPrintDialog = () => {
        console.log('กำลังเปิดหน้าต่างการพิมพ์...');

        try {
            if (window.print) {
                console.log('เรียกใช้งาน window.print()...');
                window.print();
            } else {
                console.error('ฟังก์ชัน window.print() ไม่รองรับในเบราว์เซอร์นี้');
                alert('ฟังก์ชันการพิมพ์ไม่รองรับในเบราว์เซอร์นี้');
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการเปิดหน้าต่างการพิมพ์:', error);
            alert('เกิดข้อผิดพลาดในการเปิดหน้าต่างการพิมพ์');
        }

        // สร้างปุ่มปิดแท็บ
        console.log('กำลังสร้างปุ่มปิดแท็บ...');
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
        console.log('กำลังสร้างช่องกรอกข้อมูล...');
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
        console.log('กำลังเพิ่มปุ่มและช่องกรอกข้อมูลลงในเอกสาร...');
        document.body.appendChild(closeButton);
        document.body.appendChild(inputField);

        // ทำให้ช่องกรอกข้อมูลได้รับโฟกัส
        inputField.focus();

        // เคลียร์ข้อมูลในช่องกรอกข้อมูลทุก 1 วินาที
        console.log('เริ่มเคลียร์ข้อมูลในช่องกรอกข้อมูล...');
        setInterval(() => {
            inputField.value = '';
            inputField.focus();
        }, 1000);

        // กำหนดฟังก์ชันสำหรับปุ่มปิดแท็บ
        closeButton.addEventListener('click', () => {
            console.log('คลิกที่ปุ่มปิดแท็บ.');
            if (window.confirm('คุณแน่ใจหรือว่าต้องการปิดแท็บนี้?')) {
                try {
                    if (window.close) {
                        console.log('กำลังปิดแท็บ...');
                        window.close();
                    } else {
                        console.error('ฟังก์ชัน window.close() ไม่รองรับ');
                        alert('ไม่สามารถปิดแท็บนี้ได้');
                    }
                } catch (error) {
                    console.error('เกิดข้อผิดพลาดในการปิดแท็บ:', error);
                    alert('เกิดข้อผิดพลาดในการปิดแท็บ');
                }
            }
        });

        // ฟังก์ชันตรวจจับการกดปุ่ม Enter บนช่องกรอกข้อมูล
        inputField.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                console.log('กดปุ่ม Enter ในช่องกรอกข้อมูล.');
                if (window.confirm('คุณแน่ใจหรือว่าต้องการปิดแท็บนี้?')) {
                    try {
                        if (window.close) {
                            console.log('กำลังปิดแท็บ...');
                            window.close();
                        } else {
                            console.error('ฟังก์ชัน window.close() ไม่รองรับ');
                            alert('ไม่สามารถปิดแท็บนี้ได้');
                        }
                    } catch (error) {
                        console.error('เกิดข้อผิดพลาดในการปิดแท็บ:', error);
                        alert('เกิดข้อผิดพลาดในการปิดแท็บ');
                    }
                }
            }
        });

        // ฟังก์ชันตรวจจับการกดปุ่ม Enter บนปุ่ม
        closeButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                console.log('กดปุ่ม Enter บนปุ่มปิดแท็บ.');
                if (window.confirm('คุณแน่ใจหรือว่าต้องการปิดแท็บนี้?')) {
                    try {
                        if (window.close) {
                            console.log('กำลังปิดแท็บ...');
                            window.close();
                        } else {
                            console.error('ฟังก์ชัน window.close() ไม่รองรับ');
                            alert('ไม่สามารถปิดแท็บนี้ได้');
                        }
                    } catch (error) {
                        console.error('เกิดข้อผิดพลาดในการปิดแท็บ:', error);
                        alert('เกิดข้อผิดพลาดในการปิดแท็บ');
                    }
                }
            }
        });
    };

    // รอให้หน้าเว็บโหลดเสร็จแล้วจึงทำการตรวจสอบและเปิดหน้าต่างการพิมพ์
    window.addEventListener('load', () => {
        console.log('หน้าเว็บโหลดเสร็จแล้ว. กำลังตรวจสอบว่าหน้านี้เป็นเอกสารหรือไม่...');
        if (isDocumentPage()) {
            console.log('ตรวจพบว่าเป็นหน้าที่มีเอกสาร. กำลังเปิดหน้าต่างการพิมพ์...');
            openPrintDialog();
        } else {
            console.log('นี่ไม่ใช่หน้าเอกสาร.');
        }
    });
})();
