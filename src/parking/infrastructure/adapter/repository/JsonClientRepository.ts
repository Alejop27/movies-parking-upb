import fs from 'fs';
import path from 'path';
import { ClientRepository } from '../../../domain/interfaces/ClientRepository';

interface StoreClient {
    placa: string;
    tipo: 'CARRO' | 'MOTO';
    esClienteTienda: boolean;
}

const DB_PATH = path.resolve(__dirname, './clientsData.json');

function readData(): StoreClient[] {
    try {
        const json = fs.readFileSync(DB_PATH, 'utf-8');
        return JSON.parse(json);
    } catch {
        return []; // archivo vacío o no existe
    }
}

function writeData(data: StoreClient[]): void {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

export class JsonClientRepository implements ClientRepository {
    async isStoreClient(placa: string): Promise<boolean> {
        const clients = readData();
        const client = clients.find(c => c.placa === placa);
        return client?.esClienteTienda || false;
    }

    async getClientType(placa: string): Promise<string | null> {
        const clients = readData();
        const client = clients.find(c => c.placa === placa);
        return client?.tipo || null;
    }

    async addClient(placa: string, tipo: 'CARRO' | 'MOTO', esClienteTienda: boolean): Promise<void> {
        const clients = readData();
        const exists = clients.find(c => c.placa === placa);
        if (exists) {
            throw new Error(`El cliente con placa ${placa} ya existe.`);
        }

        clients.push({ placa, tipo, esClienteTienda });
        writeData(clients);
    }

    async getAllClients(): Promise<StoreClient[]> {
        return readData();
    }
}
