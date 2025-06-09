import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Card, 
  Button, 
  Badge, 
  Pagination, 
  Table, 
  Accordion,
  Row,
  Col
} from 'react-bootstrap';
import { 
  Package, 
  Calendar,
  CheckCircle, 
  Clock, 
  Truck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Order, OrderItemStatus, OrderStatus } from '../../../generated';
import { orderService } from '../../../services/order';
import { useNavigate } from 'react-router';
import { ApolloError } from "@apollo/client";
import { ErrorCode } from '../../../constants/errors';
/**
 * Interface defining the structure of an individual order item
 */


/**
 * OrdersPage Component - Displays user's order history with expandable details,
 * pagination, and refund request functionality using Bootstrap 5
 */
const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const ordersPerPage = 3;
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const currentOrders = orders.slice(startIndex, startIndex + ordersPerPage);

  

  /**
   * Gets the appropriate Bootstrap variant for order status badges
   * @param status - The order status
   * @returns Bootstrap badge variant
   */
 const getStatusVariant = (status: OrderStatus | undefined): string => {
  switch (status) {
    case OrderStatus.Delivered:
      return 'success';         
    case OrderStatus.Shipped:
      return 'primary';         
    case OrderStatus.Pending:
      return 'warning';        
    case OrderStatus.Confirmed:
      return 'info';            
    case OrderStatus.Partiallyshipped:
      return 'info';            
    case OrderStatus.Partiallydelivered:
      return 'info';            
    case OrderStatus.Refunded:
      return 'secondary';        
    case OrderStatus.Failed:
      return 'danger';          
    default:
      return 'secondary';      
  }
};


  /**   
   * Gets the appropriate icon for order status
   * @param status - The order status
   * @returns React component for the status icon
   */
  const getStatusIcon = (status?: OrderStatus) => {
    switch (status) {
      case OrderStatus.Delivered:
        return <CheckCircle size={16} className="me-1" />;
      case OrderStatus.Shipped:
        return <Truck size={16} className="me-1" />;
      case OrderStatus.Pending:
        return <Clock size={16} className="me-1" />;
      default:
        return <Package size={16} className="me-1" />;
    }
  };

  /**
   * Gets the appropriate Bootstrap variant for refund status badges
   * @param status - The refund status
   * @returns Bootstrap badge variant
   */
  const getOrderItemStatusVariant = (status?: OrderItemStatus): string => {
    switch (status) {
    case OrderItemStatus.Delivered:
      return 'success';         // ✅ livré
    case OrderItemStatus.Shipped:
      return 'primary';  
    case OrderItemStatus.Pending:
      return 'warning';  
    case OrderItemStatus.Confirmed:
      return 'info';             
    case OrderItemStatus.Refunded:
      return 'secondary';        
    case OrderItemStatus.Cancelled:
      return 'danger';         
    case OrderItemStatus.Failed:
      return 'danger'; 
    default :     
      return 'secondary';        
    };
}
    const navigate = useNavigate();
    const [globalError,setGlobalError] = useState("");
    useEffect(() => {
        const fetchOrders = async () => {
           const response  = await orderService.getBuyerOrders(currentPage,ordersPerPage);
              if (response.data.getMyOrders) {
                  setOrders(response.data.getMyOrders.orders);
                  setTotalOrders(response.data.getMyOrders.totalCount);
              }
        }
        try {  
            fetchOrders();
         }catch (e) {
            const err = e as ApolloError;
            if(err.graphQLErrors[0].extensions?.code === ErrorCode.BAD_USER_INPUT){
                setGlobalError(err.graphQLErrors[0].message);
            }else {
                navigate("/Error/"+err.graphQLErrors[0].extensions?.code+"/"+err.graphQLErrors[0].message)
            }
         }
    },[currentPage, ordersPerPage, navigate]);
  return (
    <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 m-24 bg-light">
      <Container>
        {/* Page Header */}
        <div className="mb-5">
          <h1 className="display-5 fw-bold text-dark mb-2">My Orders</h1>
          <p className="text-muted fs-5">Track and manage your recent purchases</p>
        </div>
        {globalError &&  <div className="alert alert-danger" role="alert">{globalError}</div>}
        {/* Orders Accordion */}
        <Accordion className="mb-4" defaultActiveKey="0">
          {currentOrders.map((order, index) => (
            <Accordion.Item key={order.id} eventKey={index.toString()} className="mb-3 border-0 shadow-sm">
              <Accordion.Header className="orders-accordion-header">
                <div className="w-100 me-3">
                  <Row className="align-items-center">
                    <Col md={3}>
                      <div className="d-flex align-items-center">
                        <Package size={20} className="text-muted me-2" />
                        <span className="fw-bold">ORD.{order.id}</span>
                      </div>
                    </Col>
                    <Col md={3}>
                      <div className="d-flex align-items-center text-muted">
                        <Calendar size={16} className="me-2" />
                        <small>{new Date(order.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</small>
                      </div>
                    </Col>
                    <Col md={2}>
                      <div className="d-flex align-items-center">
                        <span className="fw-semibold">{order?.totalAmount?.toFixed(2)} DH</span>
                      </div>
                    </Col>
                    <Col md={2}>
                      <Badge bg={getStatusVariant(order?.status || undefined)} className="d-flex align-items-center">
                        {getStatusIcon(order?.status || undefined)}
                        {order.status}
                      </Badge>
                    </Col>
                    <Col md={2}>
                      <small className="text-muted">
                        {order.orderItems?.length} item{order.orderItems?.length !== 1 ? 's' : ''}
                      </small>
                    </Col>
                  </Row>
                </div>
              </Accordion.Header>
              
              <Accordion.Body className="">
                <h5 className="mb-3">Order Details</h5>
                
                <Card className="border-0 shadow-sm p-3">
                  <div className="table-responsive">
                    <Table className="mb-0">
                      <thead className="">
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Subtotal</th>
                          <th className='text-center'>Status/Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems?.map((item) => (
                          <tr key={item?.id}>
                            <td className='p-0'>
                              <div className="d-flex align-items-center">
                                <img 
                                  src={item?.product?.images? item?.product?.images[0] : '/placeholder.png'} 
                                  alt={item?.product?.name || "Product Image"}
                                  className="rounded me-3"
                                  style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                                />
                                <span className="fw-medium">{item?.product?.name}</span>
                              </div>
                            </td>
                            <td className="text-muted">{item?.quantity}</td>
                            <td className="fw-medium">{item?.product?.price} DH</td>
                            <td className="fw-medium">{(item?.price || 0).toFixed(2)} DH</td>
                            <td className='text-center'>
                                <Button
                                  variant={getOrderItemStatusVariant(item?.status)}
                                  size="sm"
                                  className=""
                                >
                                  {item?.status}
                                </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  
                  {/* Order Total */}
                  <Card.Footer className="bg-light border-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fs-5 fw-semibold">Total:</span>
                      <span className="fs-5 fw-bold">{order?.totalAmount?.toFixed(2)} DH</span>
                    </div>
                  </Card.Footer>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              >
                <ChevronLeft size={16} className="me-1" />
                Previous
              </Pagination.Prev>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Pagination.Item
                  key={page}
                  active={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </Pagination.Item>
              ))}
              
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              >
                Next
                <ChevronRight size={16} className="ms-1" />
              </Pagination.Next>
            </Pagination>
          </div>
        )}

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-5">
            <Package size={64} className="text-muted mb-3" />
            <h4 className="text-muted mb-2">No orders found</h4>
            <p className="text-muted">You haven't placed any orders yet.</p>
          </div>
        )}
      </Container>
    </div>
  );
};

export default OrdersPage;