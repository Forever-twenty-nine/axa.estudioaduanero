'use strict';

const XLSX = require('xlsx');
const data = require('./src/data/data.ts');

// Crear un nuevo libro de trabajo
const workbook = XLSX.utils.book_new();

// Agregar una hoja de introducción
const introData = [
    { title: "Introducción", description: "Este archivo contiene los datos exportados de nuestro sistema. Cada hoja representa una sección diferente de los datos." },
    { title: "Cabecera Secciones", description: "Las cabeceras de las secciones incluidas son: headerServices, headerTestimonials, headerProcesses, headerFAQ, headerContact " },
    { title: "Secciones", description: "Las secciones incluidas son: hero, about, services, testimonials, processes, question, ownerContact" }
];
const introWorksheet = XLSX.utils.json_to_sheet(introData);
XLSX.utils.book_append_sheet(workbook, introWorksheet, 'Introducción');

// Definir el orden de las secciones
const sectionsOrder = ['hero', 'about', 'services', 'testimonials', 'processes', 'question', 'ownerContact', 'datacontact'];

// Crear una hoja para las cabeceras de las secciones
const headers = [];
for (const [key, value] of Object.entries(data)) {
    if (key.startsWith('header')) {
        headers.push({ section: key, ...value });
    }
}
const headersWorksheet = XLSX.utils.json_to_sheet(headers);
XLSX.utils.book_append_sheet(workbook, headersWorksheet, 'Cabeceras');

// Función para agregar estilos a las celdas
function addStyles(worksheet) {
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cell_address = { c: C, r: R };
            const cell_ref = XLSX.utils.encode_cell(cell_address);
            if (!worksheet[cell_ref]) continue;
            worksheet[cell_ref].s = {
                font: { name: "Arial", sz: 12, bold: R === 0 },
                alignment: { vertical: "center", horizontal: "center" },
                border: {
                    top: { style: "thin", color: { rgb: "000000" } },
                    bottom: { style: "thin", color: { rgb: "000000" } },
                    left: { style: "thin", color: { rgb: "000000" } },
                    right: { style: "thin", color: { rgb: "000000" } }
                }
            };
        }
    }
}

// Iterar sobre cada sección en el orden definido
sectionsOrder.forEach((section) => {
    const value = data[section];
    if (Array.isArray(value)) {
        // Si el valor es un array, convertirlo en una hoja de cálculo
        const worksheet = XLSX.utils.json_to_sheet(value);
        addStyles(worksheet);
        XLSX.utils.book_append_sheet(workbook, worksheet, section);
    } else if (typeof value === 'object') {
        // Si el valor es un objeto, convertirlo en una hoja de cálculo con una sola fila
        const worksheet = XLSX.utils.json_to_sheet([value]);
        addStyles(worksheet);
        XLSX.utils.book_append_sheet(workbook, worksheet, section);
    }
});

// Guardar el archivo Excel
XLSX.writeFile(workbook, 'data.xlsx');

console.log('Datos exportados a data.xlsx');