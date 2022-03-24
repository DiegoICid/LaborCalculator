Curso de JavaScript. Entrega final. 

Proyecto: Calculadora online de indemnización laboral conforme normativa Argentina.

Aplicación que captura datos del usuario y calcula la indemnización que corresonde por aplicación de la Ley de Contrato de Trabajo.

Requisitos mínimos:

* Objetos y Arrays. Métodos de arrays.
    -> Los dato del usuario son almacenados en un objeto.
    -> Existe un objeto de control que recopila todas las variables utilizadas en los cálculos.
    -> Se usan los métodos spread y deconstructing sobre los objetos.
    -> Se utiliza un array de objetos (el JSON) y un array de numeros.

* Funciones y condicionales.
    -> La app utiliza distintas 

* Generación del DOM en forma dinámica. Eventos.
    -> Tras enviar los datos, se muestra la liquidación en el documento HTML creando contenido a partir de los procesos que hace la app.
    -> Se interpretan distintos eventos, principalmente el "submit" y el "keydown".
    -> Scrolleo dinámico con uso de "scrollIntoView".

* Sintaxis avanzada.
    -> Uso de operadores/ funcionalidades tales como spread, destructuring, operador ternario, asignación condicional de variables. 

* Al menos una librería de uso relevante para el proyecto.
    -> Se utilizan las siguientes librerías:
        -> Luxon: para el cálculo de períodos de tiempo (antigüedad laboral expresada en años, meses, días).
        -> Toastify: alertas en caso de faltar datos o ingresar datos incorrectos.
        -> Howler: efectos de sonido que acompañan las alertas en caso de errores.
        -> Numeral: formato de números tipo moneda con signo y decimales.
        -> Bootstrap: para el diseño web.

* Promesas con Fetch.
    -> Uso de función asincrónica para recuperar datos de JSON.

* Carga de datos desde un JSON o desde una API externa.
    -> Carga de información sobre tope de convenios colectivo de trabajo según lo indicado por el usuario, en un archivo JSON local.


* Otros agregados:
    -> Uso de localStorage para almacenar los datos de consultas anteriores, los que son incorporados como placeholders de los campos relevantes y se utilizan en la nueva consulta de no cambiarse.
    -> Botón de borrado del localStorage.


