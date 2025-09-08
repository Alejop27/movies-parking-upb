export interface DailyBalance {
    fechaReporte: string;
    recaudoTotalDelDia: number;
    detalleVehiculos: VehicleDetail[];
}

export interface VehicleDetail {
    placa: string;
    tipo: string;
    esClienteTienda: boolean;
    montoPagado: number;
}
