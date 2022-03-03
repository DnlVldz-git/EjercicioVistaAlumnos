var myToastEl = document.getElementById('liveToast');
var toast = new bootstrap.Toast(myToastEl);

function obtenerTabla(ruta) {
    try {
        let myselect;
        let tablaAll;
        let valor;
        let peticion = new XMLHttpRequest();

        switch (ruta) {
            case 1:
                myselect = document.getElementById("selectAll");
                tablaAll = document.getElementById("tablaTodos");
                valor = myselect.options[myselect.selectedIndex].value;

                if (valor === '-') {
                    peticion.open('GET', 'http://localhost:9595/api/v1/students', true);
                }
                else {
                    peticion.open('GET', 'http://localhost:9595/api/v1/students?limit=' + valor, true);
                }
                break;

            case 2:
                myselect = document.getElementById("selectCarrera");
                tablaAll = document.getElementById("tablaCareer");
                valor = myselect.options[myselect.selectedIndex].value;
                peticion.open('GET', 'http://localhost:9595/api/v1/students/getByCareer/' + valor, true);
                break;

            case 3:
                myselect = document.getElementById("selectStatus");
                tablaAll = document.getElementById("tablaStatus");
                valor = myselect.options[myselect.selectedIndex].value;
                peticion.open('GET', 'http://localhost:9595/api/v1/students/getByStatus/' + valor, true);
                break;

            default:
                break;
        }

        peticion.onreadystatechange = function (aEvt) {
            if (peticion.readyState == 4) {
                if (peticion.status === 200) {
                    var alumnosRegistrados = JSON.parse(peticion.responseText);
                    eliminarFilas(tablaAll);

                    for (let i = 0; i < alumnosRegistrados.length; i++) {
                        let alumno = alumnosRegistrados[i];
                        var row = tablaAll.insertRow(1);
                        var cell0 = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        var cell6 = row.insertCell(6);
                        var cell7 = row.insertCell(7);

                        cell0.innerHTML = alumno.id.toString();
                        cell1.innerHTML = alumno.noControl;
                        cell2.innerHTML = alumno.nombre + " " + alumno.paterno + " " + alumno.materno;
                        cell3.innerHTML = alumno.nacimiento.toString();
                        cell4.innerHTML = alumno.carrera;
                        cell5.innerHTML = alumno.status;
                        cell6.innerHTML = alumno.promedio.toString();
                        cell7.innerHTML = alumno.creacion.toString();
                    }
                }
            }
        };
        peticion.send(null);
    }
    catch (error) {
        myToastEl.className = "toast hide text-white bg-danger";
        document.getElementById('bodyToast').innerHTML = "Hubo un error al recuperar los datos.";
        document.getElementById('toastHeader').innerHTML = "Operación fallida";
        toast.show();
    }
}

function eliminarFilas(tabla) {
    var filas = tabla.rows.length;
    for (var i = filas - 1; i > 0; i--) {
        tabla.deleteRow(i);
    }
}

function obtenerPorId() {
    let peticion = new XMLHttpRequest();
    var input = document.getElementById('inputSearchId').value;

    if (input === '') {
        myToastEl.className = "toast hide text-white bg-danger";
        document.getElementById('bodyToast').innerHTML = "Campo de búsqueda vacío.";
        document.getElementById('toastHeader').innerHTML = "Operación fallida";
        toast.show();
    }
    else {
        peticion.open('GET', 'http://localhost:9595/api/v1/students/getById/' + input, true);
        peticion.onreadystatechange = function (aEvt) {
            if (peticion.readyState == 4) {
                if (peticion.status === 200) {
                    try {
                        var alumno = JSON.parse(peticion.responseText);
                        document.getElementById('noControlInput').value = alumno.noControl;
                        document.getElementById('nombreInput').value = alumno.nombre + " " + alumno.paterno + " " + alumno.materno;
                        document.getElementById('nacimientoInput').value = alumno.nacimiento;
                        document.getElementById('careerInput').value = alumno.carrera;
                        document.getElementById('statusInput').value = alumno.status;
                        document.getElementById('promedioInput').value = alumno.promedio;
                        document.getElementById('creacionInput').value = alumno.creacion;
                    }
                    catch (error) {
                        myToastEl.className = "toast hide text-white bg-danger";
                        document.getElementById('bodyToast').innerHTML = "No se encontró al alumno";
                        document.getElementById('toastHeader').innerHTML = "Operación fallida";
                        toast.show();
                    }
                }
            }
        };
        peticion.send(null);
    }
}

function agregarAlumno() {
    let peticion = new XMLHttpRequest();
    var selectCarrera = document.getElementById("selectCarreraPOST");
    var selectStatus = document.getElementById("selectStatusPOST");
    var selectSemestre = document.getElementById("selectSemestrePOST");

    var alumno = {
        noControl: document.getElementById('noControlInputPOST').value,
        nombre: document.getElementById('nombreInputPOST').value,
        paterno: document.getElementById('paternoInputPOST').value,
        materno: document.getElementById('maternoInputPOST').value,
        nacimiento: document.getElementById('nacimientoInputPOST').value,
        carrera: selectCarrera.options[selectCarrera.selectedIndex].value,
        semestre: parseInt(selectSemestre.options[selectSemestre.selectedIndex].value, 10),
        status: selectStatus.options[selectStatus.selectedIndex].value,
        promedio: parseFloat(document.getElementById('promedioInputPOST').value)
    };

    peticion.open('POST', 'http://localhost:9595/api/v1/students', true);
    peticion.setRequestHeader("Content-Type", "application/json");
    try {
        peticion.send(JSON.stringify(alumno));
        myToastEl.className = "toast hide text-white bg-success";
        document.getElementById('bodyToast').innerHTML = "Alumno agregado";
        document.getElementById('toastHeader').innerHTML = "Operación exitosa";
        toast.show();

        document.getElementById('noControlInputPOST').value = '';
        document.getElementById('nombreInputPOST').value = '';
        document.getElementById('paternoInputPOST').value = '';
        document.getElementById('maternoInputPOST').value = '';
        document.getElementById('nacimientoInputPOST').value = '';
        selectCarrera.selectedIndex = -1;
        selectSemestre.selectedIndex = -1;
        selectStatus.selectedIndex = -1;
        document.getElementById('promedioInputPOST').value = '';
    } catch (error) {
        myToastEl.className = "toast hide text-white bg-danger";
        document.getElementById('bodyToast').innerHTML = "Error al registrar al alumno.";
        document.getElementById('toastHeader').innerHTML = "Operación fallida";
        toast.show();
    }
};

function cargarTablaDelete(){
    try {
        let tablaAll = document.getElementById('tablaTodosDelete');
        let peticion = new XMLHttpRequest();
        peticion.open('GET', 'http://localhost:9595/api/v1/students?limit=100', true);

        peticion.onreadystatechange = function (aEvt) {
            if (peticion.readyState == 4) {
                if (peticion.status === 200) {
                    var alumnosRegistrados = JSON.parse(peticion.responseText);
                    eliminarFilas(tablaAll);

                    for (let i = 0; i < alumnosRegistrados.length; i++) {
                        let alumno = alumnosRegistrados[i];
                        var row = tablaAll.insertRow(-1);
                        var cell0 = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        var cell6 = row.insertCell(6);
                        var cell7 = row.insertCell(7);
                        var cell8 = row.insertCell(8);

                        cell0.innerHTML = alumno.id.toString();
                        cell1.innerHTML = alumno.noControl;
                        cell2.innerHTML = alumno.nombre + " " + alumno.paterno + " " + alumno.materno;
                        cell3.innerHTML = alumno.nacimiento.toString();
                        cell4.innerHTML = alumno.carrera;
                        cell5.innerHTML = alumno.status;
                        cell6.innerHTML = alumno.promedio.toString();
                        cell7.innerHTML = alumno.creacion.toString();

                        var btn = document.createElement('input');
                        cell8.appendChild(btn);

                        btn.type = "button";
                        btn.value = "Eliminar";
                        btn.className = "btn btn-danger";
                        btn.id = "btnFila" + (i + 1);

                        btn.onclick = function () {
                            var botonEliminar = document.getElementById("btnFila" + (i + 1));
                            var fila = botonEliminar.parentNode.parentNode;
                            var idCorr = fila.firstChild.textContent;
                            eliminarPorId(idCorr, fila);
                        };

                    }
                }
            }
        };
        peticion.send(null);
    }
    catch (error) {
        myToastEl.className = "toast hide text-white bg-danger";
        document.getElementById('bodyToast').innerHTML = "Error al cargar los datos.";
        document.getElementById('toastHeader').innerHTML = "Operación fallida";
        toast.show();
    }
};

function cargarAlumno() {
    let peticion = new XMLHttpRequest();
    var input = document.getElementById('inputSearchIdPUT').value;

    if (input === '') {
        myToastEl.className = "toast hide text-white bg-danger";
        document.getElementById('bodyToast').innerHTML = "Campo de búsqueda vacío.";
        document.getElementById('toastHeader').innerHTML = "Operación fallida";
        toast.show();
    }
    else {
        peticion.open('GET', 'http://localhost:9595/api/v1/students/getById/' + input, true);
        peticion.onreadystatechange = function (aEvt) {
            if (peticion.readyState == 4) {
                if (peticion.status === 200) {
                    try {
                        var alumno = JSON.parse(peticion.responseText);
                        document.getElementById('noControlInputPUT').value = alumno.noControl;
                        document.getElementById('nombreInputPUT').value = alumno.nombre ;
                        document.getElementById('paternoInputPUT').value = alumno.paterno;
                        document.getElementById('maternoInputPUT').value = alumno.materno;
                        document.getElementById('nacimientoInputPUT').value = alumno.nacimiento;
                        document.getElementById('selectCarreraPUT').value = alumno.carrera;
                        document.getElementById('selectStatusPUT').value = alumno.status;
                        document.getElementById('promedioInputPUT').value = alumno.promedio;
                        document.getElementById('selectSemestrePUT').value = alumno.semestre;
                    }
                    catch (error) {
                        myToastEl.className = "toast hide text-white bg-danger";
                        document.getElementById('bodyToast').innerHTML = "No se encontró al alumno";
                        document.getElementById('toastHeader').innerHTML = "Operación fallida";
                        toast.show();
                    }
                }
            }
        };
        peticion.send(null);
    }
}

function guardarAlumno() {
    let peticion = new XMLHttpRequest();
    var selectCarrera = document.getElementById("selectCarreraPUT");
    var selectStatus = document.getElementById("selectStatusPUT");
    var selectSemestre = document.getElementById("selectSemestrePUT");
    var input = document.getElementById('inputSearchIdPUT').value;

    var alumno = {
        noControl: document.getElementById('noControlInputPUT').value,
        nombre: document.getElementById('nombreInputPUT').value,
        paterno: document.getElementById('paternoInputPUT').value,
        materno: document.getElementById('maternoInputPUT').value,
        nacimiento: document.getElementById('nacimientoInputPUT').value,
        carrera: selectCarrera.options[selectCarrera.selectedIndex].value,
        semestre: parseInt(selectSemestre.options[selectSemestre.selectedIndex].value, 10),
        status: selectStatus.options[selectStatus.selectedIndex].value,
        promedio: parseFloat(document.getElementById('promedioInputPUT').value)
    };

    peticion.open('PUT', 'http://localhost:9595/api/v1/students/' + input, true);
    peticion.setRequestHeader("Content-Type", "application/json");
    try {
        peticion.send(JSON.stringify(alumno));
        myToastEl.className = "toast hide text-white bg-success";
        document.getElementById('bodyToast').innerHTML = "Alumno modificado";
        document.getElementById('toastHeader').innerHTML = "Operación exitosa";
        toast.show();
    } catch (error) {
        myToastEl.className = "toast hide text-white bg-danger";
        document.getElementById('bodyToast').innerHTML = "Error al registrar al alumno.";
        document.getElementById('toastHeader').innerHTML = "Operación fallida";
        toast.show();
    }
}

function eliminarPorId(id, fila) {
    let peticion = new XMLHttpRequest();
    peticion.open('DELETE', 'http://localhost:9595/api/v1/students/' + id, true);
    peticion.onreadystatechange = function (aEvt) {
        if (peticion.readyState == 4) {
            if (peticion.status === 200) {
                fila.parentNode.removeChild(fila);
                myToastEl.className = "toast hide text-white bg-success";
                document.getElementById('bodyToast').innerHTML = "Estudiante eliminado.";
                document.getElementById('toastHeader').innerHTML = "Operación exitosa";
                toast.show();
            }
            else{
                myToastEl.className = "toast hide text-white bg-danger";
                document.getElementById('bodyToast').innerHTML = "Error al eliminar al estudiante.";
                document.getElementById('toastHeader').innerHTML = "Operación fallida";
                toast.show();
            }
        }
    };
    peticion.send(null);
}

function eliminarTodo(){
    let tablaAll = document.getElementById('tablaTodosDelete');
    let peticion = new XMLHttpRequest();
    peticion.open('DELETE', 'http://localhost:9595/api/v1/students', true);
    peticion.onreadystatechange = function (aEvt) {
        if (peticion.readyState == 4) {
            if (peticion.status === 200) {
                eliminarFilas(tablaAll);
                myToastEl.className = "toast hide text-white bg-success";
                document.getElementById('bodyToast').innerHTML = "Estudiantes eliminados.";
                document.getElementById('toastHeader').innerHTML = "Operación exitosa";
                toast.show();
            }
            else{
                myToastEl.className = "toast hide text-white bg-danger";
                document.getElementById('bodyToast').innerHTML = "Error al eliminar los estudiantes.";
                document.getElementById('toastHeader').innerHTML = "Operación fallida";
                toast.show();
            }
        }
    };
    peticion.send(null);
}