function NoParkingSpotsException(message)
{
  this.name = "NoParkingSpotsException";
  this.message = message;
  this.stack = (new Error()).stack;
}

NoParkingSpotsException.prototype = Object.create(Error.prototype); //moet van error klasse overerven
NoParkingSpotsException.prototype.constructor = NoParkingSpotsException;
