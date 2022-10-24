class Validator {
    constructor(value:any) {
      this.value = value
      this.result = []
    }
  
    isNotEmpty(msg:string) {
      if (!this.value) {
        this.result.push(msg)
      }
  
      return this
    }
  
    isLength(minLength:any, maxLength:any, msg:string) {
      if (this.value.length < minLength || this.value.length > maxLength) {
        this.result.push(msg)
      }
  
      return this
    }
}

export default Validator;