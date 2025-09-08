
export interface ParkingRecord {
    registroId: string;
    placa: string;
    tipo: string;
    horaIngreso: string;
    horaSalida?: string;
    tiempoEstacionadoMinutos?: number;
    montoAPagar?: number;
    finalizado: boolean;
}
