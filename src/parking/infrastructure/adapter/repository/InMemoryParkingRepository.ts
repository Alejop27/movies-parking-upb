import { ParkingRepository } from '../../../domain/interfaces/ParkingRepository';
import { VehicleEntry } from '../../../domain/model/VehicleEntry';

export class InMemoryParkingRepository implements ParkingRepository {
    private entries: VehicleEntry[] = [];
    private counter: number = 1;

    async registerEntry(placa: string, tipo: string): Promise<VehicleEntry> {
        const entry: VehicleEntry = {
            registroId: `uuid-park-${Date.now()}-${this.counter++}`,
            placa,
            tipo: tipo as 'CARRO' | 'MOTO',
            horaIngreso: new Date().toISOString(),
            finalizado: false
        };

        this.entries.push(entry);
        return entry;
    }

    async findActiveByPlaca(placa: string): Promise<VehicleEntry | null> {
        return this.entries.find(entry => entry.placa === placa && !entry.finalizado) || null;
    }

    async updateExit(placa: string, horaSalida: string, tiempoMinutos: number, monto: number): Promise<VehicleEntry> {
        const entryIndex = this.entries.findIndex(entry => entry.placa === placa && !entry.finalizado);
        if (entryIndex === -1) {
            throw new Error(`No se encontró registro activo para la placa ${placa}`);
        }

        if (entryIndex === -1 || !this.entries[entryIndex]) {
            throw new Error(`No se encontró registro activo para la placa ${placa}`);
        }

        const updatedEntry: VehicleEntry = {
            ...this.entries[entryIndex],
            placa: this.entries[entryIndex].placa,
            tipo: this.entries[entryIndex].tipo,
            horaIngreso: this.entries[entryIndex].horaIngreso,
            registroId: this.entries[entryIndex].registroId,
            horaSalida,
            tiempoEstacionadoMinutos: tiempoMinutos,
            montoAPagar: monto,
            finalizado: true
        };

        this.entries[entryIndex] = updatedEntry;

        return updatedEntry;
    }

    async countActiveByType(tipo: string): Promise<number> {
        return this.entries.filter(entry => entry.tipo === tipo && !entry.finalizado).length;
    }
}
