export interface ClientRepository {
    isStoreClient(placa: string): Promise<boolean>;
    getClientType(placa: string): Promise<string | null>;
}
