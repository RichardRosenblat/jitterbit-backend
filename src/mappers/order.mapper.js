export const mapOrderToModelData = ({ numeroPedido, valorTotal, dataCriacao, items }) => {
    const mappedOrder =  {};

    numeroPedido && (mappedOrder.orderId = numeroPedido)
    valorTotal && (mappedOrder.value = valorTotal)
    dataCriacao && (mappedOrder.creationDate = new Date(dataCriacao))
    items && (mappedOrder.items = items.map(item => ({
        productId: +item.idItem,
        quantity: item.quantidadeItem,
        price: item.valorItem
    })))

    return mappedOrder;
}

export const mapOrderToResponse = (order) => {
    return {
        orderId: order.orderId,
        value: order.value,
        creationDate: order.creationDate,
        items: order.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
        }))
    };
}