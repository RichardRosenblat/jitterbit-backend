export const validateCreateOrderValues = ({
    numeroPedido,
    valorTotal,
    dataCriacao,
    items,
}) => {
    const errors = [];
    if (!numeroPedido) {
        errors.push('numeroPedido é obrigatório.');
    }
    if (!valorTotal && valorTotal !== 0) {
        errors.push('valorTotal é obrigatório.');
    }
    if (!dataCriacao) {
        errors.push('dataCriacao é obrigatória.');
    }
    if (!items || !items.length) {
        errors.push('items são obrigatórios.');
    }

    if (typeof numeroPedido !== 'string') {
        errors.push('numeroPedido deve ser uma string.');
    }
    if (typeof valorTotal !== 'number') {
        errors.push('valorTotal deve ser um número.');
    }
    if (typeof dataCriacao !== 'string' || isNaN(Date.parse(dataCriacao))) {
        errors.push('dataCriacao deve ser uma data válida.');
    }
    if (!Array.isArray(items)) {
        errors.push('items devem ser um array.');
    }

    if (valorTotal < 0) {
        errors.push('valorTotal deve ser maior ou igual a zero.');
    }

    items && items.forEach((item, index) => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) {
            errors.push(`Item ${index + 1} é inválido.`);
            return;
        }

        if (!item.idItem) {
            errors.push(`idItem do item ${index + 1} é obrigatório.`);
        }
        if (typeof item.idItem !== 'string' || isNaN(item.idItem)) {
            errors.push(`idItem do item ${index + 1} deve ser uma string númerica.`);
        }

        if (!item.quantidadeItem) {
            errors.push(`quantidadeItem do item ${index + 1} é obrigatória.`);
        }
        if (typeof item.quantidadeItem !== 'number') {
            errors.push(`quantidadeItem do item ${index + 1} deve ser um número.`);
        }

        if (!item.valorItem) {
            errors.push(`valorItem do item ${index + 1} é obrigatório.`);
        }
        if (typeof item.valorItem !== 'number') {
            errors.push(`valorItem do item ${index + 1} deve ser um número.`);
        }
    });

    return errors;
}
export const validateUpdateOrder = ({
    numeroPedido,
    valorTotal,
    dataCriacao,
    items,
}) => {
    const errors = [];
    if (numeroPedido && typeof numeroPedido !== 'string') {
        errors.push('numeroPedido deve ser uma string.');

    }
    if ((valorTotal || valorTotal !== 0) && typeof valorTotal !== 'number') {
        errors.push('valorTotal deve ser um número.');
    }
    if (dataCriacao && typeof dataCriacao !== 'string' || isNaN(Date.parse(dataCriacao))) {
        errors.push('dataCriacao deve ser uma data.');
    }
    if (items && items.length && !Array.isArray(items)) {
        errors.push('Items devem ser um array.');
        
    }

    if (valorTotal && valorTotal < 0) {
        errors.push('valorTotal deve ser maior ou igual a zero.');
    }

    Array.isArray(items) && items.forEach((item, index) => {
        if (!item || typeof item !== 'object' || Array.isArray(item)) {
            errors.push(`Item ${index + 1} é inválido.`);
            return;
        }

        if (!item.idItem) {
            errors.push(`ID do item ${index + 1} é obrigatório.`);
        }
        if (typeof item.idItem !== 'string' || !isNaN(item.idItem)) {
            errors.push(`ID do item ${index + 1} deve ser uma string númerica.`);
        }

        if (!item.quantidadeItem) {
            errors.push(`Quantidade do item ${index + 1} é obrigatória.`);
        }
        if (typeof item.quantidadeItem !== 'number') {
            errors.push(`Quantidade do item ${index + 1} deve ser um número.`);
        }

        if (!item.valorItem) {
            errors.push(`Valor do item ${index + 1} é obrigatório.`);
        }
        if (typeof item.valorItem !== 'number') {
            errors.push(`Valor do item ${index + 1} deve ser um número.`);
        }
    });


    return errors;
}