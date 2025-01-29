import { Repository } from "typeorm";
import { Payment } from "../entities";
import { appDataSource } from "../database/data-source.js";

export class PaymentService {
  constructor(private paymentRepository: Repository<Payment>) {}
  async findOneById(paymentId: number) {
    return await this.paymentRepository.findOneBy({ id: paymentId });
  }
}
export const paymentService = new PaymentService(
  appDataSource.getRepository(Payment)
);
