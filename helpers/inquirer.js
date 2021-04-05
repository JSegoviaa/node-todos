const inquire = require('inquirer');
require('colors');

const preguntas = [
  {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
      { value: '1', name: '1. Crear tarea' },
      { value: '2', name: '2. Mostrar lista de tareas' },
      { value: '3', name: '3. Mostrar lista de tareas completadas' },
      { value: '4', name: '4. Mostrar tareas pendientes' },
      { value: '5', name: '5. Completar tareas' },
      { value: '6', name: '6. Eliminar tareas' },
      { value: '0', name: '0. Salir' },
    ],
  },
];

const inquireMenu = async () => {
  console.clear();
  console.log('======================='.green);
  console.log(' Seleccione una opción');
  console.log('=======================\n'.green);

  const { opcion } = await inquire.prompt(preguntas);
  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: 'input',
      name: 'enter',
      message: `Presione ${'ENTER'.green} para continuar`,
    },
  ];
  console.log('\n');
  await inquire.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value) {
        if (value.length === 0) {
          return 'Este campo no se puede dejar vacío';
        }
        return true;
      },
    },
  ];

  const { desc } = await inquire.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
    };
  });

  choices.unshift({ value: '0', name: '0.'.green + ' Cancelar' });

  const preguntas = [
    { type: 'list', name: 'id', message: 'Eliminar', choices },
  ];

  const { id } = await inquire.prompt(preguntas);

  return id;
};

const confirmar = async (mensaje) => {
  const pregunta = [{ type: 'confirm', name: 'ok', mensaje }];
  const { ok } = await inquire.prompt(pregunta);
  return ok;
};

const mostrarListadoCheckList = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    { type: 'checkbox', name: 'ids', message: 'Seleccionar', choices },
  ];

  const { ids } = await inquire.prompt(pregunta);

  return ids;
};

module.exports = {
  confirmar,
  inquireMenu,
  leerInput,
  listadoTareasBorrar,
  mostrarListadoCheckList,
  pausa,
};
