export const mapOrderToModelData = ({ numeroPedido, valorTotal, dataCriacao, items }) => {
    return {
        orderId: numeroPedido,
        value: valorTotal,
        creationDate: new Date(dataCriacao),
        items: items.map(item => ({
            productId: +item.idItem,
            quantity: item.quantidadeItem,
            price: item.valorItem
        }))
    };
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