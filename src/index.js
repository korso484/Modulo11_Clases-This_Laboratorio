const reservas = [
    {
        tipoHabitacion: "standard",
        pax: 1,
        noches: 3
    },
    {
        tipoHabitacion: "standard",
        pax: 1,
        noches: 4
    },
    {
        tipoHabitacion: "suite",
        pax: 2,
        noches: 1
    }
];


//CASO 1

class CalcularReserva {
    constructor() {
        this._reserva = [];
        this._subtotal = 0;
    }

    suplAdicional(client) {
        return (client > 1 ? --client * 40 : 0);
    }

    calcTipoHab(tipo) {
        switch (tipo) {
            case "standard":
                return 100;
            case "suite":
                return 150;
        }
    }


    calcularSubtotal(arr) {
        this._subtotal = arr.reduce((acc,
            { noches, pax, tipoHabitacion }) =>
            acc + this.suplAdicional(pax) + (this.calcTipoHab(tipoHabitacion) * noches), 0);
    }

    getSubtotal() {
        return this._subtotal;
    }

    getTotal() {
        return this._subtotal + (this._subtotal * 21 / 100);
    }

}


const calcularSuper = new CalcularReserva();
calcularSuper.calcularSubtotal(reservas);
console.log("Subtotal Cliente", calcularSuper.getSubtotal());
console.log("Total Cliente + IVA", calcularSuper.getTotal());

//CASO 2

class CalcularReservaTourOperador extends CalcularReserva {
    constructor() {
        super(CalcularReserva);
    }

    calcularSubtotal(arr) {
        this._subtotal = arr.reduce((acc,
            { noches, pax }) =>
            acc + this.suplAdicional(pax) + (100 * noches), 0);
    }

    getDiscount(price) {
        return price - (price * 15 / 100)
    }

    getTotal() {
        super.getTotal();
        return this.getDiscount(this._subtotal) + this.getDiscount(this._subtotal) * 21 / 100;
    }


}

const calcularTour = new CalcularReservaTourOperador();
calcularTour.calcularSubtotal(reservas);
console.log("Subtotal TourOperador", calcularTour.getSubtotal());
console.log("Total TourOperador + IVA", calcularTour.getTotal());

/*const calcularSuperTourOperador = new CalcularReservaTourOperador();
calcularSuperTourOperador.calcularSubtotal(reservas2);
console.log("subtotal", calcularSuperTourOperador.calcTotal());*/