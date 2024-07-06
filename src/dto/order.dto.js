export default class OrderDTO {
    constructor(numeroPedido, valorTotal, dataCriacao, items) {
        this.numeroPedido = numeroPedido;
        this.valorTotal = valorTotal;
        this.dataCriacao = dataCriacao;
        this.items = items;
    }
}