function Validator(value, name){

  this.value = value;
  this.fieldName = name;

  this._error = (message) => {
    throw { type: 'validation', message: message }
  }

  this.isEmail = () => {
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(regex.test(String(this.value).toLowerCase())){
     return this; 
    }else{
      this._error(`Você precisa informar um email válido.`);
    }
  }

  this.maxLength = (size) => {
    if(this.value.length > size){
      this._error(`${this.fieldName} pode conter no máximo ${size} caracteres.`);
    }else{
      return this;
    }
  }
  
  this.minLength = (size) => {
    if(this.value.length < size){
      this._error(`${this.fieldName} deve conter no minimo ${size} caracteres.`);
    }else{
      return this;
    }
  }

  this.required = () => {
    if(this.value === ""){
      this._error(`${this.fieldName} é obrigatório.`);
    }else if(this.value){
      return this;
    }else{
      this._error(`${this.fieldName} é obrigatório.`);
    }
  }

  return this;
}

export default Validator;