export const validateCreateOrderValues = ({
    numeroPedido,
    valorTotal,
    dataCriacao,
    items,
}) => {
    const errors = [];
    if (!numeroPedido) {
        errors.push('numeroPedido é obrigatório.');
    } else {
        if (typeof numeroPedido !== 'string') {
            errors.push('numeroPedido deve ser uma string.');
        }
    }
    if (!valorTotal && valorTotal !== 0) {
        errors.push('valorTotal é obrigatório.');
    } else {
        if (typeof valorTotal !== 'number') {
            errors.push('valorTotal deve ser um número.');
        }
        if (valorTotal < 0) {
            errors.push('valorTotal deve ser maior ou igual a zero.');
        }
    }
    if (!dataCriacao) {
        errors.push('dataCriacao é obrigatória.');
    } else {
        if (typeof dataCriacao !== 'string' || isNaN(Date.parse(dataCriacao))) {
            errors.push('dataCriacao deve ser uma data válida.');
        }
    }
    if (!items || !items.length) {
        errors.push('items são obrigatórios.');
    } else {
        if (!Array.isArray(items)) {
            errors.push('items devem ser um array.');
        }

        Array.isArray(items) && items.forEach((item, index) => {
            if (!item || typeof item !== 'object' || Array.isArray(item)) {
                errors.push(`Item ${index + 1} é inválido.`);
                return;
            }

            if (!item.idItem) {
                errors.push(`idItem do item ${index + 1} é obrigatório.`);
            } else if (typeof item.idItem !== 'string' || isNaN(item.idItem)) {
                errors.push(`idItem do item ${index + 1} deve ser uma string númerica.`);
            }

            if (!item.quantidadeItem) {
                errors.push(`quantidadeItem do item ${index + 1} é obrigatória.`);
            } else if (typeof item.quantidadeItem !== 'number') {
                errors.push(`quantidadeItem do item ${index + 1} deve ser um número.`);
            }

            if (!item.valorItem) {
                errors.push(`valorItem do item ${index + 1} é obrigatório.`);
            } else if (typeof item.valorItem !== 'number') {
                errors.push(`valorItem do item ${index + 1} deve ser um número.`);
            }
        });

    }
    return errors;
}
export const validateUpdateOrderValues = (orderInfo) => {
    const errors = validateCreateOrderValues(orderInfo);

    return errors.filter(error => !(error.includes('obrigatório')||error.includes('obrigatória')) || error.includes('do item'))
}