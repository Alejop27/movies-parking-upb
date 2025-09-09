import { ClientRepository } from '../../../domain/interfaces/ClientRepository';

interface StoreClient {
    placa: string;
    tipo: string;
    esClienteTienda: boolean;
}

export class InMemoryClientRepository implements ClientRepository {
    private clients: StoreClient[] = [
        { placa: 'ABC-78D', tipo: 'MOTO', esClienteTienda: true },
        { placa: 'CLI-001', tipo: 'CARRO', esClienteTienda: true },
        { placa: 'VIP-123', tipo: 'CARRO', esClienteTienda: true },
        { placa: 'MOT-999', tipo: 'MOTO', esClienteTienda: true }
    ];

    async isStoreClient(placa: string): Promise<boolean> {
        const client = this.clients.find(c => c.placa === placa);
        return client?.esClienteTienda || false;
    }

    async getClientType(placa: string): Promise<string | null> {
        const client = this.clients.find(c => c.placa === placa);
        return client?.tipo || null;
    }
}
