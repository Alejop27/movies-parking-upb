import { StoreClient } from '../model/StoreClient';

export interface ClientRepository {
    isStoreClient(placa: string): Promise<StoreClient | null>;
}
