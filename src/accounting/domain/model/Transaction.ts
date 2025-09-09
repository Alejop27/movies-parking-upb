export interface Transaction {
    id: string;
    registroId: string;
    placa: string;
    tipo: string;
    horaIngreso: string;
    horaSalida: string;
    tiempoMinutos: number;
    monto: number;
    esClienteTienda: boolean;
    fecha: string;
    fechaCreacion: string;
}
