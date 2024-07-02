const autosImportados = require('./autos'); // Importar el módulo autos
const persona = require('./persona'); // Importar el modulo persona

// Objeto literal concesionaria con la lista de autos importada
const concesionaria = {
    autos: autosImportados,
    buscarAuto: function(patente) {
        const autoEncontrado = this.autos.find(auto => auto.patente === patente)
        if(autoEncontrado){
            console.log(`Auto con patente ${patente} encontrado`)
            return autoEncontrado;
        }else{
            console.log('No se encontró auto');
            return null;
        }
    },
    venderAuto: function(patente) {
        const auto = this.buscarAuto(patente);
        if(auto){
            auto.vendido = true;
            console.log(`Auto con patente ${patente} vendido`)
        }else {
            console.log(`No se encontró auto con patente ${patente}`)
        }
    },
    autosParaLaVenta: function (){
        const autosDisponibles = this.autos.filter(auto => auto.vendido)
        console.log("autosParaLaVenta",autosDisponibles);
        return autosDisponibles;
    },
    autosNuevos: function (){
        const autos0km = this.autosParaLaVenta().filter(auto => auto.km < 100)
        console.log("autosNuevos",autos0km)
        return autos0km;
    },
    listaDeVentas: function (){
        const ventas = this.autosParaLaVenta().map(auto => auto.precio)
        console.log("listaDeVentas",ventas);
        return ventas;
    },
    totalDeVentas: function (){
        const total = this.autosParaLaVenta().reduce(auto => auto.precio)
        console.log("total vendido",total)
        return total;
    },
    puedeComprar: function (auto, persona){
        const costoCuota = auto.precio / auto.cuotas;
        if (auto.precio <= persona.capacidadDePagoTotal && costoCuota <= persona.capacidadDePagoEnCuotas) {
            console.log(`${persona.nombre} puede comprar el auto.`);
            return true;
        } else {
            console.log(`${persona.nombre} no puede comprar el auto.`);
            return false;
        }
    },
    autosQuePuedeComprar: function(persona){
        const autosDisponibles = this.autosParaLaVenta();
        const autosQuePuedeComprar = autosDisponibles.filter(auto => this.puedeComprar(auto, persona));
        console.log("autosQuePuedeComprar", autosQuePuedeComprar);
        return autosQuePuedeComprar;
    }
};


// Exportar el objeto concesionaria para ser utilizado en otras partes del código si es necesario
module.exports = concesionaria;

// concesionaria.buscarAuto('AA496DS');
// concesionaria.autosParaLaVenta();
// concesionaria.autosNuevos();
//  concesionaria.listaDeVentas();
//  concesionaria.totalDeVentas();


const autoParaComprar = concesionaria.buscarAuto('JJK116');
if (autoParaComprar) {
    concesionaria.puedeComprar(autoParaComprar, persona);
} else {
    console.log('No se encontró auto para comprar');
}

concesionaria.autosQuePuedeComprar(persona)


