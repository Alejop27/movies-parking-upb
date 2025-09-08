export interface Vehicle {
    placa: string;
    tipo: VehicleType;
}

export enum VehicleType {
    CARRO = "CARRO",
    MOTO = "MOTO"
}
