# order_service.py
import grpc
import orders_pb2
import orders_pb2_grpc

class OrderService(orders_pb2_grpc.OrderServiceServicer):
    def CreateOrder(self, request, context):
        # Logic to create an order
        order_id = create_order(request.user_id, request.product_id)
        return orders_pb2.OrderId(id=order_id)

    def GetOrder(self, request, context):
        # Logic to retrieve an order
        order = get_order(request.id)
        return orders_pb2.OrderResponse(
            id=order.id, user_id=order.user_id, product_id=order.product_id
        )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    orders_pb2_grpc.add_OrderServiceServicer_to_server(OrderService(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
