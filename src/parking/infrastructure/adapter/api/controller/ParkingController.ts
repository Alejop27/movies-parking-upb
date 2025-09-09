import { Request, Response } from 'express';
import AbstractController from '../../../../../api/domain/model/AbstractController';
import { ParkingService } from '../../../../application/service/ParkingService';

export default class ParkingController extends AbstractController {
    constructor(private readonly parkingService: ParkingService) {
        super();
    }

    registerEntry = async (req: Request, res: Response): Promise<void> => {
        try {
            const { placa, tipo } = req.body;

            if (!placa) {
                res.status(400).json({ error: 'La placa es requerida.' });
                return;
            }

            if (!tipo) {
                res.status(400).json({ error: 'El tipo de vehículo es requerido (CARRO o MOTO).' });
                return;
            }

            const result = await this.parkingService.registerVehicleEntry(placa, tipo);

            res.status(201).json({
                registroId: result.registroId,
                placa: result.placa,
                tipo: result.tipo,
                horaIngreso: result.horaIngreso
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    processExit = async (req: Request, res: Response): Promise<void> => {
        try {
            const { placa } = req.body;

            if (!placa) {
                res.status(400).json({ error: 'La placa es requerida.' });
                return;
            }

            const result = await this.parkingService.processVehicleExit(placa);

            res.status(200).json({
                placa: result.placa,
                tipo: result.tipo,
                horaIngreso: result.horaIngreso,
                horaSalida: result.horaSalida,
                tiempoEstacionadoMinutos: result.tiempoEstacionadoMinutos,
                montoAPagar: result.montoAPagar
            });
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
