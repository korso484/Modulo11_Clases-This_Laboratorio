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


//////////////////////////////////CASO 1//////////////////////////////////
console.log("///////////////////////////CASO 1///////////////////////////")

class CalcularReserva {
    constructor() {
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

//////////////////////////////////CASO 2//////////////////////////////////
console.log("///////////////////////////CASO 2///////////////////////////")

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


//////////////////////////////////DESAFIO//////////////////////////////////
console.log("///////////////////////////DESAFIO///////////////////////////")

class CalcularCoste {
    constructor() {
        this._subtotal = 0;
        this._precioHabitacion = {
            standard: 100,
            suite: 150
        }

    }

    suplAdicional(client) {
        return (client > 1 ? --client * 40 : 0);
    }

    calcularSubtotal(arr, tipo) {
        if (arr.tipoHabitacion === this._precioHabitacion) {
            this._subtotal = arr.reduce((acc,
                { noches, pax }) =>
                acc + this.suplAdicional(pax) + (tipo * noches), 0);
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

class CalcularCosteCliente extends CalcularCoste {
    constructor() {
        super(CalcularCoste);
    }

    calcTipoHab(tipo) {
        switch (tipo) {
            case "standard":
                return 100;
            case "suite":
                return 150;
        }
    }
}

const claseCliente = new CalcularCosteCliente();
claseCliente.calcularSubtotal(reservas, "standard");
console.log("Subtotal ClaseSeparadaCliente", claseCliente.getSubtotal());
console.log("Total ClaseSepClaseSeparadaClientearada + IVA", claseCliente.getTotal());

class CalcularCosteTourOperador extends CalcularCoste {
    constructor() {
        super(CalcularCoste);
    }

    getDiscount(price) {
        return price - (price * 15 / 100)
    }

    getTotal() {
        super.getTotal();
        return this.getDiscount(this._subtotal) + this.getDiscount(this._subtotal) * 21 / 100;
    }
}

const claseTour = new CalcularReservaTourOperador();
claseTour.calcularSubtotal(reservas);
console.log("Subtotal ClaseSeparadaTourOperador", claseTour.getSubtotal());
console.log("Total ClaseSeparadaTourOperador + IVA", claseTour.getTotal());

//////////////////////////////////EJERCICIO ADICIONAL//////////////////////////////////
console.log("/////////////EJERCICIO ADICIONAL/////////////")


