# user_service.py
import grpc
import users_pb2
import users_pb2_grpc

class UserService(users_pb2_grpc.UserServiceServicer):
    def CreateUser(self, request, context):
        # Logic to create a user
        user_id = create_user(request.name, request.email)
        return users_pb2.UserId(id=user_id)

    def GetUser(self, request, context):
        # Logic to retrieve a user
        user = get_user(request.id)
        return users_pb2.UserResponse(id=user.id, name=user.name, email=user.email)

    def DeleteUser(self, request, context):
        # Logic to delete a user
        delete_user(request.id)
        return users_pb2.DeleteResponse()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    users_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
