import socket
import sys
import json
import os
from pynput.keyboard import Key, Controller

port = 20003
bufferSize = 1024
ip = sys.argv[1]

# Create a datagram socket
sock = socket.socket(family=socket.AF_INET, type=socket.SOCK_DGRAM)
print("Socket created ...")
# Bind to address and ip
sock.bind((ip, port))
print("Server up and listening on : "+ip+":"+str(port))
# Listen for incoming datagrams

msg = str.encode("Hello Client!")

while(True):
    bytesAddressPair = sock.recvfrom(bufferSize)
    message = json.loads(bytesAddressPair[0].decode())
    address = bytesAddressPair[1]
    clientMsg = "Message from Client >> {}".format(message)
    clientIP  = "Client IP Address:{}".format(address)
    print(clientMsg)
    print(clientIP)
    if message["value"] == "headLightsToggle":
        keyboard = Controller()
        keyboard.press("c")
        keyboard.release("c")

    # Sending a reply to client
    sock.sendto(msg,address)
    
    

