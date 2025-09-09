export interface ParkingTransaction {
    registroId: string;
    placa: string;
    tipo: VehicleType;
    horaIngreso: string;
    horaSalida: string;
    tiempoMinutos: number;
    monto: number;
    esClienteTienda: boolean;
    fecha: string; // YYYY-MM-DD
}

export type VehicleType = 'CARRO' | 'MOTO';
