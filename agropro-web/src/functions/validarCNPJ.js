const calcularDigito = (numeros, tamanho, soma, peso) => {
  for (let i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * peso;
    peso--;
    if (peso < 2)
      peso = 9;
  }
  return soma;
}

const validarCNPJ = (cnpj) => {

  // Simple validations
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14)
    return false;

  if (cnpj === "00000000000000" || cnpj === "11111111111111" || cnpj === "22222222222222" || cnpj === "33333333333333" || cnpj === "44444444444444" || cnpj === "55555555555555" || cnpj === "66666666666666" || cnpj === "77777777777777" || cnpj === "88888888888888" || cnpj === "99999999999999")
    return false;

  // First Digit validation
  let tamanho = 12;

  let digitos = cnpj.substring(tamanho);
  let numeros = cnpj.substring(0, tamanho);
  let soma = 0;
  let peso = 5;

  soma = calcularDigito(numeros, tamanho, soma, peso);

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado.toString() !== digitos.charAt(0))
    return false;

  console.log('B')

  // Second Digit validation
  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  peso = 6;

  soma = calcularDigito(numeros, tamanho, soma, peso);

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado.toString() !== digitos.charAt(1))
    return false;

  console.log('C')
  return true;

}

export default validarCNPJ;
