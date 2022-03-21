let resultados = document.querySelector("#resultados");
let resultadosTexto = document.getElementById("#resultadosTexto");
let formulario = document.querySelector("#formulario");
let objetoCaso = {};
let DateTime = luxon.DateTime; // Luxon
let resultadosDiv = document.getElementById("#resultadosDiv");
let inicio = document.getElementById("header-img");

// armado de variable para sonido en Howler, a disparar con alarmas
let sound = new Howl({
    src: ['./assets/160907__racche__cue-scratch.wav']
});


// Avisa si se ingresa el signo $ en el campo salario

let campoSalario = document.getElementById("salario");
let campoMejorSalario = document.getElementById("mejorSalario");

campoMejorSalario.addEventListener("keydown", (evt) => {
    if ((evt.key === "$") || (evt.key === ",")) {
        Toastify({

            text: "No introduzca el signo $. Solo números sin separador de miles, y los centavos separados con punto.",

            duration: 3000

        }).showToast();
    }

});

campoSalario.addEventListener("keydown", (evt) => {
    if ((evt.key === "$") || (evt.key === ",")) {
        Toastify({

            text: "No introduzca el signo $. Solo números sin separador de miles, y los centavos separados con punto.",

            duration: 3000

        }).showToast();
    }

});



// verifica si hay cargado dato en LocalStorage para dejar como placeholder

let casoPrevio = JSON.parse(localStorage.getItem("caso"));

if (casoPrevio) {
    document.getElementById("email").placeholder = casoPrevio.email;
    document.getElementById("mejorSalario").placeholder = casoPrevio.mejorSalario;
    document.getElementById("salario").placeholder = casoPrevio.salario;
    document.getElementById("fechaIngreso").placeholder = casoPrevio.ingreso;
    document.getElementById("fechaEgreso").placeholder = casoPrevio.egreso;
}


let caso = {
    email: undefined,
    mejorSalario: undefined,
    salario: undefined,
    ingreso: undefined,
    egreso: undefined,
    cct: undefined
};

// Boton que permite borrar datos almacenados en memoria y resetear el formulario a los placeholders

let borrarDatos = document.getElementById("borrarDatos");

borrarDatos.onclick = () => {
    if (casoPrevio) {
        localStorage.removeItem("caso");
        /*  document.getElementById("email").placeholder = "nombre@ejemplo.com";
         document.getElementById("mejorSalario").placeholder = "No utilice signo $. No utilice puntos para separar miles. Utilice punto para los centavos. Ejemplo: 52000.50";
         document.getElementById("salario").placeholder = "No utilice signo $. No utilice puntos para separar miles. Utilice punto para los centavos. Ejemplo: 52000.50";
         document.getElementById("fechaIngreso").placeholder = "";
         document.getElementById("fechaEgreso").placeholder = ""; */
        /*  casoPrevio = {
             email: undefined,
             mejorSalario: undefined,
             salario: undefined,
             ingreso: undefined,
             egreso: undefined,
         }; */
        //inicio.scrollIntoView(true);
        window.location.reload();

    } else {
        Toastify({

            text: "No hay consulta anterior en memoria.",

            duration: 3000

        }).showToast();

        sound.play();

    }

}


formulario.addEventListener("submit", function () { // puede ponerse function(e). la e sirve para despues poner e.preventDefault(); que lo que haces es prevenir el comportamiento default del submit
    console.log("Evento submit capturado");

    if (((document.querySelector("#email").value == "") && (!casoPrevio.email)) || ((document.querySelector("#mejorSalario").value == "") && (!casoPrevio.mejorSalario)) || ((document.querySelector("#salario").value == "") && (!casoPrevio.salario)) || ((document.querySelector("#fechaIngreso").value == "") && (!casoPrevio.ingreso)) || ((document.querySelector("#fechaEgreso").value == "") && (!casoPrevio.egreso)))

    {
        Toastify({

            text: "Debe ingresar todos los datos requeridos.",

            duration: 3000

        }).showToast();
        sound.play();
    } else {

        // Captura de datos del formulario en objeto

        caso = {
            email: document.querySelector("#email").value,
            mejorSalario: document.querySelector("#mejorSalario").value,
            salario: document.querySelector("#salario").value,
            ingreso: document.querySelector("#fechaIngreso").value,
            egreso: document.querySelector("#fechaEgreso").value,
            cct: document.querySelector("#cct").value,
            //nombre: prompt("Ingrese su nombre")
        };


        // Toma los valores del localStorage en caso que exista el mismo y no se haya escrito nada en el formulario

        if (casoPrevio) {

            if ((casoPrevio.email) && (!document.querySelector("#email").value)) {
                caso.email = casoPrevio.email;
            }
            if ((casoPrevio.mejorSalario) && (!document.querySelector("#mejorSalario").value)) {
                caso.mejorSalario = casoPrevio.mejorSalario;
            }
            if ((casoPrevio.salario) && (!document.querySelector("#salario").value)) {
                caso.salario = casoPrevio.salario;
            }
            if ((casoPrevio.ingreso) && (!document.querySelector("#fechaIngreso").value)) {
                caso.ingreso = casoPrevio.ingreso;
            }
            if ((casoPrevio.egreso) && (!document.querySelector("#fechaEgreso").value)) {
                caso.egreso = casoPrevio.egreso;
            }


            document.getElementById("email").placeholder = casoPrevio.email;
            document.getElementById("mejorSalario").placeholder = casoPrevio.mejorSalario;
            document.getElementById("salario").placeholder = casoPrevio.salario;
            document.getElementById("fechaIngreso").placeholder = casoPrevio.ingreso;
            document.getElementById("fechaEgreso").placeholder = casoPrevio.egreso;
        }

        // armado JSON para almacenamiento en localStorage. Se hace despues de tomar los datos del caso previo, de haberlos, para que esten incluidos en el JSON

        const casoJSON = JSON.stringify(caso);
        localStorage.setItem("caso", casoJSON);


        // Variables a utilizar en la devolución
        // Deconstructing del objeto
        let {
            email,
            mejorSalario,
            salario,
            ingreso,
            egreso,
            cct,
        } = caso;

        /* console.log(cct);
        console.log("ingreso", ingreso);
        console.log("egreso", egreso); */

        const diasMeses = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let ingresoNum = new Date(ingreso);
        let ingresoNumParse = Date.parse(ingresoNum);
        let egresoNum = new Date(egreso);
        let egresoNumParse = Date.parse(egresoNum);
        let diasTrabajadosAnioEgreso = 0;
        let antiguedadDias = Math.floor((egresoNumParse - ingresoNumParse) / (1000 * 60 * 60 * 24));
        let antiguedadAnios = Math.floor(antiguedadDias / 365);
        let antiguedadMeses = Math.floor((antiguedadDias % 365) / 30);

        let antiguedadDiasResto = Math.floor((antiguedadDias % 365) % 30);
        let antigCalculo =+ antiguedadAnios;
        //let indAntig = antigCalculo * mejorSalario;
        let indPreav = 0;
        let diasVacaciones = 0;
        let periodoPrueba = false;
        let egresoMes = parseInt(egreso[5] + egreso[6]);
        let egresoDia = parseInt(egreso[8] + egreso[9]);
        let anioIngreso = parseInt(ingreso[0] + ingreso[1] + ingreso[2] + ingreso[3]);
        let anioEgreso = parseInt(egreso[0] + egreso[1] + egreso[2] + egreso[3]);
        let integracionMes = (((diasMeses[egresoMes - 1] - egresoDia) * (salario / 30)).toFixed(2) * 1);

        // Uso de Luxon para fechas

        let end = DateTime.fromISO(egreso);
        let start = DateTime.fromISO(ingreso);
        let diffInMonths = end.diff(start, 'months');
        let diffInDays = end.diff(start, 'days');
        let diffInYears = end.diff(start, 'years');
        let luxonDias = Math.floor(diffInDays.days);
        let luxonMeses = Math.floor(diffInMonths.months);
        let luxonMesesF = luxonMeses % 12;
        let luxonAnios = Math.floor(diffInYears.years);


        casoPrevio ? hayCasoPrevio = true : hayCasoPrevio = false; // asignación condicional de variables

        // convierto los strings a numbers

        salario = salario * 1;
        mejorSalario = mejorSalario * 1;


        // Modificadores según antiguedad. Cambia el monto de preaviso, y dias de vacaciones de acuerdo a la antiguedad.

        function modificadorAntig() {
            if (antiguedadAnios > 20) {
                indPreav = salario * 2;
                diasVacaciones = 35;
            }

            if ((antiguedadAnios > 10) && (antiguedadAnios <= 20)) {
                diasVacaciones = 28;
                indPreav = salario * 2;
            }

            if ((antiguedadAnios > 5) && (antiguedadAnios <= 10)) {
                diasVacaciones = 21;
                indPreav = salario * 2;
            }

            if ((antiguedadAnios <= 5) && (antiguedadAnios >= 1)) {
                diasVacaciones = 14;
                indPreav = salario;
            }

            if ((antiguedadAnios < 1) && (antiguedadDias >= 182)) {
                diasVacaciones = 14;
                indPreav = salario;

            }

            if ((antiguedadDias < 182) && (luxonMesesF >= 3)) {
                diasVacaciones = Math.floor(antiguedadDias / 20);
                indPreav = salario;
            }

            if (luxonMeses < 3) {
                diasVacaciones = Math.floor(antiguedadDias / 20);
                indPreav = salario / 2;
                periodoPrueba = true;
                integracionMes = 0;
            }

            if (luxonMesesF >= 3) {
                antigCalculo += 1;
            }

        }

        // funcion que calcula los dias trabajados en el año del egreso

        function diasTrabajadosEgreso() {
            for (let i = 0; i < (egresoMes - 1); i++) {
                diasTrabajadosAnioEgreso += diasMeses[i];
            }

            diasTrabajadosAnioEgreso += egresoDia;

            // Corrige situacion si el ingreso y el egreso son el mismo anio
            if (diasTrabajadosAnioEgreso > antiguedadDias) {
                diasTrabajadosAnioEgreso = antiguedadDias;
            }


            return;
        }

        // funcion que calcula vacaciones proporcionales

        function vacacionesProp() {
            return Math.ceil(diasVacaciones / 365 * diasTrabajadosAnioEgreso) * (salario / 25);
        }

        // Alertas

        if (antiguedadDias < 0) {
            //alert("La fecha de ingreso no puede ser posterior a la fecha de egreso.");
            Toastify({

                text: "La fecha de ingreso no puede ser posterior a la fecha de egreso.",

                duration: 3000

            }).showToast();
            sound.play();

        }

        if (mejorSalario < salario) {

            Toastify({

                text: "Su mejor salario no puede ser menor al salario habitual.",

                duration: 3000

            }).showToast();
            sound.play();

        }

        if (!email) {
            Toastify({

                text: "Debe ingresar un email.",

                duration: 3000

            }).showToast();
            sound.play();
        }

        // Llamo a las funciones

        modificadorAntig();
        diasTrabajadosEgreso();
        let vacacionesPropLet = vacacionesProp();


        // Definiciones posteriores a las funciones
        let indAntig = antigCalculo * mejorSalario;
        //indPreav += salario;



        // resultados en pagina con DOM

        let result1 = document.getElementById('result1');
        let result2 = document.getElementById('result2');
        let result3 = document.getElementById('result3');
        let result4 = document.getElementById('result4');
        let result5 = document.getElementById('result5');
        let result6 = document.getElementById('result6');
        let result7 = document.getElementById('result7');
        let result8 = document.getElementById('result8');
        let result9 = document.getElementById('result9');
        let result10 = document.getElementById('result10');
        let total = parseInt(indAntig) + parseInt(vacacionesPropLet) + parseInt(vacacionesPropLet / 12) + parseInt(integracionMes) + parseInt(integracionMes / 12) + parseInt(indPreav) + parseInt(indPreav / 12);
        //total = total * 1;
        //total.toFixed(2);
        let result11 = document.getElementById("result11");
        let result12 = document.getElementById("result12");


        
        result1.textContent = `De acuerdo con la informacion Ud. trabajó a las órdenes de su empleador durante ${antiguedadAnios} años, ${antiguedadMeses} meses y ${antiguedadDiasResto} días.`
        result2.textContent = `Su mejor salario fue de $ ${(mejorSalario*1).toFixed(2)}. Su salario habitual fue de $ ${(salario*1).toFixed(2)}.`
        result3.innerHTML = "<br><h3>Liquidación:<h3>";
        result4.textContent = `Indemnización por antigüedad:    $${(indAntig*1).toFixed(2)}.-`
        result5.textContent = `Vacaciones proporcionales (año de egreso):   $ ${(vacacionesPropLet).toFixed(2)}.-`
        result6.textContent = `SAC por Vacaciones proporcionales (año de egreso):    $ ${(vacacionesPropLet/12).toFixed(2)}.-`
        result7.textContent = `Integracion del mes de despido:    $ ${(integracionMes*1).toFixed(2)}.-`
        result8.textContent = `SAC por Integracion del mes de despido:    $ ${(integracionMes/12).toFixed(2)}.-`
        result9.textContent = `Indemnización por preaviso:    $ ${(indPreav*1).toFixed(2)}.-`
        result10.textContent = `SAC por Indemnización por preaviso:    $ ${(indPreav/12).toFixed(2)}.-`
        result11.textContent = `TOTAL:    $ ${total}.-`
        result12.textContent = `Disclaimer.-`


        // funcion fetch para datos de tope de convenio


        const obtenerDatosApi = async () => {
            try {
                let apiConvenios = await fetch("./assets/datos.json");
                let respuesta = await apiConvenios.json();
                //console.log(respuesta);
                //console.log(usarResp(respuesta));
                //usarResp(respuesta);
                for (let i = 0; i < respuesta.length; i += 1) {
                    if (respuesta[i].id == cct) {
                        //console.log(respuesta[i].tope);
                        topeConvenio = respuesta[i].tope;
                        console.log("Tope convenio> " + topeConvenio);
                        //return respuesta[i].tope;
                        result12.textContent = `Disclaimer.
                        Tener presente que la base de cálculo de su indemnización por despido podría ser afectada por el tope establecido por el art. 245 de la LCT- 
                        Tope para el convenio ${respuesta[i].id} es de ${topeConvenio} para el año ${respuesta[i].anio} 
                        
                        
                        `
                    }
                }


            } catch (error) {
                console.log(error);
            }
        }

        if (cct != "Ninguno / No sé") {

            let respuesta = obtenerDatosApi();
            console.log(respuesta);

        }


        // Display en documento con evento click de enviar

        document.getElementById("resultadosDiv").style.display = "inline";
        resultados.scrollIntoView(true);


        // OBJETO DE CONTROL que reune las variables utilizadas.

        objetoCaso = {
            antiguedadDias: antiguedadDias,
            antiguedadAnios: antiguedadAnios,
            antiguedadMeses: antiguedadMeses,
            ...caso, // uso del operador spread
            diasTrabajadosAnioEgreso: diasTrabajadosAnioEgreso,
            indAntig: indAntig,
            indPreav: indPreav,
            diasVacaciones: diasVacaciones,
            periodoPrueba: periodoPrueba,
            vacacionesPropLet: vacacionesPropLet,
            hayCasoPrevio: hayCasoPrevio,
            cct: cct,

        };

        console.log("objetoCaso");
        console.log(objetoCaso);




        console.log("-------------------LUXON--------------------------");
        console.log("dias", luxonDias);
        console.log("meses", luxonMeses);
        console.log("meses F", luxonMesesF);
        console.log("a;os", luxonAnios);
        console.log("-------------------VainillaJS--------------------------");
        console.log("dias", antiguedadDiasResto);
        console.log("egreso dia", egresoDia);
        console.log("meses", antiguedadMeses);
        console.log("a;os", antiguedadAnios);
    }

});




















// PROBLEMAS DETECTADOS:


// formatear las cifras para que muestren divisor por miles con punto y decimales con coma



// en periodo de prueba esta pagando integracion y sac, ver



// funcion modificadora segun antig no modifica preaviso si 5 anios y 1 mes por ejemplo

// objetoCaso no esta siendo modificado. Tema de Scope. Consultar.

// no me permite meter numeros con decimales en el form