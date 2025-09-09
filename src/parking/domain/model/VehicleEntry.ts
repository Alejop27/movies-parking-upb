export interface VehicleEntry {
    registroId: string;
    placa: string;
    tipo: VehicleType;
    horaIngreso: string;
    horaSalida?: string;
    tiempoEstacionadoMinutos?: number;
    montoAPagar?: number;
    finalizado: boolean;
}

export type VehicleType = 'CARRO' | 'MOTO';

export interface ParkingCapacity {
    carros: number;
    motos: number;
}

export const PARKING_LIMITS: ParkingCapacity = {
    carros: 38,
    motos: 26
};
