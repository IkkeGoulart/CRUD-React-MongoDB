export function formatCPF(value) {
    //remove os caracteres diferentes de números
    let numbers = value.replace(/\D/g, '');

    //limite de 11 números
    numbers = numbers.slice(0, 11);

    //máscara do cpf XXX.XXX.XXX-XX
    numbers = numbers.replace(/(\d{3})(\d)/, '$1.$2');
    numbers = numbers.replace(/(\d{3})(\d)/, '$1.$2');
    numbers = numbers.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    return numbers;
}