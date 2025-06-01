import { OrderItemStatus } from "../generated";

export const StatusColor: Record<OrderItemStatus, { bgcolor: string }> = {
  [OrderItemStatus.Pending]: { bgcolor: "bg-warning" },
  [OrderItemStatus.Confirmed]: { bgcolor: "bg-primary" },
  [OrderItemStatus.Shipped]: { bgcolor: "bg-info" },
  [OrderItemStatus.Delivered]: { bgcolor: "bg-success" },
  [OrderItemStatus.Cancelled]: { bgcolor: "bg-danger" },
  [OrderItemStatus.Failed]: { bgcolor: "bg-danger" },
  [OrderItemStatus.Refunded]: { bgcolor: "bg-secondary" },
};
