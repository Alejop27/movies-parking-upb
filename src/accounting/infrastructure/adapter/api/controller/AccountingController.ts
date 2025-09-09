import { Request, Response } from 'express';
import { AccountingService } from '../../../../application/service/AccountingService';

export class AccountingController {
    constructor(private readonly accountingService: AccountingService) {}

    getDailyBalance = async (req: Request, res: Response): Promise<void> => {
        try {
            const { fecha } = req.query;
            if (!fecha || typeof fecha !== 'string') {
                res.status(400).json({ error: 'La fecha es requerida en formato YYYY-MM-DD' });
                return;
            }

            const result = await this.accountingService.getDailyBalance(fecha);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
