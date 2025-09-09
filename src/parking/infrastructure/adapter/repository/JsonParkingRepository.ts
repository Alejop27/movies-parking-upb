import fs from 'fs';
import path from 'path';
import { ParkingRepository } from '../../../domain/interfaces/ParkingRepository';
import { VehicleEntry } from '../../../domain/model/VehicleEntry';

const DB_PATH = path.resolve(__dirname, './parkingData.json');

function readData(): VehicleEntry[] {
    try {
        const json = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(json);
    } catch {
        return []; // si no existe o está vacío
    }
}

function writeData(data: VehicleEntry[]): void {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export class JsonParkingRepository implements ParkingRepository {
    async registerEntry(placa: string, tipo: 'CARRO' | 'MOTO'): Promise<VehicleEntry> {
        const data = readData();

        const newEntry: VehicleEntry = {
            registroId: `uuid-park-${Date.now()}`,
            placa,
            tipo,
            horaIngreso: new Date().toISOString(),
            finalizado: false
        };

        data.push(newEntry);
        writeData(data);

        return newEntry;
    }

    async findActiveByPlaca(placa: string): Promise<VehicleEntry | null> {
        const data = readData();
        return data.find(e => e.placa === placa && !e.finalizado) || null;
    }

    async updateExit(placa: string, horaSalida: string, tiempoMinutos: number, monto: number): Promise<VehicleEntry> {
        const data = readData();
        const entry = data.find(e => e.placa === placa && !e.finalizado);
        if (!entry) {
            throw new Error(`No se encontró registro activo para la placa ${placa}`);
        }

        entry.horaSalida = horaSalida;
        entry.tiempoEstacionadoMinutos = tiempoMinutos;
        entry.montoAPagar = monto;
        entry.finalizado = true;

        writeData(data);
        return entry;
    }

    async countActiveByType(tipo: 'CARRO' | 'MOTO'): Promise<number> {
        const data = readData();
        return data.filter(e => e.tipo === tipo && !e.finalizado).length;
    }
}

