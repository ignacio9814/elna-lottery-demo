import * as XLSX from 'xlsx';
import { Participant, ExcelData } from '../types';

// Función auxiliar para normalizar nombres de columna
const normalizeHeader = (header: string): string => {
  return header
    .toLowerCase()
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]/g, '') // quita espacios y símbolos
    .trim();
};

export const readExcelFile = (file: File): Promise<Participant[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convertir a JSON con encabezados originales
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][];
        if (jsonData.length === 0) {
          reject(new Error('El archivo Excel está vacío'));
          return;
        }
        // Normalizar encabezados
        const headers = jsonData[0].map((h: string) => normalizeHeader(String(h)));
        const nombreIdx = headers.findIndex(h => h === 'nombre');
        const dniIdx = headers.findIndex(h => h === 'dni');
        if (nombreIdx === -1 || dniIdx === -1) {
          reject(new Error('El archivo debe contener las columnas "Nombre" y "DNI" (pueden estar en cualquier orden, mayúsculas o minúsculas)'));
          return;
        }
        // Mapear filas a participantes
        const participants: Participant[] = jsonData.slice(1).map((row, index) => ({
          id: `participant-${index + 1}`,
          nombre: String(row[nombreIdx] ?? '').trim(),
          dni: String(row[dniIdx] ?? '').trim()
        })).filter(p => p.nombre && p.dni && p.nombre.toLowerCase() !== 'nombre' && p.dni.toLowerCase() !== 'dni');
        if (participants.length === 0) {
          reject(new Error('No se encontraron datos válidos en el archivo'));
          return;
        }
        resolve(participants);
      } catch (error) {
        reject(new Error('Error al procesar el archivo Excel'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error al leer el archivo'));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

export const validateExcelFile = (file: File): boolean => {
  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/vnd.ms-excel', // .xls
    'text/csv' // .csv
  ];
  
  return allowedTypes.includes(file.type);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}; 