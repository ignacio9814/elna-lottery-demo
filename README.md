# 🎯 ELNA Lottery - Aplicación de Sorteo

Una aplicación web profesional para realizar sorteos organizados por ONGs, con soporte para archivos Excel y animaciones llamativas.

## ✨ Características

- 📊 **Carga de Excel**: Soporte para archivos .xlsx, .xls, .csv con columnas "Nombre" y "DNI"
- 🎰 **Animaciones**: Ruleta animada para premios principales con efecto confetti
- 🏆 **75 Premios**: Configuración flexible para 1-75 ganadores
- 📋 **Historial**: Guardado automático en localStorage
- 📱 **Responsive**: Funciona en móvil y desktop
- 🎨 **Diseño Profesional**: UI moderna con TailwindCSS

## 🚀 Instalación

1. **Clonar o descargar el proyecto**
2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo:**
   ```bash
   npm start
   ```

4. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 📦 Dependencias Principales

- React 18 + TypeScript
- TailwindCSS (estilos)
- xlsx (procesamiento Excel)
- react-confetti (efectos)
- framer-motion (animaciones)

## 🎮 Uso

1. **Subir Excel**: Arrastra o selecciona archivo con columnas "Nombre" y "DNI"
2. **Vista Previa**: Revisa los datos cargados
3. **Configurar**: Ajusta número de ganadores y premios principales
4. **Sorteo**: Disfruta las animaciones de la ruleta
5. **Resultados**: Ve todos los ganadores y accede al historial

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Vistas principales
├── utils/              # Funciones auxiliares
├── types/              # Definiciones TypeScript
└── index.css           # Estilos globales
```

## 🔧 Configuración del Editor

Si usas VSCode, instala la extensión:
- **Tailwind CSS IntelliSense** para autocompletado

Los errores de `@tailwind` en el editor son normales y no afectan la compilación.

## 📤 Deploy

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Deploy automático en cada push

### Build Manual
```bash
npm run build
```

## 📄 Formato del Excel

| Nombre | DNI |
|--------|-----|
| Juan Pérez | 12345678 |
| Ana López | 98765432 |

## 🎨 Personalización

- Colores: Edita `tailwind.config.js`
- Animaciones: Modifica `src/index.css`
- Componentes: Personaliza en `/components`

## 📞 Soporte

Para problemas o mejoras, revisa los archivos de configuración o contacta al desarrollador.

---

**Desarrollado para ONGs** 🏛️ 