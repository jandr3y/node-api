export const SequelizeError = (e) => {
  if(typeof e.errors !== 'undefined' && Array.isArray(e.errors)){

    e.errors.map(error => {
      // TODO: Log System
      console.log(`Error: ${error.type} - Valor: ${error.value}`)
    });

    let last = e.errors[0];
    let field = last.path.split('_')[0];
    switch(last.type){
      case 'unique violation':
        return `'${last.value}' já esta cadastrado na coluna ${field}`;
      default:
        return `Erro desconhecido.`
    }
  }
}