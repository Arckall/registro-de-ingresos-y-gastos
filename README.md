# 💰 Registro de Ingresos y Gastos

> Una aplicación web interactiva para el control de finanzas personales, diseñada para realizar un seguimiento rápido y sencillo del flujo de dinero.

![Estado](https://img.shields.io/badge/Estado-Terminado-success?style=for-the-badge)
![Tecnología](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=for-the-badge)

## 📖 Descripción

Este proyecto es una herramienta digital que permite a los usuarios llevar un registro ordenado de su economía doméstica. La aplicación calcula automáticamente el balance actual basándose en las entradas (ingresos) y salidas (gastos) que el usuario registra en la interfaz.

El objetivo principal de este desarrollo fue practicar la manipulación del **DOM** en tiempo real y la lógica de programación con **JavaScript**, creando una interfaz de usuario (UI) reactiva y fácil de usar.

---

## 🛠️ Tecnologías Utilizadas

El proyecto fue construido utilizando estándares web modernos, sin dependencias externas, asegurando un rendimiento óptimo y ligero.

* **HTML5:** Estructura semántica de la aplicación.
* **CSS3:** Diseño visual, maquetación y estilos personalizados (`style.css`).
* **JavaScript (ES6+):** Lógica de cálculo, manipulación de eventos y actualización dinámica del DOM (`script.js`).

---

## ✨ Funcionalidades Principales

* **➕ Gestión de Transacciones:** Formulario intuitivo para agregar nuevos movimientos financieros.
* **💲 Cálculo Automático:** El sistema actualiza el balance total, el total de ingresos y el total de gastos instantáneamente al agregar un item.
* **🎨 Feedback Visual:** Interfaz clara que diferencia visualmente entre entradas (positivo) y salidas (negativo) de dinero.
* **📱 Diseño Responsivo:** Adaptable a diferentes tamaños de pantalla gracias a las reglas de estilo CSS.

---

## 📂 Estructura del Proyecto

La organización de archivos es modular y limpia, separando la estructura, el estilo y la lógica:

```text
registro-ingresos-gastos/
├── index.html      # Estructura principal y maquetado
├── style.css       # Hoja de estilos (Diseño y UI)
└── script.js       # Lógica de programación (Cálculos y Eventos)
